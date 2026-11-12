# Plan para profesionalizar el portafolio

Fecha: 2026-11-09. Objetivo: que un reclutador o responsable técnico entienda en 30 segundos quién es Joaquín, qué sabe hacer, qué ha construido y cómo contactarle.

Base del plan: lectura de `index.html` (675 líneas), `README.md`, la estructura de `assets/` y `docs/`, y una búsqueda de `aria-`, `sr-only`, `focus-visible` y `prefers-reduced-motion` en CSS y JS. No se ha editado código. No se han medido Lighthouse, contraste real ni pesos de archivo: están marcados como "medir" donde procede. Los agentes citados existen en `C:\Users\Joaqu\.claude\agents\` (160 definiciones encontradas; se comprobó la existencia de cada nombre usado, no se releyó el cuerpo de todos).

## Hallazgos verificados en el código actual

- Orden actual: Hero, marquee, stats, Sobre mí, Tecnologías, Constelación 3D, Experiencia, 2º DAM, Proyectos, IA, Formación, Contacto. Los proyectos, lo que más pesa, están en 9º lugar.
- No hay `<main>`, ni enlace "saltar al contenido", ni `aria-label` en `<nav>`. El botón de tema usa emoji (`🌙`). El hamburguesa no tiene `aria-expanded`.
- Emojis como iconos: nav, contact-list (📍📞🌐), tarjetas de aprendizaje (📱⚛️☁️🌱🖥️🎮), IA (🧭⚡🧩🔍), proyectos (🎰🎓💰🏁🧙🎬🏛️).
- Stats: "30+ tecnologías" (el HTML lista 32 entradas, 31 únicas porque React sale dos veces: defendible), "8+ proyectos" (hay 7 tarjetas, una de ellas la intranet privada: NO defendible), "2+ años" (freelance desde 2024: aceptable, justificar).
- Experiencia: "Desarrollador Freelance" describe un proyecto personal (control-financiero) sin cliente: puede leerse como inflar el CV. La intranet de Agüimes aparece en Experiencia y otra vez en Proyectos sin enlace.
- Hero y OG dicen "experiencia en entorno profesional real": son prácticas de 3 meses (mar-jun 2025). Hay que decirlo con esa precisión.
- Contacto: promete "respondo en menos de 24h" (afirmación que no se puede garantizar). Email y teléfono en texto plano en 3 sitios cada uno. No hay LinkedIn.
- SEO: hay `title`, `description` y OG básico. Faltan `canonical`, `twitter:card`, `og:image` dedicada (ahora usa `topcode.png`, 1806x936, no 1200x630), `theme-color`, JSON-LD, `sitemap.xml`, `robots.txt`.
- Rendimiento: `three.min.js` (local) se carga en todas las visitas aunque el contenido importante no lo necesite; Devicon y simple-icons vienen de CDN jsDelivr (más de 15 peticiones de iconos SVG remotos); Google Fonts bloquea render con la hoja CSS; el hero oculta texto con `data-type` y lo reescribe letra a letra (retrasa la lectura de lo esencial).
- Accesibilidad: hay soporte `prefers-reduced-motion` y copias `.sr-only` (según README); existen pocos `aria-*` (18 coincidencias en total entre CSS y JS). Contraste del tema oscuro/claro sin medir.
- Repo: `docs/capturas/hero.jpg` todavía muestra la foto; el README describe "foto" en el hero y en Secciones; `.claude/settings.local.json` está en el árbol (revisar `.gitignore`). La foto sigue en el historial de git (decisión pendiente del usuario).

## 1. Estructura y jerarquía del contenido

Principio: lo que más convence a un reclutador junior va primero: proyectos con demo, experiencia, stack. Lo vistoso (3D, agentes) va al final o se retira.

Orden propuesto:

1. Hero (nombre, rol, una frase de valor, CTA: CV, email, GitHub, LinkedIn; badge disponibilidad)
2. Proyectos destacados (3 con demo: GcGames, TopCode, MiBalance) + "otros proyectos" más compacto
3. Experiencia (prácticas Agüimes + proyecto personal bien rotulado)
4. Tecnologías (agrupadas, sin marquee)
5. Formación (incluye "Lo nuevo en 2º DAM" condensado en 3 líneas o fusionado)
6. Sobre mí (3 frases) con datos personales mínimos
7. Contacto
8. Opcional, al final o eliminar: Constelación 3D, IA y equipo de agentes

| Acción | Archivos | Esfuerzo | Agente |
|---|---|---|---|
| Reordenar secciones y nav (Proyectos, Experiencia, Tecnologías, Formación, Contacto) | `index.html`, `styles.css` | M | frontend-developer |
| Quitar marquee (duplica Tecnologías, `aria-hidden`, doble lista) | `index.html`, `styles.css` | S | frontend-developer |
| Decidir destino de Constelación 3D e IA (ver sección 2) | `index.html`, `three-scene.js`, `ai-team.js`, `crew.js` | S decisión / M ejecución | ui-designer propone, frontend-developer ejecuta |
| Fusionar "2º DAM" con Formación (hoy son dos secciones separadas) | `index.html` | S | content-quality-editor + frontend-developer |

## 2. Copy y tono

Reglas: verbos de acción, qué se construyó, con qué, y qué resultado verificable (demo, repo, usuarios reales, tests, despliegue). No inventar métricas: si no hay números reales, describir alcance (funciones, plataformas, despliegue).

**Hero.** Una línea de valor concreta, p. ej. "Desarrollo web y apps móviles con React, TypeScript y Kotlin. Busco mi primer puesto como desarrollador junior (frontend / full-stack)". Quitar "interfaces limpias, accesibles y bien estructuradas" si no se demuestra. Cambiar "experiencia real en entorno profesional" por "prácticas en el Ayuntamiento de Agüimes (3 meses)". Añadir ubicación y modalidad (presencial Canarias / remoto), solo si es cierto.

**Stats.** Cambiar "8+ proyectos" por "7 proyectos" o por "5 con demo y código público" (contar antes). Mantener "30+ tecnologías" solo si se acompaña de agrupación honesta; mejor sustituir por datos de proyecto: "3 demos en producción", "Web, móvil, API y escritorio". Valorar eliminar la barra entera: tres cifras de relleno pesan menos que un proyecto bien contado.

**Proyectos** (plantilla por tarjeta: Qué es / Mi papel / Reto técnico / Stack / Enlaces):
- GcGames: reencuadrar de "casino online" a "plataforma multijugador en tiempo real": mesas en vivo, rondas simultáneas, economía de juego, PWA, sobre Cloudflare Workers + Supabase. Mencionar "dinero ficticio, sin apuestas reales" en una frase corta y dejar fuera el vocabulario de casino/gacha en el título. Actualizar `alt` de la imagen (hoy "casino online con temporada y misiones") y el icono 🎰. Comprobar que la captura no es la portada tipo casino; si lo es, valorar otra captura (mesa en tiempo real).
- TopCode: destacar tiempo real, web + móvil con un mismo código, usuarios previstos (DAM/DAW/ASIR). Decir si tiene usuarios reales; si no, no sugerirlo.
- MiBalance: añadir captura (hoy no tiene imagen) y una línea de reto (autenticación por usuario, RLS de Supabase si aplica; verificar).
- Rally Canarias / FaceSage / DAMFlix: tarjetas más compactas, sin imagen salvo DAMFlix. Para Rally, enlazar documentación Swagger/README si existe.
- Intranet Agüimes: quitar de Proyectos (no tiene enlace, ya está en Experiencia); dejar un único lugar.
- Cada tarjeta: añadir fecha o curso y un resultado (desplegado en X, API con N endpoints: contar en el repo antes).

**Experiencia.** Renombrar "Desarrollador Freelance" a "Proyecto personal: API de control financiero" (o "Proyecto propio"), con rango de fechas y enlace al repo; reservar "Freelance" para trabajo con cliente. Reescribir viñetas con resultados (qué módulos de la intranet, para cuántos usuarios si se conoce; confirmar con Joaquín).

**IA y equipo de agentes.** La simulación "Ejecutar equipo" no aporta evidencia de habilidad y compite con los proyectos. Recomendación: eliminar el mapa y la simulación (`ai-team.js`, `#teamMap`, `#teamRun`) y dejar, como mucho, una frase en "Sobre mí": "Uso Claude Code como asistente y reviso todo el código que integro". Si se quiere conservar, moverla al final, rotularla claramente como demo y no destacarla en la nav. Decisión: usuario.

