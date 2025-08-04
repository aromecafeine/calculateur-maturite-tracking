function createGauge(score) {
      if (gauge) gauge.destroy();

      const ctx = document.getElementById('tc-gauge').getContext('2d');
      
      // Couleur basée sur le score - nouveau système
      let gaugeColor;
      if (score >= 75) {
        gaugeColor = '#28a745'; // Vert
      } else if (score >= 50) {
        gaugeColor = '#fd7e14'; // Orange
      } else {
        gaugeColor = '#dc3545'; // Rouge
      }

      gauge = new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [score, 100 - score],
            backgroundColor: [gaugeColor, '#e0e0e0'],
            borderWidth: 0,
            cut;(function(){
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
    
    // ▷ Injecter le CSS complet
    const css = `
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
      
      #tc-calculator {
        font-family: 'Poppins', sans-serif;
        background: rgba(255,255,255,0.95);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        padding: 40px;
        max-width: 700px;
        width: 100%;
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        border: 1px solid rgba(255,255,255,0.2);
        margin: 20px auto;
        color: #333;
        text-align: left;
      }
      
      #tc-calculator * {
        box-sizing: border-box;
      }
      
      .tc-header {
        text-align: center;
        margin-bottom: 30px;
      }
      
      .tc-header h1 {
        color: #004aad;
        font-size: 2.2em;
        font-weight: 700;
        margin: 0 0 10px 0;
        text-align: center;
      }
      
      .tc-header p {
        color: #666;
        font-size: 1em;
        margin: 0;
        text-align: center;
      }
      
      .tc-contact-form {
        margin-bottom: 30px;
      }
      
      .tc-contact-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
        margin-bottom: 15px;
      }
      
      .tc-url-section {
        display: flex;
        gap: 15px;
      }
      
      .tc-input {
        padding: 15px 20px;
        border: 2px solid #e0e0e0;
        border-radius: 12px;
        font-size: 16px;
        font-family: 'Poppins', sans-serif;
        transition: all 0.3s ease;
        background: #f8f9fa;
        width: 100%;
      }
      
      .tc-input:focus {
        outline: none;
        border-color: #004aad;
        background: white;
        box-shadow: 0 0 0 3px rgba(0,74,173,0.1);
      }
      
      .tc-input-url {
        flex: 1;
      }
      
      .tc-button {
        background: linear-gradient(135deg, #004aad 0%, #0056cc 100%);
        color: white;
        border: none;
        padding: 15px 30px;
        border-radius: 12px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: 'Poppins', sans-serif;
      }
      
      .tc-button:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(0,74,173,0.3);
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
      }
      
      .tc-issue-name {
        color: #333;
        font-weight: 500;
        margin-bottom: 4px;
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
        margin-left: 10px;
        font-weight: 500;
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
        <div class="tc-header">
          <h1>🎯 Audit Tracking</h1>
          <p>Découvrez instantanément les failles de votre tracking web</p>
        </div>

        <div class="tc-contact-form">
          <div class="tc-contact-grid">
            <input id="tc-name" class="tc-input" type="text" placeholder="Votre prénom" required>
            <input id="tc-email" class="tc-input" type="email" placeholder="Votre email" required>
          </div>
          
          <div class="tc-url-section">
            <input id="tc-url" class="tc-input tc-input-url" type="url" placeholder="https://votre-site.com" required>
            <button id="tc-scan-btn" class="tc-button">
              <span id="tc-btn-text">Analyser</span>
            </button>
          </div>
        </div>

        <div id="tc-spinner" class="tc-spinner">
          <div class="tc-spinner-icon"></div>
          <p>Analyse en cours... Veuillez patienter</p>
        </div>

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
                <div class="tc-recommendations-title">💡 Recommandations</div>
                <div id="tc-recommendations-content" class="tc-recommendations-content"></div>
              </div>
            </div>
          </div>

          <div class="tc-issues-section">
            <div class="tc-issues-title">
              <span>📊</span> Analyse détaillée
            </div>
            <ul id="tc-issues" class="tc-issues"></ul>
          </div>
        </div>

        <div id="tc-error" class="tc-error"></div>
      </div>
    `;

    console.log('✅ HTML injecté avec succès');
    initializeCalculator();
  }

  function initializeCalculator() {
    console.log('⚙️ Initialisation du calculateur');
    
    // Variables globales
    let gauge = null;
    const elements = {
      spinner: document.getElementById('tc-spinner'),
      button: document.getElementById('tc-scan-btn'),
      buttonText: document.getElementById('tc-btn-text'),
      urlInput: document.getElementById('tc-url'),
      nameInput: document.getElementById('tc-name'),
      emailInput: document.getElementById('tc-email'),
      results: document.getElementById('tc-results'),
      score: document.getElementById('tc-score'),
      scoreStatus: document.getElementById('tc-score-status'),
      scoreDescription: document.getElementById('tc-score-description'),
      recommendationsContent: document.getElementById('tc-recommendations-content'),
      issues: document.getElementById('tc-issues'),
      errorMessage: document.getElementById('tc-error')
    };

    // Règles de scoring simplifiées et fonctionnelles
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
    elements.button.addEventListener('click', handleAnalysis);
    elements.urlInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') elements.button.click();
    });

    // Auto-ajout de https://
    elements.urlInput.addEventListener('input', function(e) {
      const url = e.target.value;
      if (url && !url.startsWith('http')) {
        e.target.value = 'https://' + url;
      }
    });

    async function handleAnalysis() {
      console.log('🔍 Début de l\'analyse');
      
      // Validation des champs
      const name = elements.nameInput.value.trim();
      const email = elements.emailInput.value.trim();
      const url = elements.urlInput.value.trim();

      if (!name) {
        showError('Veuillez saisir votre prénom');
        return;
      }

      if (!email || !email.includes('@')) {
        showError('Veuillez saisir un email valide');
        return;
      }

      if (!url) {
        showError('Veuillez saisir une URL valide');
        return;
      }

      // Validation URL
      try {
        new URL(url);
      } catch {
        showError('Format d\'URL invalide. Utilisez : https://exemple.com');
        return;
      }

      console.log('✅ Validation réussie:', { name, email, url });

      showLoading(true);
      hideError();

      try {
        console.log('🌐 Récupération du contenu HTML...');
        const response = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent(url));
        const data = await response.json();
        const html = data.contents;
        
        console.log('📄 HTML récupéré, taille:', html.length, 'caractères');

        const analysisResult = analyzeHTML(html, url);
        console.log('📊 Résultat d\'analyse:', analysisResult);
        
        displayResults(analysisResult, name);

      } catch (error) {
        console.error('❌ Erreur lors de l\'analyse:', error);
        showError('Erreur lors de l\'analyse: ' + error.message);
      } finally {
        showLoading(false);
      }
    }

    function analyzeHTML(html, url) {
      console.log('🔬 Analyse du HTML en cours...');
      console.log('📄 Contenu analysé:', { url, htmlLength: html.length });
      
      let score = 100;
      let issues = [];
      let positivePoints = [];
      let detectedElements = {};
      let technicalFindings = {};

      // Application des règles
      rules.forEach(rule => {
        const match = rule.regex.test(html);
        const shouldApply = rule.invert ? !match : match;
        
        console.log(`🔍 Règle "${rule.name}":`, { 
          regex: rule.regex.toString(), 
          match, 
          shouldApply, 
          points: rule.points,
          category: rule.category
        });
        
        if (shouldApply) {
          score += rule.points;
          
          if (rule.points > 0) {
            positivePoints.push(rule);
          } else {
            issues.push(rule);
          }
          
          detectedElements[rule.name] = true;
        }

        // Collecte des éléments techniques détectés
        if (match) {
          const matches = html.match(new RegExp(rule.regex.source, 'gi'));
          technicalFindings[rule.name] = {
            detected: match,
            count: matches ? matches.length : 0,
            samples: matches ? matches.slice(0, 3) : []
          };
        }
      });

      // Détection de doublons avec détails
      const gtmMatches = html.match(/gtm\.js/gi) || [];
      const gaMatches = html.match(/gtag\/js/gi) || [];
      const fbMatches = html.match(/fbevents\.js/gi) || [];
      
      console.log('🔍 Analyse des doublons:', {
        gtmCount: gtmMatches.length,
        gaCount: gaMatches.length,
        fbCount: fbMatches.length,
        gtmSamples: gtmMatches.slice(0, 2),
        gaSamples: gaMatches.slice(0, 2)
      });
      
      if (gtmMatches.length > 1 || gaMatches.length > 1 || fbMatches.length > 1) {
        score -= 5;
        issues.push({
          name: "Scripts dupliqués",
          points: -5,
          category: "warning",
          description: "Plusieurs instances du même script détectées",
          details: `GTM: ${gtmMatches.length} instances, GA: ${gaMatches.length} instances, FB: ${fbMatches.length} instances. Cela peut causer des conflits et des données dupliquées.`,
          recommendation: "Supprimer les doublons",
          solution: "Gardez une seule instance de chaque script, de préférence gérée via GTM."
        });
      }

      // Analyse des cookies présents
      const cookieMatches = html.match(/_ga[^=]*=|_gid[^=]*=|_fbp[^=]*=|gcl_[^=]*=/gi) || [];
      console.log('🍪 Cookies détectés:', cookieMatches);

      // Score final
      score = Math.max(0, Math.min(100, score));
      console.log('🎯 Score final calculé:', score);
      console.log('📊 Résumé technique:', technicalFindings);

      return {
        score,
        issues: issues.sort((a, b) => a.points - b.points),
        positivePoints: positivePoints.sort((a, b) => b.points - a.points),
        detectedElements,
        technicalFindings,
        url
      };
    }

    function displayResults(data, userName) {
      console.log('📱 Affichage des résultats');
      console.log('🔍 Données complètes de l\'analyse:', data);
      const { score, issues, positivePoints, technicalFindings } = data;

      // Mise à jour du score
      elements.score.textContent = score;
      updateScoreStatus(score, userName);

      // Création du gauge
      createGauge(score);

      // Affichage des issues et points positifs
      displayIssues([...positivePoints, ...issues], technicalFindings);

      // Recommandations liées
      updateRecommendations(score, issues, positivePoints);

      // Montrer les résultats
      elements.results.style.display = 'block';
      
      console.log('✅ Résultats affichés avec succès');
      console.log('📈 Analyse terminée - Score:', score, 'Issues:', issues.length, 'Points positifs:', positivePoints.length);
    }

    function updateScoreStatus(score, userName) {
      let status, description, color;

      if (score >= 75) {
        status = "🏆 Excellent";
        description = `Félicitations ${userName} ! Votre configuration tracking est optimale.`;
        color = "#28a745";
      } else if (score >= 50) {
        status = "⚠️ À améliorer";
        description = `${userName}, votre configuration nécessite des améliorations importantes.`;
        color = "#fd7e14";
      } else {
        status = "🚨 Critique";
        description = `${userName}, une refonte complète de votre tracking est nécessaire.`;
        color = "#dc3545";
      }

      elements.scoreStatus.textContent = status;
      elements.scoreStatus.style.color = color;
      elements.scoreDescription.textContent = description;
      
      console.log('📊 Statut du score mis à jour:', { score, status, color });
    }

    function createGauge(score) {
      if (gauge) gauge.destroy();

      const ctx = document.getElementById('tc-gauge').getContext('2d');
      
      // Couleur basée sur le score
      let gaugeColor;
      if (score >= 85) gaugeColor = '#2ed573';
      else if (score >= 70) gaugeColor = '#d99152';
      else if (score >= 50) gaugeColor = '#ff6b35';
      else gaugeColor = '#ff4757';

      gauge = new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [score, 100 - score],
            backgroundColor: [gaugeColor, '#e0e0e0'],
            borderWidth: 0,
            cutout: '70%'
          }]
        },
        options: {
          plugins: {
            tooltip: { enabled: false },
            legend: { display: false }
          },
          responsive: true,
          maintainAspectRatio: true
        }
      });
      
      console.log('📊 Gauge créé avec score:', score, 'couleur:', gaugeColor);
    }

    function displayIssues(allIssues) {
      elements.issues.innerHTML = '';

      if (allIssues.length === 0) {
        const li = document.createElement('li');
        li.className = 'tc-issue';
        li.style.background = '#f0f8f0';
        li.style.borderColor = '#d4edda20';
        li.style.borderLeftColor = '#2ed573';
        li.innerHTML = `
          <div class="tc-issue-content">
            <span class="tc-issue-name">✅ Aucun problème majeur détecté !</span>
            <span class="tc-issue-points" style="background:#2ed573;">Parfait</span>
          </div>
        `;
        elements.issues.appendChild(li);
        return;
      }

      allIssues.slice(0, 6).forEach(issue => {
        const li = document.createElement('li');
        li.className = 'tc-issue';
        const isPositive = issue.points > 0;
        const pointsText = isPositive ? `+${issue.points}` : `${issue.points}`;
        
        let borderColor, bgColor, badgeColor;
        if (isPositive) {
          borderColor = '#2ed573';
          bgColor = '#f0f8f0';
          badgeColor = '#2ed573';
        } else if (issue.category === 'critical') {
          borderColor = '#ff4757';
          bgColor = '#fff5f5';
          badgeColor = '#ff4757';
        } else {
          borderColor = '#d99152';
          bgColor = '#fdf8f3';
          badgeColor = '#d99152';
        }

        li.style.background = bgColor;
        li.style.borderColor = borderColor + '20';
        li.style.borderLeftColor = borderColor;
        
        li.innerHTML = `
          <div class="tc-issue-content">
            <div class="tc-issue-info">
              <div class="tc-issue-name">${issue.name}</div>
              <div class="tc-issue-description">${issue.description}</div>
            </div>
            <span class="tc-issue-points" style="background:${badgeColor};">${pointsText} pts</span>
          </div>
        `;

        elements.issues.appendChild(li);
      });
    }

    function updateRecommendations(score, issues, positivePoints) {
      let recommendations = [];

      if (score >= 85) {
        recommendations.push("Continuez sur cette excellente voie !");
        recommendations.push("Pensez à surveiller régulièrement vos performances.");
      } else if (score >= 70) {
        recommendations.push("Implémentez GTM si ce n'est pas déjà fait.");
        recommendations.push("Ajoutez une solution de gestion des cookies.");
      } else {
        recommendations.push("Priorité : installer Google Tag Manager.");
        recommendations.push("Mettre en place un CMP conforme RGPD.");
        recommendations.push("Centraliser tous vos tags via GTM.");
      }

      // Ajout de recommandations spécifiques
      if (issues.some(i => i.name.includes('CMP'))) {
        recommendations.push("Installez une solution CMP (Axeptio, Cookiebot, etc.)");
      }
      
      if (positivePoints.length > 0) {
        recommendations.unshift(`✅ Points forts détectés : ${positivePoints.map(p => p.name).join(', ')}`);
      }

      elements.recommendationsContent.innerHTML = recommendations
        .slice(0, 4)
        .map(rec => `• ${rec}`)
        .join('<br>');
    }

    function showLoading(show) {
      elements.spinner.style.display = show ? 'block' : 'none';
      elements.results.style.display = show ? 'none' : elements.results.style.display;
      elements.button.disabled = show;
      elements.buttonText.textContent = show ? 'Analyse...' : 'Analyser';
    }

    function showError(message) {
      console.error('❌ Erreur affichée:', message);
      elements.errorMessage.textContent = message;
      elements.errorMessage.style.display = 'block';
    }

    function hideError() {
      elements.errorMessage.style.display = 'none';
    }

    console.log('✅ Calculateur Tracking initialisé avec succès');
  }
})();
