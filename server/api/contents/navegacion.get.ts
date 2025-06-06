export default defineEventHandler(() => {
    const Navegacion = {
      modulo: "Navegación en Bases de Datos",
      objetivo: "Aplicar estrategias de búsqueda avanzadas y analizar críticamente los resultados obtenidos en bases de datos científicas.",
      introduccion: "La investigación académica de calidad inicia con una búsqueda eficaz de información. Navegar correctamente en bases de datos científicas te permite encontrar fuentes relevantes, actualizadas y de alta calidad. En este módulo aprenderás a diseñar estrategias de búsqueda y a analizar críticamente los resultados.",
      fundamentos: {
        que_es: "Es un sistema que organiza y permite recuperar información académica, como artículos, libros o tesis.",
        tipos: [
          {
            tipo: "Bibliográficas",
            descripcion: "Indexan referencias.",
            ejemplos: ["SCOPUS", "Web of Science", "ERIC"]
          },
          {
            tipo: "Texto completo",
            descripcion: "Acceso directo a documentos.",
            ejemplos: ["ScienceDirect", "JSTOR"]
          },
          {
            tipo: "Especializadas",
            descripcion: "Áreas específicas.",
            ejemplos: ["PsycINFO", "CINAHL", "IEEE Xplore"]
          }
        ]
      },
      estrategias_busqueda: [
        {
          paso: 1,
          titulo: "Definir el problema de búsqueda",
          descripcion: "Utiliza esquemas como PICO para delimitar claramente tu pregunta."
        },
        {
          paso: 2,
          titulo: "Identificar palabras clave y sinónimos",
          descripcion: "Usa términos principales, sinónimos y traducciones. Apóyate en tesauros (como MeSH en PubMed)."
        },
        {
          paso: 3,
          titulo: "Operadores booleanos",
          descripcion: "Combina términos de forma lógica para afinar la búsqueda.",
          operadores: [
            { operador: "AND", explicacion: "Todos los términos deben aparecer." },
            { operador: "OR", explicacion: "Cualquiera de los términos es suficiente." },
            { operador: "NOT", explicacion: "Excluye un término." }
          ],
          ejemplo: '("educación inclusiva" OR "inclusión educativa") AND ("tecnologías de la información") NOT "educación especial"'
        },
        {
          paso: 4,
          titulo: "Truncamiento y comodines",
          truncamiento: {
            descripcion: "Busca variaciones.",
            ejemplo: "educa → educación, educativo"
          },
          comodines: {
            descripcion: "Sustituyen letras.",
            ejemplo: "wom?n → woman, women"
          }
        },
        {
          paso: 5,
          titulo: "Aplicar filtros",
          filtros: ["Año de publicación", "Tipo de documento", "Idioma", "Acceso a texto completo"]
        }
      ],
      criterios_evaluacion: {
        relevancia: "¿Responde a tu pregunta?",
        calidad: "¿Publicación arbitrada? ¿Prestigio del autor?",
        actualizacion: "¿Es información reciente?",
        tipo_estudio: "Empírico, revisión, teórico"
      },
      documentacion_busqueda: "Llevar registro del proceso garantiza transparencia y reproducibilidad."
    };
  
    return Navegacion;
  });
  