export default defineEventHandler(() => {
    const inicio = {
      inicio: {
        objetivo_general: "Este Objeto Virtual de Aprendizaje tiene como finalidad desarrollar en los estudiantes habilidades para diseñar, aplicar y evaluar estrategias de búsqueda de información científica en bases de datos académicas, utilizando herramientas digitales, operadores booleanos y criterios de evaluación pertinentes. Se espera que al finalizar el recorrido, el usuario pueda llevar a cabo búsquedas eficientes, gestionar referencias con rigor académico y seleccionar fuentes confiables para sus procesos investigativos.",
        publico_objetivo: [
          "Estudiantes universitarios de pregrado y posgrado",
          "Docentes en formación o en ejercicio",
          "Usuarios frecuentes de bibliotecas académicas digitales"
        ],
        requisitos_previos: "No se requieren conocimientos técnicos previos, ya que el OVA ofrece acompañamiento paso a paso con herramientas accesibles."
      },
      estructura_ova: {
        descripcion: "El OVA se organiza en módulos secuenciales e interrelacionados, que guían al estudiante desde la comprensión básica de qué es una base de datos científica hasta la aplicación crítica de estrategias de búsqueda y evaluación de fuentes.",
        rutas_aprendizaje: [
          {
            numero: 1,
            titulo: "Inicio",
            descripcion: "Identidad del OVA, ¿Cómo navegar?"
          },
          {
            numero: 2,
            titulo: "Bases de datos",
            descripcion: "Conceptualización, tipos y ejemplos de bases académicas."
          },
          {
            numero: 3,
            titulo: "Estrategias de búsqueda",
            descripcion: "Construcción de ecuaciones de búsqueda con operadores y filtros."
          },
          {
            numero: 4,
            titulo: "Navegación en bases de datos",
            descripcion: "Aplicación práctica de búsquedas en plataformas reales."
          },
          {
            numero: 5,
            titulo: "Gestión de resultados",
            descripcion: "Identificación de contenido de calidad, organización de referencias y uso de gestores bibliográficos."
          },
          {
            numero: 6,
            titulo: "Actividades",
            descripcion: "Espacio de práctica, ejercicios aplicados y simulaciones."
          },
          {
            numero: 7,
            titulo: "Evaluación",
            descripcion: "Cuestionarios, reflexiones y aplicación integral de conocimientos."
          },
          {
            numero: 8,
            titulo: "Futuro de las búsquedas en base de datos",
            descripcion: "Búsqueda avanzada en inteligencia artificial"
          },
          {
            numero: 9,
            titulo: "Acerca de",
            descripcion: "Información de los creadores"
          },
          
        ]
      }
    };
  
    return inicio;
  });
  