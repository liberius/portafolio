Producto: Portafolio interactivo estilo Windows XP/pixel art
Autor: Manuel Medina
Fecha: 2025-10-06
Estado: Borrador v1

1. Resumen ejecutivo
- Objetivo: Crear un portafolio web gratuito, entretenido y claro para reclutadores, inspirado en un escritorio retro estilo Windows XP con “mini‑apps” que presentan proyectos y habilidades: Full‑Stack Python, RPA con Python, consumo de APIs, IA aplicada (local), análisis de datos y soporte/gestión.
- Resultado clave: Navegación lúdica sin perder claridad; cada pieza del contenido explícitamente etiquetada con su skill (color/ícono) y con una micro‑presentación “Sobre mí” contextual.
- Alcance v1: Frontend 100% gratuito (Vite/Next.js), demos de APIs públicas, una demo RPA simulada, perfiles de proyectos y micro‑presentaciones. Sin servicios de pago; sin servidores persistentes.

2. Problema y oportunidad
- Problema: Los portafolios técnicos suelen ser lineales y poco memorables; además, mezclan habilidades sin señalización clara, dificultando la evaluación rápida por recruiters.
- Oportunidad: Un “desktop OS” retro genera engagement y permite empaquetar varias demos en ventanas independientes con etiquetas de habilidades consistentes.

3. Público objetivo y criterios de éxito
- Personas:
  1) Recruiter técnico/no técnico: necesita distinguir rápido habilidades, ver 1–3 demos relevantes, encontrar CV y contacto.
  2) Hiring manager/Desarrollador senior: busca profundidad técnica, stack, repos, pequeñas pruebas interactivas.
  3) Cliente PyME: desea demos de automatización/API “listos para imaginar” su caso.
- KPIs:
  - Tiempo hasta entender el perfil (< 30 s desde landing).
  - Porcentaje de secciones con etiqueta de skill visible (> 95%).
  - 3–5 interacciones medias por visita (abrir apps, ejecutar comandos, cambiar tema).
  - CTR a CV/Contacto > 15%.

4. Principios de diseño
- Claridad sobre todo: cada módulo tiene etiqueta de skill visible y consistente (color + ícono + texto).
- Divertido pero usable: ventanas arrastrables, minimizar/maximizar, taskbar, menú Inicio.
- Rendimiento y accesibilidad: lazy loading, teclado y ARIA, contraste AA.
- Gratis y seguro: uso de APIs públicas y data mock, sin exponer servicios privados; si se publica en local, con túneles y aislamiento.

5. Taxonomía de habilidades (skill tags)
- Definición: Cada proyecto/demo se marca con 1 skill principal (+ secundarias opcionales).
- Paleta e íconos (propuesta):
  - Full‑Stack Python: Azul #2B6CB0, ícono: <> (brackets).
  - RPA con Python: Verde #2F855A, ícono: engranaje/robot.
  - APIs Front Rápidas: Fucsia #D53F8C, ícono: nube/API.
  - IA/LLM Local: Morado #6B46C1, ícono: cerebro/chip.
  - Análisis de Datos: Naranja #DD6B20, ícono: gráfico.
  - Soporte/Operaciones: Gris #718096, ícono: llave inglesa.
- Ubicación: En íconos del escritorio (badge), en título de la ventana (píldora), en cards de proyecto y en filtro global de la barra de tareas.

6. Micro‑presentaciones “Sobre mí” contextuales
- Objetivo: En cada app/ventana, incluir un bloque de 2–4 líneas que conecte el contenido con tu experiencia.
- Estilo: Primera persona, conciso, con 1–2 logros y 1 CTA (“Ver repo”, “Abrir demo”).
- Ejemplos:
  - Explorador (Proyectos): “Soy Técnico en Informática e Ingeniero Industrial. He construido automatizaciones con Python y UIs en React/TS para productos de IA. Aquí organizo mis proyectos por habilidades para que identifiques lo más relevante rápido.”
  - RPA Lab: “Diseño bots con Python y Rocketbot para tareas repetitivas como conciliación bancaria. En esta demo simulo reglas, scraping y generación de reportes Excel.”
  - API Demos: “Me gusta crear frontends livianos que consumen APIs públicas con buen caching y UX. Prueba estas demos cortas.”
  - Terminal: “Uso terminal para orquestar procesos, monitorear logs y probar endpoints. Ejecuta un par de comandos de muestra.”
  - Sobre mí (Bloc de notas): “7+ años en tecnología y educación. Enfoque en IA aplicada, RPA y desarrollo web. Trabajador, responsable y orientado a resultados.”

