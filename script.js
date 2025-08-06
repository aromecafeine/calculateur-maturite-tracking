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
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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
      
      .tc-issue-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .tc-issue-info {
        flex: 1;
      }
      
      .tc-issue-name {
        color: #333;
        font-weight: 500;
        margin-bottom: 4px;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      
      .tc-issue-description {
        color: #666;
        font-size: 0.9em;
      }
      
      .tc-issue-points {
        color: white;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 0.85em;
        font-weight: 600;
      }
      
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
        color: #004aad;
        font-size: 0.8em;
        margin-left: 10px;
        font-weight: 500;
        cursor: pointer;
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

      @media(max-width: 768px) {
        #tc-calculator {
          margin: 10px;
        }
        
        .tc-main-content {
          padding: 20px;
        }
        
        .tc-contact-grid {
          grid-template-columns: 1fr;
        }
        
        .tc-url-section {
          flex-direction: column;
        }
        
        .tc-score-display {
          flex-direction: column;
          text-align: center;
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
              <p>Découvrez les failles de votre tracking en 60 secondes</p>
            </div>
          </div>
        </div>

        <div class="tc-main-content">
          <!--Étape 1: URL-->
          <div class="tc-url-step" id="url-step">
            <div class="tc-step-title">
              <span>🌐</span> Entrez l'URL de votre site
            </div>
            <div class="tc-url-input-container">
              <input id="tc-url" class="tc-url-input" type="url" placeholder="https://votre-site.com" required>
            </div>
            <button id="tc-url-btn" class="tc-button">
              Continuer →
            </button>
          </div>

          <!--Étape 2: Contact-->
          <div class="tc-contact-step" id="contact-step">
            <div class="tc-step-title">
              <span>👤</span> Vos informations pour recevoir le rapport
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
        name: "Absence de Google Tag Manager",
        regex: /gtm\.js/i,
        points: -20,
        invert: true,
        category: "critical",
        description: "Aucune gouvernance des balises → site non industrialisé",
        details: "GTM centralise la gestion de tous vos tags marketing et analytics. Sans GTM, vous perdez en flexibilité et en contrôle sur vos données.",
        recommendation: "Installer GTM immédiatement"
      },
      {
        name: "GA4 intégré en dur (gtag.js)",
        regex: /\/gtag\/js\?id=G-/i,
        points: -10,
        category: "warning",
        description: "Balise injectée sans GTM = tracking rigide, peu maintenable",
        details: "GA4 est installé directement dans le code source au lieu d'être géré via GTM. Cela réduit votre flexibilité.",
        recommendation: "Migrer GA4 vers GTM"
      },
      {
        name: "Universal Analytics toujours actif",
        regex: /analytics\.js|UA-[0-9]+/i,
        points: -15,
        category: "critical",
        description: "analytics.js ou UA-XXXXX toujours présent = technologie obsolète",
        details: "Universal Analytics a cessé de fonctionner en juillet 2023. Vos données ne sont plus collectées.",
        recommendation: "Migrer vers GA4 - urgence absolue"
      },
      {
        name: "Absence de bandeau ou CMP détectable",
        regex: /sdk\.privacy-center\.org|sdk\.didomi\.io|scripts\.didomi\.io|api\.didomi\.io|static\.axept\.io|www\.axept\.io|cookie\.sirdata\.com|cmp\.sirdata\.com|cdn\.sirdata\.com|cdn-cookieyes\.com|cdn-cookieyes\.io|app\.cookieyes\.com|cdn\.iubenda\.com|iubenda\.com\/cmp|consent\.iubenda\.com|app\.usercentrics\.eu|consent\.cookiebot\.com|consentcdn\.cookiebot\.com|choice\.quantcast\.com|cmp\.quantcast\.com|consent\.trustarc\.com|cdn\.trustcommander\.net|cdn\.cookielaw\.org|cdn\.cookielaw\.net|cookie-cdn\.onetrust\.com|cmp\.[a-z0-9.-]+|consent\.[a-z0-9.-]+/i,
        points: -10,
        invert: true,
        category: "critical",
        description: "Pas de axeptio, tarteaucitron, cookiebot... détecté dans le code HTML",
        details: "Le RGPD impose une gestion stricte des cookies. Sans CMP, vous risquez des amendes importantes.",
        recommendation: "Installer un CMP conforme RGPD"
      },
      {
        name: "Dépôt de cookies marketing sans consentement",
        regex: /(?:^|;\s*)(?:_ga\w*|_gid|_gat|gclau|gclaw|gcldc|_fbp|fr|li_fat_id|UserMatchHistory|_ttp|_pinterest_sess|_pin_unauth|personalization_id|guest_id|hubspotutk|hjSessionUser\w+|_hjIncludedInPageviewSample|_uetvid|_uetsid|_calltrk|calltrk_landing|nimbata|sp_id|sp_ses|prism\w+|mkto_trk|visitor_id\d+|ceg\w+|mf\w+|optimizely\w*|ajs\w+)=/i,
        points: -20,
        category: "critical",
        description: "Cookies déposés malgré l'absence d'interaction avec une CMP",
        details: "Des cookies de tracking sont présents mais aucun système de consentement n'est visible.",
        recommendation: "Conditionner les cookies au consentement"
      },
      {
        name: "Outils de suivis intégrés en dur",
        regex: /graph\.facebook\.com|snap\.licdn\.com\/li\.lms-analytics\/insight\.min\.js|px\.ads\.linkedin\.com\/collect|analytics\.tiktok\.com\/i18n\/pixel\/events\.js|business\.tiktok\.com|s\.pinimg\.com\/ct\/lib\/main\.[^/]+\.js|ct\.pinterest\.com\/v3\/|static\.ads-twitter\.com\/uwt\.js|analytics\.twitter\.com\/i\/adsct|js\.hs-scripts\.com|js\.hs-analytics\.com|hs-analytics\.net|hscollectedforms\.net|static\.hotjar\.com\/c\/hotjar-[^/]+\.js|script\.hotjar\.com\/modules\.[^/]+\.js|vars\.hotjar\.com|www\.clarity\.ms\/tag\/|bat\.bing\.com\/bat\.js|cdn\.callrail\.com|t\.calltrk\.com|cdn\.nimbata\.com|track\.nimbata\.com|sp\.analytics\.spotify\.com|spclient\.wg\.spotify\.com|cdn\.segment\.com|script\.crazyegg\.com|cdn\.mouseflow\.com|cdn\.optimizely\.com|munchkin\.marketo\.net|pi\.pardot\.com/i,
        points: -10,
        category: "warning",
        description: "Tracking Facebook hors GTM = difficile à maintenir, non conforme",
        details: "Les pixels de réseaux sociaux sont chargés directement, rendant difficile leur gestion et conformité.",
        recommendation: "Centraliser via GTM"
      },
      {
        name: "Server-side tracking non détecté",
        regex: /https:\/\/(analytics|sst|tracking)\./i,
        points: -10,
        invert: true,
        category: "warning",
        description: "Pas de server-side détecté (sous-domaine analytics., sst., tracking.)",
        details: "Le tracking client-side est limité par les bloqueurs de pub et les restrictions navigateurs.",
        recommendation: "Implémenter le server-side tracking"
      },
      {
        name: "Solution Addingwell détectée",
        regex: /awl=/i,
        points: +10,
        category: "positive",
        description: "Excellente pratique ! Solution de tracking avancé détectée",
        details: "Addingwell offre une solution server-side premium pour optimiser la collecte de données.",
        recommendation: "Continuer sur cette voie"
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
        details.previousElementSibling.querySelector('.tc-toggle-text').textContent = 'voir détails';
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
          allIssues.push(rule);
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
      console.log('📊 Nombre d’issues :', allIssues.length);
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

      // Déterminer la couleur en fonction du score
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

      elements.scoreStatus.textContent = status;

      // Configuration du graphique en donut pour simuler une gauge
      const ctx = document.getElementById('tc-gauge').getContext('2d');
      gauge = new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [score, 100 - score],
            backgroundColor: [color, '#e9ecef'],
            borderWidth: 0,
            cutout: '70%'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          rotation: -90, // Commence en haut
          circumference: 180, // Demi-cercle
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: false
            }
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
                  ${issue.name} <span class="tc-issue-toggle" onclick="toggleDetails('${detailsId}')"><span class='tc-toggle-text'>voir détails</span></span>
                </div>
                <div class="tc-issue-description">${issue.description}</div>
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
