/**
 * Voladuras San Luis S.R.L. — Dynamic Parametric Routing Engine
 * Reads ?view= and ?mineral= from URL, renders independent views dynamically
 * Uses history.pushState for instant sub-page navigation. 
 * Animation-free and emoji-free version. Optimized with massive prototype imagery.
 */

'use strict';

/* ============================================================
   DATA
   ============================================================ */const MINERALS = {
  cuarzo: {
    name: 'Cuarzo',
    formula: 'SiO₂',
    img: 'assets/mineral-cuarzo.png',
    description: 'Mineral industrial de alta pureza. Su dureza Mohs 7 y resistencia química lo posicionan como materia prima esencial en industrias de alto valor técnico.',
    specs: [
      { param: 'Pureza (SiO₂)', value: '> 99.5%' },
      { param: 'Fe₂O₃', value: '< 0.015%' },
      { param: 'Blancura', value: '> 92° ISO' },
      { param: 'Dureza Mohs', value: '7' },
      { param: 'Granulometría', value: '#30 a #400 Tyler' },
      { param: 'Origen', value: 'Villa de Praga, San Luis' },
    ],
    industries: ['Cerámica sanitaria y técnica', 'Vidrio plano y especial', 'Fundición y revestimientos', 'Filtros industriales', 'Abrasivos'],
    tags: ['Alta pureza', 'Bajo Fe₂O₃', 'Multiproceso'],
  },
  feldespato_potosico: {
    name: 'Feldespato Potásico',
    formula: 'KAlSi₃O₈',
    img: 'assets/mineral-feldespato-potasico.png',
    description: 'Fundente potásico de primera línea. Aporta gran vitrificación, resistencia mecánica y blancura a pastas cerámicas, esmaltes y porcelanatos sanitarios.',
    specs: [
      { param: 'K₂O', value: '> 10.5%' },
      { param: 'Fe₂O₃', value: '< 0.12%' },
      { param: 'Al₂O₃', value: '18 – 20%' },
      { param: 'Blancura', value: '> 85° ISO' },
      { param: 'Granulometría', value: '#100 a #325 Tyler' },
      { param: 'Proceso', value: 'Molienda seca + clasificación' },
    ],
    industries: ['Sanitarios y vajilla', 'Esmaltes y fritas', 'Porcelana técnica', 'Vidrio óptico'],
    tags: ['Fundente', 'Potásico', 'Cerámico'],
  },
  albita: {
    name: 'Albita (Feldespato Sódico)',
    formula: 'NaAlSi₃O₈',
    img: 'assets/mineral-albita-sodico.png',
    description: 'Feldespato sódico de alta pureza. Reduce la temperatura de sinterización y mejora la vitrificación de la masa en pastas y esmaltes.',
    specs: [
      { param: 'Na₂O', value: '> 8.5%' },
      { param: 'Fe₂O₃', value: '< 0.15%' },
      { param: 'Al₂O₃', value: '16 – 18%' },
      { param: 'Blancura', value: '> 82° ISO' },
      { param: 'Granulometría', value: '#200 a #325 Tyler' },
      { param: 'Proceso', value: 'Molienda seca + clasificación magnética' },
    ],
    industries: ['Pastas cerámicas de gres', 'Esmaltes de vajilla', 'Vidrio industrial de envases'],
    tags: ['Vitrificante', 'Sódico', 'Baja fusión'],
  },
  pirofilita: {
    name: 'Pirofilita',
    formula: 'Al₂Si₄O₁₀(OH)₂',
    img: 'assets/mineral-pirofilita.png',
    description: 'Filosilicato laminar con excelentes propiedades refractarias, lubricantes y dieléctricas. Utilizada en revestimientos de alta temperatura y porcelana eléctrica.',
    specs: [
      { param: 'Al₂O₃', value: '> 28%' },
      { param: 'SiO₂', value: '65 – 70%' },
      { param: 'Fe₂O₃', value: '< 0.5%' },
      { param: 'Blancura tras calcinación', value: '> 88° ISO' },
      { param: 'Granulometría', value: '#200 a #400 Tyler' },
      { param: 'Temperatura refractaria', value: '> 1580°C' },
    ],
    industries: ['Cerámicas refractarias', 'Porcelana eléctrica', 'Recubrimientos industriales', 'Agroquímicos'],
    tags: ['Refractario', 'Dieléctrico', 'Laminar'],
  },
  baritina: {
    name: 'Baritina',
    formula: 'BaSO₄',
    img: 'assets/mineral-baritina.png',
    description: 'Sulfato de bario natural de alta densidad específica. Utilizado como agente densificante en fluidos de perforación y formulación de pinturas.',
    specs: [
      { param: 'BaSO₄', value: '> 92%' },
      { param: 'Densidad específica', value: '4.20 – 4.35 g/cm³' },
      { param: 'Fe₂O₃', value: '< 0.20%' },
      { param: 'Blancura', value: '> 80° ISO' },
      { param: 'Granulometría', value: '#200 a #400 Tyler' },
      { param: 'Solubilidad', value: 'Insoluble en agua' },
    ],
    industries: ['Fluidos de perforación petrolera', 'Industria de pinturas y plásticos', 'Protección radiológica'],
    tags: ['Alta densidad', 'Inerte químico', 'Densificante'],
  },
  chamote: {
    name: 'Chamote',
    formula: 'Al₂O₃ · 2SiO₂',
    img: 'assets/mineral-chamote.png',
    description: 'Material cerámico refractario obtenido por calcinación previa de arcillas. Aporta estabilidad dimensional en piezas cerámicas de gran formato y refractarios.',
    specs: [
      { param: 'Al₂O₃', value: '35 – 38%' },
      { param: 'Fe₂O₃', value: '< 1.5%' },
      { param: 'Porosidad aparente', value: '12 – 18%' },
      { param: 'Refractariedad', value: '> 1650°C' },
      { param: 'Granulometría', value: '#8/20 a #200 Tyler' },
      { param: 'Contracción térmica', value: 'Mínima / Nula' },
    ],
    industries: ['Ladrillos refractarios', 'Crisoles e instrumental de fundición', 'Masas cerámicas estructurales'],
    tags: ['Anti-contracción', 'Estabilidad térmica', 'Refractariedad alta'],
  },
  fluorita: {
    name: 'Fluorita',
    formula: 'CaF₂',
    img: 'assets/mineral-fluorita.png',
    description: 'Fluoruro de calcio obtenido de canteras propias. Empleado de manera crítica en la industria metalúrgica y química, así como en la producción de vidrios ópticos y esmaltes cerámicos especiales.',
    specs: [
      { param: 'Aplicación Principal', value: 'Fundente siderúrgico y fabricación de vidrio/cerámica' },
      { param: 'Presentación', value: 'Granulometría a medida / Big-bags (1.5 TN)' },
      { param: 'Origen', value: 'San Luis, Argentina' },
      { param: 'Capacidad de Procesamiento', value: 'Molienda fina de precisión certificada' },
      { param: 'Control de Impurezas', value: 'Bajo contenido de sílice y compuestos ferrosos' },
    ],
    industries: ['Siderurgia y metalurgia', 'Vidrio óptico y plano', 'Esmaltes cerámicos', 'Industria química'],
    tags: ['Yacimiento propio', 'Fundente', 'Flúor'],
  },
};

