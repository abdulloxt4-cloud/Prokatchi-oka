(function () {
  const KEY = 'oka-music';
  const VOLUME = 0.6;
  const LABELS = {
    uz: { off: 'Musiqani o‘chirish', on: 'Musiqani yoqish' },
    ru: { off: 'Выключить музыку', on: 'Включить музыку' },
    en: { off: 'Turn music off', on: 'Turn music on' }
  };
  const button = document.getElementById('musicToggle');
  const audio = document.getElementById('ambientAudio');
  if (!button || !audio) return;

  let wanted = true;
  try { wanted = localStorage.getItem(KEY) !== 'off'; } catch (_) { wanted = true; }
  let fadeTimer = null;
  let gestureBound = false;

  function lang() {
    const current = window.I18N && window.I18N.lang;
    return LABELS[current] ? current : 'uz';
  }

  function render() {
    const playing = !audio.paused && wanted;
    const text = LABELS[lang()][playing ? 'off' : 'on'];
    button.classList.toggle('is-playing', playing);
    button.setAttribute('aria-pressed', String(playing));
    button.setAttribute('aria-label', text);
    button.setAttribute('title', text);
    const icon = button.querySelector('i');
    if (icon) icon.className = playing ? 'bi bi-volume-up-fill' : 'bi bi-volume-mute-fill';
  }

  function volumeSettable() {
    const before = audio.volume;
    audio.volume = 0.5;
    const ok = Math.abs(audio.volume - 0.5) < 0.01;
    audio.volume = before;
    return ok;
  }

  const canFade = volumeSettable();

  function fadeTo(target, done) {
    clearInterval(fadeTimer);
    if (!canFade) {
      if (done) done();
      return;
    }
    fadeTimer = setInterval(() => {
      const diff = target - audio.volume;
      if (Math.abs(diff) < 0.02) {
        audio.volume = target;
        clearInterval(fadeTimer);
        if (done) done();
        return;
      }
      audio.volume = Math.min(1, Math.max(0, audio.volume + Math.sign(diff) * 0.02));
    }, 40);
  }

  function start() {
    if (canFade) audio.volume = 0;
    const attempt = audio.play();
    if (attempt && typeof attempt.then === 'function') {
      return attempt.then(() => { fadeTo(VOLUME); render(); return true; }).catch(() => { render(); return false; });
    }
    fadeTo(VOLUME);
    render();
    return Promise.resolve(true);
  }

  function stop() {
    clearInterval(fadeTimer);
    if (canFade) {
      fadeTo(0, () => { audio.pause(); render(); });
      setTimeout(() => { if (!wanted) { audio.pause(); render(); } }, 900);
    } else {
      audio.pause();
    }
    render();
  }

  function onFirstGesture(event) {
    if (event.target && event.target.closest && event.target.closest('#musicToggle')) return;
    unbindGesture();
    if (wanted && audio.paused) start();
  }

  function bindGesture() {
    if (gestureBound) return;
    gestureBound = true;
    ['pointerdown', 'keydown', 'touchend'].forEach((name) => document.addEventListener(name, onFirstGesture, { passive: true }));
  }

  function unbindGesture() {
    gestureBound = false;
    ['pointerdown', 'keydown', 'touchend'].forEach((name) => document.removeEventListener(name, onFirstGesture));
  }

  button.addEventListener('click', () => {
    unbindGesture();
    if (!audio.paused && wanted) {
      wanted = false;
      stop();
    } else {
      wanted = true;
      start();
    }
    try { localStorage.setItem(KEY, wanted ? 'on' : 'off'); } catch (_) {}
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      audio.pause();
    } else if (wanted && audio.paused && !gestureBound) {
      start();
    }
    render();
  });

  document.addEventListener('click', (event) => {
    if (event.target.closest && event.target.closest('[data-lang]')) setTimeout(render, 60);
  });

  render();
  if (wanted) {
    start().then((ok) => { if (!ok) bindGesture(); });
  }
})();
