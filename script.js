
(function(){
  console.log('🚀 Audit Tracking – Initialisation du script');

  // 1️⃣ Charger Chart.js (avec fallback CDN)
  if (typeof Chart === 'undefined') {
    const s = document.createElement('script');
    s.src = 'https://aromecafeine.github.io/calculateur-maturite-tracking/chart.js';
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

  // 2️⃣ Initialisation de l’UI (HTML + CSS)
  function init(){
    const container = document.getElementById('widget-container');
    if (!container) {
      console.error('❌ widget-container introuvable');
      return;
    }
    // CSS minimal
    const style = document.createElement('style');
    style.textContent = `
      * { box-sizing:border-box; }
      #tc-calculator { background:#fff; border-radius:12px; box-shadow:0 8px 24px rgba(0,0,0,0.1); overflow:hidden; }
      body, button, input { font-family:'Poppins',sans-serif; }
      .step { display:none; padding:20px; }
      .step.active { display:block; }
      button { padding:12px 20px; border:none; border-radius:8px; cursor:pointer; }
      .btn-primary { background:#004aad; color:#fff; width:100%; }
      .btn-secondary { background:transparent; color:#004aad; border:2px solid #004aad; }
      .input-wrapper { position:relative; margin:16px 0; }
      .input-wrapper::before { content:'🌐'; position:absolute; left:12px; top:50%; transform:translateY(-50%); }
      .input-wrapper input { width:100%; padding:12px 12px 12px 36px; border:1px solid #ccc; border-radius:6px;}
      #tc-spinner { display:none; text-align:center; padding:20px; }
      #tc-spinner .icon { width:40px; height:40px; border:4px solid #eee; border-top:4px solid #004aad; border-radius:50%; animation:spin 1s linear infinite; margin:0 auto 12px;}
      @keyframes spin { to{transform:rotate(360deg);} }
      .results { text-align:center; }
      .results ul { list-style:none; padding:0; }
      .results li { margin:8px 0; text-align:left; }
      .error { color:#c62828; margin-top:8px; display:none; }
    `;
    document.head.appendChild(style);

    // HTML structure
    container.innerHTML = `
      <div id="tc-calculator">
        <div class="step active" id="step-1">
          <h2>1. Entrez l’URL de votre site</h2>
          <div class="input-wrapper">
            <input id="tc-url" type="url" placeholder="votre-site.com" />
          </div>
          <div class="error" id="err-1"></div>
          <button id="btn-1" class="btn-primary">Continuer →</button>
        </div>
        <div class="step" id="step-2">
          <h2>2. Vos informations</h2>
          <div style="display:flex;gap:8px;">
            <input id="tc-name" type="text" placeholder="Prénom" style="flex:1;border:1px solid #ccc;border-radius:6px;padding:12px;" />
            <input id="tc-email" type="email" placeholder="Email" style="flex:1;border:1px solid #ccc;border-radius:6px;padding:12px;" />
          </div>
          <div class="error" id="err-2"></div>
          <div style="margin-top:16px;display:flex;justify-content:flex-end;">
            <button id="back-2" class="btn-secondary">← Retour</button>
            <button id="btn-2" class="btn-primary">🚀 Lancer mon analyse</button>
          </div>
        </div>
        <div id="tc-spinner">
          <div class="icon"></div>
          <p>Analyse en cours…</p>
        </div>
        <div class="step" id="step-3">
          <h2>3. Résultats</h2>
          <div class="results">
            <p>Score global : <strong id="final-score">–</strong>/100</p>
            <canvas id="tc-gauge" width="150" height="150"></canvas>
            <ul id="weaknesses"></ul>
          </div>
        </div>
      </div>
    `;
    bindEvents();
  }

  // 3️⃣ Liaison des événements & navigation
  function bindEvents(){
    const urlIn  = document.getElementById('tc-url');
    const btn1   = document.getElementById('btn-1');
    const btn2   = document.getElementById('btn-2');
    const back2  = document.getElementById('back-2');
    const err1   = document.getElementById('err-1');
    const err2   = document.getElementById('err-2');
    const spinner= document.getElementById('tc-spinner');
    const step1  = document.getElementById('step-1');
    const step2  = document.getElementById('step-2');
    const step3  = document.getElementById('step-3');

    function showStep(n){
      [step1, step2, spinner, step3].forEach(el=>el.classList.remove('active'));
      step1.style.display = 'none'; step2.style.display = 'none'; spinner.style.display = 'none'; step3.style.display = 'none';
      if(n==='spinner'){
        spinner.style.display = 'block';
      } else {
        const el = n===1?step1:n===2?step2:step3;
        el.style.display = 'block'; el.classList.add('active');
      }
    }

    btn1.addEventListener('click', ()=>{
      err1.style.display='none';
      if(!urlIn.value.trim()){ err1.textContent='URL requise'; err1.style.display='block'; return; }
      showStep(2);
    });
    back2.addEventListener('click', ()=> showStep(1));

    btn2.addEventListener('click', async ()=>{
      err2.style.display='none';
      let url = urlIn.value.trim();
      if(!url) { err2.textContent='URL requise'; err2.style.display='block'; return; }
      showStep('spinner');

      // Fetch via AllOrigins pour contourner CORS
      try {
        const targetUrl = url.startsWith('http')?url:'https://'+url;
        const res = await fetch('https://api.allorigins.win/get?url='+encodeURIComponent(targetUrl));
        const json = await res.json();
        const html = json.contents.toLowerCase();

        const result = analyzeHTML(html);
        displayResults(result);

        showStep(3);
      } catch(e) {
        console.error(e);
        err2.textContent = 'Erreur de récupération ou CORS';
        err2.style.display='block';
        showStep(2);
      }
    });
  }

  // 4️⃣ Règles d’audit
  const RULES = [
    { name:'Absence de GTM', regex:/gtm\.js/i, points:-20, description:'GTM non détecté (–20)' },
    { name:'GA4 direct', regex:/gtag\/js\?id=G-/i, points:-10, description:'GA4 en dur sans GTM (–10)' },
    { name:'UA obsolète', regex:/analytics\.js|UA-\d+/i, points:-15, description:'UA détecté (–15)' },
    { name:'CMP manquant', regex:new RegExp([
        'sdk\.privacy-center\.org','sdk\.didomi\.io','scripts\.didomi\.io','api\.didomi\.io',
        'static\.axept\.io','www\.axept\.io','cookie\.sirdata\.com','cmp\.sirdata\.com',
        'cdn\.sirdata\.com','cdn-cookieyes\.com','cdn-cookieyes\.io','app\.cookieyes\.com',
        'cdn\.iubenda\.com','iubenda\.com/cmp','consent\.iubenda\.com','app\.usercentrics\.eu',
        'consent\.cookiebot\.com','consentcdn\.cookiebot\.com','choice\.quantcast\.com',
        'cmp\.quantcast\.com','consent\.trustarc\.com','cdn\.trustcommander\.net',
        'cdn\.cookielaw\.org','cdn\.cookielaw\.net','cookie-cdn\.onetrust\.com',
        'cmp\.[a-z0-9.-]+','consent\.[a-z0-9.-]+'
      ].join('|'), 'i'),
      points:-10, description:'Aucun CMP détecté (–10)'
    },
    { name:'Cookies sans consent.', regex:/(?:^|;\s*)(?:_ga\w*|_gid|_gat|gclau|gclaw|gcldc|_fbp|fr|li_fat_id|UserMatchHistory|_ttp|_pinterest_sess|_pin_unauth|personalization_id|guest_id|hubspotutk|hjSessionUser\w+|_hjIncludedInPageviewSample|_uetvid|_uetsid|_calltrk|calltrk_landing|nimbata|sp_id|sp_ses|prism\w+|mkto_trk|visitor_id\d+|ceg\w+|mf\w+|optimizely\w*|ajs\w+)=/, points:-20, description:'Cookies marketing sans consentement (–20)' },
    { name:'Pixels externes', regex:/graph\.facebook\.com|snap\.licdn\.com\/li\.lms-analytics\/insight\.min\.js|px\.ads\.linkedin\.com\/collect|analytics\.tiktok\.com\/i18n\/pixel\/events\.js|business\.tiktok\.com|s\.pinimg\.com\/ct\/lib\/main\.[^/]+\.js|ct\.pinterest\.com\/v3\/|static\.ads-twitter\.com\/uwt\.js|analytics\.twitter\.com\/i\/adsct|js\.hs-scripts\.com|js\.hs-analytics\.com|hs-analytics\.net|hscollectedforms\.net|static\.hotjar\.com\/c\/hotjar-[^/]+\.js|script\.hotjar\.com\/modules\.[^/]+\.js|vars\.hotjar\.com|www\.clarity\.ms\/tag\/|bat\.bing\.com\/bat\.js|cdn\.callrail\.com|t\.calltrk\.com|cdn\.nimbata\.com|track\.nimbata\.com|sp\.analytics\.spotify\.com|spclient\.wg\.spotify\.com|cdn\.segment\.com|script\.crazyegg\.com|cdn\.mouseflow\.com|cdn\.optimizely\.com|munchkin\.marketo\.net|pi\.pardot\.com/, points:-10, description:'Outils tiers en dur (–10)' },
    { name:'Double balisage', regex:null, points:-5, description:'Scripts dupliqués (–5)', special:'duplicate' },
    { name:'Server-side absent', regex:/https:\/\/(analytics|sst|tracking)\./i, points:-10, invert:true, description:'Server-side absent (–10)' },
    { name:'Addingwell bonus', regex:/awl=/i, points:+10, description:'Addingwell détecté (+10)' }
  ];

  // 5️⃣ Analyse et scoring
  function analyzeHTML(html){
    let score = 100;
    const failures = [];
    // Appliquer chaque règle
    RULES.forEach(rule => {
      let match = false;
      if(rule.special==='duplicate'){
        // compter occurrences de GTM
        const cnt = (html.match(/gtm\.js/gi)||[]).length;
        if(cnt>1) match = true;
      } else {
        match = rule.regex.test(html);
        if(rule.invert) match = !match;
      }
      if(match){
        score += rule.points;
        if(rule.points<0) failures.push(rule);
      }
    });
    score = Math.max(0, Math.min(100, score));
    // garder 2-3 pires failles
    failures.sort((a,b)=>a.points - b.points);
    return { score, failures: failures.slice(0,3) };
  }

  // 6️⃣ Affichage des résultats
  function displayResults({score, failures}){
    document.getElementById('final-score').textContent = score;
    createGauge(score);
    const ul = document.getElementById('weaknesses');
    ul.innerHTML = '';
    if(failures.length===0){
      ul.innerHTML = '<li>✅ Configuration optimale détectée !</li>';
    } else {
      failures.forEach(f=>{
        ul.innerHTML += `<li><strong>${f.name}</strong> : ${f.description}</li>`;
      });
    }
  }

  // 7️⃣ Création du gauge
  function createGauge(score){
    const ctx = document.getElementById('tc-gauge').getContext('2d');
    if(window.gauge) window.gauge.destroy();
    const color = score>=75?'#28a745':score>=50?'#fd7e14':'#dc3545';
    window.gauge = new Chart(ctx, {
      type:'doughnut',
      data:{datasets:[{data:[score,100-score],backgroundColor:[color,'#e0e0e0'],cutout:'70%'}]},
      options:{plugins:{tooltip:{enabled:false},legend:{display:false}},responsive:true}
    });
  }

  // 8️⃣ Démarrage
  document.addEventListener('DOMContentLoaded', function(){
    init();
});
})();
