# 🚀 Guía de Deployment - Portafolio Windows XP

## 📋 Pre-requisitos

- Node.js 18+ instalado
- Git configurado
- Cuenta en Netlify o Vercel (gratis)
- Cuenta en GitHub

## 📦 Preparación para Producción

### 1. Build del Proyecto

```bash
cd D:/portafolio
npm run build
```

Este comando genera la carpeta `dist/` con los archivos optimizados para producción (~350 KB).

### 2. Vista Previa Local

```bash
npm run preview
```

Abre http://localhost:4173 para ver el build de producción localmente.

## 🌐 Deployment en Netlify (Recomendado)

### Opción A: Deploy Directo desde GitHub

1. **Subir código a GitHub**:
```bash
cd D:/portafolio
git init
git add .
git commit -m "Initial commit: Windows XP Portfolio"
git remote add origin https://github.com/liberius/portafolio.git
git push -u origin main
```

2. **Conectar con Netlify**:
   - Ve a https://app.netlify.com/
   - Click en "Add new site" → "Import an existing project"
   - Selecciona GitHub y autoriza
   - Elige el repo `portafolio`
   - Configuración:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

### Opción B: Deploy Manual

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

Cuando pregunte por el folder, indica: `dist`

## 🔷 Deployment en Vercel (Alternativa)

```bash
npm install -g vercel
vercel login
vercel --prod
```

## 📊 Optimizaciones Aplicadas

- ✅ Code splitting automático (Vite)
- ✅ Tree shaking para eliminar código no usado
- ✅ Minificación de JS y CSS
- ✅ Compresión gzip automática
- ✅ Lazy loading de componentes
- ✅ Assets optimizados

## 🔧 Variables de Entorno (Opcional)

Si necesitas APIs con keys privadas, crea `.env`:

```env
VITE_API_KEY=tu_key_aqui
```

Y accede con: `import.meta.env.VITE_API_KEY`

## 📂 Estructura del Build

```
dist/
├── index.html          # HTML optimizado
├── assets/
│   ├── index-[hash].js    # Bundle JS minificado
│   └── index-[hash].css   # CSS minificado
└── vite.svg
```

## 🐛 Troubleshooting

### Error: "npm run build fails"

```bash
# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Error: "Out of memory"

```bash
# Aumentar memoria de Node.js
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

### Rutas rotas en producción

Asegúrate de tener `base: './'` en `vite.config.ts` para rutas relativas.

## 📱 Testing en Producción

Checklist antes de considerar el sitio "live":

- [ ] Todas las ventanas abren correctamente
- [ ] RPA Lab muestra outputs (tablas, CSVs, gráficos)
- [ ] Code Samples carga todos los snippets
- [ ] API Demos funcionan (PokéAPI, NASA, Weather)
- [ ] Terminal ejecuta todos los comandos
- [ ] Felix the Cat se mueve correctamente
- [ ] Responsive en mobile (opcional)
- [ ] Performance score > 90 en Lighthouse

## 🎯 URLs de Ejemplo

- **Netlify**: https://tu-username.netlify.app
- **Vercel**: https://portafolio-tu-username.vercel.app
- **Custom domain**: https://manuelmedina.dev (requiere configuración DNS)

## 📈 Analytics (Opcional)

Agregar Google Analytics o Plausible para tracking de visitas:

```html
<!-- En index.html -->
<script defer data-domain="tu-dominio.com" src="https://plausible.io/js/script.js"></script>
```

## ✅ Checklist Final

- [ ] Build exitoso sin errores
- [ ] Preview local funciona correctamente
- [ ] Código subido a GitHub
- [ ] Site deployeado en Netlify/Vercel
- [ ] URL compartida en LinkedIn/CV
- [ ] Mini-proyectos Python subidos a GitHub
- [ ] Links de GitHub actualizados en Code Samples
