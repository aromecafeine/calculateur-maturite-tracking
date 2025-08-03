;(function(){
  // 1) Base URL de ton GitHub Pages
  const BASE = 'https://aromecafeine.github.io/calculateur-maturite-tracking/';

  // 2) Charger Chart.js depuis ton domaine
  const s = document.createElement('script');
  s.src = BASE + 'chart.min.js';
  s.onload = init;
  document.head.appendChild(s);

  // 3) Quand Chart est prêt, on injecte tout
  function init(){
    // ▷ Injecter le CSS
    const css = `
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
      #tc-calculator{font-family:'Poppins',sans-serif;color:#505942;padding:1em;max-width:400px;margin:1em auto;}
      #tc-calculator *{box-sizing:border-box;}
      .tc-input{width:100%;padding:.5em;margin:.5em 0;border:1px solid #505942;border-radius:4px;}
      .tc-button{background:#d99152;color:#fff;border:none;padding:.5em 1em;border-radius:4px;cursor:pointer;font-weight:600;}
      .tc-button:disabled{opacity:.6;cursor:not-allowed;}
      .tc-spinner{display:none;width:24px;height:24px;border:3px solid #f0f0f0;border-top:3px solid #505942;border-radius:50%;animation:spin 1s linear infinite;margin:1em auto;}
      @keyframes spin{to{transform:rotate(360deg)}}
      .tc-results{display:none;text-align:center;margin-top:1em}
      .tc-score{font-size:2em;margin-bottom:.5em}
      .tc-issues{list-style:none;padding:0;margin-top:1em;text-align:left}
      .tc-issue{background:#f9f9f9;padding:.5em;margin-bottom:.5em;border-left:4px solid #d99152;}
      #tc-error{display:none;color:#cc0000;margin-top:1em}
    `;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    // ▷ Injecter le HTML
    const html = `
      <div id="tc-calculator">
        <input id="tc-url" class="tc-input" type="url" placeholder="https://votre-site.com">
        <button id="tc-scan-btn" class="tc-button">Analyser</button>
        <div id="tc-spinner" class="tc-spinner"></div>
        <div id="tc-results" class="tc-results">
          <canvas id="tc-gauge" width="200" height="100"></canvas>
          <div id="tc-score" class="tc-score"></div>
          <ul id="tc-issues" class="tc-issues"></ul>
        </div>
        <div id="tc-error"></div>
      </div>
    `;
    document.currentScript.insertAdjacentHTML('beforebegin', html);

    // ▷ Règles de scoring (regex valides !)
    const rules = [
      { desc:"GTM absent",                 rx:/gtm\.js/i,                                              pts:-20, invert:true },
      { desc:"GA4 en dur",                 rx:/\/gtag\/js\?id=G-/i,                                    pts:-10          },
      { desc:"Universal Analytics",        rx:/(analytics\.js|UA-\d+)/i,                               pts:-15          },
      { desc:"CMP manquant",               rx:/(?:sdk\.privacy-center\.org|axeptio|tarteaucitron|cookiebot|onetrust|didomi|iubenda|quantcast)/i,
                                                                             pts:-10, invert:true },
      { desc:"Cookies marketing",          rx:/(?:_ga(?:\w+)?|_gid|_gat|_fbp|gcl(?:au|aw|dc)|li_fat_id|hubspotutk|calltrk|nimbata|mkto_trk|optimizely|ajs\w*)(?==)/i,
                                                                             pts:-20          },
      { desc:"Tracking en dur",            rx:/(?:connect\.facebook\.net|analytics\.tiktok\.com|px\.ads\.linkedin\.com|cdn\.segment\.com|static\.hotjar\.com|www\.clarity\.ms|bat\.bing\.com|cdn\.callrail)/i,
                                                                             pts:-10          },
      { desc:"Server-side absent",         rx:/https:\/\/(?:analytics|sst|tracking)\./i,               pts:-10, invert:true },
      { desc:"Addingwell détecté",         rx:/awl=/i,                                                 pts:+10          }
    ];

    // ▷ Ciblage des éléments
    const btn      = document.getElementById('tc-scan-btn'),
          urlIn    = document.getElementById('tc-url'),
          spinner  = document.getElementById('tc-spinner'),
          results  = document.getElementById('tc-results'),
          scoreEl  = document.getElementById('tc-score'),
          issuesEl = document.getElementById('tc-issues'),
          errorEl  = document.getElementById('tc-error');
    let gauge;

    // ▷ Événement “click”
    btn.addEventListener('click', async ()=>{
      const url = urlIn.value.trim();
      try { new URL(url); } catch { return showError('URL invalide'); }

      toggle(true);
      hideError();
      results.style.display = 'none';

      try {
        // on utilise /get pour avoir CORS OK
        const res  = await fetch('https://api.allorigins.win/get?url='+encodeURIComponent(url));
        const json = await res.json();
        const html = json.contents;

        let score = 100, found = [];
        rules.forEach(r=>{
          const match = r.rx.test(html);
          if ((r.invert ? !match : match)) {
            score += r.pts;
            found.push(r);
          }
        });

        // double balisage
        const dupCount = (html.match(/<script[^>]+(gtm\.js|fbevents\.js|analytics\.js)/gi)||[]).length;
        if (dupCount > 1) {
          score -= 5;
          found.push({ desc:"Double balisage", pts:-5 });
        }

        score = Math.max(0, Math.min(100, score));

        // afficher le gauge
        if (gauge) gauge.destroy();
        gauge = new Chart(
          document.getElementById('tc-gauge').getContext('2d'),
          {
            type:'doughnut',
            data:{ datasets:[{ data:[score,100-score], backgroundColor:['#d99152','#e0e0e0'], borderWidth:0 }] },
            options:{ rotation:Math.PI, circumference:Math.PI, cutout:'70%', plugins:{ tooltip:{enabled:false}, legend:{display:false} } }
          }
        );

        // afficher score & 3 issues
        scoreEl.textContent = `Score : ${score}/100`;
        issuesEl.innerHTML = found
          .sort((a,b)=>a.pts - b.pts)
          .slice(0,3)
          .map(r=>`<li class="tc-issue">${r.desc} (${r.pts>0?'+':''}${r.pts} pts)</li>`)
          .join('') ||
          `<li class="tc-issue">Aucun problème détecté ✓</li>`;

        results.style.display = 'block';
      }
      catch(err) {
        showError('Erreur : ' + err.message);
      }
      finally {
        toggle(false);
      }
    });

    function toggle(on){
      spinner.style.display = on ? 'block' : 'none';
      btn.disabled = on;
    }
    function showError(txt){
      errorEl.textContent = txt;
      errorEl.style.display = 'block';
    }
    function hideError(){
      errorEl.style.display = 'none';
    }
  }
})();