7. Arquitectura de información y apps
- Escritorio: Íconos grandes con etiquetas de skill. Fondo pixel art. Sonidos al abrir/cerrar.
- Menú Inicio: Sobre mí, Proyectos, API Demos, RPA Lab, CV, Contacto, Configuración.
- Taskbar: Ventanas abiertas, reloj, toggles de tema/sonido.
- Apps v1:
  1) Explorador (Proyectos): Árbol por categoría. Ventana de detalle con descripción, stack, GIF, links (repo/demo), skill tag.
  2) API Demos (mini‑navegador): PokeDex (PokeAPI), NASA APOD, Clima (OpenWeatherMap con API key gratuita opcional). Cada demo abre en pestaña/ventana con controles simples.
  3) RPA Lab: Simulación de: email triage (reglas), scraping a sitio de pruebas, reporte Excel generado con datos mock. Log de ejecución en tiempo real simulado.
  4) Terminal: Comandos: `help`, `rpa run demo`, `api fetch apod --today`, `skills filter rpa`. Respuestas con logs/outputs sintéticos.
  5) Bloc de notas (Sobre mí): Perfil, timeline, CV y valores. Editable fake (no persiste).
  6) Panel de control: Tema (XP/Luna/Oscuro retro), tamaños, SFX on/off, accesibilidad.

8. Contenido derivado del CV
- Experiencia destacada (resumida para cards):
  - Kabeli (2024–2025): Automatizaciones con IA y Python (OCR), front con React/TS. Skill: RPA, IA Local, Front.
  - Apiux (2023–2024): Modelos predictivos, web scraping, RPA, reemplazo de módulos SAP con APIs; SQL Server. Skill: Full‑Stack, RPA, Datos.
  - DAEM (2020–2023): Gestión de inventarios y presupuestos; mejora de procesos. Skill: Operaciones.
  - Sonda (2017–2018): Soporte técnico 1B remoto y coordinación en terreno. Skill: Soporte.
  - Freelance IA (2024–): Chatbot generativo con LangChain, RAG, vectores. Skill: IA Local.
  - Freelance RPA (2025–): Conciliación bancaria con Rocketbot, SAP/web, APIs, reportes Excel. Skill: RPA.
- Educación: Ing. Industrial (UNAB, 2022), T.U. Informática (USM, 2016).
- Certificaciones: IA (Biblioredes, 2025), Rocketbot N1–N3 (2025).

9. Requisitos funcionales
F1 Escritorio retro con íconos y fondos; arrastrar/abrir/minimizar ventanas.
F2 Etiquetado de habilidades en íconos, ventanas y cards; filtro global por skill.
F3 Menú Inicio y taskbar con estado de ventanas.
F4 Explorador de proyectos con detalle y links a repos/demos.
F5 API Demos: PokeDex, NASA APOD, Clima; manejo de errores y loading.
F6 RPA Lab: simulaciones reproducibles con logs visibles.
F7 Terminal con comandos de muestra y autocompletado básico.
F8 Panel de control con temas/sounds/accesibilidad.
F9 Micro‑presentación “Sobre mí” en todas las apps.
F10 Página/ventana de CV y contacto (email, LinkedIn, GitHub).

10. Requisitos no funcionales
- Gratuito: Sin dependencias de pago. APIs públicas free tier; sin backend persistente obligatorio.
- Rendimiento: LCP < 2.5s en conexiones típicas; imágenes optimizadas y lazy.
- Accesibilidad: Navegación por teclado, roles ARIA, contraste AA.
- Mantenibilidad: Componentes desacoplados (WindowManager, IconRegistry, SkillTag, etc.).

