// server/api/actividades.js

export default defineEventHandler(() => {
    return [
        {
            id: 1,
            modulo: "Navegación en bases de datos",
            titulo: "Búsqueda real en una base académica",
            descripcion: "Realiza una búsqueda en una base de datos académica como Scopus o ERIC utilizando operadores booleanos.",
            tipo: "práctica",
            recurso: "https://www.scopus.com/",
            instrucciones: "Realiza una búsqueda con al menos 2 operadores booleanos y guarda una captura de pantalla con los resultados.",
            evaluacion: "Rúbrica de calidad de búsqueda"
        },
        {
            id: 2,
            modulo: "Gestión de resultados",
            titulo: "Importación de referencias en Mendeley",
            descripcion: "Descarga al menos 3 artículos en formato RIS y organízalos en una carpeta temática usando Mendeley.",
            tipo: "técnica",
            recurso: "https://www.mendeley.com/",
            instrucciones: "Entrega evidencia en forma de captura de pantalla del gestor con tus documentos organizados.",
            evaluacion: "Checklist de cumplimiento"
        },
        {
            id: 3,
            modulo: "Evaluación crítica de fuentes",
            titulo: "Análisis de calidad de un artículo",
            descripcion: "Analiza un artículo científico usando criterios como revisión por pares, calidad editorial y pertinencia temática.",
            tipo: "analítica",
            recurso: "Plantilla de análisis PDF (proporcionada por el docente)",
            instrucciones: "Completa la plantilla de análisis con base en un artículo de tu área de estudio.",
            evaluacion: "Rúbrica de análisis crítico"
        },
        {
            id: 4,
            modulo: "Síntesis y evaluación",
            titulo: "Informe de experiencia investigativa",
            descripcion: "Integra lo aprendido en el OVA mediante un informe escrito o un video donde reflexiones sobre el proceso.",
            tipo: "integradora",
            recurso: "Plantilla de informe / Herramienta de grabación",
            instrucciones: "Sigue la guía entregada. Debe incluir: búsqueda, análisis, gestión y reflexión.",
            evaluacion: "Autoevaluación y cuestionario final"
        }
    ]
})
