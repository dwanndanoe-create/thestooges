// ==========================================
// CONFIGURATIE: SUPABASE INITIALISATIE
// ==========================================
const SUPABASE_URL = 'https://kfoefeskiamlsffdabsa.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtmb2VmZXNraWFtbHNmZmRhYnNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4NjA0NzUsImV4cCI6MjA5ODQzNjQ3NX0.W2CSun7nGi5TgbPQq3aEoEXZ65DG1QrbkyVmpUQwHs8';

// Maak de client variabele leeg aan
let supabase = null;

// Controleer VEILIG of de Supabase CDN is ingeladen
if (window.supabase) {
  supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
  console.log("Supabase SDK is niet geladen op deze pagina (Index-pagina).");
}

// Global State voor de huidige ingelogde gebruiker/profiel
let currentUserProfile = null;


// ==========================================
// HELPER FUNCTIES & UTILS (MOETEN BOVENAAN!)
// ==========================================

// Ontdek de huidige pagina-rol op basis van de body-class
function getPageRole() {
  if (document.body.classList.contains('worker-page')) return 'worker';
  if (document.body.classList.contains('employer-page')) return 'employer';
  return 'none';
}

// Genereer de HTML voor een Job Card
function createJobCard(job) {
  const currentRole = getPageRole();
  const dateObj = new Date(job.created_at);
  const formattedDate = dateObj.toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

  const badgesHtml = (job.skills || [])
    .map((s) => `<span class="skill-badge">${s}</span>`)
    .join(' ');

  let actionButtonHtml = '';
  if (currentRole === 'worker') {
    actionButtonHtml = `<button class="btn-primary card-action-btn" onclick="applyForJob('${job.id}', '${job.title}')">Direct Reageren</button>`;
  } else if (currentRole === 'employer') {
    actionButtonHtml = `<button class="btn-secondary card-action-btn" style="border-color: var(--border-strong); color: var(--text-main);" onclick="alert('Binnenkort beschikbaar: Bekijk reacties van jongeren voor deze klus!')">Bekijk Reacties</button>`;
  }

  return `
    <div class="job-card" data-id="${job.id}">
      <div class="job-card-header">
        <div>
          <h3 class="job-card-title">${job.title}</h3>
          <div class="job-card-meta">
            <span>📍 ${job.location}</span>
            <span>📅 Tijdstip: ${job.job_when}</span>
          </div>
        </div>
        <div class="job-card-pay">SRD ${Number(job.pay).toFixed(2)}</div>
      </div>
      <p class="job-card-desc">${job.description}</p>
      <div class="job-card-skills">${badgesHtml}</div>
      <div class="job-card-footer">
        <span class="job-card-author">Geplaatst door: <strong>${job.posted_by}</strong> <small>(${formattedDate})</small></span>
        ${actionButtonHtml}
      </div>
    </div>
  `;
}


// ==========================================
// JOBS DATA FUNCTIES
// ==========================================

// Haal alle jobs live op uit Supabase
async function fetchJobs() {
  if (!supabase) return [];
  try {
    const { data: jobs, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return jobs || [];
  } catch (err) {
    console.error('Fout bij ophalen van jobs:', err.message);
    return [];
  }
}

// Vul de feed op het scherm
async function initFeed() {
  const feedContainer = document.getElementById('jobs-feed');
  // Als we op een pagina zijn zonder feed (zoals index.html), stop dan direct!
  if (!feedContainer) return;

  feedContainer.innerHTML = '<p style="text-align:center; color:var(--text-muted);">Klusjes live laden uit Supabase...</p>';
  
  const jobs = await fetchJobs();
  
  // Haal eventuele zoek- en filterwaarden veilig op
  const searchQuery = document.getElementById('worker-search')?.value.toLowerCase() || '';
  const locationFilter = document.getElementById('filter-location')?.value || '';
  
  // Eerst controleren of het element bestaat voordat we getAttribute aanroepen
  const activeChip = document.querySelector('.filter-chip.active');
  const selectedSkillChip = activeChip ? activeChip.getAttribute('data-skill') : '';

  // Filter de data aan de client-kant
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery) || job.description.toLowerCase().includes(searchQuery);
    const matchesLocation = !locationFilter || job.location === locationFilter;
    const matchesSkill = !selectedSkillChip || (job.skills && job.skills.includes(selectedSkillChip));
    return matchesSearch && matchesLocation && matchesSkill;
  });

  if (filteredJobs.length === 0) {
    feedContainer.innerHTML = '<p style="text-align:center; padding:2rem; color:var(--text-muted);">Geen actieve microjobs gevonden die voldoen aan je filters.</p>';
    return;
  }

  // createJobCard is nu hierboven gedefinieerd, dus dit werkt 100% veilig!
  feedContainer.innerHTML = filteredJobs.map(createJobCard).join('');
}