**Constelación 3D.** Duplica Tecnologías. Conservarla solo si no penaliza rendimiento (ver sección 4). Alternativa: dejarla como detalle del hero o eliminarla.

**Contacto.** Quitar "respondo en menos de 24h"; usar "Escríbeme y te contesto lo antes posible". Mostrar un solo CTA principal (email) y LinkedIn.

**Sobre mí.** Reducir a 3 frases. Quitar "Ingenio, Las Palmas" detallado (privacidad, ver sección 5): dejar "Las Palmas, España".

| Acción | Archivos | Esfuerzo | Agente |
|---|---|---|---|
| Reescribir hero, about, stats, contacto | `index.html` | S | landing-page-copywriter (hero/CTA) y content-quality-editor (revisión final) |
| Reescribir 7 tarjetas de proyecto con plantilla y resultados | `index.html` | M | content-quality-editor (requiere datos reales de Joaquín) |
| Rotular bien experiencia y quitar duplicidad intranet | `index.html` | S | content-quality-editor |
| Retirar o reubicar IA | `index.html`, `ai-team.js`, `styles.css`, `README.md` | S-M | frontend-developer |
| Pasar el texto final por detector de tono genérico/IA | `index.html`, `README.md` | S | ai-writing-auditor |

## 3. Accesibilidad

