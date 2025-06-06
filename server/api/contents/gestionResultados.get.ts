export default defineEventHandler(() => {
    const gestionResultados = {
      modulo: "Gestión de Resultados",
      objetivo: "Organizar, guardar y citar correctamente las fuentes de información científica.",
      introduccion: "La investigación académica no solo implica encontrar información relevante, sino también gestionar adecuadamente los resultados y citar las fuentes de manera correcta para garantizar la integridad académica. Este módulo aborda las estrategias para exportar referencias, utilizar gestores bibliográficos y aplicar las normas de citación APA 7ª edición de forma rigurosa.",
      secciones: [
        {
          titulo: "Exportación de Resultados",
          descripcion: "Una vez identificados los documentos relevantes en una base de datos, es importante guardar las referencias de manera eficiente.",
          exportacion_automatica: [
            "Exportar cita",
            "Guardar en gestor bibliográfico",
            "Descargar archivo RIS"
          ],
          buenas_practicas: [
            "Verificar que el archivo exportado incluya autores, título, fuente y DOI.",
            "Preferir el formato RIS para compatibilidad entre múltiples gestores."
          ]
        },
        {
          titulo: "Uso de gestores bibliográficos",
          descripcion: "Los gestores bibliográficos permiten almacenar, organizar y citar referencias automáticamente.",
          principales_gestores: [
            {
              nombre: "Mendeley",
              descripcion: "Gratuito, permite organización, anotaciones en PDF y citas automáticas."
            },
            {
              nombre: "Zotero",
              descripcion: "Flexible, de código abierto."
            },
            {
              nombre: "EndNote",
              descripcion: "Profesional, más robusto para grandes proyectos."
            }
          ],
          funciones_clave: [
            "Importación automática de artículos y metadatos.",
            "Organización en carpetas o etiquetas temáticas.",
            "Inserción de citas y generación automática de bibliografías en Word o LibreOffice.",
            "Depuración manual de referencias incorrectamente importadas."
          ]
        },
        {
          titulo: "Normas APA 7ª edición",
          descripcion: "La American Psychological Association (APA) proporciona normas claras para citación y referencias.",
          citas_en_texto: {
            narrativa: {
              descripcion: "El autor es parte de la redacción.",
              ejemplo: "Según González (2020), el aprendizaje autónomo es fundamental..."
            },
            parentetica: {
              descripcion: "El autor y la fecha están al final.",
              ejemplo: "El aprendizaje autónomo es fundamental (González, 2020)."
            },
            larga: "Citas de más de 40 palabras se presentan en bloque, sin comillas, con sangría."
          },
          referencias_finales: {
            principios: [
              "Orden alfabético.",
              "Sangría francesa.",
              "Información completa: autor, año, título, fuente, DOI o URL si aplica."
            ],
            ejemplo: "González, M. (2020). Estrategias para el aprendizaje autónomo en educación superior. Revista de Investigación Educativa, 38(2), 123-140. https://doi.org/10.1016/j.rie.2020.03.004"
          },
          cambios_apa7: [
            "Hasta 20 autores antes de usar puntos suspensivos.",
            "Correcto formato APA.",
            "Brevedad y claridad en el comentario.",
            "Conexión explícita entre el contenido del artículo y el tema investigado."
          ]
        }
      ]
    };
  
    return gestionResultados;
  });
  