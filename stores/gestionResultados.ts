import { defineStore } from 'pinia';

export const useGestionResultadosStore = defineStore('GestionResultados', {
  state: () => ({
    modulo: '',
    objetivo: '',
    introduccion: '',
    secciones: [
      {
        titulo: '',
        descripcion: '',
        exportacion_automatica: [],
        buenas_practicas: []
      },
      {
        titulo: '',
        descripcion: '',
        principales_gestores: [
          {
            nombre: '',
            descripcion: ''
          }
        ],
        funciones_clave: []
      },
      {
        titulo: '',
        descripcion: '',
        citas_en_texto: {
          narrativa: {
            descripcion: '',
            ejemplo: ''
          },
          parentetica: {
            descripcion: '',
            ejemplo: ''
          },
          larga: ''
        },
        referencias_finales: {
          principios: [],
          ejemplo: ''
        },
        cambios_apa7: []
      }
    ]
  }),

  actions: {
    async fetchGestionResultados() {
      try {
        const res = await fetch('/api/contents/gestionResultados');
        if (!res.ok) throw new Error('Error al obtener los datos');
        const data = await res.json();
        this.modulo = data.modulo;
        this.objetivo = data.objetivo;
        this.introduccion = data.introduccion;
        this.secciones = data.secciones;
      } catch (error) {
        console.error('Error al cargar Gestión de Resultados:', error);
      }
    }
  }
});