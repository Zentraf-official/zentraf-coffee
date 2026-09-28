/* ==========================================================================
   ZENTRAF COFFEE — comportamiento (demo de la agencia Zentraf)
   Reglas de la casa:
   · Sin librerías externas.
   · Modo seguro: si este archivo falla, la web se ve ENTERA igual (nada depende de JS).
   · Movimiento suave, solo cuando el usuario lo provoca; en móvil, quieto.
   ========================================================================== */
(function () {
  'use strict';

  /* --- 1 · La capa de carga nunca se queda encima (error R23) ---------------- */
  function quitarCarga() {
    var capa = document.getElementById('carga');
    if (!capa || capa.hasAttribute('hidden')) return;
    capa.setAttribute('hidden', '');
    capa.style.display = 'none';
  }
  var capa = document.getElementById('carga');
  if (capa) {
    capa.addEventListener('animationend', quitarCarga);
    window.setTimeout(quitarCarga, 2000);          // red de seguridad
    window.addEventListener('load', function () { window.setTimeout(quitarCarga, 1200); });
  }
  window.setTimeout(quitarCarga, 3500);            // red de seguridad, pase lo que pase

  /* --- 2 · Aparecer una sola vez al entrar en pantalla ----------------------- */
  var piezas = document.querySelectorAll('.revelar');
  if (piezas.length) {
    if ('IntersectionObserver' in window) {
      var observador = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('esta');
            observador.unobserve(e.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      Array.prototype.forEach.call(piezas, function (p) { observador.observe(p); });
    } else {
      Array.prototype.forEach.call(piezas, function (p) { p.classList.add('esta'); });
    }
  }

  /* --- 3 · Filtrar la carta (sin JS se ve todo: los botones ni aparecen) ----- */
  var chips = document.querySelectorAll('.chip');
  var platos = document.querySelectorAll('.plato');
  if (chips.length && platos.length) {
    Array.prototype.forEach.call(chips, function (chip) {
      chip.addEventListener('click', function () {
        var filtro = chip.getAttribute('data-filtro');
        Array.prototype.forEach.call(chips, function (c) {
          var activo = c === chip;
          c.classList.toggle('chip--activo', activo);
          c.setAttribute('aria-pressed', activo ? 'true' : 'false');
        });
        Array.prototype.forEach.call(platos, function (p) {
          var categorias = (p.getAttribute('data-cat') || '');
          var mostrar = filtro === 'alle' || categorias.indexOf(filtro) !== -1;
          if (mostrar) { p.removeAttribute('hidden'); } else { p.setAttribute('hidden', ''); }
          p.classList.add('esta');
        });
      });
    });
  }

  /* --- 4 · Menú de móvil: se cierra al elegir una opción --------------------- */
  var menu = document.querySelector('.barra__movil');
  if (menu) {
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) { menu.removeAttribute('open'); }
    });
  }

  /* --- 5 · Movimiento al pasar el ratón (solo escritorio, y suave) ---------- */
  var quiereMovimiento = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
  var ratonFino = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var esGrande = window.matchMedia('(min-width: 900px)').matches;

  if (quiereMovimiento && ratonFino && esGrande) {
    var flotantes = [].slice.call(document.querySelectorAll('[data-flotante]'));
    if (flotantes.length) {
      var caja = document.querySelector('.hero__imagen');
      var objetivo = { x: 0, y: 0 };
      var suave = { x: 0, y: 0 };
      var animando = false;

      function colocarBase() {
        if (!caja) return;
        var w = caja.clientWidth;
        var h = caja.clientHeight;
        var cartas = [].slice.call(caja.querySelectorAll('.tarjeta-flotante'));
        if (cartas[0]) { cartas[0].style.left = Math.round(w * 0.05) + 'px'; cartas[0].style.top = Math.round(h * 0.52) + 'px'; }
        if (cartas[1]) { cartas[1].style.left = Math.round(w * 0.80) + 'px'; cartas[1].style.top = Math.round(h * 0.30) + 'px'; }
      }

      function bucle() {
        suave.x += (objetivo.x - suave.x) * 0.08;
        suave.y += (objetivo.y - suave.y) * 0.08;
        flotantes.forEach(function (el, i) {
          var signo = (i % 2 === 0) ? 1 : -1;
          var amplitud = el.classList.contains('cursorfoto') ? 26 : 14;
          var x = suave.x * amplitud * signo;
          var y = suave.y * amplitud * signo;
          el.style.transform = 'translate3d(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px,0)';
        });
        if (Math.abs(objetivo.x - suave.x) > 0.001 || Math.abs(objetivo.y - suave.y) > 0.001) {
          window.requestAnimationFrame(bucle);
        } else {
          animando = false;
        }
      }

      function mirar(e) {
        var w = window.innerWidth || 1;
        var h = window.innerHeight || 1;
        objetivo.x = (e.clientX / w) - 0.5;
        objetivo.y = (e.clientY / h) - 0.5;
        if (!animando) { animando = true; window.requestAnimationFrame(bucle); }
      }

      colocarBase();
      window.addEventListener('resize', colocarBase);
      window.addEventListener('pointermove', mirar, { passive: true });
      document.addEventListener('mouseleave', function () { objetivo.x = 0; objetivo.y = 0; if (!animando) { animando = true; window.requestAnimationFrame(bucle); } });
    }
  }
})();