const MALLAS = [
  {
    num: '#400',
    microns: '37 µm',
    industries: [
      { name: 'Esmaltes y fritas', desc: 'Cobertura total de grano en aplicaciones vidriadas de altísima definición.' },
      { name: 'Farmacia / Cosmética', desc: 'Relleno de talcos y polvos de alta finura con especificación USP.' },
    ],
    minerals: ['Cuarzo', 'Pirofilita', 'Baritina'],
  },
  {
    num: '#325',
    microns: '44 µm',
    industries: [
      { name: 'Sanitarios (WC/lavabos)', desc: 'Requisito de malla estándar para pasta de porcelana sanitaria de primera calidad.' },
      { name: 'Porcelana técnica', desc: 'Componente fundente en piezas de baja absorción y alta densidad.' },
    ],
    minerals: ['Feldespato Potásico', 'Albita', 'Cuarzo'],
  },
  {
    num: '#200',
    microns: '74 µm',
    industries: [
      { name: 'Cerámica de revestimiento', desc: 'Mezclas de cuerpo cerámico para gres y azulejos de alta resistencia.' },
      { name: 'Vidrio especial', desc: 'Fusiones de SiO₂ de alta pureza para borosilicato y vidrio neutro.' },
    ],
    minerals: ['Cuarzo', 'Albita', 'Baritina', 'Pirofilita'],
  },
  {
    num: '#120',
    microns: '125 µm',
    industries: [
      { name: 'Fundición', desc: 'Arena de moldeo para fundición en hierro y acero con tolerancias de dilatación térmica.' },
      { name: 'Vidrio plano', desc: 'Formulación de batch industrial para vidrio float de construcción.' },
    ],
    minerals: ['Cuarzo'],
  },
  {
    num: '#100',
    microns: '149 µm',
    industries: [
      { name: 'Porcelana eléctrica', desc: 'Componente refractario en aisladores de alta tensión (norma IEC 60672).' },
      { name: 'Agroquímicos', desc: 'Soporte y diluyente en formulaciones de insecticidas en polvo.' },
    ],
    minerals: ['Pirofilita', 'Feldespato Potásico'],
  },
  {
    num: '#30/80',
    microns: '595 – 177 µm',
    industries: [
      { name: 'Filtración de agua', desc: 'Lecho filtrante en sistemas de tratamiento de aguas potables e industriales.' },
      { name: 'Construcción', desc: 'Árido fino en morteros, hormigones ligeros y revoques.' },
    ],
    minerals: ['Cuarzo'],
  },
  {
    num: '#8/20',
    microns: '2380 – 850 µm',
    industries: [
      { name: 'Fracturación hidráulica (Fracking)', desc: 'Arena propante de alta resistencia a la compresión para mantenimiento de fracturas.' },
      { name: 'Filtros de piscinas', desc: 'Arena filtrante certificada para sistemas de recirculación de agua.' },
    ],
    minerals: ['Cuarzo', 'Chamote'],
  },
];

/* ============================================================
   ROUTER & ENGINE
   ============================================================ */

let cachedMapIframe = null;

function getMapIframe() {
  if (!cachedMapIframe) {
    cachedMapIframe = document.createElement('iframe');
    cachedMapIframe.className = 'map-iframe';
    // Satellite view (t=k), zoom 16 (z=16), embedded output
    cachedMapIframe.src = 'https://maps.google.com/maps?q=-32.547091,-65.634628&t=k&z=16&output=embed';
    cachedMapIframe.width = '100%';
    cachedMapIframe.height = '100%';
    cachedMapIframe.style.border = '0';
    cachedMapIframe.allowFullscreen = '';
    cachedMapIframe.loading = 'lazy';
    cachedMapIframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
    
    // Create a hidden persistent container on body to keep iframe loaded in background
    let holder = document.getElementById('persistent-map-holder');
    if (!holder) {
      holder = document.createElement('div');
      holder.id = 'persistent-map-holder';
      holder.style.display = 'none';
      document.body.appendChild(holder);
    }
  }
  return cachedMapIframe;
}

function navigate(path) {
  // Use relative page state parameter navigation to avoid breaking file:// protocol
  history.pushState({}, '', path);
  window.scrollTo({ top: 0, behavior: 'instant' });
  closeMobileMenu(); // Close mobile drawer if open
  render();
}

function render() {
  // Move map iframe to persistent hidden holder before destroying the current view
  const map = getMapIframe();
  const holder = document.getElementById('persistent-map-holder');
  if (holder && map && map.parentNode !== holder) {
    holder.appendChild(map);
  }

  const params = new URLSearchParams(window.location.search);
  const view = params.get('view');
  const mineral = params.get('mineral');

  const container = document.getElementById('dynamic-content');
  const navLinks = document.querySelectorAll('#topbar nav a[data-view], .mobile-drawer-nav a[data-view]');

  // Fallback checks: If URL is just "/" or empty view search parameters, default to "inicio"
  const activeView = view || (mineral ? '' : 'inicio');

  // Update active nav link indicator
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.view === activeView);
  });

  // Dynamic routing triggers
  if (mineral && MINERALS[mineral]) {
    renderMineralDetail(container, mineral);
  } else {
    switch (activeView) {
      case 'nosotros':
        renderNosotros(container);
        break;
      case 'servicios':
        renderServicios(container);
        break;
      case 'yacimientos':
        renderYacimientos(container);
        break;
      case 'mallas':
        renderMallas(container);
        break;
      case 'calidad':
        renderCalidad(container);
        break;
      case 'equipos':
        renderEquipos(container);
        break;
      case 'contacto':
        renderContacto(container);
        break;
      case 'inicio':
      default:
        renderHome(container);
        break;
    }
  }

  // Set visual states statically
  initDynamicBehaviors(container);
}

