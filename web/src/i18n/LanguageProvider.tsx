"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Language = "en" | "nl";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (text: string) => string;
};

const LANGUAGE_COOKIE = "microjobs_language";

const translations: Record<string, string> = {
  // General navigation
  Jobs: "Vacatures",
  Projects: "Projecten",
  About: "Over",
  Primary: "Hoofdnavigatie",
  "Toggle language": "Taal wijzigen",
  "Log in": "Inloggen",
  "Sign up": "Registreren",
  "Close menu": "Menu sluiten",
  "Open menu": "Menu openen",
  Dashboard: "Dashboard",
  "Go to dashboard": "Ga naar dashboard",
  "Back to dashboard": "Terug naar dashboard",
  "Back to homepage": "Terug naar de startpagina",
  "Back to Admin": "Terug naar beheer",
  "Back to listings": "Terug naar vacatures",
  "Back to talent": "Terug naar talent",
  "Back to profile": "Terug naar profiel",
  "Back to messages": "Terug naar berichten",
  "Skip to content": "Ga naar de inhoud",

  // Homepage
  "— one profile, every job": "— één profiel, elke klus",
  "Find work. Build projects.": "Vind werk. Bouw projecten.",
  "Meet local talent.": "Ontmoet lokaal talent.",
  "Microjobs.sr is where people in Suriname hire, get hired, and team up on real projects — all from a single profile that grows with them.":
    "Microjobs.sr is de plek waar mensen in Suriname anderen inhuren, werk vinden en samenwerken aan echte projecten — allemaal vanuit één profiel dat met hen meegroeit.",
  "Browse jobs": "Bekijk vacatures",
  "Explore talent": "Ontdek talent",
  You: "Jij",
  Hire: "Inhuren",
  "Post a role and review applicants":
    "Plaats een vacature en beoordeel sollicitanten",
  Apply: "Solliciteren",
  "Find work that fits your skills":
    "Vind werk dat bij je vaardigheden past",
  Collaborate: "Samenwerken",
  "Join a project team": "Sluit je aan bij een projectteam",
  Showcase: "Presenteren",
  "Build your portfolio": "Bouw je portfolio op",
  "Active talent profiles": "Actieve talentprofielen",
  "Open jobs this month": "Openstaande vacatures deze maand",
  "Collaboration projects": "Samenwerkingsprojecten",
  "Registered organizations": "Geregistreerde organisaties",
  "Open roles, posted this week": "Openstaande functies van deze week",
  "Real listings from local companies and small teams — updated daily.":
    "Echte vacatures van lokale bedrijven en kleine teams — dagelijks bijgewerkt.",
  "View all jobs": "Bekijk alle vacatures",
  "Remote friendly": "Remote mogelijk",
  "· Remote friendly": "· Remote mogelijk",
  Posted: "Geplaatst",
  "d ago": "d geleden",
  "Teams forming right now": "Teams die nu worden gevormd",
  "Join a project that needs your specific skill, or start one of your own.":
    "Sluit je aan bij een project dat jouw specifieke vaardigheid nodig heeft, of start zelf een project.",
  joined: "aangesloten",
  "Profiles built to show real work":
    "Profielen die echt werk laten zien",
  "Skills, availability, and a portfolio link — everything you need to make the first move.":
    "Vaardigheden, beschikbaarheid en een portfoliolink — alles wat je nodig hebt om de eerste stap te zetten.",
  experience: "ervaring",
  Portfolio: "Portfolio",
  "Why Microjobs": "Waarom Microjobs",
  "One account. Every way to work.":
    "Eén account. Elke manier van werken.",
  "One profile, not five accounts":
    "Eén profiel, geen vijf accounts",
  "Your work history, skills, and portfolio live in one place — whether you're hiring, applying, or joining a team.":
    "Je werkervaring, vaardigheden en portfolio staan op één plek — of je nu iemand inhuurt, solliciteert of je bij een team aansluit.",
  "Collaborators, not just candidates":
    "Samenwerkingspartners, niet alleen kandidaten",
  "Projects section connects you with people building things, not just companies filling seats.":
    "De projectsectie brengt je in contact met mensen die iets bouwen, niet alleen met bedrijven die vacatures willen invullen.",
  "A portfolio that grows with you":
    "Een portfolio dat met je meegroeit",
  "Every job and project you complete adds to a track record other people can actually see.":
    "Elke klus en ieder project dat je voltooit, draagt bij aan een zichtbaar overzicht van je ervaring.",
  "Built around local work": "Gebouwd rond lokaal werk",
  "Listings are grounded in Suriname — from Paramaribo studios to district-level community projects.":
    "De vacatures zijn gericht op Suriname — van studio's in Paramaribo tot gemeenschapsprojecten in de districten.",
  "Get started": "Aan de slag",
  "Set up your profile once. Use it for every job, project, and collaboration after.":
    "Stel je profiel één keer in. Gebruik het daarna voor elke klus, elk project en iedere samenwerking.",
  "Create your profile": "Maak je profiel",

  // Homepage example content
  "Frontend Developer": "Frontendontwikkelaar",
  "Brand Designer": "Merkontwerper",
  "Marketing Assistant": "Marketingassistent",
  "Backend Engineer": "Backendontwikkelaar",
  "Part-time": "Parttime",
  Freelance: "Freelance",
  "SRD 3,200/mo": "SRD 3.200/mnd",
  "SRD 1,800 project": "SRD 1.800 per project",
  "SRD 2,100/mo": "SRD 2.100/mnd",
  "SRD 4,500 project": "SRD 4.500 per project",
  Identity: "Huisstijl",
  Social: "Sociale media",
  Content: "Content",
  Copywriting: "Tekstschrijven",
  "UI Design": "UI-ontwerp",
  "Data Viz": "Datavisualisatie",
  "Community Website for Blauwgrond":
    "Communitywebsite voor Blauwgrond",
  "Neighborhood Council": "Buurtvereniging",
  "A directory and events page for local residents and small businesses in the district.":
    "Een overzichts- en evenementenpagina voor buurtbewoners en kleine bedrijven in het district.",
  "Startup Looking for Designer": "Startup zoekt ontwerper",
  "Early-stage food delivery concept needs a visual identity and app screens before pitch season.":
    "Een beginnend maaltijdbezorgconcept heeft vóór het pitchseizoen een visuele identiteit en appschermen nodig.",
  "AI Student Team — Crop Monitoring":
    "AI-studententeam — gewasmonitoring",
  "Final-year build using satellite imagery to flag irrigation issues on rice farms.":
    "Afstudeerproject dat satellietbeelden gebruikt om irrigatieproblemen op rijstvelden te signaleren.",
  "Product Designer": "Productontwerper",
  "Full-stack Developer": "Full-stackontwikkelaar",
  "Marketing Strategist": "Marketingstrateeg",
  Prototyping: "Prototyping",
  "Design Systems": "Ontwerpsystemen",
  Growth: "Groei",
  Available: "Beschikbaar",
  "Open to offers": "Open voor aanbiedingen",
  Booked: "Volgeboekt",
  "4 yrs": "4 jaar",
  "6 yrs": "6 jaar",
  "3 yrs": "3 jaar",

  // Talent pages
  "Talent network": "Talentnetwerk",
  "People behind": "De mensen achter",
  "the work.": "het werk.",
  "Find developers, designers, writers, builders, and other skilled people across Suriname. Connect with someone who can help bring your next idea to life.":
    "Vind ontwikkelaars, ontwerpers, schrijvers, makers en andere vakmensen in heel Suriname. Kom in contact met iemand die je volgende idee tot leven kan brengen.",
  "Search people, skills, or locations...":
    "Zoek mensen, vaardigheden of locaties...",
  Search: "Zoeken",
  "Filtering by": "Gefilterd op",
  Clear: "Wissen",
  "Explore skills": "Ontdek vaardigheden",
  "The community": "De community",
  "Matching people": "Passende personen",
  "Skilled people": "Vakkundige personen",
  person: "persoon",
  people: "personen",
  "No matching people": "Geen passende personen",
  "Try another name, skill, or location.":
    "Probeer een andere naam, vaardigheid of locatie.",
  "View everyone": "Bekijk iedereen",
  "Active profile": "Actief profiel",
  "View profile": "Bekijk profiel",
  "This person hasn't added a bio yet.":
    "Deze persoon heeft nog geen biografie toegevoegd.",
  Active: "Actief",
  Expertise: "Expertise",
  Skills: "Vaardigheden",
  "No skills have been added yet.":
    "Er zijn nog geen vaardigheden toegevoegd.",
  "Looking to work together?": "Wil je samenwerken?",
  "Build something together": "Bouw samen iets op",
  Think: "Denk je dat",
  "would be a good fit for your idea? Start a project together or message them first to discuss it.":
    "goed bij je idee zou passen? Start samen een project of stuur eerst een bericht om het te bespreken.",

  // Authentication
  "Welcome back": "Welkom terug",
  "“I found a developer for my startup project through Microjobs — the platform made finding local talent simple.”":
    "“Via Microjobs vond ik een ontwikkelaar voor mijn startup-project — het platform maakte het eenvoudig om lokaal talent te vinden.”",
  "Product Designer, Paramaribo":
    "Productontwerper, Paramaribo",
  "Join the community": "Word lid van de community",
  "Build your presence.": "Bouw aan je profiel.",
  "Create your account and start connecting with opportunities across Suriname.":
    "Maak je account en kom in contact met kansen in heel Suriname.",
  "Find Opportunities": "Vind kansen",
  "Discover projects and jobs from people across Suriname.":
    "Ontdek projecten en vacatures van mensen uit heel Suriname.",
  "Show Your Skills": "Laat je vaardigheden zien",
  "Create your profile and showcase what you do.":
    "Maak je profiel en laat zien wat je doet.",
  "Work Together": "Werk samen",
  "Connect with clients, creators, and businesses.":
    "Kom in contact met klanten, makers en bedrijven.",
  "Build Reputation": "Bouw een reputatie op",
  "Grow your profile through successful work.":
    "Laat je profiel groeien door succesvol werk.",
  "Odi baka! · Welcome back": "Odi baka! · Welkom terug",
  "Log in to your profile": "Log in op je profiel",
  "New to Microjobs.sr?": "Nieuw bij Microjobs.sr?",
  "Create a profile": "Maak een profiel",
  "Continue with Google": "Doorgaan met Google",
  or: "of",
  Email: "E-mail",
  Password: "Wachtwoord",
  "Remember me": "Onthoud mij",
  "Forgot password?": "Wachtwoord vergeten?",
  "Logging in...": "Bezig met inloggen...",
  "By continuing, you agree to Microjobs.sr's":
    "Door verder te gaan, ga je akkoord met de",
  "Terms of Service": "Servicevoorwaarden",
  and: "en het",
  "Privacy Policy": "Privacybeleid",
  "Welcome · Create your profile":
    "Welkom · Maak je profiel",
  "Join Microjobs.sr": "Word lid van Microjobs.sr",
  "Already have an account?": "Heb je al een account?",
  "Full name": "Volledige naam",
  "Your name": "Je naam",
  "Creating account...": "Account wordt aangemaakt...",
  "Create account": "Account aanmaken",
  "Enter a valid email address":
    "Voer een geldig e-mailadres in",
  "Use at least 8 characters": "Gebruik minimaal 8 tekens",
  "Name must be at least 2 characters.":
    "De naam moet minimaal 2 tekens bevatten.",
  "Enter a valid email address.":
    "Voer een geldig e-mailadres in.",
  "Password must be at least 8 characters.":
    "Het wachtwoord moet minimaal 8 tekens bevatten.",
  "An account with that email already exists.":
    "Er bestaat al een account met dit e-mailadres.",
  "Enter your email and password.":
    "Voer je e-mailadres en wachtwoord in.",
  "Invalid email or password.":
    "Ongeldig e-mailadres of wachtwoord.",
  "This account is inactive.": "Dit account is inactief.",

  // Dashboard
  "Your profile connects you with jobs, projects, and talented people across Suriname.":
    "Je profiel brengt je in contact met vacatures, projecten en getalenteerde mensen in heel Suriname.",
  "Your Workspace": "Je werkruimte",
  "Your workspace": "Je werkruimte",
  "Manage your projects, requests, and listings.":
    "Beheer je projecten, aanvragen en vacatures.",
  "Find jobs": "Vind vacatures",
  "Discover projects and paid opportunities.":
    "Ontdek projecten en betaalde kansen.",
  "Find talent": "Vind talent",
  "Connect with skilled people.":
    "Kom in contact met vakkundige mensen.",
  "Post a job": "Plaats een vacature",
  "Find the right person for your work.":
    "Vind de juiste persoon voor je werk.",
  "Create project": "Project aanmaken",
  "Start something new with others.":
    "Begin samen met anderen aan iets nieuws.",
  Create: "Aanmaken",
  Explore: "Ontdekken",
  "Your profile": "Je profiel",
  "Location not added": "Locatie niet toegevoegd",
  "No skills added yet.": "Nog geen vaardigheden toegevoegd.",
  reputation: "reputatie",
  "Edit profile": "Profiel bewerken",
  "Complete your profile": "Maak je profiel compleet",
  "Improve your chances of getting matched.":
    "Vergroot je kans op een goede match.",
  "Profile completion": "Profielvoltooiing",
  "Add your location": "Voeg je locatie toe",
  "Add a bio": "Voeg een biografie toe",
  "Add your skills": "Voeg je vaardigheden toe",
  "Finish profile": "Profiel afronden",
  "Your marketplace stats": "Je marktplaatsstatistieken",
  "Your activity this week.": "Je activiteit van deze week.",
  "Profile views": "Profielweergaven",
  "Job matches": "Vacaturematches",
  Response: "Reacties",
  "Updated weekly": "Wekelijks bijgewerkt",
  "Current Projects": "Huidige projecten",
  "Projects you are currently working on.":
    "Projecten waaraan je momenteel werkt.",
  "Requests Sent": "Verzonden aanvragen",
  "Jobs and collaborations you requested.":
    "Vacatures en samenwerkingen waarvoor je een aanvraag hebt verstuurd.",
  "My Listings": "Mijn vacatures",
  "Jobs you posted for others.":
    "Vacatures die je voor anderen hebt geplaatst.",
  "Recommended Jobs": "Aanbevolen vacatures",
  "View all": "Alles bekijken",
  "No recommendations yet": "Nog geen aanbevelingen",
  "Check back later for new job opportunities.":
    "Kijk later terug voor nieuwe vacatures.",
  "Nothing here yet": "Hier staat nog niets",
  "View details": "Bekijk details",
  "View details →": "Bekijk details →",
  Messages: "Berichten",
  Notifications: "Meldingen",
  "Account menu": "Accountmenu",
  "Close messages": "Berichten sluiten",
  "No messages yet": "Nog geen berichten",
  "No messages yet.": "Nog geen berichten.",
  "No applications yet": "Nog geen sollicitaties",
  "Your conversations will appear here.":
    "Je gesprekken verschijnen hier.",
  "View all messages": "Bekijk alle berichten",
  "Close notifications": "Meldingen sluiten",
  "No notifications yet": "Nog geen meldingen",
  "Project invitations and other updates will appear here.":
    "Projectuitnodigingen en andere updates verschijnen hier.",
  "Project invitation": "Projectuitnodiging",
  "invited you to join": "heeft je uitgenodigd voor",
  "View project →": "Bekijk project →",
  "Log out": "Uitloggen",
  "Logging out...": "Bezig met uitloggen...",

  // Profile
  "My Profile": "Mijn profiel",
  "View your profile, skills, and experience.":
    "Bekijk je profiel, vaardigheden en ervaring.",
  "Your Profile": "Je profiel",
  "Edit your profile": "Bewerk je profiel",
  "Keep your profile up to date so people know who they are working with.":
    "Houd je profiel actueel, zodat mensen weten met wie ze samenwerken.",
  "Changes saved": "Wijzigingen opgeslagen",
  "Dismiss notification": "Melding sluiten",
  Location: "Locatie",
  Bio: "Biografie",
  "Tell people a little about yourself...":
    "Vertel mensen iets over jezelf...",
  "Add a skill": "Voeg een vaardigheid toe",
  Add: "Toevoegen",
  Cancel: "Annuleren",
  "Saving...": "Bezig met opslaan...",
  "Save changes": "Wijzigingen opslaan",
  "No bio added yet.": "Nog geen biografie toegevoegd.",
  "Skills & Technologies": "Vaardigheden en technologieën",
  "Technologies and skills this user works with.":
    "Technologieën en vaardigheden waarmee deze gebruiker werkt.",

  // Jobs and applications
  "Discover jobs and paid opportunities posted by people and businesses across Suriname.":
    "Ontdek vacatures en betaalde kansen van mensen en bedrijven in heel Suriname.",
  "Search jobs...": "Zoek vacatures...",
  "Open jobs": "Openstaande vacatures",
  job: "vacature",
  jobs: "vacatures",
  available: "beschikbaar",
  "No jobs yet": "Nog geen vacatures",
  "Be the first person to post an opportunity.":
    "Wees de eerste die een vacature plaatst.",
  "Tell the community what you need help with and find the right person for the job.":
    "Vertel de community waarbij je hulp nodig hebt en vind de juiste persoon voor de klus.",
  "Job title": "Functietitel",
  "e.g. Build a restaurant website":
    "bijv. bouw een restaurantwebsite",
  Description: "Beschrijving",
  "Describe what you need help with...":
    "Beschrijf waarbij je hulp nodig hebt...",
  "Budget (SRD)": "Budget (SRD)",
  "e.g. 500": "bijv. 500",
  "Freelancers will see this as an SRD":
    "Freelancers zien dit als een budget van SRD",
  "budget.": ".",
  Remove: "Verwijder",
  "Add up to 10 relevant skills.":
    "Voeg maximaal 10 relevante vaardigheden toe.",
  "Posting...": "Bezig met plaatsen...",
  "Post job": "Vacature plaatsen",
  "Budget:": "Budget:",
  "Interested?": "Geïnteresseerd?",
  "Apply for this job": "Solliciteer op deze vacature",
  "Send your application to": "Stuur je sollicitatie naar",
  "and let them know you're interested in working on this project.":
    "en laat weten dat je aan dit project wilt werken.",
  "This job is no longer accepting applications.":
    "Voor deze vacature worden geen sollicitaties meer geaccepteerd.",
  "Application submitted —": "Sollicitatie verstuurd —",
  "Apply to job": "Solliciteren",
  "Applying...": "Bezig met solliciteren...",
  "Posted by": "Geplaatst door",
  "Manage the jobs you've posted and see how they appear to other users.":
    "Beheer de vacatures die je hebt geplaatst en bekijk hoe andere gebruikers ze zien.",
  "No listings yet": "Nog geen vacatures",
  "You haven't posted a job yet. Create your first listing to start finding the right talent.":
    "Je hebt nog geen vacature geplaatst. Maak je eerste vacature om het juiste talent te vinden.",
  "Track the jobs you've applied to and see the status of your requests.":
    "Volg de vacatures waarop je hebt gesolliciteerd en bekijk de status van je aanvragen.",
  "No requests yet": "Nog geen aanvragen",
  "You haven't applied to any jobs yet. Browse available jobs and send your first application.":
    "Je hebt nog niet op vacatures gesolliciteerd. Bekijk de beschikbare vacatures en verstuur je eerste sollicitatie.",
  "Your application message": "Je sollicitatiebericht",
  "View job": "Bekijk vacature",

  // Job and profile validation
  "You can add up to 10 skills.":
    "Je kunt maximaal 10 vaardigheden toevoegen.",
  "You must be logged in.": "Je moet ingelogd zijn.",
  "You must be logged in to post a job.":
    "Je moet ingelogd zijn om een vacature te plaatsen.",
  "Please enter a job title.": "Voer een functietitel in.",
  "Job title must be at least 5 characters.":
    "De functietitel moet minimaal 5 tekens bevatten.",
  "Please describe the job.": "Beschrijf de vacature.",
  "Description must be at least 20 characters.":
    "De beschrijving moet minimaal 20 tekens bevatten.",
  "Please enter a valid budget.": "Voer een geldig budget in.",
  "Something went wrong while posting the job.":
    "Er ging iets mis bij het plaatsen van de vacature.",
  "You must be logged in to apply for a job.":
    "Je moet ingelogd zijn om te solliciteren.",
  "This job no longer exists.": "Deze vacature bestaat niet meer.",
  "You cannot apply to your own job.":
    "Je kunt niet op je eigen vacature solliciteren.",
  "You have already applied to this job.":
    "Je hebt al op deze vacature gesolliciteerd.",
  "Something went wrong while applying to this job.":
    "Er ging iets mis tijdens het solliciteren.",
  "Bio must be 500 characters or less.":
    "De biografie mag maximaal 500 tekens bevatten.",

  // Projects
  "Your Projects": "Je projecten",
  "Projects you're creating and collaborating on.":
    "Projecten die je aanmaakt en waaraan je meewerkt.",
  Collaboration: "Samenwerking",
  Mentorship: "Mentorschap",
  "You are the creator": "Jij bent de maker",
  "View project": "Bekijk project",
  "No projects yet": "Nog geen projecten",
  "You haven't created or joined any projects yet. Find someone to work with and start your first project.":
    "Je hebt nog geen project aangemaakt en bent nog nergens aangesloten. Zoek iemand om mee samen te werken en start je eerste project.",
  "Browse talent": "Bekijk talent",
  "New project": "Nieuw project",
  "Start something together": "Begin samen aan iets nieuws",
  "You're inviting someone from the Microjobs community to work with you. Give them an idea of what you want to build and how you'd like to work together.":
    "Je nodigt iemand uit de Microjobs-community uit om met je samen te werken. Leg uit wat je wilt bouwen en hoe je wilt samenwerken.",
  Inviting: "Uitnodiging voor",
  "Project setup": "Projectinstellingen",
  "Project details": "Projectgegevens",
  Tell: "Vertel",
  "what you want to work on together.":
    "waaraan jullie samen willen werken.",
  "What can this be?": "Wat kan dit zijn?",
  "Choose the kind of experience": "Kies het soort ervaring",
  "Work together on a real project, share responsibilities, and gain practical experience by building something as a team.":
    "Werk samen aan een echt project, deel verantwoordelijkheden en doe praktijkervaring op door als team iets te bouwen.",
  "Learn from someone with relevant experience while working together toward a practical goal.":
    "Leer van iemand met relevante ervaring terwijl jullie samen naar een praktisch doel werken.",
  "Project title": "Projecttitel",
  "e.g. Build a student portfolio platform":
    "bijv. bouw een studentenportfolioplatform",
  "What are you working on?": "Waaraan werk je?",
  "Explain the idea, what you want to accomplish, and how you would like to work together...":
    "Leg het idee uit, wat je wilt bereiken en hoe je wilt samenwerken...",
  "Project type": "Projecttype",
  "Choose how you want to work together.":
    "Kies hoe je wilt samenwerken.",
  "Build something together and gain practical experience as a team.":
    "Bouw samen iets op en doe als team praktijkervaring op.",
  "Learn from each other while working toward a practical goal.":
    "Leer van elkaar terwijl je samen naar een praktisch doel werkt.",
  "Creating...": "Bezig met aanmaken...",
  "Opening...": "Bezig met openen...",
  "Create a project": "Maak een project",
  "Accepting...": "Bezig met accepteren...",
  "Accept invitation": "Uitnodiging accepteren",
  "Declining...": "Bezig met afwijzen...",
  Decline: "Afwijzen",
  "You've been invited to collaborate":
    "Je bent uitgenodigd om samen te werken",
  "invited you to join this project. Review the project details before deciding whether you want to participate.":
    "heeft je uitgenodigd voor dit project. Bekijk de projectgegevens voordat je beslist of je wilt deelnemen.",
  "Project member": "Projectlid",
  "You're part of this project":
    "Je maakt deel uit van dit project",
  "You accepted the invitation and are now a member of this project.":
    "Je hebt de uitnodiging geaccepteerd en bent nu lid van dit project.",
  "Project created": "Project aangemaakt",
  "Your project is ready": "Je project is klaar",
  "The invited talent has been added as a pending member. They'll need to accept the invitation before becoming an active project member.":
    "Het uitgenodigde talent is toegevoegd als lid in afwachting. De uitnodiging moet eerst worden geaccepteerd voordat die persoon actief projectlid wordt.",
  "Project owner": "Projecteigenaar",
  People: "Personen",
  Creator: "Maker",
  "Project members": "Projectleden",
  member: "lid",
  "You must be logged in to create a project.":
    "Je moet ingelogd zijn om een project aan te maken.",
  "You cannot create a project with yourself.":
    "Je kunt geen project met jezelf aanmaken.",
  "Please enter a project title.": "Voer een projecttitel in.",
  "Project title must be at least 5 characters.":
    "De projecttitel moet minimaal 5 tekens bevatten.",
  "Please describe the project.": "Beschrijf het project.",
  "Project description must be at least 20 characters.":
    "De projectbeschrijving moet minimaal 20 tekens bevatten.",
  "Invalid project type.": "Ongeldig projecttype.",
  "This talent is no longer available.":
    "Dit talent is niet langer beschikbaar.",
  "Something went wrong while creating the project.":
    "Er ging iets mis bij het aanmaken van het project.",
  "This invitation is no longer available.":
    "Deze uitnodiging is niet langer beschikbaar.",

  // Messaging
  Inbox: "Postvak IN",
  "Keep conversations with clients and freelancers in one place.":
    "Bewaar gesprekken met klanten en freelancers op één plek.",
  "No conversations yet": "Nog geen gesprekken",
  "When you contact a client or freelancer, your conversation will appear here.":
    "Wanneer je contact opneemt met een klant of freelancer, verschijnt je gesprek hier.",
  Conversation: "Gesprek",
  "Start the conversation": "Start het gesprek",
  "Send a message to": "Stuur een bericht naar",
  "to get things moving.": "om het gesprek op gang te brengen.",
  "Write a message...": "Schrijf een bericht...",
  "Send message": "Bericht versturen",
  "You cannot message yourself.":
    "Je kunt jezelf geen bericht sturen.",
  "This user is not available.":
    "Deze gebruiker is niet beschikbaar.",
  "Message cannot be empty.": "Het bericht mag niet leeg zijn.",
  "Conversation not found.": "Gesprek niet gevonden.",
  "Message sent.": "Bericht verstuurd.",
  "Good morning": "Goedemorgen",
  "Good afternoon": "Goedemiddag",
  "Good evening": "Goedenavond",

  // Administration
  Administration: "Beheer",
  "Admin Dashboard": "Beheerdersdashboard",
  "Manage users, jobs, applications, and projects across MicroJobs-SR.":
    "Beheer gebruikers, vacatures, sollicitaties en projecten binnen MicroJobs-SR.",
  Users: "Gebruikers",
  Applications: "Sollicitaties",
  "Pending applications": "Sollicitaties in behandeling",
  active: "actief",
  open: "open",
  pending: "in behandeling",
  "awaiting review": "wachten op beoordeling",
  "unfilled listings": "onvervulde vacatures",
  Review: "Beoordelen",
  Manage: "Beheren",
  "4 sections": "4 onderdelen",
  "Manage users": "Gebruikers beheren",
  "Manage jobs": "Vacatures beheren",
  "View applications": "Sollicitaties bekijken",
  "View projects": "Projecten bekijken",
  "Needs attention": "Vereist aandacht",
  "All caught up": "Alles is bijgewerkt",
  "Synced just now": "Zojuist gesynchroniseerd",
  "Monitor and manage posted jobs.":
    "Controleer en beheer geplaatste vacatures.",
  "Monitor collaboration and mentorship projects.":
    "Controleer samenwerkings- en mentorschapsprojecten.",
  "Monitor applications submitted across the platform.":
    "Controleer sollicitaties die via het platform zijn ingediend.",
  "Manage MicroJobs-SR accounts.":
    "Beheer MicroJobs-SR-accounts.",
  "Created by": "Gemaakt door",
  "Applicant:": "Sollicitant:",
  "Job owner:": "Vacature-eigenaar:",
  application: "sollicitatie",
  "No applications yet.": "Nog geen sollicitaties.",
  "No projects yet.": "Nog geen projecten.",
  Admin: "Beheerder",
  Inactive: "Inactief",
  Deactivate: "Deactiveren",
  Activate: "Activeren",
  "Remove admin": "Beheerdersrechten verwijderen",
  "Make admin": "Beheerder maken",
  "Close job": "Vacature sluiten",
  "Reopen job": "Vacature heropenen",

  // Footer
  Product: "Product",
  "Explore projects": "Ontdek projecten",
  Pricing: "Prijzen",
  Resources: "Informatie",
  "Help center": "Helpcentrum",
  "Guides for hiring": "Handleidingen voor inhuren",
  Community: "Community",
  Company: "Bedrijf",
  Careers: "Vacatures bij ons",
  Contact: "Contact",
  Legal: "Juridisch",
  "Terms of service": "Servicevoorwaarden",
  "Privacy policy": "Privacybeleid",
  "Cookie settings": "Cookie-instellingen",
  "One profile for hiring, applying, and collaborating on work across Suriname.":
    "Eén profiel om mensen in te huren, te solliciteren en samen te werken in heel Suriname.",
  "Social link": "Link naar sociale media",
  "Microjobs.sr. All rights reserved.":
    "Microjobs.sr. Alle rechten voorbehouden.",
  "Made in Paramaribo": "Gemaakt in Paramaribo",

  // Statuses
  OPEN: "OPEN",
  CLOSED: "GESLOTEN",
  PENDING: "IN BEHANDELING",
  ACCEPTED: "GEACCEPTEERD",
  DECLINED: "AFGEWEZEN",
  REJECTED: "AFGEWEZEN",
  ACTIVE: "ACTIEF",
  INACTIVE: "INACTIEF",
};