// ==========================================
// AUTHENTICATIE FUNCTIES (SUPABASE AUTH)
// ==========================================

// Gebruiker registreren
async function registerUser(name, location, email, password, role) {
  if (!supabase) return;
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (authError) throw authError;

    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{
          id: authData.user.id,
          full_name: name,
          location: location,
          role: role
        }]);

      if (profileError) throw profileError;

      alert(`Registratie geslaagd! Welkom, ${name}. Je bent nu ingelogd.`);
      closeAuthModal();
    }
  } catch (err) {
    alert('Registratie mislukt: ' + err.message);
  }
}

// Gebruiker inloggen
async function loginUser(email, password) {
  if (!supabase) return;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) throw error;

    alert('Succesvol ingelogd!');
    closeAuthModal();
  } catch (err) {
    alert('Inloggen mislukt: ' + err.message);
  }
}

// Uitloggen
async function logoutUser() {
  if (!supabase) return;
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    alert('Je bent uitgelogd.');
    window.location.reload();
  } catch (err) {
    alert('Uitloggen mislukt: ' + err.message);
  }
}

// UI bijwerken op basis van inlogstatus
function renderAuthUI(session, profile) {
  const authBtn = document.querySelector('.header-auth-btn');
  if (!authBtn) return;

  if (session && profile) {
    currentUserProfile = profile;
    authBtn.textContent = `${profile.full_name} (${profile.role === 'worker' ? 'Jongere' : 'Werkgever'}) | Uitloggen`;
    authBtn.onclick = (e) => {
      e.preventDefault();
      logoutUser();
    };
    
    const postBtn = document.getElementById('btn-trigger-post');
    if (postBtn) {
      postBtn.style.display = profile.role === 'employer' ? 'block' : 'none';
    }
  } else {
    currentUserProfile = null;
    authBtn.textContent = 'Inloggen / Registreren';
    authBtn.onclick = (e) => {
      e.preventDefault();
      openAuthModal();
    };
    
    const postBtn = document.getElementById('btn-trigger-post');
    if (postBtn) postBtn.style.display = 'none';
  }
}

// Sla een nieuwe job op in Supabase
async function createJob(title, location, skillsRaw, when, pay, desc) {
  if (!supabase) return;
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session || !currentUserProfile) {
      alert('Je moet ingelogd zijn om een klus te plaatsen.');
      openAuthModal();
      return;
    }

    if (currentUserProfile.role !== 'employer') {
      alert('Alleen werkgevers kunnen klusjes plaatsen.');
      return;
    }

    const skillsArray = skillsRaw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const { error } = await supabase
      .from('jobs')
      .insert([{
        employer_id: session.user.id,
        title: title,
        location: location,
        skills: skillsArray,
        job_when: when,
        pay: parseFloat(pay) || 0,
        description: desc,
        posted_by: currentUserProfile.full_name
      }]);

    if (error) throw error;

    alert('Klus succesvol live geplaatst!');
    closeJobModal();
    if (jobForm) jobForm.reset();
    initFeed(); 
  } catch (err) {
    alert('Fout bij plaatsen van klus: ' + err.message);
  }
}

function applyForJob(jobId, jobTitle) {
  if (!currentUserProfile) {
    alert('Je moet eerst inloggen om te kunnen reageren.');
    openAuthModal();
    return;
  }
  if (currentUserProfile.role !== 'worker') {
    alert('Alleen accounts geregistreerd als Werknemer/Jongere kunnen reageren.');
    return;
  }
  alert(`Super! Je reactie op "${jobTitle}" is verzonden naar de opdrachtgever.`);
}


// ==========================================
// MODALS & EVENT LISTENERS SETUP
// ==========================================

