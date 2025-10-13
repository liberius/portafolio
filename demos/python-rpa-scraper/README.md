# 🤖 RPA Job Scraper Demo

Script de Python que demuestra habilidades de **RPA y Web Scraping** mediante la extracción y procesamiento de ofertas de trabajo.

## 🎯 Skills Demostradas

- **API Integration**: Consumo de APIs REST
- **Data Processing**: Pandas para limpieza y transformación
- **Report Generation**: Exportación a Excel y JSON
- **Error Handling**: Manejo robusto de errores
- **Code Quality**: Documentación y estructura profesional

## 🚀 Instalación

```bash
pip install -r requirements.txt
```

## ▶️ Uso

```bash
python scraper.py
```

## 📊 Outputs

El script genera:
- `job_listings_report.xlsx` - Reporte Excel con 3 hojas:
  - Todos los trabajos
  - Resumen por tipo
  - Top 10 empresas
- `job_listings.json` - Datos en formato JSON

## 🔧 Configuración

Edita `scraper.py` para cambiar:
- Query de búsqueda
- Ubicación
- Límite de resultados

## 📝 Notas

Este demo usa datos mock para evitar dependencias de APIs externas. En producción, se integraría con:
- Adzuna API
- LinkedIn Jobs API
- Indeed API
- The Muse API