const originalTextValues = new WeakMap<Node, string>();
const originalAttributeValues = new WeakMap<
  Element,
  Map<string, string>
>();

const dutchMonths: Record<string, string> = {
  Jan: "jan",
  Feb: "feb",
  Mar: "mrt",
  Apr: "apr",
  May: "mei",
  Jun: "jun",
  Jul: "jul",
  Aug: "aug",
  Sep: "sep",
  Oct: "okt",
  Nov: "nov",
  Dec: "dec",
};

const dutchWeekdays: Record<string, string> = {
  Mon: "ma",
  Tue: "di",
  Wed: "wo",
  Thu: "do",
  Fri: "vr",
  Sat: "za",
  Sun: "zo",
};

function translatePattern(text: string): string {
  let match = text.match(/^(\d+) Active$/);
  if (match) return `${match[1]} Actief`;

  match = text.match(/^(\d+) Pending$/);
  if (match) return `${match[1]} In behandeling`;

  match = text.match(/^(\d+) total$/);
  if (match) return `${match[1]} totaal`;

  match = text.match(/^(\d+) yrs$/);
  if (match) return `${match[1]} jaar`;

  match = text.match(/^Created by (.+)$/);
  if (match) return `Gemaakt door ${match[1]}`;

  match = text.match(/^Message (.+)$/);
  if (match) return `Stuur ${match[1]} een bericht`;

  match = text.match(/^Remove (.+)$/);
  if (match) return `Verwijder ${match[1]}`;

  match = text.match(
    /^Unable to message (.+) right now\.$/
  );
  if (match) {
    return `Je kunt ${match[1]} nu geen bericht sturen.`;
  }

  match = text.match(/^Good morning, (.+)$/);
  if (match) return `Goedemorgen, ${match[1]}`;

  match = text.match(/^Good afternoon, (.+)$/);
  if (match) return `Goedemiddag, ${match[1]}`;

  match = text.match(/^Good evening, (.+)$/);
  if (match) return `Goedenavond, ${match[1]}`;

  match = text.match(
    /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{1,2})$/
  );
  if (match) {
    return `${dutchWeekdays[match[1]]} ${match[3]} ${
      dutchMonths[match[2]]
    }`;
  }

  match = text.match(
    /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
  );
  if (match) {
    return `${match[2]}-${match[1]}-${match[3]}`;
  }

  match = text.match(
    /^(\d{1,2})\/(\d{1,2})\/(\d{4}), (\d{1,2}):(\d{2}):(\d{2}) (AM|PM)$/
  );

  if (match) {
    let hour = Number(match[4]);

    if (match[7] === "PM" && hour < 12) {
      hour += 12;
    }

    if (match[7] === "AM" && hour === 12) {
      hour = 0;
    }

    return `${match[2]}-${match[1]}-${match[3]} ${String(
      hour
    ).padStart(2, "0")}:${match[5]}:${match[6]}`;
  }

  return text;
}