const authModalOverlay = document.getElementById('auth-modal-overlay');
const jobModalOverlay = document.getElementById('job-modal-overlay');
const jobForm = document.getElementById('job-form');
const authTabs = document.querySelectorAll('.modal-tab');
const authForms = document.querySelectorAll('.auth-form');

function openAuthModal() { authModalOverlay?.classList.add('open'); }
function closeAuthModal() { authModalOverlay?.classList.remove('open'); }
function openJobModal() { jobModalOverlay?.classList.add('open'); }
function closeJobModal() { jobModalOverlay?.classList.remove('open'); }

authTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    authTabs.forEach((t) => t.classList.remove('active'));
    authForms.forEach((f) => f.classList.add('hidden'));
    tab.classList.add('active');
    const targetPanel = tab.getAttribute('data-tab');
    const targetForm = document.querySelector(`.auth-form[data-auth-panel="${targetPanel}"]`);
    if (targetForm) targetForm.classList.remove('hidden');
  });
});

authModalOverlay?.addEventListener('click', (e) => { if (e.target === authModalOverlay) closeAuthModal(); });
jobModalOverlay?.addEventListener('click', (e) => { if (e.target === jobModalOverlay) closeJobModal(); });

document.querySelector('[data-close-modal]')?.addEventListener('click', closeAuthModal);
document.querySelector('[data-close-job-modal]')?.addEventListener('click', closeJobModal);

document.querySelectorAll('.auth-form').forEach((form) => {
  form.addEventListener('submit', (e) => {
    const type = form.getAttribute('data-auth-panel');
    if (!type) return; 

    e.preventDefault();
    if (type === 'login') {
      const email = form.querySelector('#login-email')?.value.trim();
      const password = form.querySelector('#login-password')?.value;
      if (email && password) loginUser(email, password);
    } else if (type === 'register') {
      const name = form.querySelector('#register-name')?.value.trim();
      const location = form.querySelector('#register-location')?.value.trim();
      const email = form.querySelector('#register-email')?.value.trim();
      const password = form.querySelector('#register-password')?.value;
      const role = getPageRole() === 'employer' ? 'employer' : 'worker';

      if (name && location && email && password) {
        registerUser(name, location, email, password, role);
      }
    }
  });
});

jobForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('job-title')?.value.trim();
  const location = document.getElementById('job-location')?.value.trim();
  const skillsRaw = document.getElementById('job-skills')?.value.trim();
  const when = document.getElementById('job-when')?.value.trim();
  const pay = document.getElementById('job-pay')?.value.trim();
  const desc = document.getElementById('job-desc')?.value.trim();

  if (title && location && skillsRaw && when && pay && desc) {
    createJob(title, location, skillsRaw, when, pay, desc);
  } else {
    alert('Vul alstublieft alle velden in.');
  }
});

document.getElementById('btn-trigger-post')?.addEventListener('click', (e) => {
  e.preventDefault();
  openJobModal();
});

document.getElementById('worker-search')?.addEventListener('input', initFeed);
document.getElementById('filter-location')?.addEventListener('change', initFeed);

document.getElementById('clear-filters')?.addEventListener('click', () => {
  const select = document.getElementById('filter-location');
  if (select) select.value = '';
  const search = document.getElementById('worker-search');
  if (search) search.value = '';
  document.querySelectorAll('.filter-chip').forEach((c) => c.classList.remove('active'));
  initFeed();
});

document.getElementById('clear-filters-employer')?.addEventListener('click', () => {
  const select = document.getElementById('worker-location');
  if (select) select.value = 'Alle buurten';
  const search = document.getElementById('worker-search');
  if (search) search.value = '';
  document.querySelectorAll('.filter-chip').forEach((c) => c.classList.remove('active'));
});

document.querySelectorAll('.filter-chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    if (chip.classList.contains('active')) {
      chip.classList.remove('active');
    } else {
      document.querySelectorAll('.filter-chip').forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
    }
    initFeed(); 
  });
});

// ==========================================
// INITIALISATIE ACTIVATIE (VEILIG ONDERAAN)
// ==========================================
if (supabase) {
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (session) {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (!error && profile) {
        renderAuthUI(session, profile);
      } else {
        renderAuthUI(session, null);
      }
    } else {
      renderAuthUI(null, null);
    }
    initFeed();
  });
} else {
  initFeed();
}