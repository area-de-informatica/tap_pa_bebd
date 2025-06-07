import { defineStore } from 'pinia';

export const useNavegacionStore = defineStore('Navegacion', {
  state: () => ({
    modulo: '',
    objetivo: '',
    introduccion: '',
    fundamentos: {
      que_es: '',
      tipos: []
    },
    estrategias_busqueda: [],
    criterios_evaluacion: {
      relevancia: '',
      calidad: '',
      actualizacion: '',
      tipo_estudio: ''
    },
    documentacion_busqueda: ''
  }),

  actions: {
    async fetchNavegacion() {
      try {
        const res = await fetch('/api/contents/navegacion');
        if (!res.ok) throw new Error('Error al obtener los datos');
        const data = await res.json();

        this.modulo = data.modulo;
        this.objetivo = data.objetivo;
        this.introduccion = data.introduccion;
        this.fundamentos = data.fundamentos;
        this.estrategias_busqueda = data.estrategias_busqueda;
        this.criterios_evaluacion = data.criterios_evaluacion;
        this.documentacion_busqueda = data.documentacion_busqueda;
      } catch (error) {
        console.error('Error al cargar el módulo de navegación:', error);
      }
    }
  }
});