| Punto | Archivos | Esfuerzo | Agente |
|---|---|---|---|
| Landmarks: `<header>` con `<nav aria-label="Principal">`, `<main id="contenido">`, `<footer>`; enlace "Saltar al contenido" visible al enfocar | `index.html`, `styles.css` | S | frontend-developer |
| Hamburguesa: `aria-expanded`, `aria-controls`, cerrar con Esc; botón de tema con `aria-pressed` y sin emoji | `index.html`, `script.js` | S | frontend-developer |
| Foco visible global (`:focus-visible`) en enlaces, botones, chips y tarjetas; comprobar orden de tabulación | `styles.css` | S | accessibility-tester audita, frontend-developer corrige |
| Contraste: medir `--accent` #6ee7b7 sobre fondos claros y texto secundario/`--muted` en ambos temas (en claro `--accent` es #0d9468: comprobar 4.5:1 en texto pequeño); badges y `stack-tag` | `styles.css` | S-M | accessibility-tester (medir), ui-designer (nuevos tokens) |
| `prefers-reduced-motion`: verificar que cubre hero 3D, marquee, tilt, contadores, typing y cursores; que el contenido sea visible sin JS | `styles.css`, `script.js`, `crew.js`, `three-scene.js` | M | accessibility-tester |
| Efecto de escritura: el texto se vacía y se reescribe; confirmar que el `.sr-only` no duplica la lectura y que el contenido existe sin JS (SEO y lectores). Valorar quitar el efecto en textos largos | `crew.js`, `index.html` | M | accessibility-tester + frontend-developer |
| `alt`: descriptivos pero sin "captura de"; decorativos con `alt=""`; `canvas` del lab con alternativa textual real | `index.html` | S | accessibility-tester |
| Iconos decorativos `aria-hidden="true"`; enlaces externos que abren pestaña nueva: indicarlo ("se abre en pestaña nueva") | `index.html` | S | frontend-developer |
| Los iconos de tecnología son `<i>` sin texto accesible: el texto del `<span>` ya sirve, marcar `<i aria-hidden>` | `index.html` | S | frontend-developer |
| Respuesta táctil: objetivos de al menos 44 px en nav móvil y chips | `styles.css` | S | accessibility-tester |
| Reflow a 320 px y zoom 200 % | `styles.css` | S | accessibility-tester |

## 4. Rendimiento y SEO

