import { defineStore } from 'pinia';

export const useInicioStore = defineStore('inicio', {
  state: () => ({
    inicio: {
      objetivo_general: '',
      publico_objetivo: [],
      requisitos_previos: ''
    },
    estructura_ova: {
      descripcion: '',
      rutas_aprendizaje: []
    }
  }),

  actions: {
    async fetchInicio() {
      try {
        const res = await fetch('/api/contents/inicio');
        if (!res.ok) throw new Error('Error al obtener los datos de inicio');
        const data = await res.json();
        this.inicio = data.inicio;
        this.estructura_ova = data.estructura_ova;
      } catch (error) {
        console.error('Error al cargar la información de inicio:', error);
      }
    }
  }
});
