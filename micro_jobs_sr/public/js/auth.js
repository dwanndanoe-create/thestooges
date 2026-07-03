// ==========================================================================
// 1. SUPABASE INITIALISATIE
// ==========================================================================
const SUPABASE_URL = "https://kfoefeskiamlsffdabsa.supabase.co"; //[cite: 8]
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtmb2VmZXNraWFtbHNmZmRhYnNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4NjA0NzUsImV4cCI6MjA5ODQzNjQ3NX0.W2CSun7nGi5TgbPQq3aEoEXZ65DG1QrbkyVmpUQwHs8"; //[cite: 8]

let supabase = null; //[cite: 8]
try {
  if (typeof window.supabase !== 'undefined') { //[cite: 8]
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY); //[cite: 8]
  }
} catch (e) {
  console.error("Supabase kon niet worden geïnitialiseerd:", e); //[cite: 8]
}

// ==========================================================================
// 2. SUPABASE SUBSCRIPTIE & DATA AFHANDELING
// ==========================================================================
function initSupabaseForms() {
  if (!supabase) return; //[cite: 8]

  // Registratie verwerken via Supabase
  const registerForm = document.getElementById('register-form'); //[cite: 8]
  if (registerForm) { //[cite: 8]
    registerForm.addEventListener('submit', async (e) => { //[cite: 8]
      e.preventDefault(); //[cite: 8]
      const name = document.getElementById('register-name').value; //[cite: 8]
      const location = document.getElementById('register-location').value; //[cite: 8]
      const email = document.getElementById('register-email').value; //[cite: 8]
      const password = document.getElementById('register-password').value; //[cite: 8]
      const role = document.getElementById('register-role').value; //[cite: 8]

      const { data, error } = await supabase.auth.signUp({ //[cite: 8]
        email: email, //[cite: 8]
        password: password, //[cite: 8]
        options: { //[cite: 8]
          data: { 
            full_name: name, 
            user_location: location, 
            role: role 
          } //[cite: 8]
        }
      });

      if (error) { //[cite: 8]
        alert("Registratie fout: " + error.message); //[cite: 8]
      } else {
        alert("Account succesvol aangemaakt! Je kunt nu inloggen."); //[cite: 8]
        if (typeof switchAuthTab === 'function') {
          switchAuthTab('login');
        }
      }
    });
  }

  // Login verwerken via Supabase
  const loginForm = document.getElementById('login-form'); //[cite: 8]
  if (loginForm) { //[cite: 8]
    loginForm.addEventListener('submit', async (e) => { //[cite: 8]
      e.preventDefault(); //[cite: 8]
      const email = document.getElementById('login-email').value; //[cite: 8]
      const password = document.getElementById('login-password').value; //[cite: 8]

      const { data, error } = await supabase.auth.signInWithPassword({ //[cite: 8]
        email: email, //[cite: 8]
        password: password, //[cite: 8]
      });

      if (error) { //[cite: 8]
        alert("Inlog fout: " + error.message); //[cite: 8]
      } else {
        alert("Succesvol ingelogd!"); //[cite: 8]
        const modalOverlay = document.getElementById('auth-modal-overlay'); //[cite: 8]
        if (modalOverlay) modalOverlay.classList.remove('open'); //[cite: 8]
        window.location.reload(); //[cite: 8]
      }
    });
  }
}

// Start formulieren-verwerking op zodra de DOM klaar staat
document.addEventListener('DOMContentLoaded', initSupabaseForms); //[cite: 8]
// Directe aanroep als fallback
initSupabaseForms(); //[cite: 8]