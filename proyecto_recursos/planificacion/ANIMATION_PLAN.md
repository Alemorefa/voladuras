# Plan de Prototipo Animado — Voladuras San Luis S.R.L.

Este documento registra las decisiones de diseño, la arquitectura de animación y las pautas acordadas para la futura migración e implementación de la página web a un prototipo completamente animado, profesional y moderno.

---

## 🎨 Identidad de Diseño y Dirección Visual

- **Enfoque de Negocio:** B2B Promocional. Prioriza la sobriedad, la confianza y la claridad industrial (molienda, granulometría y voladuras controladas).
- **Estilo:** Premium Industrial Minimalista. Evita layouts genéricos (Bento grids saturadas) y prefiere la asimetría elegante, tipografía limpia y gran espacio negativo.
- **Tonalidad de Movimiento:** `MOTION_INTENSITY: 5` (Suave / Premium). Las animaciones guían el ojo del cliente y aportan fluidez, pero nunca distraen del mensaje técnico de la empresa.

---

## 🛠️ Arquitectura Tecnológica Propuesta

Para introducirte al mundo de los frameworks y lograr la máxima calidad de animación, se migrará el sitio a:

1. **Core:** **React (Next.js - App Router)**
   - Facilita la división de la página en componentes interactivos reutilizables (ej. un componente de tarjeta de mineral, un cargador, un menú de navegación).
   - Permite transiciones fluidas de página completa gracias a su enrutamiento del lado del cliente.
2. **Estilos:** **Tailwind CSS**
   - Utilidades de diseño consistentes (espaciados en base 8, transiciones nativas rápidas).
3. **Motor de Animación:** **Motion** (`motion/react`)
   - Biblioteca declarativa líder en React. Permite animar elementos con física de resortes (*spring physics*) escribiendo propiedades simples como `animate={{ opacity: 1, y: 0 }}`.

---

## 🎭 Mapa de Animaciones e Interacciones

### 1. Transición entre Secciones (Rutas)
* **Comportamiento:** Al hacer clic en un enlace de navegación, el contenido actual realiza un desvanecimiento suave y se desliza ligeramente hacia abajo (`y: 15px`, `opacity: 0`). El nuevo contenido aparece desde abajo (`y: -15px` a `0`, `opacity: 1`) con una física de resorte amortiguada.
* **Fórmula Motion:**
  ```tsx
  const pageVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
    exit: { opacity: 0, y: -15 }
  };
  ```

### 2. Animación de Entrada al Desplazarse (Scroll Reveal Stagger)
* **Comportamiento:** A medida que el usuario baja por la página, las secciones no aparecen de golpe. El título de la sección se revela primero mediante una máscara de opacidad, y las tarjetas o bloques de información se elevan secuencialmente (efecto cascada/stagger).
* **Parámetros:**
  - Retraso por elemento (*stagger delay*): `0.08s`
  - Duración: `0.6s`
  - Curva de transición: `[0.16, 1, 0.3, 1]` (Ease-out rápido, desaceleración suave).

### 3. Micro-interacciones Táctiles (Hovers y Clics)
* **Botones de Llamado a la Acción (CTA):**
  - **Hover:** El botón se eleva sutilmente (`y: -2px`, `scale: 1.02`) y el borde adquiere un brillo metálico muy suave.
  - **Active (Clic):** Se comprime físicamente (`scale: 0.98`, `y: 0`) para dar sensación de botón real bajo el dedo o el cursor.
* **Tarjetas de Minerales y Mallas:**
  - **Hover:** Elevación sutil de la tarjeta (`y: -6px`), transición de sombra suave a una más profunda y difuminada. La imagen del mineral en su interior escala un `4%` (`scale: 1.04`) de forma extremadamente lenta (`duration: 0.8s`).

### 4. Menú Móvil (Drawer)
* **Comportamiento:** El menú lateral se desliza desde la derecha con un efecto elástico. Al mismo tiempo, el fondo se oscurece y aplica un filtro de desenfoque de vidrio frosted (`backdrop-filter: blur(8px)`) que se desvanece gradualmente.

---

## ⚡ Rendimiento y Accesibilidad (Guardabarros)

- **Aceleración por Hardware:** Todas las animaciones se realizarán utilizando propiedades de GPU (`transform: translate3d` y `opacity`). Nunca animaremos propiedades de layout caras como `width`, `height` o `margin` que causen saltos de página (*layout shifts*).
- **Respeto a las Preferencias del Usuario:** Se implementará soporte obligatorio para `prefers-reduced-motion`. Si el usuario tiene las animaciones desactivadas en su sistema operativo por razones de accesibilidad o batería, el sitio desactivará automáticamente los movimientos rápidos y usará desvanecimientos simples.

---

## 📅 Pasos para la Implementación Futura

Cuando decidas dar el paso y comenzar con el prototipo funcional, el flujo de trabajo sugerido será:

1. **Inicializar el proyecto Next.js** en una rama dedicada (ej. `feature/animated-prototype`).
2. **Configurar el sistema de diseño** en Tailwind (`tailwind.config.js`) importando los tokens de color y la tipografía formal del sitio.
3. **Migrar la base de datos de minerales** (`MINERALS` de `app.js`) a archivos de datos estructurados en React.
4. **Construir el Layout base** con la navegación superior (`Header`) y el pie de página (`Footer`) implementando las transiciones del menú.
5. **Crear cada página como un componente** y envolverlas en componentes `<motion.div>` para las transiciones suaves.
6. **Optimizar las imágenes de los minerales** con el componente `<Image />` de Next.js para carga ultra rápida.
