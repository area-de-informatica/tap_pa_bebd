import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'

export const useFuturoStore = defineStore('futuro', () => {
  const data = ref(null)
  const loading = ref(true)
  const error = ref<string | null>(null)  // <- Aquí está la clave

  const fetchData = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await fetch('/api/contents/futuro')
      if (!res.ok) throw new Error('Error al cargar los datos')
      data.value = await res.json()
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = String(err)
      }
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchData)

  return { data, loading, error, fetchData }
})