11. Stack y licencias (100% gratis)
- Frontend: Vite + React + TypeScript (o Next.js si se prefiere). Estado: Zustand/Redux Toolkit. Animaciones: Framer Motion. Ventanas: react-rnd o react-draggable. Datos: React Query/SWR.
- Estilo: CSS personalizado inspirado en 98.css/NES.css; fuentes Google (Press Start 2P, VT323, Pixelify Sans).
- APIs: PokeAPI, NASA APOD (key gratuita), OpenWeatherMap (key gratuita opcional) o WeatherAPI free. Se puede mockear para offline.
- IA Local: Demos con datos sintéticos y explicación de cómo se correría localmente con ollama u open‑source (sin ejecutarlos en producción del portfolio para no requerir compute).
- Hosting: GitHub Pages/Netlify/Vercel (free). Preferible GitHub Pages para simplicidad.

12. Seguridad (si se monta localmente)
- Opción 1: No exponer nada local. Portfolio estático; demos que requieren backend usan data mock.
- Opción 2: Exposición temporal mediante Cloudflare Tunnel (free). Aislar con usuario invitado o VM (WSL2/Ubuntu/VirtualBox), puerto aleatorio, sin acceso a red local.
- Buenas prácticas: No almacenar keys en repo; usar .env local y sólo para local; sanitizar logs; CSP estricta; no iframes de terceros inseguros; dependencias auditadas.

13. Analítica y privacidad
- Preferencia por no rastrear o usar una solución de conteo simple (GoatCounter gratis) con consentimiento.

14. Roadmap y entregables
- Sprint 1: Shell retro
  - W1: Estructura del proyecto (Vite + React + TS), WindowManager, Taskbar, Menú Inicio, temas, SFX.
  - Entregable: Landing con escritorio funcional y 1 ventana demo.
- Sprint 2: Contenido base
  - W2: Explorador de Proyectos, Bloc de Notas (Sobre mí) con micro‑presentaciones, CV/Contacto.
  - Entregable: 4–6 proyectos cargados con skill tags.
- Sprint 3: Demos
  - W3: API Demos (PokeDex, NASA APOD, Clima), Terminal con comandos de muestra.
  - Entregable: 3 demos estables y filtrables por skill.
- Sprint 4: RPA e IA local
  - W4: RPA Lab (simulaciones y logs), sección IA Local explicativa con flujo RAG local.
  - Entregable: RPA Lab funcional y documento de seguridad.

15. Métricas de aceptación (ejemplos)
- Todas las ventanas muestran su skill tag en título e icono.
- Filtro global por skill afecta íconos del escritorio y lista del Explorador.
- Cada app muestra una micro‑presentación “Sobre mí”.
- API Demos manejan error 4xx/5xx con UI clara.
- RPA Lab ejecuta un flujo simulado con logs visibles y resultado final (reporte ficticio).

16. Lista de tareas inicial (alto nivel)
1) Definir y documentar taxonomía de skills y paleta (este PRD).
2) Crear repo y esqueleto (Vite + React + TS) y base del WindowManager.
3) Implementar escritorio, taskbar, menú Inicio, temas y sonidos.
4) Implementar componente SkillTag y filtro global por skill.
5) Construir “Explorador (Proyectos)” y cards con skill tags y links.
6) Redactar micro‑presentaciones y vincularlas a cada app.
7) Implementar “Bloc de notas (Sobre mí)” + CV/Contacto.
8) Implementar “API Demos” (PokeDex, APOD, Clima) con manejo de errores.
9) Implementar “Terminal” con comandos de muestra.
10) Implementar “RPA Lab” (simulaciones): reglas, scraping de prueba, Excel mock + logs.
11) Accesibilidad (teclado/ARIA/contraste) y rendimiento (lazy/caché).
12) Seguridad: documento de buenas prácticas y guía de publicación local segura.
13) Hosting gratuito (GitHub Pages) y, opcional, conteo con GoatCounter.

17. Riesgos y mitigaciones
- APIs con límites de rate: Añadir caché y modo demo con data mock.
- Complejidad UI de ventanas: Empezar con ventana base y expandir.
- Performance en móviles: Layout responsive y opción “modo lista” sin ventanas.

18. Anexos
- Copy base (EN/ES) para micro‑presentaciones y CTAs.
- Mock JSON para demos y registros de RPA.

