const dpiInput = document.getElementById('dpi');
  const sensInput = document.getElementById('sens');
  const calcBtn = document.getElementById('calcBtn');
  const result = document.getElementById('result');
  const resultValue = document.getElementById('resultValue');
  const badgeWrap = document.getElementById('badgeWrap');
  const resultNote = document.getElementById('resultNote');

  document.querySelectorAll('.quick-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const target = document.getElementById(btn.dataset.target);
      target.value = btn.dataset.val;
      target.focus();
    });
  });

  function classify(edpi){
    if (edpi < 220) {
      return { tier:'low', label:'SENS BAJA — CONTROL', note:'Barridos amplios de mouse. Mayor precisión para flicks largos, ideal para jugadores de mira estática.' };
    } else if (edpi <= 320) {
      return { tier:'mid', label:'SENS MEDIA — EQUILIBRIO', note:'El punto medio más usado en el nivel competitivo: buen balance entre control y reacción rápida.' };
    } else {
      return { tier:'high', label:'SENS ALTA — REACCIÓN', note:'Giros rápidos con poco movimiento de mano. Exige más control fino para no pasarte del blanco.' };
    }
  }

  function calculate(){
    const dpi = parseFloat(dpiInput.value);
    const sens = parseFloat(sensInput.value);

    if (!dpi || !sens || dpi <= 0 || sens <= 0) {
      dpiInput.style.setProperty('--err','1');
      [dpiInput, sensInput].forEach(el=>{
        if (!parseFloat(el.value) || parseFloat(el.value) <= 0) {
          el.parentElement.style.borderColor = '#ff4655';
          el.parentElement.style.boxShadow = '0 0 0 1px #ff4655';
          setTimeout(()=>{
            el.parentElement.style.borderColor = '';
            el.parentElement.style.boxShadow = '';
          }, 900);
        }
      });
      return;
    }

    const edpi = dpi * sens;
    const info = classify(edpi);

    resultValue.textContent = edpi % 1 === 0 ? edpi.toFixed(0) : edpi.toFixed(1);
    badgeWrap.innerHTML = `<span class="badge ${info.tier}">${info.label}</span>`;
    resultNote.textContent = info.note;

    result.classList.remove('show');
    void result.offsetWidth;
    result.classList.add('show');
  }

  calcBtn.addEventListener('click', calculate);
  [dpiInput, sensInput].forEach(el=>{
    el.addEventListener('keydown', e=>{
      if (e.key === 'Enter') calculate();
    });
  });
