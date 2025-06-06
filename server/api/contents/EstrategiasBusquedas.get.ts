export default defineEventHandler(() => {
    const EstrategiasBusqueda = {
      modulo: "Diseño de Estrategias de Búsqueda",
      objetivo: "Elaborar estrategias de búsqueda efectivas para localizar información académica relevante.",
      contenido: {
        palabras_clave: {
          titulo: "Palabras clave (Keywords)",
          definicion: "Son los conceptos esenciales que describen el tema de investigación.",
          como_identificarlas: [
            "Leer la pregunta o tema de investigación.",
            "Extraer los términos más importantes (nombres de fenómenos, técnicas, poblaciones, etc.).",
            "Evitar usar frases completas o términos genéricos."
          ],
          ejemplo: {
            tema: "El uso de tecnología en la educación inclusiva",
            palabras_clave: ["tecnología", "educación inclusiva"]
          }
        },
        sinonimos_terminos_relacionados: {
          titulo: "Sinónimos y términos relacionados",
          importancia: "Los artículos pueden utilizar diferentes términos para describir el mismo concepto.",
          tareas: [
            "Buscar sinónimos, traducciones (si buscas en inglés) y variaciones conceptuales.",
            "Incluir términos más amplios o específicos si es necesario."
          ],
          ejemplo: {
            tecnologia: ["Tecnologías de la información", "TIC"],
            educacion_inclusiva: ["Inclusión educativa", "Integración escolar"]
          }
        },
        operadores_booleanos: {
          titulo: "Operadores booleanos",
          descripcion: "Permiten combinar conceptos de forma lógica para afinar la búsqueda.",
          operadores: [
            {
              operador: "AND",
              funcion: "Busca resultados que incluyan ambos términos.",
              ejemplo: "educación inclusiva AND tecnología"
            },
            {
              operador: "OR",
              funcion: "Busca resultados que incluyan uno u otro término.",
              ejemplo: "educación inclusiva OR inclusión educativa"
            },
            {
              operador: "NOT",
              funcion: "Excluye resultados que contengan un término.",
              ejemplo: "inclusión educativa NOT educación especial"
            }
          ],
          consejo: "Usa paréntesis para estructurar ecuaciones complejas."
        },
        truncadores_comodines: {
          titulo: "Truncadores y comodines",
          truncadores: {
            descripcion: "Buscan todas las palabras que empiezan igual.",
            ejemplo: "educa* → educación, educador, educativo"
          },
          comodines: {
            descripcion: "Sustituyen uno o más caracteres.",
            ejemplo: "wom?n → woman, women"
          },
          nota: "El uso exacto puede variar según la base de datos (ver ayuda específica de cada una)."
        },
        filtros: {
          titulo: "Aplicación de filtros",
          descripcion: "Después de ejecutar la búsqueda, aplicar filtros mejora la precisión de los resultados.",
          filtros_recomendados: [
            "Fecha de publicación: Limitar a los últimos 5 o 10 años.",
            "Idioma: Según necesidad (por ejemplo, español e inglés).",
            "Tipo de documento: Artículos revisados por pares, revisiones sistemáticas.",
            "Área temática: Reducir a las áreas más relevantes."
          ]
        }
      }
    };
  
    return EstrategiasBusqueda;
  });
  