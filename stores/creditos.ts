import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useCreditosStore = defineStore('creditos', () => {
    const creditos = ref([])
    const loading = ref(false)
    const error: Ref<string | null> = ref(null)

    const fetchCreditos = async () => {
        loading.value = true
        try {
            const response = await fetch('/api/creditos')
            if (!response.ok) throw new Error('Error al cargar créditos')
            creditos.value = await response.json()
        } catch (err) {
            console.error(err)
            error.value = 'Ocurrió un error al obtener los créditos del proyecto.'
        } finally {
            loading.value = false
        }
    }

    return {
        creditos,
        loading,
        error,
        fetchCreditos
    }
})