export function translateText(
  text: string,
  language: Language
): string {
  if (language === "en") {
    return text;
  }

  const normalized = text.replace(/\s+/g, " ").trim();

  if (!normalized) {
    return text;
  }

  const translated =
    translations[normalized] ??
    translatePattern(normalized);

  if (translated === normalized) {
    return text;
  }

  const leadingWhitespace =
    text.match(/^\s*/)?.[0] ?? "";

  const trailingWhitespace =
    text.match(/\s*$/)?.[0] ?? "";

  return `${leadingWhitespace}${translated}${trailingWhitespace}`;
}

function shouldSkip(node: Node): boolean {
  const parent =
    node instanceof Element
      ? node
      : node.parentElement;

  if (!parent) {
    return false;
  }

  return Boolean(
    parent.closest(
      "script, style, noscript, code, pre, [data-no-translate], [contenteditable='true']"
    )
  );
}

function translateElementAttributes(
  element: Element,
  language: Language
) {
  const attributes = [
    "placeholder",
    "title",
    "aria-label",
    "alt",
  ];

  for (const attribute of attributes) {
    const value = element.getAttribute(attribute);

    if (!value) {
      continue;
    }

    const originals =
      originalAttributeValues.get(element);

    const original =
      originals?.get(attribute);

    if (language === "en") {
      if (original === undefined) {
        continue;
      }

      const expectedDutch = translateText(
        original,
        "nl"
      );

      if (value === expectedDutch) {
        element.setAttribute(
          attribute,
          original
        );
      }

      originals?.delete(attribute);

      if (originals?.size === 0) {
        originalAttributeValues.delete(element);
      }

      continue;
    }

    if (
      original !== undefined &&
      value === translateText(original, "nl")
    ) {
      continue;
    }

    const nextOriginals =
      originals ?? new Map<string, string>();

    nextOriginals.set(attribute, value);
    originalAttributeValues.set(
      element,
      nextOriginals
    );

    const translated = translateText(
      value,
      language
    );

    if (translated !== value) {
      element.setAttribute(
        attribute,
        translated
      );
    }
  }
}

