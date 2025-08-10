(function () {
  let elements;
  let gauge;
  let currentStep;

  console.log('🚀 Calculateur Tracking - Initialisation du script');

  // Chargement de Chart.js si pas déjà chargé
  if (typeof Chart === 'undefined') {
    console.log('📦 Chargement de Chart.js...');
    const s = document.createElement('script');
    s.src = 'https://aromecafeine.github.io/calculateur-maturite-tracking/chart.js';
    s.onload = init;
    s.onerror = () => {
      console.error('❌ Erreur de chargement de Chart.js');
      init(); // Continuer sans graphique
    };
    document.head.appendChild(s);
  } else {
    console.log('✅ Chart.js déjà chargé');
    init();
  }

  function init() {
    console.log('🎨 Injection du CSS et HTML');

    // ▷ Injecter le CSS complet
    const css = `
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

body {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

#tc-calculator {
  font-family: 'Poppins', sans-serif;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 0;
  max-width: 800px;
  width: 100%;
  box-shadow: 0 32px 64px rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin: 20px;
  color: #333;
  text-align: left;
  overflow: hidden;
}

.tc-hero-section {
  background: linear-gradient(135deg, #004aad 0%, #0066ff 100%);
  color: white;
  padding: 60px 40px 40px;
  text-align: center;
  position: relative;
}

.tc-hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
}

.tc-hero-content {
  position: relative;
  z-index: 1;
}

.tc-step-indicator {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 30px;
}

.tc-step {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
}

.tc-step.active {
  background: white;
  color: #004aad;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
}

.tc-step.completed {
  background: #28a745;
  color: white;
}

/* Nouvelle classe pour l'étape finale (étape 3 complétée) */
.tc-step.final-completed {
  background: #28a745;
  color: white;
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.4);
}

.tc-main-content {
  padding: 40px;
}

#tc-calculator * {
  box-sizing: border-box;
}

.tc-header {
  margin-bottom: 0;
}

.tc-header h1 {
  color: white;
  font-size: 2.8em;
  font-weight: 700;
  margin: 0 0 15px 0;
  text-align: center;
}

.tc-header p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2em;
  margin: 0;
  text-align: center;
  font-weight: 400;
}

.tc-url-step {
  display: block;
  margin-bottom: 30px;
}

.tc-contact-step {
  display: none;
  margin-bottom: 30px;
}

.tc-step-title {
  font-size: 1.4em;
  font-weight: 600;
  color: #004aad;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.tc-url-input-container {
  position: relative;
  margin-bottom: 20px;
}

.tc-url-input-container::before {
  content: '🌐';
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  z-index: 1;
}

.tc-contact-form {
  margin-bottom: 0;
}

.tc-contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.tc-input-group {
  position: relative;
}

.tc-input-group::before {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  z-index: 1;
  color: #004aad;
}

.tc-input-group.name::before {
  content: '👤';
}

.tc-input-group.email::before {
  content: '📧';
}

.tc-url-section {
  display: flex;
  gap: 15px;
}

.tc-input {
  padding: 18px 20px 18px 55px;
  border: 2px solid #e8ecf4;
  border-radius: 16px;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  transition: all 0.3s ease;
  background: #fbfcfd;
  width: 100%;
  box-sizing: border-box;
}

.tc-input:focus {
  outline: none;
  border-color: #004aad;
  background: white;
  box-shadow: 0 0 0 4px rgba(0, 74, 173, 0.08);
  transform: translateY(-2px);
}

.tc-input::placeholder {
  color: #8b95a7;
  font-weight: 400;
}

.tc-url-input {
  padding: 18px 20px 18px 55px;
  border: 2px solid #e8ecf4;
  border-radius: 16px;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  transition: all 0.3s ease;
  background: #fbfcfd;
  width: 100%;
  box-sizing: border-box;
}

.tc-url-input:focus {
  outline: none;
  border-color: #004aad;
  background: white;
  box-shadow: 0 0 0 4px rgba(0, 74, 173, 0.08);
  transform: translateY(-2px);
}

.tc-input-url {
  flex: 1;
}

.tc-button {
  background: linear-gradient(135deg, #004aad 0%, #0066ff 100%);
  color: white;
  border: none;
  padding: 18px 40px;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
  width: 100%;
  box-shadow: 0 8px 24px rgba(0, 74, 173, 0.2);
  white-space: nowrap; /* Empêche le retour à la ligne */
  overflow: hidden; /* Cache le texte qui déborde */
  text-overflow: ellipsis; /* Ajoute ... si le texte est trop long */
}

.tc-button:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(0, 74, 173, 0.3);
  background: linear-gradient(135deg, #0056cc 0%, #0077ff 100%);
}

.tc-button-secondary {
  background: transparent;
  color: #004aad;
  border: 2px solid #004aad;
  padding: 16px 30px;
  margin-right: 15px;
  width: auto;
  box-shadow: none;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  border-radius: 16px;
  cursor:pointer;
  transition: all 0.3s ease;
}

.tc-button-secondary:hover:not(:disabled) {
  background: #004aad;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 74, 173, 0.2);
}

.tc-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.tc-spinner {
  display: none;
  margin: 30px auto;
  text-align: center;
}

.tc-spinner-icon {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #004aad;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 15px;
}

.tc-spinner p {
  color: #666;
  margin: 0;
}

.tc-results {
  display: none;
  margin-top: 30px;
}

.tc-score-display {
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.tc-gauge-container {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto;
}

.tc-gauge-score {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.tc-gauge-score-value {
  font-size: 2em;
  font-weight: 700;
  color: #004aad;
  margin: 0;
}

.tc-gauge-score-max {
  font-size: 0.8em;
  color: #666;
}

.tc-score-info {
  flex: 1;
  min-width: 200px;
}

.tc-score-status {
  font-size: 1.3em;
  font-weight: 600;
  margin-bottom: 10px;
  color: #004aad;
  /* Couleur dynamique appliquée via JavaScript */
}

.tc-score-description {
  color: #666;
  line-height: 1.5;
  margin-bottom: 15px;
}

.tc-recommendations {
  background: #f8f9ff;
  border-left: 4px solid #004aad;
  padding: 15px;
  border-radius: 8px;
}

.tc-recommendations-title {
  font-weight: 600;
  color: #004aad;
  margin-bottom: 8px;
}

.tc-recommendations-content {
  color: #666;
  font-size: 0.9em;
  line-height: 1.4;
}

.tc-issues-section {
  margin-top: 30px;
}

.tc-issues-title {
  font-size: 1.2em;
  font-weight: 600;
  color: #004aad;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.tc-issues {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tc-issue {
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 12px;
  border: 1px solid;
  border-left: 4px solid;
}

/* FIX TOGGLE PADDING - Section corrigée */
.tc-issue-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 15px;
  padding: 5px 0;
}

.tc-issue-info {
  flex: 1;
  min-width: 0;
  padding-right: 10px;
}

.tc-issue-name {
  color: #333;
  font-weight: 500;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  line-height: 1.4;
}

.tc-issue-points {
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85em;
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;
}
/* FIN FIX TOGGLE PADDING */

.tc-issue-expandable {
  cursor: pointer;
  transition: all 0.3s ease;
}

.tc-issue-expandable:hover {
  background-color: rgba(0, 74, 173, 0.05);
}

.tc-issue-details {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #e0e0e0;
  display: none;
  font-size: 0.9em;
  color: #666;
  line-height: 1.5;
}

.tc-issue-details.expanded {
  display: block;
}

.tc-issue-toggle {
  background: #004aad;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75em;
  text-decoration: none;
  margin-left: 10px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
  flex-shrink: 0;
}

.tc-issue-toggle:hover {
  background: #0056cc;
  transform: translateY(-1px);
}

.tc-toggle-arrow {
  font-size: 10px;
  transition: transform 0.3s ease;
}

.tc-toggle-arrow.rotated {
  transform: rotate(180deg);
}

.tc-recommendation-link {
  display: inline-block;
  background: #004aad;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75em;
  text-decoration: none;
  margin-left: 8px;
  cursor: pointer;
}

.tc-recommendation-link:hover {
  background: #0056cc;
}

.tc-error {
  display: none;
  background: #ffe6e6;
  border: 1px solid #ffcccc;
  border-radius: 12px;
  padding: 20px;
  color: #cc0000;
  text-align: center;
  margin-top: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* RESPONSIVE DESIGN - Focus sur mobile */
@media(max-width: 768px) {
  body {
    padding: 10px;
    align-items: flex-start;
    padding-top: 20px;
  }
  
  #tc-calculator {
    margin: 0;
    border-radius: 16px;
    max-width: 100%;
  }

  .tc-button {
    padding: 14px 20px; /* Réduit le padding horizontal pour laisser plus de place au texte */
    font-size: 14px; /* Réduit légèrement la taille de police */
    border-radius: 12px;
    min-width: 0; /* Permet au bouton de se rétrécir si nécessaire */
  }
  
  .tc-button-secondary {
    padding: 12px 20px;
    font-size: 15px;
    border-radius: 12px;
  }
  
  .tc-hero-section {
    padding: 40px 20px 30px;
  }
  
  .tc-header h1 {
    font-size: 2.2em;
    line-height: 1.1;
  }
  
  .tc-header p {
    font-size: 1.1em;
  }
  
  .tc-main-content {
    padding: 30px 20px;
  }
  
  .tc-step-title {
    font-size: 1.2em;
    margin-bottom: 15px;
  }
  
  .tc-contact-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .tc-url-section {
    flex-direction: column;
  }
  
  .tc-score-display {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
  
  .tc-gauge-container {
    width: 140;
    height: 140px;
  }
  
  .tc-gauge-score-value {
    font-size: 1.6em;
  }
  
  .tc-recommendations {
    padding: 12px;
  }
  
  .tc-issues-section {
    margin-top: 25px;
  }
  
  .tc-issue {
    padding: 12px;
    margin-bottom: 10px;
  }
  
  /* Fix pour les toggle sur mobile */
  .tc-issue-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .tc-issue-info {
    padding-right: 0;
    width: 100%;
  }
  
  .tc-issue-name {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .tc-issue-toggle {
    margin-left: 0;
    align-self: flex-start;
  }
  
  .tc-issue-points {
    align-self: flex-end;
    margin-top: -30px;
  }
}

@media(max-width: 480px) {
  .tc-hero-section {
    padding: 30px 15px 25px;
  }
  
  .tc-header h1 {
    font-size: 1.8em;
  }
  
  .tc-header p {
    font-size: 1em;
  }
  
  .tc-main-content {
    padding: 25px 15px;
  }
  
  .tc-step-indicator {
    gap: 8px;
    margin-bottom: 25px;
  }
  
  .tc-step {
    width: 28px;
    height: 28px;
    font-size: 12px;
  }
  
  .tc-input, .tc-url-input {
    padding: 16px 18px 16px 50px;
    font-size: 14px;
  }
  
  .tc-button {
    padding: 12px 15px;
    font-size: 13px;
  }
  
  .tc-button-secondary {
    padding: 10px 18px;
    font-size: 14px;
  }
  
  .tc-score-status {
    font-size: 1.1em;
  }
  
  .tc-gauge-container {
    width: 130px;
    height: 130px;
  }
  
  .tc-gauge-score-value {
    font-size: 1.4em;
  }
  
  .tc-issue-toggle {
    font-size: 0.7em;
    padding: 5px 10px;
  }
  
  .tc-issue-points {
    font-size: 0.8em;
    padding: 5px 10px;
  }
}

/* Très petits écrans */
@media(max-width: 360px) {
  .tc-header h1 {
    font-size: 1.6em;
  }

  .tc-button {
    padding: 12px 12px;
    font-size: 12px; /* Taille minimale pour très petits écrans */
  }
  
  .tc-main-content {
    padding: 20px 12px;
  }
  
  .tc-hero-section {
    padding: 25px 12px 20px;
  }
}
    `;

    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    // ▷ Injecter le HTML DANS LE CONTAINER
    const container = document.getElementById('widget-container');
    if (!container) {
      console.error('❌ widget-container introuvable');
      return;
    }

    container.innerHTML = `
      <div id="tc-calculator">
        <div class="tc-hero-section">
          <div class="tc-hero-content">
            <div class="tc-step-indicator">
              <div class="tc-step active" id="step-1">1</div>
              <div class="tc-step" id="step-2">2</div>
              <div class="tc-step" id="step-3">3</div>
            </div>
            <div class="tc-header">
              <h1>Ton tracking tient-il la route ?</h1>
              <p>Découvre les failles de ton tracking en <strong>moins de 30 secondes</strong>.</p>
            </div>
          </div>
        </div>

        <div class="tc-main-content">
          <!--Étape 1: URL-->
          <div class="tc-url-step" id="url-step">
            <div class="tc-step-title">
              Entrez l'URL de votre site
            </div>
            <div class="tc-url-input-container">
              <input id="tc-url" class="tc-url-input" type="url" placeholder="https://nom-de-domaine.fr/" required>
            </div>
            <button id="tc-url-btn" class="tc-button">
              Continuer →
            </button>
          </div>

          <!--Étape 2: Contact-->
          <div class="tc-contact-step" id="contact-step">
            <div class="tc-step-title">
              Vos informations pour recevoir le rapport
            </div>
            <div class="tc-contact-form">
              <div class="tc-contact-grid">
                <div class="tc-input-group name">
                  <input id="tc-name" class="tc-input" type="text" placeholder="Votre prénom" required>
                </div>
                <div class="tc-input-group email">
                  <input id="tc-email" class="tc-input" type="email" placeholder="Votre email" required>
                </div>
              </div>
              <div style="display: flex; gap: 15px; align-items: center;">
                <button id="tc-back-btn" class="tc-button-secondary">← Retour</button>
                <button id="tc-scan-btn" class="tc-button" style="flex: 1;">
                  <span id="tc-btn-text">🚀 Lancer mon analyse</span>
                </button>
              </div>
            </div>
          </div>

          <!--Spinner-->
          <div id="tc-spinner" class="tc-spinner">
            <div class="tc-spinner-icon"></div>
            <p>Analyse en cours... Veuillez patienter</p>
          </div>

          <!--Résultats-->
          <div id="tc-results" class="tc-results">
            <div class="tc-score-display">
              <div class="tc-gauge-container">
                <canvas id="tc-gauge" width="150" height="150"></canvas>
                <div class="tc-gauge-score">
                  <div id="tc-score" class="tc-gauge-score-value">85</div>
                  <div class="tc-gauge-score-max">/ 100</div>
                </div>
              </div>

              <div class="tc-score-info">
                <div id="tc-score-status" class="tc-score-status">Bon niveau</div>
                <div id="tc-score-description" class="tc-score-description">Votre site présente une configuration tracking correcte.</div>
                <div class="tc-recommendations">
                  <div class="tc-recommendations-title">💡 Recommandations prioritaires</div>
                  <div id="tc-recommendations-content" class="tc-recommendations-content"></div>
                </div>
              </div>
            </div>

            <div class="tc-issues-section">
              <div class="tc-issues-title">
                <span>🔍</span> Analyse détaillée
              </div>
              <ul id="tc-issues" class="tc-issues"></ul>
            </div>
          </div>

          <!--Messages d'erreur-->
          <div id="tc-error" class="tc-error"></div>
        </div>
      </div>
    `;

    console.log('✅ HTML injecté avec succès');
    initializeCalculator();
  }

  function initializeCalculator() {
    console.log('⚙️ Initialisation du calculateur');

    // Variables globales
    gauge = null;
    currentStep = 1;
    elements = {
      spinner: document.getElementById('tc-spinner'),
      button: document.getElementById('tc-scan-btn'),
      buttonText: document.getElementById('tc-btn-text'),
      urlInput: document.getElementById('tc-url'),
      nameInput: document.getElementById('tc-name'),
      emailInput: document.getElementById('tc-email'),
      urlBtn: document.getElementById('tc-url-btn'),
      backBtn: document.getElementById('tc-back-btn'),
      results: document.getElementById('tc-results'),
      score: document.getElementById('tc-score'),
      scoreStatus: document.getElementById('tc-score-status'),
      scoreDescription: document.getElementById('tc-score-description'),
      recommendationsContent: document.getElementById('tc-recommendations-content'),
      issues: document.getElementById('tc-issues'),
      errorMessage: document.getElementById('tc-error'),
      urlStep: document.getElementById('url-step'),
      contactStep: document.getElementById('contact-step'),
      step1: document.getElementById('step-1'),
      step2: document.getElementById('step-2'),
      step3: document.getElementById('step-3')
    };

    // Règles de scoring basées exactement sur votre document
    const rules = [
      {
        name: "Absence de GTM",
        regex: /gtm\.js/i,
        points: -30,
        invert: true,
        category: "critical",
        details: "GTM centralise la gestion de tous vos tags marketing et analytics. Sans GTM, vous perdez en flexibilité et en contrôle sur vos données.",
        recommendation: "Créer et configurer un GTM"
      },
      {
        name: "Google Analytics 4 installé en dur",
        regex: /\/gtag\/js\?id=G-/i,
        points: -15,
        category: "warning",
        details: "GA4 est installé directement dans le code source au lieu d'être géré via GTM.",
        recommendation: "Basculer le suivi de GA4 à travers GTM"
      },
      {
        name: "Universal Analytics toujours présent",
        regex: /analytics\.js|UA-[0-9]+/i,
        points: -5,
        category: "critical",
        details: "Universal Analytics a cessé de fonctionner en juillet 2023. Cet outil est obsolète et plus aucune donnée n'est collectée.",
        recommendation: "Valider la présence de GA4 et retirer Universal Analytics"
      },
      {
        name: "Aucune CMP reconnue mise en place",
        regex: /sdk\.privacy-center\.org|sdk\.didomi\.io|scripts\.didomi\.io|api\.didomi\.io|static\.axept\.io|www\.axept\.io|cookie\.sirdata\.com|cmp\.sirdata\.com|cdn\.sirdata\.com|cdn-cookieyes\.com|cdn-cookieyes\.io|app\.cookieyes\.com|cdn\.iubenda\.com|iubenda\.com\/cmp|consent\.iubenda\.com|app\.usercentrics\.eu|consent\.cookiebot\.com|consentcdn\.cookiebot\.com|choice\.quantcast\.com|cmp\.quantcast\.com|consent\.trustarc\.com|cdn\.trustcommander\.net|cdn\.cookielaw\.org|cdn\.cookielaw\.net|cookie-cdn\.onetrust\.com/i,
        points: -15,
        invert: true,
        category: "critical",
        details: "Le RGPD impose une gestion stricte des cookies. Sans CMP, vous risquez des amendes importantes.",
        recommendation: "Installer une CMP conforme RGPD"
      },
      {
        name: "Intégration de l'outil X en dur non centralisé dans GTM", // Sera remplacé dynamiquement
        regex: /(snap\.licdn\.com|px\.ads\.linkedin\.com|analytics\.tiktok\.com|business\.tiktok\.com|s\.pinimg\.com|ct\.pinterest\.com|static\.ads-twitter\.com|analytics\.twitter\.com|js\.hs-scripts\.com|js\.hs-analytics\.com|static\.hotjar\.com|script\.hotjar\.com|vars\.hotjar\.com|www\.clarity\.ms|bat\.bing\.com|cdn\.callrail\.com|t\.calltrk\.com|cdn\.nimbata\.com|track\.nimbata\.com|sp\.analytics\.spotify\.com|spclient\.wg\.spotify\.com|cdn\.segment\.com|script\.crazyegg\.com|munchkin\.marketo\.net|pi\.pardot\.com)/,
        points: -25,
        category: "warning",
        details: "Des pixels tiers sont intégrés en dur rendant difficile leur gestion et conformité.",
        recommendation: "Centraliser ces suivis via GTM",
        // Mapping des domaines vers les noms d'outils
        toolMapping: {
          'snap.licdn.com': 'LinkedIn',
          'px.ads.linkedin.com': 'LinkedIn',
          'analytics.tiktok.com': 'TikTok',
          'business.tiktok.com': 'TikTok',
          's.pinimg.com': 'Pinterest',
          'ct.pinterest.com': 'Pinterest',
          'static.ads-twitter.com': 'Twitter',
          'analytics.twitter.com': 'Twitter',
          'js.hs-scripts.com': 'HubSpot',
          'js.hs-analytics.com': 'HubSpot',
          'static.hotjar.com': 'Hotjar',
          'script.hotjar.com': 'Hotjar',
          'vars.hotjar.com': 'Hotjar',
          'www.clarity.ms': 'Microsoft Clarity',
          'bat.bing.com': 'Microsoft Advertising',
          'cdn.callrail.com': 'CallRail',
          't.calltrk.com': 'CallTrackingMetrics',
          'cdn.nimbata.com': 'Nimbata',
          'track.nimbata.com': 'Nimbata',
          'sp.analytics.spotify.com': 'Spotify',
          'spclient.wg.spotify.com': 'Spotify',
          'cdn.segment.com': 'Segment',
          'script.crazyegg.com': 'Crazy Egg',
          'munchkin.marketo.net': 'Marketo',
          'pi.pardot.com': 'Pardot'
        }
      },
      {
        name: "Absence d'implémentation Server-Side",
        regex: /(analytics|sst|tracking)\.[a-zA-Z0-9.-]+/i,
        points: -10,
        invert: true,
        category: "warning",
        details: "Le tracking Client-Side est limité par les bloqueurs de pub et les restrictions navigateurs.",
        recommendation: "Implémenter un tracking Server-Side"
      },
      {
        name: "Server-Side Addingwell implémenté",
        regex: /\.js\?aw='\+i\.replace\(\/\^GTM-\/, ''\)/i,
        points: +5,
        category: "positive",
        details: "Addingwell offre une solution Server-Side premium pour optimiser la collecte de données."
      }
    ];

    // Event listeners
    elements.urlBtn.addEventListener('click', handleUrlStep);
    elements.button.addEventListener('click', handleAnalysis);
    elements.backBtn.addEventListener('click', goBackToUrlStep);

    elements.urlInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') elements.urlBtn.click();
    });

    elements.nameInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') elements.emailInput.focus();
    });

    elements.emailInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') elements.button.click();
    });

    // Fonction pour basculer les détails
    window.toggleDetails = function (detailsId) {
      const details = document.getElementById(detailsId);
      const isExpanded = details.classList.contains('expanded');


      if (isExpanded) {
        details.classList.remove('expanded');
        details.previousElementSibling.querySelector('.tc-toggle-text').textContent = 'détails';
      } else {
        details.classList.add('expanded');
        details.previousElementSibling.querySelector('.tc-toggle-text').textContent = 'masquer';
      }

    };

    /** Gérer la transition vers l'étape contact */
    function handleUrlStep() {
      const url = elements.urlInput.value.trim();
      if (!url) {
        elements.errorMessage.textContent = 'Veuillez entrer une URL valide.';
        elements.errorMessage.style.display = 'block';
        return;
      }
      elements.errorMessage.style.display = 'none';
      elements.urlStep.style.display = 'none';
      elements.contactStep.style.display = 'block';
      elements.step1.classList.remove('active');
      elements.step1.classList.add('completed');
      elements.step2.classList.add('active');
      currentStep = 2;
      console.log('➡️ Passage à l’étape 2 : saisie contact');
    }

    /** Revenir à l’étape URL */
    function goBackToUrlStep() {
      elements.contactStep.style.display = 'none';
      elements.urlStep.style.display = 'block';
      elements.step2.classList.remove('active');
      elements.step1.classList.add('active');
      currentStep = 1;
      console.log('⬅️ Retour à l’étape 1 : URL');
    }

    /** Lancer l'analyse */
    async function handleAnalysis() {
      const url = elements.urlInput.value.trim();
      const name = elements.nameInput.value.trim();
      const email = elements.emailInput.value.trim();

      if (!name || !email) {
        elements.errorMessage.textContent = 'Veuillez remplir tous les champs.';
        elements.errorMessage.style.display = 'block';
        return;
      }

      elements.errorMessage.style.display = 'none';
      elements.contactStep.style.display = 'none';
      elements.spinner.style.display = 'block';
      elements.step2.classList.remove('active');
      elements.step2.classList.add('completed');
      elements.step3.classList.add('active');
      currentStep = 3;
      console.log('🔎 Début de l’analyse pour :', url);

      // Simuler le fetch du HTML de la page à auditer
      let html = '';
      try {
        const res = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`);
        html = await res.text();
      } catch (e) {
        console.error('❌ Erreur de récupération du HTML :', e);
        elements.errorMessage.textContent = 'Impossible d’analyser ce site.';
        elements.errorMessage.style.display = 'block';
        elements.spinner.style.display = 'none';
        return;
      }

      processAnalysis(html);
    }

    /** Processer l'analyse */
    function processAnalysis(html) {
      let score = 100;
      const allIssues = [];

      rules.forEach((rule, index) => {
        const matched = rule.regex.test(html);
        const isIssue = rule.invert ? !matched : matched;

        if (isIssue) {
          score += rule.points;

          // Traitement spécial pour la règle des outils intégrés
          if (rule.name === "Intégration de l'outil X en dur non centralisé dans GTM" && rule.toolMapping) {
            const detectedTools = [];

            // Extraire tous les domaines détectés
            Object.keys(rule.toolMapping).forEach(domain => {
              if (html.includes(domain)) {
                const toolName = rule.toolMapping[domain];
                if (!detectedTools.includes(toolName)) {
                  detectedTools.push(toolName);
                }
              }
            });

            // Générer le nom dynamique
            let dynamicName;
            if (detectedTools.length === 1) {
              dynamicName = `Intégration de l'outil ${detectedTools[0]} en dur et non centralisé dans GTM`;
            } else if (detectedTools.length > 1) {
              const lastTool = detectedTools.pop();
              dynamicName = `Intégrations des outils ${detectedTools.join(', ')} et ${lastTool} en dur et non centralisé dans GTM`;
            } else {
              dynamicName = rule.name; // Fallback
            }

            // Créer une copie de la règle avec le nom dynamique
            const dynamicRule = { ...rule, name: dynamicName };
            allIssues.push(dynamicRule);
          } else {
            allIssues.push(rule);
          }

          console.log(`⚠️ Règle déclenchée : ${rule.name}`);
        } else {
          console.log(`✅ Conforme : ${rule.name}`);
        }
      });

      // Clamp score entre 0 et 100
      score = Math.max(0, Math.min(100, score));

      elements.spinner.style.display = 'none';
      elements.results.style.display = 'block';
      displayGauge(score);
      displayScoreDetails(score, allIssues);
      displayIssues(allIssues);

      console.log('🎯 Score final :', score);
      console.log('📊 Nombre d\'issues :', allIssues.length);
    }


    /** Affichage du gauge Chart */
    function displayGauge(score) {
      // Si Chart.js n'est pas encore chargé, attendre et réessayer
      if (typeof Chart === 'undefined') {
        if (!window.chartRetryCount) window.chartRetryCount = 0;
        if (window.chartRetryCount < 20) {
          window.chartRetryCount++;
          setTimeout(() => displayGauge(score), 200);
        } else {
          console.error('❌ Chart.js introuvable après 20 tentatives.');
        }
        return;
      }

      // Détruire le graphique existant s'il y en a un
      if (gauge) {
        gauge.destroy();
      }

      // Mettre à jour le score affiché
      elements.score.textContent = score;
      elements.step3.classList.remove('active');
      elements.step3.classList.add('final-completed');

      // Définir la couleur et le statut en fonction du score
      let color;
      let status;
      if (score >= 80) {
        color = '#28a745'; // Vert
        status = 'Excellent niveau';
      } else if (score >= 60) {
        color = '#fd7e14'; // Orange
        status = 'Bon niveau';
      } else {
        color = '#dc3545'; // Rouge
        status = 'Niveau critique';
      }

      // Appliquer la couleur dynamique au titre du statut
      elements.scoreStatus.textContent = status;
      elements.scoreStatus.style.color = color;

      // Mettre à jour la couleur du score affiché
      elements.score.style.color = color;

      // Configuration du graphique en donut circulaire complet
      const ctx = document.getElementById('tc-gauge').getContext('2d');
      gauge = new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [score, 100 - score],
            backgroundColor: [color, '#e9ecef'],
            borderWidth: 2,
            borderColor: '#ffffff',
            cutout: '70%'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: false
            }
          },
          animation: {
            animateRotate: true,
            duration: 1500
          }
        }
      });
    }

    /** Affiche la description globale et les recommandations */
    function displayScoreDetails(score, issues) {
      elements.scoreDescription.textContent =
        issues.length === 0
          ? "Configuration optimale détectée."
          : "Des points d'amélioration sont détectés. Consultez les recommandations ci-dessous.";

      elements.recommendationsContent.innerHTML = issues
        .filter(i => i.recommendation) // Filtre seulement les issues avec recommandation
        .map(i => `• ${i.recommendation}`)
        .join('<br>');
    }

    /** Affiche les issues avec détails repliables */
    function displayIssues(issues) {
      elements.issues.innerHTML = '';
      if (issues.length === 0) {
        elements.issues.innerHTML = `<li class="tc-issue" style="border-color:#28a745; border-left-color:#28a745; background:#f0f8f0;">
            <div class="tc-issue-content">
              <span class="tc-issue-name">✅ Aucune anomalie détectée</span>
              <span class="tc-issue-points" style="background:#28a745;">Parfait</span>
            </div>
          </li>`;
        return;
      }

      issues.forEach((issue, idx) => {
        const li = document.createElement('li');
        li.className = 'tc-issue tc-issue-expandable';
        li.style.borderColor = issue.category === 'critical' ? '#dc3545' :
          issue.category === 'warning' ? '#fd7e14' :
            '#28a745';
        li.style.borderLeftColor = li.style.borderColor;
        li.style.background = '#fff';

        const detailsId = `tc-issue-details-${idx}`;
        li.innerHTML = `
            <div class="tc-issue-content">
              <div class="tc-issue-info">
                <div class="tc-issue-name">
                  ${issue.name} <span class="tc-issue-toggle" onclick="toggleDetails('${detailsId}')"><span class='tc-toggle-text'>détails</span><span class='tc-toggle-arrow'>▼</span></span>
                </div>
              </div>
              <span class="tc-issue-points" style="background:${li.style.borderColor};">
                ${issue.points} pts
              </span>
            </div>
            <div id="${detailsId}" class="tc-issue-details">${issue.details}</div>
          `;

        elements.issues.appendChild(li);
      });
    }

  }
})();