| Punto | Archivos | Esfuerzo | Agente |
|---|---|---|---|
| Metadatos: `canonical`, `twitter:card=summary_large_image`, `og:image` dedicada 1200x630 (nueva imagen sin foto), `og:image:alt`, `theme-color`, `og:site_name`; `description` de 150-160 caracteres | `index.html`, `assets/img/og.png` (nuevo) | S | seo-specialist |
| JSON-LD `Person` (name, jobTitle, url, sameAs: GitHub y LinkedIn, alumniOf CIFP Villa de Agüimes, knowsAbout, addressLocality Las Palmas). No incluir teléfono ni dirección exacta | `index.html` | S | seo-specialist |
| `robots.txt` y `sitemap.xml` en la raíz (GitHub Pages sirve en `/Portafolio/`; la URL del sitemap debe incluir ese prefijo) | `robots.txt`, `sitemap.xml` (nuevos) | S | seo-specialist |
| Un solo `<h1>`, jerarquía h2/h3 sin saltos (las tarjetas usan h3 bajo h2; el `.project-name` es un `div`: pasar a `h3`) | `index.html` | S | seo-specialist |
| Cargar three.js solo si hace falta: `defer` en los scripts, no cargar si `prefers-reduced-motion` o conexión lenta/móvil, y cargar el lab con `IntersectionObserver`. Medir antes y después | `index.html`, `three-scene.js` | M | performance-engineer |
| Sustituir fuentes e iconos por CDN: self-host de Inter/JetBrains Mono (subset latin, `font-display: swap`, `preload`), y SVG inline o sprite local en lugar de Devicon completo y simple-icons remoto | `index.html`, `styles.css`, `assets/fonts/`, `assets/icons/` | M-L | performance-engineer + frontend-developer |
| Imágenes: convertir `topcode.png` (1806x936), `topcode-calendario.png` y `damflix.png` (1920x1080) a WebP/AVIF con `srcset`; `width/height` ya están y `loading="lazy"` también (bien). La primera imagen visible no debe ser lazy | `assets/img/proyectos/*`, `index.html` | S | performance-engineer |
| Comprobar que el texto principal se pinta sin esperar al efecto de escritura (LCP/CLS); medir con Lighthouse y PageSpeed (el plan no incluye cifras actuales) | `crew.js`, `script.js` | M | performance-engineer |
| `Cache-Control` no es configurable en GitHub Pages: nombres con versión (`?v=`) en CSS/JS | `index.html` | S | frontend-developer |

## 5. Credibilidad

| Punto | Archivos | Esfuerzo | Agente |
|---|---|---|---|
| Comprobar que todas las demos responden (play.gcgames.workers.dev, topcode-2na.pages.dev, mibalanceapp.vercel.app) y que los repos son públicos y tienen README, descripción y captura. Un enlace roto resta más que no tener demo | `index.html`, repos externos | S | qa-expert |
| Añadir LinkedIn (hero, contacto, JSON-LD) y comprobar que el perfil coincide con el CV (titulación, fechas) | `index.html` | S | Joaquín aporta URL; frontend-developer |
| CV: renombrar a `CV_Joaquin_Suarez.pdf` (el sufijo "Profesional" sobra), 1 página, mismas fechas y stack que la web, sin foto; revisar metadatos del PDF (autor, título). Enlazar en hero y contacto | `assets/cv/`, `index.html` | S | content-quality-editor revisa el texto; Joaquín genera el PDF |
| Disponibilidad: "Disponible" se mantiene, con matiz: "Disponible desde [fecha] para prácticas FCT/empleo junior" (confirmar fechas con Joaquín) | `index.html` | S | landing-page-copywriter |
| Privacidad: el teléfono y el email aparecen en texto plano 3 veces cada uno (Sobre mí, Contacto, hero, footer) y "Ingenio" da localidad exacta. Recomendación: dejar el email y retirar el teléfono (compartirlo en el CV o en LinkedIn si se pide); mostrar "Las Palmas, España". Si hay que conservar el email, ofuscarlo ligeramente (montaje por JS) o usar formulario. Decisión: usuario | `index.html`, `README.md` | S | frontend-developer; legal-advisor o gdpr-ccpa-compliance solo si se quiere validar tratamiento de datos |
| Foto: el historial de git la conserva. Opciones: (a) no hacer nada, (b) reescribir historial con `git filter-repo` (fuerza push, rompe forks y clones; requiere permiso explícito), (c) rotar enlaces. No ejecutar sin autorización | git | M | git-workflow-manager (solo asesorar) |
| Quitar claims no verificables: "respondo en <24h", "experiencia real" sin matiz, "8+ proyectos" | `index.html`, `README.md` | S | content-quality-editor |
| Página 404.html con enlace de vuelta (GitHub Pages la usa) | `404.html` (nuevo) | S | frontend-developer |

## 6. Pulido visual

