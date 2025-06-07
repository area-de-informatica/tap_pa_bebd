// stores/Futuro.ts
import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'

export const useFuturoStore = defineStore('futuro', () => {
  const data = ref(null)
  const loading = ref(true)
  const error = ref(null)

  const fetchData = async () => {
    loading.value = true
    try {
      const res = await fetch('/api/contents/futuro')
      if (!res.ok) throw new Error('Error al cargar los datos')
      data.value = await res.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchData)

  return { data, loading, error, fetchData }
})
