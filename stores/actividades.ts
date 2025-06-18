import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useActividadesStore = defineStore('actividades', () => {
    const actividades = ref([])
    const loading = ref(false)
    const error: Ref<string | null> = ref(null)

    const fetchActividades = async () => {
        loading.value = true
        try {
            const res = await fetch('/api/actividades')
            if (!res.ok) throw new Error('Error al cargar las actividades')
            actividades.value = await res.json()
        } catch (err) {
            console.error(err)
            error.value = 'No se pudieron cargar las actividades.'
        } finally {
            loading.value = false
        }
    }

    return {
        actividades,
        loading,
        error,
        fetchActividades
    }
})