| Acción | Archivos | Esfuerzo | Agente |
|---|---|---|---|
| Sustituir todos los emojis por un set SVG único (p. ej. Lucide o Tabler, trazo 1.5-2 px, `currentColor`), inline o como sprite local: nav (tema), contact-list (pin, mail, teléfono, globo), learn-card (6), ai-grid (4), project-icon (7). Mapa propuesto: móvil=smartphone, React=atom, cloud=cloud, Spring=server, escritorio=monitor, tiempo real=radio/zap; proyectos: GcGames=gamepad, TopCode=graduation-cap, MiBalance=wallet, Rally=flag, FaceSage=scan-face, DAMFlix=film, Ayuntamiento=landmark | `index.html`, `styles.css` (`.learn-icon`, `.project-icon`, `.contact-icon`) | M | ui-designer define el set y los tamaños; frontend-developer lo implementa |
| Revisar un sistema de espaciado, radios y sombras y una escala tipográfica (el CSS tiene más de 1.570 líneas con bloques añadidos por capas: `.hero-split` en líneas ~1488-1571) | `styles.css` | M-L | ui-designer + frontend-developer |
| Tarjetas de proyecto: una sola anatomía (imagen 16:9, título, descripción, stack, 2 enlaces); la clase `feat` se usa también en la intranet sin imagen; el `.project-links` vacío de la intranet desaparece al retirarla | `index.html`, `styles.css` | S-M | ui-designer |
| Tarjeta de perfil (monograma "JS"): comprobar que no queda vacía visualmente; considerar sustituirla por un bloque "Datos rápidos" más compacto o un fragmento de código/terminal | `index.html`, `styles.css` | S | ui-designer |
| Coherencia de tema claro/oscuro (revisar capturas de ambos modos) | `styles.css` | S | ui-designer |
| Reducir la cantidad de efectos simultáneos (typing + cursores + tilt + 3D + marquee + HUD): elegir 2 como máximo | `crew.js`, `script.js`, `three-scene.js` | M | ui-designer decide, frontend-developer ejecuta |

## 7. README y repositorio

| Acción | Archivos | Esfuerzo | Agente |
|---|---|---|---|
| Regenerar `docs/capturas/hero.jpg` sin foto (y revisar el resto de capturas tras los cambios); actualizar el `alt` ("presentación a la izquierda, foto a la derecha") | `README.md`, `docs/capturas/*` | S | frontend-developer (captura) |
| Reescribir el README con tono de ingeniería: qué es, stack, decisiones técnicas, cómo ejecutar, enlace al sitio. Quitar o reducir "IA en el flujo de trabajo" y las menciones a la foto en la tabla de Secciones; sacar los emojis de Contacto; actualizar la lista de Secciones al nuevo orden | `README.md` | S | technical-writer (o documentation-engineer) |
| Corregir la estructura en README (`assets/img/ # foto y capturas`) y la nota "Los iconos... se cargan desde internet" cuando se autoalojen | `README.md` | S | technical-writer |
| `.gitignore`: comprobar si `.claude/settings.local.json` está ignorado; añadir `LICENSE` (MIT o similar para el código; el CV y las imágenes no) | `.gitignore`, `LICENSE` | S | git-workflow-manager |
| Descripción, topics y URL del sitio en el repo de GitHub (Settings), repo anclado en el perfil `Haise232` junto con GcGames, TopCode y MiBalance; README de perfil | GitHub (fuera del árbol) | S | Joaquín manual |
| Commits de este trabajo en ramas/commits pequeños con mensajes `feat:`/`fix:` (ya es la convención del historial) | git | S | git-workflow-manager |
| Estado actual de git: `D assets/img/foto_joaquin.jpg` está en el índice y hay cambios sin confirmar en `styles.css`, `script.js`, `index.html`; confirmar antes de empezar para no mezclar trabajos | git | S | git-workflow-manager |

## Priorización

**P0 (antes de enviar el portafolio a empresas)**
1. Enlaces vivos, repos con README, CV coherente, LinkedIn (sección 5).
2. Copy honesto y concreto: stats, experiencia "freelance", hero, GcGames, claim 24h (sección 2).
3. Proyectos al principio; quitar o relegar IA y marquee (sección 1).
4. Decisión de privacidad de teléfono/localidad (sección 5).
5. Captura `hero.jpg` del README sin foto.