function initDynamicBehaviors(container) {
  const el = container.querySelector('.view-container');
  if (el) {
    el.classList.add('visible');
  }

  // Inject persistent map iframe to avoid reloading
  const mapPlaceholder = container.querySelector('#map-iframe-placeholder');
  if (mapPlaceholder) {
    mapPlaceholder.appendChild(getMapIframe());
  }

  const counters = container.querySelectorAll('[data-count]');
  counters.forEach(el => {
    el.textContent = el.dataset.count;
  });

  const tlItems = container.querySelectorAll('.tl-item');
  tlItems.forEach(el => {
    el.classList.add('active');
  });

  // Toggle para la galería de fotos expandible
  const btnToggleGallery = container.querySelector('#btn-toggle-gallery');
  if (btnToggleGallery) {
    btnToggleGallery.addEventListener('click', () => {
      const isExpanded = btnToggleGallery.classList.toggle('expanded');
      const hiddenPhotos = container.querySelectorAll('.hidden-photo');
      hiddenPhotos.forEach(photo => {
        photo.style.display = isExpanded ? 'block' : 'none';
      });
      btnToggleGallery.textContent = isExpanded ? 'Ver menos fotos' : 'Ver todas las fotos';
    });
  }
}

/* ============================================================
   VIEW: INICIO (HOME)
   ============================================================ */
