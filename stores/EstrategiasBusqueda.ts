import { defineStore } from 'pinia';

export const useEstrategiasBusquedaStore = defineStore('EstrategiasBusqueda', {
  state: () => ({
    modulo: '',
    objetivo: '',
    contenido: {
      palabras_clave: {
        titulo: '',
        definicion: '',
        como_identificarlas: [],
        ejemplo: {
          tema: '',
          palabras_clave: []
        }
      },
      sinonimos_terminos_relacionados: {
        titulo: '',
        importancia: '',
        tareas: [],
        ejemplo: {}
      },
      operadores_booleanos: {
        titulo: '',
        descripcion: '',
        operadores: [],
        consejo: ''
      },
      truncadores_comodines: {
        titulo: '',
        truncadores: {
          descripcion: '',
          ejemplo: ''
        },
        comodines: {
          descripcion: '',
          ejemplo: ''
        },
        nota: ''
      },
      filtros: {
        titulo: '',
        descripcion: '',
        filtros_recomendados: []
      }
    }
  }),

  actions: {
    async fetchEstrategiasBusqueda() {
      try {
        const res = await fetch('/api/contents/EstrategiasBusquedas');
        if (!res.ok) throw new Error('Error al obtener los datos');
        const data = await res.json();
        this.modulo = data.modulo;
        this.objetivo = data.objetivo;
        this.contenido = data.contenido;
      } catch (error) {
        console.error('Error al cargar Estrategias de Búsqueda:', error);
      }
    }
  }
});