function translateTree(
  root: Node,
  language: Language
) {
  if (shouldSkip(root)) {
    return;
  }

  if (root.nodeType === Node.TEXT_NODE) {
    const value = root.nodeValue;

    if (!value) {
      return;
    }

    const original =
      originalTextValues.get(root);

    if (language === "en") {
      if (original === undefined) {
        return;
      }

      const expectedDutch = translateText(
        original,
        "nl"
      );

      if (value === expectedDutch) {
        root.nodeValue = original;
      }

      originalTextValues.delete(root);
      return;
    }

    if (
      original !== undefined &&
      value === translateText(original, "nl")
    ) {
      return;
    }

    originalTextValues.set(root, value);

    const translated = translateText(
      value,
      language
    );

    if (translated !== value) {
      root.nodeValue = translated;
    }

    return;
  }

  if (root instanceof Element) {
    translateElementAttributes(
      root,
      language
    );
  }

  root.childNodes.forEach((child) => {
    translateTree(child, language);
  });
}

const LanguageContext =
  createContext<LanguageContextValue | null>(
    null
  );

export function LanguageProvider({
  children,
  initialLanguage,
}: {
  children: ReactNode;
  initialLanguage: Language;
}) {
  const [language, setLanguageState] =
    useState<Language>(initialLanguage);

  const setLanguage = useCallback(
    (nextLanguage: Language) => {
      setLanguageState(nextLanguage);

      document.cookie =
        `${LANGUAGE_COOKIE}=${nextLanguage}; ` +
        "Max-Age=31536000; Path=/; SameSite=Lax";

      document.documentElement.lang =
        nextLanguage;
    },
    []
  );

  const toggleLanguage = useCallback(() => {
    setLanguage(
      language === "en" ? "nl" : "en"
    );
  }, [language, setLanguage]);

  const t = useCallback(
    (text: string) =>
      translateText(text, language).trim(),
    [language]
  );

  useEffect(() => {
    document.documentElement.lang = language;

    document.title =
      language === "nl"
        ? "Microjobs.sr — Vind werk, bouw projecten en ontmoet lokaal talent"
        : "Microjobs.sr — Find work, build projects, meet local talent";

    translateTree(
      document.documentElement,
      language
    );

    const originalAlert = window.alert;

    const translatedAlert = (
      message?: unknown
    ) => {
      originalAlert.call(
        window,
        typeof message === "string"
          ? translateText(
              message,
              language
            ).trim()
          : message
      );
    };

    window.alert = translatedAlert;

    const observer = new MutationObserver(
      (mutations) => {
        for (const mutation of mutations) {
          if (
            mutation.type === "characterData"
          ) {
            translateTree(
              mutation.target,
              language
            );
            continue;
          }

          if (mutation.type === "attributes") {
            translateTree(
              mutation.target,
              language
            );
            continue;
          }

          mutation.addedNodes.forEach(
            (node) => {
              translateTree(node, language);
            }
          );
        }
      }
    );

    observer.observe(
      document.documentElement,
      {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true,
        attributeFilter: [
          "placeholder",
          "title",
          "aria-label",
          "alt",
        ],
      }
    );

    return () => {
      observer.disconnect();
      window.alert = originalAlert;
    };
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t,
    }),
    [
      language,
      setLanguage,
      toggleLanguage,
      t,
    ]
  );

  return (
    <LanguageContext.Provider
      value={value}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(
    LanguageContext
  );

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}