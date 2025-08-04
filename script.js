(function(){
  console.log('🚀 Calculateur Tracking - Initialisation du script');
  
  const BASE = 'https://aromecafeine.github.io/calculateur-maturite-tracking/';

  // Chargement de Chart.js si pas déjà chargé
  if (typeof Chart === 'undefined') {
    console.log('📦 Chargement de Chart.js...');
    const s = document.createElement('script');
    s.src = BASE + 'chart.js';
    s.onload = init;
    s.onerror = () => {
      console.error('❌ Erreur de chargement de Chart.js');
      // Fallback vers CDN public
      const fallback = document.createElement('script');
      fallback.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.min.js';
      fallback.onload = init;
      document.head.appendChild(fallback);
    };
    document.head.appendChild(s);
  } else {
    console.log('✅ Chart.js déjà chargé');
    init();
  }

  function init(){
    console.log('🎨 Injection du CSS et HTML');
    
    // ▷ Injecter le CSS complet avec système de couleurs #004aad
    const css = `
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
      
      body {
        margin: 0;
        padding: 0;
        font-family: 'Poppins', sans-serif;
        background: linear-gradient(135deg, #004aad 0%, #0066ff 100%);
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      #tc-calculator {
        font-family: 'Poppins', sans-serif;
        background: rgba(255,255,255,0.98);
        backdrop-filter: blur(20px);
        border-radius: 24px;
        padding: 0;
        max-width: 800px;
        width: 100%;
        box-shadow: 0 32px 64px rgba(0,0,0,0.12);
        border: 1px solid rgba(255,255,255,0.3);
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
        background: rgba(255,255,255,0.2);
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
        box-shadow: 0 4px 12px rgba(255,255,255,0.3);
      }
      
      .tc-step.completed {
        background: #66aaff;
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
        text-shadow: 0 2px 4px rgba(0,0,0,0.2);
      }
      
      .tc-header p {
        color: rgba(255,255,255,0.9);
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
        box-shadow: 0 0 0 4px rgba(0,74,173,0.08);
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
        box-shadow: 0 0 0 4px rgba(0,74,173,0.08);
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
        box-shadow: 0 8px 24px rgba(0,74,173,0.2);
      }
      
      .tc-button:hover:not(:disabled) {
        transform: translateY(-3px);
        box-shadow: 0 12px 32px rgba(0,74,173,0.3);
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
      }
      
      .tc-button-secondary:hover:not(:disabled) {
        background: #004aad;
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0,74,173,0.2);
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
        background: #f0f5ff;
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
        background-color: rgba(0,74,173,0.05);
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
        font-weight: 500;
        cursor: pointer;
        text-decoration: underline;
      }
      
      .tc-recommendation-link {
        display: inline-block;
        background: #004aad;
        color: white;
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 0.75em;
        text-decoration: none;
        cursor: pointer;
      }
      
      .tc-recommendation-link:hover {
        background: #0056cc;
      }
      
      .tc-error {
        display: none;
        background: #ffebee;
        border: 1px solid #ffcdd2;
        border-radius: 12px;
        padding: 20px;
        color: #c62828;
        text-align: center;
        margin-top: 20px;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      @media (max-width: 768px) {
        #tc-calculator {
          padding: 20px;
          margin: 10px;
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
              <h1>Audit Tracking Gratuit</h1>
              <p>Découvrez les failles de votre tracking en 60 secondes</p>
            </div>
          </div>
        </div>

        <div class="tc-main-content">
          <!-- Étape 1: URL -->
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

          <!-- Étape 2: Contact -->
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

          <!-- Spinner -->
          <div id="tc-spinner" class="tc-spinner">
            <div class="tc-spinner-icon"></div>
            <p>Analyse en cours... Veuillez patienter</p>
          </div>

          <!-- Résultats -->
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

          <!-- Messages d'erreur -->
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
    let gauge = null;
    let currentStep = 1;
    const elements = {
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

    // Règles de scoring avec système de couleurs #004aad
    const rules = [
      { 
        name: "GTM absent", 
        regex: /gtm\.js/i, 
        points: -20, 
        invert: true,
        category: "critical",
        description: "Google Tag Manager n'est pas installé",
        details: "GTM centralise la gestion de tous vos tags marketing et analytics. Sans GTM, vous perdez en flexibilité et en contrôle sur vos données.",
        recommendation: "Installer GTM immédiatement",
        solution: "Créez un compte GTM, récupérez votre code conteneur et intégrez-le dans votre site."
      },
      { 
        name: "GA4 en dur", 
        regex: /gtag\/js\?id=G-/i, 
        points: -10,
        category: "warning",
        description: "Google Analytics 4 installé directement (pas via GTM)",
        details: "GA4 est installé directement dans le code source au lieu d'être géré via GTM. Cela réduit votre flexibilité.",
        recommendation: "Migrer GA4 vers GTM",
        solution: "Supprimez le code GA4 direct et configurez-le comme tag dans GTM."
      },
      { 
        name: "Universal Analytics obsolète", 
        regex: /analytics\.js|UA-\d+/i, 
        points: -15,
        category: "critical",
        description: "Ancienne version d'Analytics détectée",
        details: "Universal Analytics a cessé de fonctionner en juillet 2023. Vos données ne sont plus collectées.",
        recommendation: "Migrer vers GA4 urgence absolue",
        solution: "Créez une propriété GA4 et remplacez complètement le code UA."
      },
      { 
        name: "CMP manquant", 
        regex: /axeptio|tarteaucitron|cookiebot|onetrust|didomi|iubenda|consent/i, 
        points: -15, 
        invert: true,
        category: "critical",
        description: "Aucune solution de gestion des cookies détectée",
        details: "Le RGPD impose une gestion stricte des cookies. Sans CMP, vous risquez des amendes importantes.",
        recommendation: "Installer un CMP conforme RGPD",
        solution: "Implémentez Axeptio, Cookiebot ou une solution similaire pour gérer les consentements."
      },
      { 
        name: "Cookies marketing non conformes", 
        regex: /_ga|_gid|_fbp|gcl_|hubspotutk/i, 
        points: -10,
        category: "warning",
        description: "Cookies marketing détectés sans consentement apparent",
        details: "Des cookies de tracking sont présents mais aucun système de consentement n'est visible.",
        recommendation: "Conditionner les cookies au consentement",
        solution: "Utilisez GTM avec des triggers de consentement pour ne charger les cookies qu'après accord."
      },
      { 
        name: "Tracking tiers en dur", 
        regex: /facebook\.net|tiktok\.com|linkedin\.com|hotjar\.com/i, 
        points: -8,
        category: "warning",
        description: "Scripts de tracking externes chargés directement",
        details: "Les pixels de réseaux sociaux sont chargés directement, rendant difficile leur gestion et conformité.",
        recommendation: "Centraliser via GTM",
        solution: "Déplacez tous les pixels (Facebook, LinkedIn, etc.) dans GTM pour une meilleure gestion."
      },
      { 
        name: "Server-side manquant", 
        regex: /server-side|sst\.|tracking\.|gtm-msr/i, 
        points: -12, 
        invert: true,
        category: "warning",
        description: "Pas de tracking server-side détecté",
        details: "Le tracking client-side est limité par les bloqueurs de pub et les restrictions navigateurs.",
        recommendation: "Implémenter le server-side tracking",
        solution: "Configurez GTM Server-side ou une solution comme Stape.io pour améliorer la qualité des données."
      },
      { 
        name: "Solution avancée détectée", 
        regex: /addingwell|stape\.io|gtm-server/i, 
        points: +15,
        category: "positive",
        description: "Solution de tracking avancé détectée",
        details: "Excellente pratique ! Vous utilisez des solutions avancées pour optimiser votre tracking.",
        recommendation: "Continuer sur cette voie",
        solution: "Maintenez et optimisez votre configuration actuelle."
      }
    ];

    // Event listeners
    elements.urlBtn.addEventListener('click', handleUrlStep);
    elements.button.addEventListener('click', handleAnalysis);
    elements.backBtn.addEventListener('click', goBackToUrlStep);
    
    elements.urlInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') elements.urlBtn.click();
    });
    
    elements.nameInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') elements.emailInput.focus();
    });
    
    elements.emailInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') elements.button.click();
    });

    // Fonction globale pour les détails
    window.toggleDetails = function(detailsId) {
      const details = document.getElementById(detailsId);
      if (details) {
        details.classList.toggle('expanded');
      }
    };

    window.scrollToRecommendations = function() {
      const recommendations = document.querySelector('.tc-recommendations');
      if (recommendations) {
        recommendations.scrollIntoView({ behavior: 'smooth' });
      }
    };

    // Navigation entre étapes
    function handleUrlStep() {
      const url = elements.urlInput.value.trim();
      
      if (!url) {
        showError('Veuillez saisir une URL valide');
        return;
      }
      
      // Auto-ajout de https://
      if (!url.startsWith('http')) {
        elements.urlInput.value = 'https://' + url;
      }
      
      // Validation URL
      try {
        new URL(elements.urlInput.value);
      } catch {
        showError('Format d\'URL invalide. Exemple: https://monsite.com');
        return;
      }
      
      console.log('✅ URL validée:', elements.urlInput.value);
      goToContactStep();
    }
    
    function goToContactStep() {
      currentStep = 2;
      elements.urlStep.style.display = 'none';
      elements.contactStep.style.display = 'block';
      
      // Mise à jour des indicateurs
      elements.step1.classList.remove('active');
      elements.step1.classList.add('completed');
      elements.step1.innerHTML = '✓';
      elements.step2.classList.add('active');
      
      console.log('📝 Passage à l\'étape contact');
      hideError();
    }
    
    function goBackToUrlStep() {
      currentStep = 1;
      elements.contactStep.style.display = 'none';
      elements.urlStep.style.display = 'block';
      
      // Mise à jour des indicateurs
      elements.step1.classList.add('active');
      elements.step1.classList.remove('completed');
      elements.step1.innerHTML = '1';
      elements.step2.classList.remove('active');
      
      hideError
