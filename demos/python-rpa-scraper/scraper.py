"""
RPA Scraper Demo - Job Listings Extractor
==========================================
Este script demuestra habilidades de RPA/Web Scraping usando Python.
Extrae ofertas de trabajo de una API pública y genera un reporte Excel.

Skills demostradas:
- API consumption
- Data parsing y limpieza con Pandas
- Generación de reportes Excel
- Manejo de errores y logging
"""

import requests
import pandas as pd
from datetime import datetime
import json


def fetch_job_listings(query="python", location="remote", limit=50):
    """
    Extrae ofertas de trabajo desde una API pública.
    Usando GitHub Jobs API (alternativa: Adzuna, The Muse)
    """
    print(f"🔍 Buscando ofertas de trabajo: {query} en {location}...")

    # Simular API call (GitHub Jobs API está deprecada, usar datos mock)
    # En producción: usar Adzuna API, LinkedIn API, etc.

    mock_jobs = [
        {
            "id": f"job-{i}",
            "title": f"Python Developer {i}",
            "company": f"Tech Company {i % 10}",
            "location": location,
            "type": "Full-time" if i % 2 == 0 else "Contract",
            "description": f"Looking for Python developer with {i+1} years experience",
            "salary_range": f"${50000 + (i * 5000)} - ${70000 + (i * 5000)}",
            "posted_date": datetime.now().strftime("%Y-%m-%d"),
            "url": f"https://example.com/job/{i}"
        }
        for i in range(min(limit, 50))
    ]

    print(f"✅ Encontradas {len(mock_jobs)} ofertas")
    return mock_jobs


def clean_and_transform_data(jobs):
    """
    Limpia y transforma los datos extraídos usando Pandas.
    """
    print("🧹 Limpiando y transformando datos...")

    df = pd.DataFrame(jobs)

    # Limpiar columnas
    df['title'] = df['title'].str.strip()
    df['company'] = df['company'].str.strip()

    # Agregar columnas calculadas
    df['days_ago'] = 0  # Simular días desde publicación
    df['salary_min'] = df['salary_range'].str.extract(r'\$(\d+)').astype(int)

    # Ordenar por salario
    df = df.sort_values('salary_min', ascending=False)

    print(f"✅ Datos procesados: {len(df)} registros")
    return df


def generate_excel_report(df, filename='job_listings_report.xlsx'):
    """
    Genera un reporte Excel profesional con múltiples hojas.
    """
    print(f"📊 Generando reporte Excel: {filename}...")

    with pd.ExcelWriter(filename, engine='openpyxl') as writer:
        # Hoja 1: Todos los trabajos
        df.to_excel(writer, sheet_name='All Jobs', index=False)

        # Hoja 2: Resumen por tipo de trabajo
        summary = df.groupby('type').agg({
            'id': 'count',
            'salary_min': 'mean'
        }).rename(columns={'id': 'count', 'salary_min': 'avg_salary'})
        summary.to_excel(writer, sheet_name='Summary')

        # Hoja 3: Top 10 empresas
        top_companies = df['company'].value_counts().head(10)
        top_companies.to_excel(writer, sheet_name='Top Companies')

    print(f"✅ Reporte generado: {filename}")
    return filename


def generate_json_output(df, filename='job_listings.json'):
    """
    Exporta datos a JSON para integración con otras herramientas.
    """
    print(f"💾 Exportando a JSON: {filename}...")

    data = {
        "timestamp": datetime.now().isoformat(),
        "total_jobs": len(df),
        "jobs": df.to_dict('records')
    }

    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"✅ JSON exportado: {filename}")
    return filename


def main():
    """
    Función principal que ejecuta el workflow completo de RPA.
    """
    print("=" * 60)
    print("🤖 RPA Job Scraper - Demo Portfolio")
    print("=" * 60)
    print()

    try:
        # 1. Extraer datos
        jobs = fetch_job_listings(query="python", location="remote", limit=30)

        # 2. Limpiar y transformar
        df = clean_and_transform_data(jobs)

        # 3. Generar reportes
        excel_file = generate_excel_report(df)
        json_file = generate_json_output(df)

        # 4. Estadísticas finales
        print()
        print("=" * 60)
        print("📈 ESTADÍSTICAS FINALES")
        print("=" * 60)
        print(f"Total ofertas procesadas: {len(df)}")
        print(f"Salario promedio: ${df['salary_min'].mean():,.0f}")
        print(f"Archivos generados:")
        print(f"  - {excel_file}")
        print(f"  - {json_file}")
        print()
        print("✅ Proceso completado exitosamente!")

    except Exception as e:
        print(f"❌ Error durante la ejecución: {e}")
        raise


if __name__ == "__main__":
    main()