**P1**
6. Emojis a SVG (sección 6).
7. Landmarks, foco, contraste, reduced-motion y alt (sección 3).
8. Metadatos OG/Twitter, JSON-LD, sitemap y robots, `og.png` (sección 4).

**P2**
9. Autoalojar fuentes e iconos, carga diferida de three.js, imágenes WebP (sección 4).
10. Refactor del CSS y limpieza de efectos (sección 6).
11. Reescritura del README, LICENSE, 404 (sección 7).
12. Reescritura de historial git (solo con permiso).

## Paralelización entre subagentes

Todos los subagentes trabajan sobre el mismo `index.html` y `styles.css`; para evitar conflictos de edición, separar en olas y asignar un único escritor por archivo en cada ola.

**Ola 0 (secuencial, 1 agente):** ui-designer fija el set de iconos y los tokens (contraste), y content-quality-editor/landing-page-copywriter producen los textos finales en `docs/COPY.md` (artefacto de traspaso). Depende de datos de Joaquín (LinkedIn, fechas de disponibilidad, resultados reales de proyectos, decisión de teléfono, IA y foto).

**Ola 1 (paralelo, sin tocar los mismos archivos):**
- accessibility-tester: audita y escribe `docs/AUDIT_A11Y.md` (solo lectura).
- seo-specialist: crea `robots.txt`, `sitemap.xml`, `docs/SEO_SNIPPETS.md` (bloque meta y JSON-LD listo para pegar).
- performance-engineer: audita y escribe `docs/AUDIT_PERF.md`; prepara `assets/img/` optimizadas y `og.png` (archivos nuevos, no edita `index.html`).
- qa-expert: comprueba los enlaces vivos y escribe `docs/LINKCHECK.md`.
- technical-writer: reescribe `README.md` (archivo distinto de los anteriores).

**Ola 2 (un solo escritor sobre `index.html`, `styles.css`, `*.js`):** frontend-developer integra COPY.md, los SVG, los snippets SEO, los hallazgos de a11y y rendimiento, y el nuevo orden de secciones. Si se quiere dividir, hacerlo por archivo: (a) `index.html`, (b) `styles.css`, (c) JS, sin solaparse.

**Ola 3 (paralelo, solo lectura):** accessibility-tester y performance-engineer revalidan; code-reviewer revisa el diff; ai-writing-auditor repasa el texto final. Después, regenerar capturas del README.

## Preguntas abiertas y riesgos

- ¿Se retira la sección IA y la simulación, o se deja al final? (recomendado: retirar).
- ¿Se publica el teléfono? ¿Se conserva "Ingenio"? (recomendado: no).
- ¿URL de LinkedIn? ¿Fecha de disponibilidad y tipo de contrato buscado (prácticas FCT, junior, jornada)?
- Datos reales para los resultados de proyecto (usuarios, endpoints, tests, tiempo de desarrollo): no se pueden inventar; hay que pedirlos o leerlos de los repos.
- ¿Se reescribe el historial de git para eliminar la foto? Requiere permiso explícito y fuerza push.
- ¿Se mantiene el efecto de montaje en vivo (typing/cursores)? Es distintivo, pero aumenta el riesgo de accesibilidad y retrasa la lectura; hay que medir LCP y probarlo con lector de pantalla antes de decidir.
- No se han medido contrastes, Lighthouse ni peso real de recursos; las acciones de esas filas empiezan por medir.
- No hay agente específico de "iconos"; ui-designer y frontend-developer cubren el trabajo, pero la elección del set es subjetiva y requiere aprobación de Joaquín.

## Resumen de prioridades

1. Verificar enlaces, repos, CV y añadir LinkedIn.
2. Copy honesto: corregir "8+ proyectos", "freelance" y "respondo en 24h".
3. Subir Proyectos al segundo bloque; quitar marquee; retirar o relegar IA.
4. Reencuadrar GcGames como plataforma multijugador en tiempo real.
5. Decidir privacidad (teléfono, localidad) y foto en el historial.
6. Emojis a SVG coherentes.
7. Landmarks, foco, contraste, reduced-motion.
8. OG/Twitter, JSON-LD Person, sitemap y robots.
9. Autoalojar fuentes e iconos, diferir three.js, optimizar imágenes.
10. README renovado y captura sin foto.
