import { defineStore } from 'pinia';

export const useBasesDatosStore = defineStore('BasesDatos', {
  state: () => ({
    modulo: '',
    objetivo: '',
    contenido: {
      definicion: {
        titulo: '',
        descripcion: ''
      },
      comparacion_buscadores: {
        titulo: '',
        comparativa: []
      },
      tipos_bases_datos: {
        titulo: '',
        categorias: []
      },
      acceso_bases_datos: {
        titulo: '',
        tipos: []
      },
      importancia: {
        titulo: '',
        razones: []
      }
    }
  }),

  actions: {
    async fetchBasesDatos() {
      try {
        const res = await fetch('/api/contents/BasesDatos');
        if (!res.ok) throw new Error('Error al obtener los datos');
        const data = await res.json();
        this.modulo = data.modulo;
        this.objetivo = data.objetivo;
        this.contenido = data.contenido;
      } catch (error) {
        console.error('Error al cargar Bases de Datos:', error);
      }
    }
  }
});