function renderHome(container) {
  container.innerHTML = `
    <div class="view-container">
      <!-- HERO -->
      <section class="hero">
        <div class="bg">
          <img src="assets/operacion-frente-cantera.jpeg" alt="Frente de cantera Voladuras San Luis">
          <div class="overlay"></div>
          <div class="grid-overlay"></div>
          <div class="accent-line"></div>
        </div>
        <div class="hero-content">
          <div class="tag">San Luis · Argentina</div>
          <h1>
            Molienda &amp; Voladuras<br>
            <span>de Minerales</span>
            <span class="thin">40+ años de precisión en procesamiento de no metalíferos</span>
          </h1>
          <p>
            Procesamiento de feldespato, cuarzo, albita y pirofilita en granulometrías certificadas para minería e industria de alta complejidad.
          </p>
          <div class="hero-buttons">
            <a href="?view=servicios" onclick="event.preventDefault(); window.navigate('?view=servicios')" class="btn btn-primary">Nuestros servicios</a>
            <a href="?view=contacto" onclick="event.preventDefault(); window.navigate('?view=contacto')" class="btn btn-outline">Contacto técnico</a>
          </div>
        </div>
        <div class="hero-scroll"><span></span></div>
      </section>

      <!-- STATS -->
      <section class="stats-section">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="icon"><img src="assets/icon-experiencia.svg" alt="Experiencia"></div>
            <span class="stat-kicker">Experiencia</span>
            <div class="number-row">
              <span class="number" data-count="40">40</span><span class="suffix">+</span>
            </div>
            <div class="label">Años de Trayectoria</div>
          </div>
          <div class="stat-card">
            <div class="icon"><img src="assets/icon-mineria.svg" alt="Perforación"></div>
            <span class="stat-kicker">Perforación</span>
            <div class="number-row">
              <span class="number" data-count="10">10</span><span class="suffix">+</span>
            </div>
            <div class="label">Perforadoras Activas</div>
          </div>
          <div class="stat-card">
            <div class="icon"><img src="assets/icon-ingenieria.svg" alt="Vehículos"></div>
            <span class="stat-kicker">Vehículos</span>
            <div class="number-row">
              <span class="number" data-count="12">12</span>
            </div>
            <div class="label">Vehículos en Flota</div>
          </div>
          <div class="stat-card">
            <div class="icon"><img src="assets/icon-experiencia.svg" alt="Clientes"></div>
            <span class="stat-kicker">Clientes</span>
            <div class="number-row">
              <span class="number" data-count="5">5</span><span class="suffix">+</span>
            </div>
            <div class="label">Clientes B2B Activos</div>
          </div>
        </div>
      </section>

      <!-- PROTOTYPE GALLERY GRID (MASSIVE IMAGES OPTIMIZATION) -->
      <section class="section-view">
        <div class="view-header">
          <h2>Galería Fotográfica <span>de Cantera y Planta</span></h2>
          <p>Compilación de imágenes de la cantera, planta de molienda y flota.</p>
        </div>
        <div class="gallery-grid" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;">
          <!-- Primeras 3 fotos visibles inicialmente -->
          <div>
            <img src="assets/operacion-frente-cantera.jpeg" alt="Frente de Cantera" style="height:220px; width:100%; object-fit:cover;">
            <p style="font-size:11px; color:var(--text-dark); margin-top:6px; text-transform:uppercase; font-weight:700;">Frente de Cantera</p>
          </div>
          <div>
            <img src="assets/planta-molienda.jpg" alt="Planta de Molienda" style="height:220px; width:100%; object-fit:cover;">
            <p style="font-size:11px; color:var(--text-dark); margin-top:6px; text-transform:uppercase; font-weight:700;">Planta de Molienda</p>
          </div>
          <div>
            <img src="assets/despacho-granel-silos.jpg" alt="Vista aérea de las instalaciones" style="height:220px; width:100%; object-fit:cover;">
            <p style="font-size:11px; color:var(--text-dark); margin-top:6px; text-transform:uppercase; font-weight:700;">Vista Aérea de las Instalaciones</p>
          </div>

          <!-- Resto de fotos ocultas por defecto -->
          <div class="hidden-photo" style="display: none;">
            <img src="assets/operacion-cargadora.jpg" alt="Perforadora Sandvik Ranger DX800R" style="height:220px; width:100%; object-fit:cover;">
            <p style="font-size:11px; color:var(--text-dark); margin-top:6px; text-transform:uppercase; font-weight:700;">Perforadora Sandvik Ranger DX800R</p>
          </div>
          <div class="hidden-photo" style="display: none;">
            <img src="assets/rampa-transporte.jpeg" alt="Zaranda" style="height:220px; width:100%; object-fit:cover;">
            <p style="font-size:11px; color:var(--text-dark); margin-top:6px; text-transform:uppercase; font-weight:700;">Zaranda</p>
          </div>
          <div class="hidden-photo" style="display: none;">
            <img src="assets/perforadora-sandvik.jpeg" alt="Pala Cargadora" style="height:220px; width:100%; object-fit:cover;">
            <p style="font-size:11px; color:var(--text-dark); margin-top:6px; text-transform:uppercase; font-weight:700;">Pala Cargadora en Cantera</p>
          </div>
          <div class="hidden-photo" style="display: none;">
            <img src="assets/lineas-despacho-b2b.jpg" alt="Depósito, taller y molino autógeno" style="height:220px; width:100%; object-fit:cover;">
            <p style="font-size:11px; color:var(--text-dark); margin-top:6px; text-transform:uppercase; font-weight:700;">Depósito, Taller y Molino Autógeno</p>
          </div>
          <div class="hidden-photo" style="display: none;">
            <img src="assets/operacion-nocturna.jpg" alt="Instalaciones Generales" style="height:220px; width:100%; object-fit:cover;">
            <p style="font-size:11px; color:var(--text-dark); margin-top:6px; text-transform:uppercase; font-weight:700;">Instalaciones Generales</p>
          </div>
          <div class="hidden-photo" style="display: none;">
            <img src="assets/naves-trituracion.jpg" alt="Naves de Trituración" style="height:220px; width:100%; object-fit:cover;">
            <p style="font-size:11px; color:var(--text-dark); margin-top:6px; text-transform:uppercase; font-weight:700;">Naves de Trituración</p>
          </div>
          <div class="hidden-photo" style="display: none;">
            <img src="assets/operacion-nocturna-real.jpg" alt="Operación Nocturna" style="height:220px; width:100%; object-fit:cover;">
            <p style="font-size:11px; color:var(--text-dark); margin-top:6px; text-transform:uppercase; font-weight:700;">Operación Nocturna</p>
          </div>
          <div class="hidden-photo" style="display: none;">
            <img src="assets/perforadora-orugas.jpg" alt="Planta de trituración" style="height:220px; width:100%; object-fit:cover;">
            <p style="font-size:11px; color:var(--text-dark); margin-top:6px; text-transform:uppercase; font-weight:700;">Planta de Trituración</p>
          </div>
          <div class="hidden-photo" style="display: none;">
            <img src="assets/deposito-con-maquina.jpg" alt="Depósito General" style="height:220px; width:100%; object-fit:cover;">
            <p style="font-size:11px; color:var(--text-dark); margin-top:6px; text-transform:uppercase; font-weight:700;">Depósito General</p>
          </div>
          <div class="hidden-photo" style="display: none;">
            <img src="assets/frente-pizarra-mineral.jpeg" alt="Frente Pizarra" style="height:220px; width:100%; object-fit:cover;">
            <p style="font-size:11px; color:var(--text-dark); margin-top:6px; text-transform:uppercase; font-weight:700;">Frente Pizarra Mineral</p>
          </div>
          <div class="hidden-photo" style="display: none;">
            <img src="assets/laboratorio-fuera.jpg" alt="Laboratorio Exterior" style="height:220px; width:100%; object-fit:cover;">
            <p style="font-size:11px; color:var(--text-dark); margin-top:6px; text-transform:uppercase; font-weight:700;">Laboratorio de Molienda</p>
          </div>
          <div class="hidden-photo" style="display: none;">
            <img src="assets/cantera-calizo.jpg" alt="Yacimiento Calizo" style="height:220px; width:100%; object-fit:cover;">
            <p style="font-size:11px; color:var(--text-dark); margin-top:6px; text-transform:uppercase; font-weight:700;">Yacimiento Calizo</p>
          </div>
          <div class="hidden-photo" style="display: none;">
            <img src="assets/reservas-vista-aerea.jpg" alt="Reservas de explotación" style="height:220px; width:100%; object-fit:cover;">
            <p style="font-size:11px; color:var(--text-dark); margin-top:6px; text-transform:uppercase; font-weight:700;">Reservas de Explotación</p>
          </div>
          <div class="hidden-photo" style="display: none;">
            <img src="assets/camion-transporte.png" alt="Camión Logística B2B" style="height:220px; width:100%; object-fit:cover;">
            <p style="font-size:11px; color:var(--text-dark); margin-top:6px; text-transform:uppercase; font-weight:700;">Logística y Transporte B2B</p>
          </div>
        </div>

        <div class="gallery-toggle-container" style="text-align: center; margin-top: 32px;">
          <button id="btn-toggle-gallery" class="btn btn-outline">Ver todas las fotos</button>
        </div>
      </section>

      <!-- MAPA INTERACTIVO (UBICACIÓN PLANTA) -->
      <section class="section-view" style="padding-top: 0; padding-bottom: 48px;">
        <span class="view-kicker">Nuestra Ubicación</span>
        <div class="view-header" style="margin-bottom: 32px;">
          <h2>Planta Industrial <span>Villa de Praga</span></h2>
        </div>
        <div class="contact-grid">
          <!-- Columna Izquierda: Información de Planta -->
          <div class="plant-info-panel">
            <p style="font-size: 15px; color: var(--text-gray); line-height: 1.7; margin-bottom: 24px;">
              Ubicación geoestratégica de nuestra planta de molienda y procesamiento de minerales en la provincia de San Luis.
            </p>
            <div style="display: flex; flex-direction: column; gap: 20px;">
              <div style="display: flex; gap: 12px; align-items: flex-start;">
                <svg style="color: var(--gold); flex-shrink: 0; margin-top: 2px;" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <div>
                  <strong style="color: var(--text-white); font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 4px;">Dirección Física</strong>
                  <span style="font-size: 14px; color: var(--text-gray);">Ruta Provincial 2, Villa de Praga, San Luis, Argentina</span>
                </div>
              </div>
              <div style="display: flex; gap: 12px; align-items: flex-start;">
                <svg style="color: var(--gold); flex-shrink: 0; margin-top: 2px;" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <div>
                  <strong style="color: var(--text-white); font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 4px;">Logística Comercial B2B</strong>
                  <span style="font-size: 14px; color: var(--text-gray);">Acceso apto para vehículos de carga pesada y bitrenes.</span>
                </div>
              </div>
            </div>
          </div>
          <!-- Columna Derecha: Mapa Compacto -->
          <div class="map-card" style="height: 280px;">
            <div class="map-wrapper" id="map-iframe-placeholder">
              <!-- Persistent map iframe will be injected here dynamically -->
            </div>
            <div class="map-footer-bar" style="padding: 8px 16px;">
              <a href="https://maps.app.goo.gl/qtoToUGA3w9KLLGg7" target="_blank" rel="noopener" class="map-link-btn">
                <span>Abrir en Google Maps</span>
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

/* ============================================================
   VIEW: NOSOTROS
   ============================================================ */
function renderNosotros(container) {
  container.innerHTML = `
    <div class="view-container">
      <section class="section-view">
        <span class="view-kicker">Sobre Nosotros</span>
        <div class="view-header">
          <h1>Una Empresa con <span>Trayectoria Minera</span></h1>
          <p>Operando de forma ininterrumpida desde 1984 en la provincia de San Luis, Argentina.</p>
        </div>
        
        <div class="about-grid">
          <!-- NOSOTROS PHOTO GRID -->
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <img src="assets/naves-trituracion.jpg" alt="Molienda" style="width:100%; height:180px; object-fit:cover; border:1px solid #333;">
            <img src="assets/camion-carga-mineral.jpg" alt="Camión cargado con mineral" style="width:100%; height:180px; object-fit:cover; border:1px solid #333;">
            <img src="assets/rampa-transporte.jpeg" alt="Acceso" style="width:100%; height:180px; object-fit:cover; border:1px solid #333;">
            <img src="assets/yacimiento-calizo.jpeg" alt="Yacimiento Calizo" style="width:100%; height:180px; object-fit:cover; border:1px solid #333;">
          </div>
          
          <div class="text">
            <h3>Voladuras San Luis S.R.L.</h3>
            <p>
              Somos una organización dedicada al procesamiento de minerales no metalíferos e ingeniería en perforaciones y voladuras. Proveemos materias primas críticas bajo normas de calidad rigurosas para la industria de la cerámica sanitaria, el vidrio de alta blancura, materiales refractarios y cargas viales.
            </p>
            <p>
              Nuestra planta principal de procesamiento y molienda está estratégicamente situada al sureste de Villa de Praga, Departamento Libertador General San Martín, provincia de San Luis. Desde allí, garantizamos un control estricto de granulometría (Tamizado Tyler) y pureza química (remoción ferrosa magnética).
            </p>
            
            <div class="feature">
              <div class="dot"></div>
              <span>40 años liderando el abastecimiento minero en Cuyo.</span>
            </div>
            <div class="feature">
              <div class="dot"></div>
              <span>Habilitación y flota autorizada para el transporte de sustancias peligrosas.</span>
            </div>
            <div class="feature">
              <div class="dot"></div>
              <span>Protocolo estricto de seguridad operativa y sustentabilidad ambiental.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

/* ============================================================
   VIEW: SERVICIOS
   ============================================================ */
function renderServicios(container) {
  container.innerHTML = `
    <div class="view-container">
      <section class="section-view">
        <span class="view-kicker">Especialidades Industriales</span>
        <div class="view-header">
          <h1>Nuestra <span>Especialidad</span></h1>
          <p>Molienda de alta pureza, trituración de materias primas y logística de fletes para el abastecimiento continuo de su industria.</p>
        </div>
        
        <div class="services-grid">
          <div class="service-card" style="padding-top:20px;">
            <img src="assets/planta-molienda.jpg" alt="Molienda" style="width:100%; height:150px; object-fit:cover; margin-bottom:20px; border:1px solid #1a1a1a;">
            <div class="num">01</div>
            <h3>Molienda de Minerales</h3>
            <p>
              Molienda seca controlada de cuarzo, feldespato, albita y pirofilita. Granulometrías desde malla #8/20 hasta malla #400 Tyler con remoción ferrosa magnética.
            </p>
            <a href="?view=yacimientos" onclick="event.preventDefault(); window.navigate('?view=yacimientos')" class="arrow">Ver yacimientos →</a>
          </div>
          
          <div class="service-card" style="padding-top:20px;">
            <img src="assets/naves-trituracion.jpg" alt="Trituración" style="width:100%; height:150px; object-fit:cover; margin-bottom:20px; border:1px solid #1a1a1a;">
            <div class="num">02</div>
            <h3>Trituración de Minerales</h3>
            <p>
              Trituración primaria y secundaria con mandíbulas y conos de alta capacidad. Reducción exacta del mineral en bruto para procesos industriales posteriores.
            </p>
            <span class="arrow">Procesamiento continuo</span>
          </div>
          
          <div class="service-card" style="padding-top:20px;">
            <img src="assets/camion-transporte.png" alt="Fletes y Transporte" style="width:100%; height:150px; object-fit:cover; margin-bottom:20px; border:1px solid #1a1a1a;">
            <div class="num">03</div>
            <h3>Servicios de Fletes</h3>
            <p>
              Logística y transporte de mineral a granel y en big-bags. Flota de camiones propia y habilitada para distribución industrial segura en todo el país.
            </p>
            <span class="arrow">Distribución nacional</span>
          </div>
        </div>
      </section>
    </div>
  `;
}

/* ============================================================
   VIEW: EQUIPOS & TRAYECTORIA
   ============================================================ */
function renderEquipos(container) {
  container.innerHTML = `
    <div class="view-container">
      <!-- EQUIPOS -->
      <section class="section-view">
        <span class="view-kicker">Flota y Capacidad</span>
        <div class="view-header">
          <h1>Equipos <span>y Maquinaria</span></h1>
          <p>Equipamiento industrial propio que asegura autonomía y continuidad en proyectos de gran envergadura.</p>
        </div>
        
        <!-- PROTOTYPE MACHINERY BANNER GRID -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:48px;">
          <img src="assets/perforadora-sandvik.jpeg" alt="Sandvik DX680" style="width:100%; height:260px; object-fit:cover; border:1px solid #333;">
          <img src="assets/flota-cargadora-semirremolques.jpg" alt="Flota Pesada de Cargadoras" style="width:100%; height:260px; object-fit:cover; border:1px solid #333;">
        </div>

        <div class="equipment-grid">
          <div class="eq-card">
            <div class="cat">Perforación</div>
            <ul>
              <li><strong>Sandvik Ranger 500</strong><br>5 unidades · Ensayos de frentes</li>
              <li><strong>Sandvik DX 680</strong><br>3 unidades · Alta productividad</li>
              <li><strong>Sandvik DX 800</strong><br>1 unidad · Mod. 2023</li>
              <li><strong>Furukawa HCR 910 DS</strong><br>Perforadora de orugas rápida</li>
            </ul>
          </div>
          
          <div class="eq-card">
            <div class="cat">Compresores</div>
            <ul>
              <li><strong>Motocompresor 900Q</strong><br>Presión constante en frentes</li>
              <li><strong>Sullair 185Q-JD</strong><br>4 unidades · Equipos portátiles 2019</li>
            </ul>
          </div>
          
          <div class="eq-card">
            <div class="cat">Logística Vial</div>
            <ul>
              <li><strong>Toyota Hilux 4x4</strong><br>6 unidades · Apoyo logístico cantera</li>
              <li><strong>Camiones Scania / Iveco</strong><br>Flota autorizada para explosivos</li>
              <li><strong>Semirremolques Randon</strong><br>Despacho directo de big-bags</li>
            </ul>
          </div>
          
          <div class="eq-card">
            <div class="cat">Mov. de Suelos</div>
            <ul>
              <li><strong>Caterpillar 212</strong><br>Motoniveladora · Conservación</li>
              <li><strong>Komatsu PC200-7 / PC300</strong><br>Retroexcavadoras de cantera</li>
              <li><strong>John Deere JD 200 GLC</strong><br>Retroexcavadora heavy mod. 2023</li>
              <li><strong>SDLG Loader</strong><br>Cargadora frontal 2019</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  `;
}

/* ============================================================
   VIEW: CONTACTO
   ============================================================ */
function renderContacto(container) {
  container.innerHTML = `
    <div class="view-container">
      <section class="section-view">
        <span class="view-kicker">Canales de Atención</span>
        <div class="view-header">
          <h1>Comunicate con <span>Nosotros</span></h1>
          <p>Solicitudes de cotización comercial B2B, fichas técnicas específicas y asesoría en frentes de voladura.</p>
        </div>
        
        <div class="contact-grid">
          <div class="contact-info">
            <h3>Voladuras San Luis S.R.L.</h3>
            <p>
              Nuestro equipo comercial y de soporte técnico atiende los requerimientos industriales de todo el país. Para solicitar cotizaciones de lotes o programar visitas técnicas a la planta de Villa de Praga, completá el formulario de cotización o contactanos directamente.
            </p>
            
            <div class="detail">
              <div class="txt">
                <strong>Planta Industrial</strong>
                Villa de Praga, Dpto. Libertador Gral. San Martín, San Luis, Argentina.
              </div>
            </div>
            
            <div class="detail">
              <div class="txt">
                <strong>Teléfono Comercial B2B</strong>
                +54 9 2665 00-9836 (Oficina Molienda) · Lunes a Viernes de 8:00 a 17:00hs.
              </div>
            </div>
            
            <div class="detail">
              <div class="txt">
                <strong>Correo Electrónico</strong>
                voladurasssanluis@gmail.com · moliendavsl@gmail.com
              </div>
            </div>
            
            <div class="detail">
              <div class="txt">
                <strong>Atención Comercial</strong>
                Despachos a granel, Big-bags (1.5 TN) y bolsas de 25 kg. Logística nacional.
              </div>
            </div>
          </div>
          
          <!-- PHOTO AND ADVANCED GOOGLE MAP CARD -->
          <div style="display:grid; grid-template-columns:1fr; gap:16px;">
            <img src="assets/instalaciones-planta.jpg" alt="Instalaciones de Planta Voladuras San Luis" style="width: 100%; height: 180px; object-fit:cover; border:1px solid var(--border); border-radius: 8px;">
            <div class="map-card" style="height: 240px;">
              <div class="map-wrapper" id="map-iframe-placeholder">
                <!-- Persistent map iframe will be injected here dynamically -->
              </div>
              <div class="map-footer-bar" style="padding: 8px 12px;">
                <div class="map-address-info" style="font-size: 11px;">
                  <svg class="map-pin-icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <span>Villa de Praga, San Luis</span>
                </div>
                <a href="https://maps.app.goo.gl/qtoToUGA3w9KLLGg7" target="_blank" rel="noopener" class="map-link-btn" style="font-size: 10px;">
                  <span>Ver Mapa</span>
              <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

/* ============================================================
   VIEW: MINERALES (CATALOGO COMPLETO)
   ============================================================ */
function renderYacimientos(container) {
  const ALL_MINERALS = [
    { key: 'cuarzo', type: 'yacimiento' },
    { key: 'feldespato_potosico', type: 'yacimiento' },
    { key: 'fluorita', type: 'yacimiento' },
    { key: 'albita', type: 'maquila' },
    { key: 'pirofilita', type: 'maquila' },
    { key: 'baritina', type: 'maquila' },
    { key: 'chamote', type: 'maquila' }
  ];

  let mineralIndex = 1;
  const cards = ALL_MINERALS.map((item) => {
    const m = MINERALS[item.key];
    if (!m) return '';
    
    let kicker = '';
    if (item.type === 'yacimiento') {
      kicker = `0${mineralIndex++} — Cantera Propia`;
    } else {
      kicker = 'Otros Yacimientos';
    }

    return `
      <a
        class="mineral-card"
        href="?mineral=${item.key}"
        id="card-${item.key}"
        onclick="event.preventDefault(); window.navigate('?mineral=${item.key}')"
        aria-label="Ver detalles de ${m.name}">
        <span class="mineral-index">${kicker}</span>
        <img src="${m.img}" alt="${m.name}" class="mineral-card-img">
        <h3>${m.name}</h3>
        <span class="mineral-formula">${m.formula}</span>
        <div class="mineral-tags">
          ${m.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
        <div class="card-cta">
          Ver ficha técnica <span>→</span>
        </div>
      </a>
    `;
  });

  const ctaCard = `
    <a
      class="mineral-card card-cta-special"
      href="?contacto"
      onclick="event.preventDefault(); window.navigate('?view=contacto')"
      aria-label="Consultar por otro mineral">
      <div class="special-icon">?</div>
      <h3>¿Busca otro mineral?</h3>
      <p>Buscamos frentes o adaptamos nuestra molienda seca a su requerimiento industrial específico.</p>
      <div class="card-cta">
        CONTACTAR <span>→</span>
      </div>
    </a>
  `;

  cards.push(ctaCard);

  container.innerHTML = `
    <div class="view-container">
      <div class="section-view">
        <span class="view-kicker">Capacidad Industrial y Yacimientos</span>
        <div class="view-header" style="margin-bottom: 40px;">
          <h1>Yacimientos <span>y Molienda</span></h1>
          <div style="margin-top: 24px;">
            <p style="max-width: 850px; font-size: 15px; color: var(--text-gray); line-height: 1.8;">
              Explotamos yacimientos propios de <strong>Cuarzo</strong>, <strong>Feldespato</strong> y <strong>Fluorita</strong> bajo rigurosos controles de calidad. Contamos además con la capacidad técnica para procesar a maquila (toll milling) cualquier otro mineral industrial, o buscar y abastecer el recurso específico que su proyecto requiera.
            </p>
          </div>
        </div>

        <div class="minerals-grid" role="list" style="margin-bottom: 60px;">
          ${cards.join('')}
        </div>
      </div>
    </div>
  `;
}

/* ============================================================
   VIEW: MINERAL DETAIL (FICHA INDIVIDUAL)
   ============================================================ */
function renderMineralDetail(container, key) {
  const m = MINERALS[key];
  const rows = m.specs.map((s, i) => `
    <tr>
      <td>${s.param}</td>
      <td>${s.value}</td>
    </tr>
  `).join('');

  container.innerHTML = `
    <div class="view-container">
      <div class="mineral-detail-view" id="main-content-target">
        <button
          class="back-btn"
          onclick="window.navigate('?view=yacimientos')"
          aria-label="Volver a yacimientos">
          <span class="arrow-char" aria-hidden="true">←</span> Volver a yacimientos
        </button>
        <div class="mineral-hero" style="display:grid; grid-template-columns:1.5fr 1fr; gap:40px; align-items:start;">
          <div>
            <h1 class="mh-name">${m.name}</h1>
            <span class="mh-formula">${m.formula}</span>
            <p class="mh-desc">${m.description}</p>
          </div>
          <!-- PRODUCT BIG DRAWING / PHOTO -->
          <img src="${m.img}" alt="${m.name}" class="mineral-detail-img">
        </div>
        <table class="specs-table" aria-label="Especificaciones de ${m.name}">
          <thead>
            <tr>
              <th scope="col">Parámetro de control</th>
              <th scope="col">Especificación garantizada</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
        
        <div style="margin-top: 24px;">
          <span class="view-kicker">Sectores de Aplicación</span>
          <div class="mineral-tags" style="display:flex; flex-wrap:wrap; gap:8px; margin-top:12px;">
            ${m.industries.map(ind => `<span class="tag">${ind}</span>`).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ============================================================
   VIEW: MALLAS
   ============================================================ */
function renderMallas(container) {
  const buttons = MALLAS.map((m, i) => `
    <button
      class="malla-btn"
      id="malla-btn-${i}"
      onclick="selectMalla(${i})"
      aria-pressed="${i === 0 ? 'true' : 'false'}"
      aria-label="Malla ${m.num}, ${m.microns}">
      <span class="mb-num">${m.num}</span>
    </button>
  `).join('');

  const details = MALLAS.map((m, i) => `
    <div class="malla-info ${i === 0 ? 'active' : ''}" id="malla-info-${i}" role="tabpanel">
      <div class="malla-detail-header">
        <span class="mi-num">${m.num}</span>
        <span class="mi-size">${m.microns} — Apertura Nominal de Malla Tyler</span>
      </div>
      
      <div class="malla-detail-grid">
        <div class="malla-apps-column">
          <span class="malla-column-label">Aplicaciones Industriales B2B</span>
          <div class="malla-industries-list">
            ${m.industries.map(ind => `
              <div class="malla-industry-card">
                <h4 class="ind-name">${ind.name}</h4>
                <p class="ind-desc">${ind.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="malla-minerals-column">
          <span class="malla-column-label">Minerales Disponibles</span>
          <div class="malla-badges-container">
            ${m.minerals.map(mn => `<span class="malla-badge">${mn}</span>`).join('')}
          </div>
        </div>
      </div>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="view-container">
      <section class="section-view" style="padding-top: 48px;">
        <div class="mallas-view" id="main-content-target">
          <div class="view-header">
            <span class="view-kicker">Distribución Granulométrica</span>
            <h1>Especificaciones por Malla</h1>
            <p>Seleccioná la malla Tyler de corte para visualizar sus aplicaciones B2B más comunes y los minerales disponibles.</p>
          </div>
          <div class="mallas-layout">
            <div class="mallas-sidebar" role="tablist" aria-label="Mallas industriales">
              <span class="sidebar-label">Tamizado Tyler</span>
              <div class="mallas-tabs-container">
                ${buttons}
                <a href="https://docs.google.com/spreadsheets/d/1juUnuY_5T-_FnfxprSMYXW5rkKroizDF2ktayy2oJR8/edit?usp=sharing" class="malla-btn-action" target="_blank" title="Ver catálogo completo en Google Sheets">
                  <span>Ver todo</span>
                </a>
              </div>
            </div>
            <div class="mallas-detail">
              ${details}
            </div>
          </div>
          
          <!-- ADDITIONAL PHOTOS FOR MALLAS -->
          <div style="margin-top: 60px; border-top: 1px solid var(--border); padding-top: 40px;">
            <span class="view-kicker">Procesamiento Industrial</span>
            <h3 style="font-size:24px; color:var(--text-white); margin-bottom:20px; font-weight:800; letter-spacing:-0.02em;">Control de Tamizado y Clasificación en Planta</h3>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
              <div>
                <img src="assets/ceramica-sanitaria-conos.jpg" alt="Cerámica sanitaria" style="width:100%; height:260px; object-fit:cover; border:1px solid var(--border-strong);">
                <p style="font-size:11px; color:var(--text-gray); margin-top:8px; text-transform:uppercase; font-weight:700; letter-spacing:0.05em;">Aplicación en Cerámica Sanitaria</p>
              </div>
              <div>
                <img src="assets/galpones-stock-lotes.jpg" alt="Stock en Galpones" style="width:100%; height:260px; object-fit:cover; border:1px solid var(--border-strong);">
                <p style="font-size:11px; color:var(--text-gray); margin-top:8px; text-transform:uppercase; font-weight:700; letter-spacing:0.05em;">Lotes Clasificados Listos para Despacho</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
  setTimeout(() => selectMalla(0), 0);
}

function selectMalla(index) {
  const allBtns = document.querySelectorAll('.malla-btn');
  const allInfos = document.querySelectorAll('.malla-info');

  allBtns.forEach((btn, i) => {
    btn.classList.toggle('active', i === index);
    btn.setAttribute('aria-pressed', i === index ? 'true' : 'false');
  });

  allInfos.forEach((info, i) => {
    if (i === index) {
      info.classList.add('active');
    } else {
      info.classList.remove('active');
    }
  });
}

/* ============================================================
   VIEW: CALIDAD
   ============================================================ */
function renderCalidad(container) {
  const qualityCards = [
    { num: '100%', unit: 'Rastreabilidad de lote', title: 'Trazabilidad total batch-a-batch', desc: 'Cada bolsa y big-bag lleva código de lote rastreable hasta el informe analítico del laboratorio.' },
    { num: 'FRX', unit: 'Rayos X Cuantitativos', title: 'Fluorescencia elemental', desc: 'Método primario para la cuantificación exacta de Fe₂O₃, Al₂O₃, K₂O, Na₂O, SiO₂ y óxidos acompañantes.' },
    { num: 'ISO', unit: 'Protocolos internacionales', title: 'Normas ISO 2470 / 787 / 9277', desc: 'Medición espectrofotométrica de blancura, distribución granulométrica y superficie específica.' }
  ].map((c, i) => `
    <div class="quality-card">
      <span class="qc-num">${c.num}</span>
      <span class="qc-unit">${c.unit}</span>
      <h4>${c.title}</h4>
      <p>${c.desc}</p>
    </div>
  `).join('');

  const labParams = [
    { name: 'Blancura (ISO 2470)', value: '> 92° ISO', method: 'Espectrofotómetro de reflectancia d/8°' },
    { name: 'Fe₂O₃ (Cero Hierro)', value: '< 0.015%', method: 'FRX / Espectrometría de plasma (ICP)', showChart: true },
    { name: 'Tamizado Tyler', value: '±2% retención máx.', method: 'Tamizado húmedo rotativo' },
    { name: 'Humedad de despacho', value: '< 0.5%', method: 'Termobalanza infrarroja a 105°C' }
  ].map((p, i) => `
    <div class="lab-param ${p.showChart ? 'has-inline-chart' : ''}">
      <span class="lp-name">${p.name}</span>
      <span class="lp-value">${p.value}</span>
      <span class="lp-method">${p.method}</span>
      ${p.showChart ? `
        <div class="inline-comparison-chart">
          <div class="icc-bar-group">
            <div class="icc-label-row">
              <span>Tolerancia de la Industria</span>
              <span>0.100%</span>
            </div>
            <div class="icc-bar-track">
              <div class="icc-bar-fill bar-industry" style="width: 100%;"></div>
            </div>
          </div>
          <div class="icc-bar-group">
            <div class="icc-label-row">
              <span>Especificación Voladuras San Luis</span>
              <span class="vsl-val">&lt; 0.015%</span>
            </div>
            <div class="icc-bar-track">
              <div class="icc-bar-fill bar-vsl" style="width: 15%;"></div>
            </div>
          </div>
        </div>
      ` : ''}
    </div>
  `).join('');

  container.innerHTML = `
    <div class="view-container">
      <section class="section-view" style="padding-top: 48px;">
        <div class="calidad-view" id="main-content-target">
          
          <div class="calidad-hero-compact">
            <span class="view-kicker">Laboratorio Analítico · Villa de Praga</span>
            <h1>Control y Garantía de <span>Calidad</span></h1>
            <p>
              Pureza garantizada mediante rigurosos controles de blancura técnica y cuantificación elemental.
            </p>
          </div>

          <div class="quality-tabs-container">
            <div class="quality-tabs-nav" role="tablist">
              <button class="tab-btn active" data-target="tab-garantias" role="tab" aria-selected="true" onclick="switchQualityTab(this)">
                <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                Parámetros
              </button>
              <button class="tab-btn" data-target="tab-laboratorio" role="tab" aria-selected="false" onclick="switchQualityTab(this)">
                <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M10 2v7.31L4.75 19.37A2 2 0 0 0 6.5 22h11a2 2 0 0 0 1.75-2.63L14 9.31V2"/>
                  <path d="M8.5 2h7"/>
                  <path d="M7 16h10"/>
                </svg>
                Laboratorio
              </button>
              <button class="tab-btn" data-target="tab-trazabilidad" role="tab" aria-selected="false" onclick="switchQualityTab(this)">
                <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
                Trazabilidad
              </button>
            </div>

            <div class="quality-tab-content active" id="tab-garantias" role="tabpanel">
              <div class="tab-split">
                <div class="tab-text">
                  <h3>Especificaciones Garantizadas</h3>
                  <p>
                    Purificación magnética de alta intensidad para eliminar contaminantes ferrosos y asegurar máxima blancura.
                  </p>
                  <div class="highlight-spec-box">
                    <div class="hsb-item">
                      <span class="hsb-label">Hierro Garantizado</span>
                      <span class="hsb-val">&lt; 0.015%</span>
                      <span class="hsb-desc">Máximo en cuarzo y vidrio técnico</span>
                    </div>
                    <div class="hsb-item">
                      <span class="hsb-label">Blancura Garantizada</span>
                      <span class="hsb-val">92° ISO</span>
                      <span class="hsb-desc">Medición espectrofotométrica ISO 2470-1</span>
                    </div>
                  </div>
                </div>
                <div class="tab-params-grid">
                  ${labParams}
                </div>
              </div>
            </div>

            <div class="quality-tab-content" id="tab-laboratorio" role="tabpanel">
              <div class="tab-split">
                <div class="tab-text">
                  <h3>Laboratorio en Planta</h3>
                  <p>
                    Instalaciones equipadas para el análisis físico-químico continuo de cada lote de producción:
                  </p>
                  <ul class="quality-features-list">
                    <li>
                      <strong>Análisis Granulométrico:</strong>
                      <span>Determinación precisa mediante tamizado Tyler húmedo y seco.</span>
                    </li>
                    <li>
                      <strong>Conductividad Eléctrica:</strong>
                      <span>Medición en solución para comprobar la pureza y nivel de sales del mineral.</span>
                    </li>
                    <li>
                      <strong>Muestras Industriales:</strong>
                      <span>Preparación y despacho de lotes piloto para validación en planta del cliente.</span>
                    </li>
                  </ul>
                </div>
                <div class="tab-visual">
                  <img src="assets/laboratorio-fuera.jpg" alt="Equipos de Laboratorio" class="lab-main-img">
                  <span class="img-caption">Medición Espectrofotométrica de Blancura y Alúmina</span>
                </div>
              </div>
            </div>

            <div class="quality-tab-content" id="tab-trazabilidad" role="tabpanel">
              <div class="tab-split-vertical">
                <div class="tab-intro-text">
                  <h3>Trazabilidad y Tecnología</h3>
                  <p>
                    Control riguroso desde el frente de cantera hasta la entrega final B2B del mineral.
                  </p>
                </div>
                <div class="quality-grid-wrapper">
                  ${qualityCards}
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  `;
}

function switchQualityTab(btn) {
  const buttons = document.querySelectorAll('.quality-tabs-nav .tab-btn');
  const contents = document.querySelectorAll('.quality-tab-content');
  const targetId = btn.getAttribute('data-target');
  
  buttons.forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-selected', 'false');
  });
  
  contents.forEach(c => {
    c.classList.remove('active');
  });
  
  btn.classList.add('active');
  btn.setAttribute('aria-selected', 'true');
  
  const targetEl = document.getElementById(targetId);
  if (targetEl) {
    targetEl.classList.add('active');
  }
}

// Global exposure
window.selectMalla = selectMalla;
window.navigate = navigate;
window.switchQualityTab = switchQualityTab;

/* ============================================================
   MOBILE DRAWER LOGIC
   ============================================================ */

function openMobileMenu() {
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-overlay');
  if (drawer && overlay) {
    drawer.classList.add('open');
    overlay.classList.add('open');
  }
}

function closeMobileMenu() {
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-overlay');
  if (drawer && overlay) {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
  }
}

function initDrawerListeners() {
  const menuToggle = document.getElementById('mobile-menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', openMobileMenu);
  }

  const menuClose = document.getElementById('mobile-drawer-close');
  if (menuClose) {
    menuClose.addEventListener('click', closeMobileMenu);
  }

  const overlay = document.getElementById('mobile-overlay');
  if (overlay) {
    overlay.addEventListener('click', closeMobileMenu);
  }
}

// Make globally accessible
window.closeMobileMenu = closeMobileMenu;

/* ============================================================
   INITIALIZATION
   ============================================================ */
window.addEventListener('popstate', render);
document.addEventListener('DOMContentLoaded', () => {
  initDrawerListeners();
  // Preload map iframe in background
  getMapIframe();
  render();
});
