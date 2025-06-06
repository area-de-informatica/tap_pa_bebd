export default defineEventHandler(() => {
    const BasesDatos = {
      modulo: "Bases de Datos",
      objetivo: "Reconocer la naturaleza, función y tipos de bases de datos científicas para comprender su valor en la investigación académica y diferenciar su uso respecto a otros sistemas de búsqueda de información.",
      contenido: {
        definicion: {
          titulo: "¿Qué es una base de datos académica?",
          descripcion: "Una base de datos académica es un sistema digital organizado que recopila, almacena, gestiona y permite recuperar documentos científicos como artículos, libros, tesis, actas de congresos, informes técnicos y más. Estas bases son herramientas fundamentales para estudiantes, docentes e investigadores, ya que facilitan el acceso a información confiable, actualizada y validada por la comunidad científica."
        },
        comparacion_buscadores: {
          titulo: "¿En qué se diferencia de un buscador común?",
          comparativa: [
            {
              caracteristica: "Tipo de información",
              buscador_comun: "General, popular o no verificada",
              base_datos_academica: "Científica, revisada por pares"
            },
            {
              caracteristica: "Resultados ordenados por",
              buscador_comun: "Popularidad y algoritmos comerciales",
              base_datos_academica: "Relevancia académica y criterios técnicos"
            },
            {
              caracteristica: "Filtros avanzados",
              buscador_comun: "Limitados",
              base_datos_academica: "Muy precisos (año, revista, tipo, autor)"
            },
            {
              caracteristica: "Acceso a texto completo",
              buscador_comun: "Incierto o parcial",
              base_datos_academica: "Sí, o mediante enlaces confiables"
            },
            {
              caracteristica: "Ejemplos",
              buscador_comun: "Google, Bing, Yahoo",
              base_datos_academica: "Scopus, Web of Science, PubMed, ERIC"
            }
          ]
        },
        tipos_bases_datos: {
          titulo: "Tipos de bases de datos académicas",
          categorias: [
            {
              tipo: "Bases multidisciplinarias",
              descripcion: "Contienen información de múltiples áreas del conocimiento. Permiten búsquedas amplias e interdisciplinares.",
              ejemplos: ["Scopus", "Web of Science", "Google Scholar", "Redalyc", "Dimensions"]
            },
            {
              tipo: "Bases especializadas",
              descripcion: "Se centran en un campo específico como medicina, educación o psicología.",
              ejemplos: [
                { nombre: "PubMed", area: "Ciencias de la salud" },
                { nombre: "ERIC", area: "Educación" },
                { nombre: "PsycINFO", area: "Psicología" },
                { nombre: "IEEE Xplore", area: "Ingeniería y tecnología" }
              ]
            }
          ]
        },
        acceso_bases_datos: {
          titulo: "Ejemplos de bases de datos según acceso",
          tipos: [
            {
              tipo: "De suscripción",
              descripcion: "Requieren acceso institucional o pago",
              ejemplos: ["Scopus", "Web of Science", "JSTOR"]
            },
            {
              tipo: "De acceso abierto",
              descripcion: "Gratuitas, permiten libre descarga de textos",
              ejemplos: ["SciELO", "Redalyc", "DOAJ", "BASE"]
            }
          ]
        },
        importancia: {
          titulo: "¿Por qué es importante usar bases de datos científicas?",
          razones: [
            "Garantizan la calidad y veracidad de la información",
            "Permiten desarrollar investigaciones rigurosas y actualizadas",
            "Ofrecen herramientas de búsqueda avanzada y precisa",
            "Facilitan la citación y organización de referencias",
            "Conectan al usuario con las últimas tendencias en su área de estudio"
          ]
        }
      }
    };
  
    return BasesDatos;
  });
  