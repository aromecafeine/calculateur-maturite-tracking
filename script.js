// script.js

(function(){
  console.log('🚀 Calculateur Tracking - Initialisation du script');
  const BASE = 'https://aromecafeine.github.io/calculateur-maturite-tracking/';

  // 1️⃣ Chart.js
  if (typeof Chart === 'undefined') {
    const s = document.createElement('script');
    s.src = BASE + 'chart.js';
    s.onload = init;
    s.onerror = () => {
      console.error('❌ Erreur Chart.js, fallback CDN');
      const fb = document.createElement('script');
      fb.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.min.js';
      fb.onload = init;
      document.head.appendChild(fb);
    };
    document.head.appendChild(s);
  } else {
    init();
  }

  // 2️⃣ Injection CSS + HTML
  function init(){
    // --- CSS simplifié, couleurs #004aad & déclinaisons ---
    const css = ` /* voir version complète plus haut */ `;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    // --- HTML du widget ---
    const container = document.getElementById('widget-container');
    container.innerHTML = `
      <div id="tc-calculator">
        <div class="tc-hero-section">
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
        <div class="tc-main-content">
          <!-- STEP 1: URL -->
          <div class="tc-url-step" id="url-step">
            <div class="tc-step-title">🌐 Entrez l'URL de votre site</div>
            <input id="tc-url" class="tc-input tc-url-input" type="url" placeholder="https://votre-site.com" required>
            <button id="tc-url-btn" class="tc-button">Continuer →</button>
          </div>

          <!-- STEP 2: Contact -->
          <div class="tc-contact-step" id="contact-step">
            <div class="tc-step-title">👤 Vos infos pour recevoir le rapport</div>
            <div class="tc-contact-grid">
              <input id="tc-name" class="tc-input" type="text" placeholder="Votre prénom" required>
              <input id="tc-email" class="tc-input" type="email" placeholder="Votre email" required>
            </div>
            <button id="tc-back-btn" class="tc-button-secondary">← Retour</button>
            <button id="tc-scan-btn" class="tc-button"><span id="tc-btn-text">🚀 Lancer mon analyse</span></button>
          </div>

          <!-- Spinner -->
          <div id="tc-spinner" class="tc-spinner"><div class="tc-spinner-icon"></div><p>Analyse en cours…</p></div>

          <!-- Résultats -->
          <div id="tc-results" class="tc-results">
            <!-- (vous pouvez ajouter ici le contenu final, gauge, recommandations…) -->
            <p style="text-align:center;color:#004aad;font-weight:600;">[Ici vos résultats]</p>
          </div>

          <!-- Erreur -->
          <div id="tc-error" class="tc-error"></div>
        </div>
      </div>
    `;

    initializeCalculator();
  }

  // 3️⃣ Logique d'interaction
  function initializeCalculator() {
    const elements = {
      urlStep:     document.getElementById('url-step'),
      contactStep: document.getElementById('contact-step'),
      spinner:     document.getElementById('tc-spinner'),
      results:     document.getElementById('tc-results'),
      urlBtn:      document.getElementById('tc-url-btn'),
      backBtn:     document.getElementById('tc-back-btn'),
      scanBtn:     document.getElementById('tc-scan-btn'),
      btnText:     document.getElementById('tc-btn-text'),
      urlInput:    document.getElementById('tc-url'),
      nameInput:   document.getElementById('tc-name'),
      emailInput:  document.getElementById('tc-email'),
      err:         document.getElementById('tc-error'),
      step1:       document.getElementById('step-1'),
      step2:       document.getElementById('step-2'),
      step3:       document.getElementById('step-3'),
    };

    function hideError(){ elements.err.style.display='none'; elements.err.textContent=''; }
    function showError(msg){ elements.err.style.display='block'; elements.err.textContent=msg; }

    // → Étape 1 → 2
    elements.urlBtn.addEventListener('click',()=>{
      const url = elements.urlInput.value.trim();
      if(!url){ return showError('URL requise'); }
      try { new URL(url.startsWith('http')?url:'https://'+url); }
      catch{ return showError('Format d\'URL incorrect'); }
      hideError();
      elements.urlStep.style.display='none';
      elements.contactStep.style.display='block';
      elements.step1.classList.replace('active','completed');
      elements.step2.classList.add('active');
    });

    // ← Retour 2 → 1
    elements.backBtn.addEventListener('click',()=>{
      hideError();
      elements.contactStep.style.display='none';
      elements.urlStep.style.display='block';
      elements.step1.classList.replace('completed','active');
      elements.step2.classList.remove('active');
    });

    // → Analyse 2 → 3
    elements.scanBtn.addEventListener('click', ()=>{
      hideError();
      goToResultsStep();
    });

    // Entrées clavier
    elements.urlInput.addEventListener('keypress', e=>{ if(e.key==='Enter') elements.urlBtn.click(); });
    elements.nameInput.addEventListener('keypress', e=>{ if(e.key==='Enter') elements.emailInput.focus(); });
    elements.emailInput.addEventListener('keypress', e=>{ if(e.key==='Enter') elements.scanBtn.click(); });
  }

  // 4️⃣ Simulation de l’analyse
  function goToResultsStep(){
    const e = document.querySelector.bind(document);
    e('#url-step').style.display     = 'none';
    e('#contact-step').style.display = 'none';
    e('#tc-spinner').style.display   = 'block';
    document.getElementById('step-2').classList.replace('active','completed');
    document.getElementById('step-3').classList.add('active');

    // Simule 1 s de traitement, puis affiche les résultats
    setTimeout(()=>{
      e('#tc-spinner').style.display = 'none';
      e('#tc-results').style.display = 'block';
      document.getElementById('step-3').classList.replace('active','completed');
    }, 1000);
  }

})();
