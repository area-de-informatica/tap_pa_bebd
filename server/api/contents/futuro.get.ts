export default defineEventHandler(() => {
  const futuroBusqueda = {
    modulo: "El futuro de la búsqueda en bases de datos académicas",
    objetivo: "Analizar cómo tecnologías emergentes (IA, modelos de deep learning, asistentes inteligentes, etc.) revolucionan la búsqueda en bases de datos académicas, mejoran el acceso y análisis de la información científica, e implican retos éticos en la selección y priorización de contenidos.",
    introduccion: "La búsqueda académica enfrenta un crecimiento exponencial de publicaciones, lo que hace que su gestión sea cada vez más compleja. Las tecnologías emergentes, especialmente la IA, están transformando este escenario. Por ejemplo, se desarrollan buscadores capaces de interpretar consultas en lenguaje natural, y herramientas que extraen y resumen automáticamente el contenido de documentos relevantes. Estas innovaciones facilitan encontrar información clave en la enorme masa de literatura científica.",
    secciones: [
      {
        titulo: "Uso de la Inteligencia Artificial en la búsqueda académica",
        descripcion: "La IA semántica (aprendizaje automático, PLN) extrae el significado de la literatura científica, permitiendo resaltar los artículos más importantes. Sistemas actuales incorporan IA para procesar consultas avanzadas.",
        ejemplos: [
          "Scopus AI (Elsevier): resume automáticamente los documentos en sus bases de datos.",
          "Web of Science AI (Clarivate): asistente generativo en fase de pruebas para facilitar la búsqueda en WoS.",
          "Recomendación de WorldCat (OCLC): sugiere lecturas personalizadas analizando preferencias de usuarios."
        ]
      },
      {
        titulo: "Modelos avanzados de 'Deep Research'",
        descripcion: "Surgen modelos de investigación profunda basados en IA que automatizan tareas complejas.",
        ventajas: [
          "Realizar búsquedas exhaustivas en diversas fuentes académicas.",
          "Analizar y comparar información relevante.",
          "Sintetizar los hallazgos en informes claros y concisos."
        ],
        ejemplo: "Perplexity Deep Research: servicio gratuito que realiza búsquedas académicas y genera informes detallados."
      },
      {
        titulo: "Automatización de búsquedas académicas",
        descripcion: "La automatización acelera la recopilación de información científica.",
        herramientas: [
          "Alertas de Google Scholar.",
          "Filtros avanzados en bases de datos.",
          "Elicit: IA que responde preguntas de investigación y resume artículos relevantes."
        ],
        tareas: [
          "Clasificación de grandes volúmenes de datos.",
          "Filtrado según criterios específicos.",
          "Identificación de tendencias y predicciones."
        ]
      },
      {
        titulo: "Asistentes inteligentes para la investigación",
        descripcion: "Herramientas con IA que permiten búsquedas conversacionales y apoyo académico.",
        ejemplos: [
          "ChatGPT: genera borradores, resume conceptos, responde preguntas complejas.",
          "Consensus: buscador que resume literatura con base en consenso científico.",
          "ChatPDF: permite interactuar con artículos en PDF mediante preguntas."
        ]
      },
      {
        titulo: "Nuevas plataformas de descubrimiento de conocimiento",
        descripcion: "Emergen plataformas especializadas que facilitan el descubrimiento de literatura académica.",
        plataformas: [
          "Semantic Scholar: extrae significado, muestra métricas de impacto.",
          "Research Rabbit: permite crear colecciones, visualizar redes de citación.",
          "Connected Papers y Litmaps: visualizan el panorama científico en mapas."
        ]
      },
      {
        titulo: "Integración con lenguaje natural",
        descripcion: "La búsqueda basada en lenguaje natural democratiza el acceso a la información.",
        usos: [
          "Asistentes como ChatGPT, Claude o Google Bard.",
          "Catálogos académicos con chatbots.",
          "Formulación de preguntas abiertas sin sintaxis de búsqueda compleja."
        ]
      },
      {
        titulo: "Consideraciones éticas",
        descripcion: "El uso de IA plantea retos éticos sobre sesgos, transparencia y equidad.",
        principios: [
          "Evitar reproducción de sesgos algorítmicos.",
          "Promover la supervisión humana.",
          "Alfabetización informacional en IA: privacidad, verificación y propiedad intelectual."
        ]
      }
    ]
  }

  return futuroBusqueda
});