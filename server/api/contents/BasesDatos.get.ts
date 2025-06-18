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
            nombre: "Buscadores Comunes",
            tipo: "Búsqueda General",
            caracteristicas: [
              "Información general o no verificada",
              "Resultados por popularidad",
              "Filtros limitados",
              "Acceso incierto al texto completo"
            ]
          },
          {
            nombre: "Bases de Datos Académicas", 
            tipo: "Búsqueda Científica",
            caracteristicas: [
              "Información científica revisada por pares",
              "Resultados por relevancia académica",
              "Filtros muy precisos",
              "Acceso garantizado al texto completo"
            ]
          }
        ]
      },
      tipos_bases_datos: {
        titulo: "Tipos de bases de datos académicas",
        categorias: [
          {
            nombre: "Bases multidisciplinarias",
            descripcion: "Contienen información de múltiples áreas del conocimiento. Permiten búsquedas amplias e interdisciplinares.",
            ejemplos: ["Scopus", "Web of Science", "Google Scholar", "Redalyc", "Dimensions"]
          },
          {
            nombre: "Bases especializadas",
            descripcion: "Se centran en un campo específico como medicina, educación o psicología.",
            ejemplos: ["PubMed (Salud)", "ERIC (Educación)", "PsycINFO (Psicología)", "IEEE Xplore (Ingeniería)"]
          }
        ]
      },
      acceso_bases_datos: {
        titulo: "Ejemplos de bases de datos según acceso",
        tipos: [
          {
            nombre: "De suscripción",
            descripcion: "Requieren acceso institucional o pago para acceder al contenido completo"
          },
          {
            nombre: "De acceso abierto", 
            descripcion: "Gratuitas, permiten libre descarga de textos y acceso sin restricciones"
          }
        ]
      },
      importancia: {
        titulo: "¿Por qué es importante usar bases de datos científicas?",
        razones: [
          {
            titulo: "Calidad garantizada",
            descripcion: "Garantizan la calidad y veracidad de la información mediante procesos de revisión por pares"
          },
          {
            titulo: "Investigación rigurosa",
            descripcion: "Permiten desarrollar investigaciones rigurosas y actualizadas con fuentes confiables"
          },
          {
            titulo: "Búsqueda avanzada",
            descripcion: "Ofrecen herramientas de búsqueda avanzada y precisa con múltiples filtros"
          },
          {
            titulo: "Gestión de referencias",
            descripcion: "Facilitan la citación y organización de referencias de manera profesional"
          },
          {
            titulo: "Actualización constante",
            descripcion: "Conectan al usuario with las últimas tendencias y avances en su área de estudio"
          }
        ]
      }
    }
  };

  return BasesDatos;
});