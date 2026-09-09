# Changelog — Historial de Modificaciones del Sitio

Este documento detalla cronológicamente todos los cambios realizados en el sitio web de **Voladuras San Luis S.R.L.** (Procesamiento y Molienda de Minerales no Metalíferos) durante la sesión actual de desarrollo.

## [v1.6.0] — 2026-07-08 / 2026-07-09 (Sesión Actual)

### 🔬 Rediseño Interactivo, Simplificación y Optimización Responsiva de la Sección Calidad
* **Estructura Interactiva por Pestañas (Tabs):**
  - Rediseñamos por completo la sección en [app.js](file:///c:/Users/HuGOD777/proyectos%20practica/los-seriecitos/app.js) y organizamos la información en 3 pestañas principales: **Parámetros** (especificaciones técnicas), **Laboratorio** (capacidades analíticas en planta) y **Trazabilidad** (seguimiento de lotes).
  - Sustituimos todos los emojis por iconos SVG vectoriales inline de precisión en [app.js](file:///c:/Users/HuGOD777/proyectos%20practica/los-seriecitos/app.js), asignándoles estilos responsivos en [style.css](file:///c:/Users/HuGOD777/proyectos%20practica/los-seriecitos/style.css) que se adaptan automáticamente a la paleta de colores del tema.
* **Consolidación de Métricas y Gráfico Comparativo de Fe₂O₃:**
  - Se eliminó el bloque redundante `cert-box` en la cabecera.
  - Se achicó y se incrustó el gráfico comparativo de impurezas de óxido de hierro directamente dentro de la tarjeta del parámetro de $Fe_2O_3$ en forma de barras proporcionales compactas, ahorrando una sección completa de scroll vertical.
* **Incorporación de Nuevos Servicios de Laboratorio:**
  - Se detallaron los servicios analíticos para **análisis granulométrico**, **conductividad eléctrica** y **muestras industriales**.
  - Se reemplazó el visual placeholder gris por la foto real de la planta y laboratorio `assets/laboratorio-fuera.jpg`.
* **Optimizaciones Responsivas Mobile-First Extremas:**
  - **Pestañas en Grid Fijo sin Scroll:** Configuramos la navegación de pestañas en móviles como un grid de 3 columnas (`repeat(3, 1fr)`) y apilamos verticalmente los iconos sobre el texto (`flex-direction: column`). Esto elimina por completo el desbordamiento y scroll horizontal de las pestañas en pantallas estrechas.
  - **Ocultamiento de Contenido Duplicado:** Ocultamos en móviles el bloque `.highlight-spec-box` que repetía las métricas de Hierro y Blancura para prevenir la fatiga visual.
  - **Preclusión de Desplazamiento Vertical Fantasma:** Agregamos `overflow-y: hidden;` en `.quality-tabs-nav` a nivel global y en la media query móvil. Esto previene que los navegadores móviles muestren barras de scroll vertical redundantes en los títulos de pestañas.
  - **Reducción del Volumen de Texto y Spacing:** Redactamos explicaciones y descripciones sumamente breves y directas, redujimos el tamaño de fuentes, paddings de tarjetas y el alto de la imagen principal en móvil.

### 🌾 Rediseño Compacto y Profesional de Sección Mallas
* **Sidebar Compacta y Fija:**
  * Se configuró la barra lateral de mallas en [style.css](file:///c:/Users/HuGOD777/proyectos%20practica/los-seriecitos/style.css) a un ancho fijo de `180px` para evitar variaciones de tamaño.
  * Se eliminaron los micrones (`.mb-size`) de los botones de selección en [app.js](file:///c:/Users/HuGOD777/proyectos%20practica/los-seriecitos/app.js) para lograr un listado mucho más limpio y uniforme (ej. `#400`, `#325`, etc.).
  * El botón activo se resalta mediante un elegante borde izquierdo dorado de precisión (`border-left: 3px solid var(--gold);`) y un fondo oscuro integrado (`var(--bg-deep)`).
* **Marco Protector de Contenido (No Flotante):**
  * Se dotó a la sección de detalles `.mallas-detail` en [style.css](file:///c:/Users/HuGOD777/proyectos%20practica/los-seriecitos/style.css) de un marco con fondo gris oscuro (`var(--bg-alt)`) y un borde de 1px (`var(--border-strong)`) con un padding de `32px` (`20px` en móviles). Esto enmarca la información técnica de la malla elegida y evita que los elementos se sientan flotando en el vacío del fondo.
  * Se configuró el fondo de las tarjetas de aplicación `.malla-industry-card` y los chips `.malla-badge` al tono oscuro profundo (`var(--bg-deep)`) para asegurar una correcta relación de contraste y profundidad visual.
* **Detalles Reestructurados en 2 Columnas:**
  * Se modificó el panel de información en [app.js](file:///c:/Users/HuGOD777/proyectos%20practica/los-seriecitos/app.js) y se dividió en una grilla de dos columnas (aplicaciones B2B a la izquierda en tarjetas y minerales a la derecha como chips independientes).
  * Se compactó el tamaño de la tipografía gigante del número de malla (`.mi-num`) a `40px` de alto para optimizar el espacio vertical.
* **Integración del Catálogo en la Nube (Google Sheets):**
  * Se vinculó el botón de acción `.malla-btn-action` al final de la barra lateral directamente a la hoja de cálculo en la nube (`https://docs.google.com/spreadsheets/d/1juUnuY_5T-_FnfxprSMYXW5rkKroizDF2ktayy2oJR8/edit?usp=sharing`) abriéndose en pestaña nueva. Se removió por completo el emoji `📊` del botón dejando solo el texto tipográfico limpio **"VER TODO"**.
* **Correcciones Críticas de Adaptabilidad Móvil (Responsive):**
  * **Grilla Autoadaptable (Sin Scroll):** Se configuró `.mallas-tabs-container` en móviles con `flex-wrap: wrap` y `gap: 8px` para distribuir los 8 selectores en una grilla compacta de 2 filas de 4 botones. Esto elimina los scrolls horizontales/verticales por completo y muestra todas las mallas a primera vista sin recortes de texto.
  * **Dimensiones de Botones Homogéneas:** Ajustamos `.malla-btn` y `.malla-btn-action` a `flex: 1 0 calc(25% - 8px)` y `width: auto` en móviles para garantizar que los chips de selección sean simétricos y del mismo tamaño.
  * **Apilado de Cabecera:** Se configuró `.malla-detail-header` para colapsar en `flex-direction: column` en móviles. Esto soluciona la salida por la derecha del texto descriptivo de micrones largo que causaba desbordamiento y scroll horizontal en toda la página.
  * **Apilado de Grilla de Detalles:** Se configuró `.malla-detail-grid` para colapsar a `grid-template-columns: 1fr` en pantallas pequeñas, alineando las aplicaciones y los minerales de forma legible.

### 🏠 Rediseño Integral de la Página Principal (Inicio)
* **Optimización de Visibilidad en Menú y Navegación Header:**
  * **Desktop (Header Links):** Se incrementó el tamaño de fuente a `12px` y el grosor a `700` (bold) en [style.css](file:///c:/Users/HuGOD777/proyectos%20practica/los-seriecitos/style.css). Se modificó el color por defecto a un blanco de alto contraste (`rgba(255,255,255,0.85)`) y el estado activo/hover destaca ahora en color dorado (`var(--gold)`) con fondo atenuado, haciéndolo sumamente obvio y profesional.
  * **Móvil (Botón Hamburguesa & Menú Lateral):** Se añadió la etiqueta de texto `"Menú"` al lado del icono de tres líneas en [index.html](file:///c:/Users/HuGOD777/proyectos%20practica/los-seriecitos/index.html). Se le dotó de un estilo tipo insignia Call-to-Action con borde de `1.5px` color oro satinado y fondo translúcido dorado en [style.css](file:///c:/Users/HuGOD777/proyectos%20practica/los-seriecitos/style.css). Asimismo, **se rediseñó el menú lateral (drawer)** eliminando los bordes y cajas rígidas anticuadas por un estilo borderless más fluido y limpio. La opción activa se destaca ahora con una sutil barra izquierda dorada (`border-left: 3px solid var(--gold)`) y fondo tintado, adaptándose además con reglas de alto contraste en el modo claro.
* **Animación de Scroll en el Hero:**
  * Se añadió un movimiento sutil de resorte vertical (`scroll-bounce`) en el indicador de scroll para invitar a la navegación hacia abajo en [style.css](file:///c:/Users/HuGOD777/proyectos%20practica/los-seriecitos/style.css).
* **Métricas de Estadísticas de Alta Densidad y Responsive 2 Columnas:**
  * Se compactó la sección de estadísticas en [app.js](file:///c:/Users/HuGOD777/proyectos%20practica/los-seriecitos/app.js) y se restauraron los iconos SVG originales en un tamaño reducido de `32px` para mayor elegancia.
  * Se añadieron etiquetas doradas (`.stat-kicker`) y se redujo el relleno general de las tarjetas a `24px 20px` en [style.css](file:///c:/Users/HuGOD777/proyectos%20practica/los-seriecitos/style.css).
  * **Exención de colapso vertical:** Se modificó la regla responsiva para pantallas móviles en [style.css](file:///c:/Users/HuGOD777/proyectos%20practica/los-seriecitos/style.css) para mantener la grilla de estadísticas en **2 columnas** (`1fr 1fr`), evitando un listado vertical largo e incómodo.
* **Galería Fotográfica de Cantera y Planta:**
  * Se modificó el título a *"Galería Fotográfica de Cantera y Planta"* y se eliminó la etiqueta superior redundante.
  * Se optimizó la galería para mostrar inicialmente solo **3 fotos destacadas** de operación, ocultando las **17 fotos restantes** del total de 20 recursos de `assets/`.
  * Se incorporó el botón dinámico **"Ver todas las fotos"** para expandir y colapsar la galería de forma instantánea.
  * Se eliminó el bloque de imagen roto correspondiente a `laboratorio-espectrofotometro.jpg` (archivo inexistente) y se verificaron los 20 recursos restantes.
* **Ubicación y Mapa Satelital Persistente (Caché SPA):**
  * Se reestructuró la sección de ubicación en Inicio utilizando la grilla responsiva `.contact-grid` (información a la izquierda, mapa a la derecha).
  * **Estilo Satelital y Zoom:** Se configuró el mapa en vista satelital (`t=k`) con un nivel de zoom balanceado (`z=16`) para visualizar tanto las naves de la planta como el entorno geográfico de acceso.
  * **Caché Persistente en SPA (Sin Recargas):** Se reprogramó la carga del mapa en [app.js](file:///c:/Users/HuGOD777/proyectos%20practica/los-seriecitos/app.js) para crearlo dinámicamente y preservarlo en memoria (`persistent-map-holder`) al cambiar de sección, evitando parpadeos o recargas.
  * **Pre-carga en Segundo Plano:** Inicialización inmediata al dispararse `DOMContentLoaded`.
* **Imagen del Apartado de Contacto:**
  * Se reemplazó la foto de la pala cargadora en la vista de Contacto por `assets/instalaciones-planta.jpg` (Instalaciones de Planta Voladuras San Luis), ofreciendo una imagen mucho más representativa de las oficinas y planta de molienda principal.

* **Reemplazo de Imágenes de Marcador "?" (Placeholders):**
  * Se sustituyeron todos los marcadores SVG temporales (`?`) por imágenes operativas reales y únicas de la cantera y planta, asegurando que ninguna imagen se repita en las secciones internas:
    * **Sobre Nosotros (Nosotros View):** Se implementó `yacimiento-reservas.jpeg` (Reservas de Explotación) y `yacimiento-calizo.jpeg` (Yacimiento Calizo).
    * **Equipos y Maquinaria (Equipos View):** Se implementó `flota-pesada-cargadoras.jpg` (Flota Pesada de Cargadoras).
    * **Mallas y Granulometría (Mallas View):** Se implementó `silos-clasificacion.jpg` (Silos de Clasificación).

### 👣 Rediseño Profesional y Responsivo del Footer
* **Estructura Depurada de 2 Columnas:**
  * Se rediseñó el footer en [index.html](file:///c:/Users/HuGOD777/proyectos%20practica/los-seriecitos/index.html) a una distribución de 2 columnas limpias.
  * **Columna de Marca:** Contiene el logo textual con realce dorado de marca y un botón dinámico de **"Más información"** enlazado con la vista `?view=nosotros` usando el enrutamiento SPA (sin recargas de página).
  * **Columna de Contacto B2B:** Concentra la información de contacto clave de la planta de Villa de Praga: dirección enlazada a Google Maps, número enlazado a chat de WhatsApp e email de consultas y ventas con enlaces `mailto:`.
* **Diseño Adaptable, Estilización y Responsive Compacto:**
  * Se implementó CSS Grid en [style.css](file:///c:/Users/HuGOD777/proyectos%20practica/los-seriecitos/style.css) para el posicionamiento y la adaptabilidad responsiva (pasa a 1 columna vertical en pantallas de móviles y tabletas).
  * Se configuraron efectos hover y transiciones fluidas.
  * **Optimización de tamaño en móviles:** Se programaron overrides en la media query móvil para reducir la densidad del footer: achicando paddings a `24px 16px`, disminuyendo el tamaño de la fuente de los textos y el copyright, y reduciendo la separación de columnas para evitar que se sienta excesivamente grande en móviles.

### 💎 Rediseño Compacto y Unificación de Yacimientos
* **Unificación del Catálogo:**
  * Se unificaron las secciones de *"Yacimientos Propios"* y *"Capacidad de Procesamiento"* en una única grilla continua en [app.js](file:///c:/Users/HuGOD777/proyectos%20practica/los-seriecitos/app.js).
  * Se removieron las descripciones largas de las tarjetas en la vista principal para eliminar la fatiga visual, conservando la información técnica detallada para la ficha individual.
* **Tarjeta Especial de Cierre ("¿Busca otro mineral?"):**
  * Se incorporó una tarjeta de cierre interactiva con el botón **`CONTACTAR →`** para consultas de molienda o prospección a medida.
  * Se configuró para expandirse y ocupar **2 columnas en pantallas de escritorio**, rellenando de forma simétrica el espacio vacío en el diseño de 3 columnas.
  * Se estilizó con un borde dashed gris-azul (`var(--border-strong)`) y signo de pregunta (`?`) gris que transicionan suavemente a dorado (`var(--gold)`) únicamente en estado hover.
  * Se desactivó explícitamente la justificación del texto descriptivo interno mediante alineación centrada.
* **Hover Profesional y Sutil:**
  * Se reemplazó el borde dorado brillante del hover de tarjetas por un tono gris-azul sobrio (`var(--border-strong)`) para mantener un perfil corporativo serio.
  * Se eliminó el fondo dorado en hover y se ajustó a una opacidad blanca imperceptible (`rgba(255, 255, 255, 0.02)`).
* **Simplificación de Textos de Cabecera:**
  * Se redujo el texto de presentación de la sección en [app.js](file:///c:/Users/HuGOD777/proyectos%20practica/los-seriecitos/app.js) a un único párrafo directo y conciso de 3 líneas.
* **Actualización de Kickers:**
  * Se cambió la etiqueta de los minerales procesados a maquila de `Molienda & Logística` a `Otros Yacimientos`.

---

## [v1.5.0] — 2026-07-08

### 🛠️ Redefinición de Servicios y Eliminación de Proyectos Históricos
* **Actualización de Servicios:**
  * Se redefinieron los servicios principales en la pestaña correspondiente a: **Molienda de Minerales** (con `assets/planta-molienda.jpg`), **Trituración de Minerales** (con `assets/naves-trituracion.jpg`) y **Servicios de Fletes** (con `assets/operacion-cargadora.jpg`).
  * Se redactaron descripciones B2B cortas, simples y claras enfocadas en la capacidad operativa de la planta y flota.
  * Se actualizó el subtítulo de la sección por un enfoque específico en molienda analítica, trituración y fletes B2B.
* **Eliminación Completa de la Línea de Tiempo:**
  * Se removió por completo la sección *"Nuestra Historia de Proyectos"* (línea de tiempo de proyectos históricos) del código y de todas las páginas del sitio para resguardar de forma estricta la confidencialidad de la cartera de clientes.

---

## [v1.4.0] — 2026-07-08

### 📱 Ajustes de Layout, Justificación y Rediseño de WhatsApp
* **Rediseño del Botón de WhatsApp:**
  * Se reubicó al extremo inferior izquierdo (`left: 24px; bottom: 24px` en escritorio y `left: 16px; bottom: 16px` en móviles).
  * Se convirtió en un botón flotante circular y compacto de `52px` (`48px` en móviles) ocultando el texto `"WhatsApp"`.
  * Se añadieron micro-animaciones interactivas de zoom y sombra resplandeciente en hover.
* **Corrección de Ancho en Mallas y Calidad:**
  * Se ajustaron los apartados de **Mallas** y **Calidad** en [app.js](file:///c:/Users/HuGOD777/proyectos%20practica/los-seriecitos/app.js) envolviéndolos con `<section class="section-view">`. Ahora cuentan con el mismo ancho máximo (`1200px`) y márgenes simétricos que el resto de las vistas.
* **Alineación de Textos (Justificación):**
  * Se aplicó la alineación justificada (`text-align: justify;`) a todos los párrafos de texto largo en [style.css](file:///c:/Users/HuGOD777/proyectos%20practica/los-seriecitos/style.css) para mejorar la estética y orden editorial.
  * Se definieron excepciones en CSS para ignorar la justificación en títulos, héroes, pies de página, pies de foto muy cortos y badges.
  * Se configuró un reset a alineación izquierda en pantallas de móviles pequeños (`< 576px`) para evitar espacios desiguales entre palabras.
* **Integración y Estilo de Mapas Interactivos:**
  * Se agregaron minimapas interactivos de Google Maps de la planta de Villa de Praga en el footer de Inicio y en la columna de Contacto.
  * Se envolvieron en un componente de tarjeta (`.map-card`) con una barra inferior que muestra la dirección física e incluye un enlace directo para abrir en la app de Google Maps.
  * Se aplicó un filtro CSS dinámico de inversión en modo oscuro (`filter: invert(90%)`) que transiciona suavemente a estado normal cuando el usuario cambia al tema claro.

---

## [v1.3.0] — 2026-06-07

### 🚀 Mejoras Visuales de Interacción
* **Pulsación de Botón "Ver detalles":** Se cambió el texto del CTA en todas las tarjetas de mineral de `"Ver ficha técnica →"` a `"Ver detalles →"` para un diseño más limpio y directo.
* **Alineación Vertical en Grid:** Se configuró `.mineral-card` en flex y dirección columna para que el botón `"Ver detalles"` se posicione automáticamente al fondo de la tarjeta (`margin-top: auto;`). Esto logra una alineación vertical perfecta y simétrica de los botones a lo largo de toda la grilla de minerales, sin importar la longitud del texto descriptivo.
* **Remasterización del Hover:** Al posar el mouse sobre una tarjeta de mineral:
  * La tarjeta se eleva sutilmente `3px` hacia arriba (`translateY`).
  * Se proyecta una sombra más profunda y suave (`box-shadow`), dando sensación de volumen físico.
  * El fondo cambia sutilmente a un tono dorado con opacidad muy baja (`rgba(234, 179, 8, 0.03)`).
  * La flecha dorada de `"Ver detalles →"` se desplaza levemente hacia la derecha (`4px`) mediante una transición animada de `0.15s`.

---

## [v1.2.0] — 2026-06-07

### 🛠️ Corrección de Estilo en Tarjetas de Minerales
* **Contención de Imágenes:** Se removieron estilos inline de las imágenes dentro de la grilla de yacimientos en `app.js` (`object-fit: cover` con alturas forzadas). El renderizado volvió al control de `.mineral-card-img` en `style.css` (`object-fit: contain`), logrando que las imágenes se contengan y centren perfectamente dentro del recuadro gris sin recortarse.
* **Eliminación de Botones Duplicados:** Se eliminaron los pseudo-elementos `.mineral-card::after` y `.mineral-card:hover::after` del CSS que generaban una segunda etiqueta flotante de `"Ficha Técnica"` en hover. Ahora solo se muestra el botón inline de la tarjeta.

---

## [v1.1.0] — 2026-06-07

### 🌐 Reorganización a "Yacimientos" y Enfoque en Molienda
* **Renombrado General:** Se cambió el término `"Minerales"` por `"Yacimientos"` en la navegación de escritorio y móvil en `index.html`. La ruta de navegación ahora es `?view=yacimientos`.
* **Incorporación de la Fluorita:** Se agregó la **Fluorita** ($CaF_2$) al catálogo de yacimientos propios activos, vinculando la imagen `assets/mineral-fluorita.png` y configurando una ficha técnica simplificada enfocada en sus aplicaciones y destinos industriales prácticos en lugar de análisis químicos rigurosos.
* **Propuesta de Molienda customizada y Sourcing:**
  * Se reescribió el texto de presentación en la solapa de Yacimientos para destacar la gran versatilidad técnica de la planta al ofrecer molienda a maquila (toll milling) para **cualquier tipo de yacimiento o mineral industrial** no listado.
  * Se incorporó la capacidad de búsqueda y explotación a demanda de minerales específicos si un cliente B2B lo requiere.
* **Organización del Catálogo:** Se dividió la sección en dos zonas visualmente diferenciadas:
  1. *Yacimientos Propios Activos:* Cuarzo, Feldespato y Fluorita (con tarjetas de ficha técnica completas).
  2. *Capacidad de Procesamiento de otros Minerales:* Albita, Pirofilita, Baritina y Chamote (mostrados como muestra de versatilidad operativa).

---

## [v1.0.0] — 2026-06-07

### 🧹 Limpieza Operativa y Marcadores de Posición
* **Filtro de la Galería Principal (Inicio):** Se removieron por completo de la página de Inicio las fotos indicadas por el usuario:
  * *Flota Cargadora Pesada*
  * *Canteras Reservas*
  * *Pizarra Mineral*
  * *Silos de Clasificación*
  * *Yacimiento Calcio/Sal*
  * *Ensayos Geológicos*
* **Marcador de Posición para Fotos Faltantes:** En las demás vistas internas del sitio (Nosotros, Servicios, Equipos, Mallas, Calidad), las imágenes borradas se reemplazaron por un marcador SVG inline gris oscuro con un signo **"?"** en el centro:
  ```html
  data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'><rect width='100%' height='100%' fill='%23222' stroke='%23333' stroke-width='2'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='48' font-weight='bold' fill='%23666'>?</text></svg>
  ```
  Esto conserva la simetría de las tarjetas de servicios, grillas de fotos y banners del sitio, informando visualmente que hay un espacio destinado a una nueva imagen.
* **Actualización de Pies de Foto:** En la página de Inicio se actualizaron dos leyendas de la galería:
  * *"Perforadora Sandvik"* → Cambiado a *"Pala cargadora"*
  * *"Rampa de Transporte"* → Cambiado a *"Zaranda"*
