<template>
    <v-container fluid class="pa-6">
        <!-- Header Section -->
        <v-row class="mb-6">
            <v-col cols="12">
                <div class="d-flex align-center mb-4">
                    <v-icon size="40" color="primary" class="mr-3">
                        mdi-clipboard-text-multiple
                    </v-icon>
                    <div>
                        <h1 class="text-h3 font-weight-bold text-primary">
                            Actividades del OVA
                        </h1>
                        <p class="text-h6 text-grey-darken-1 mt-1">
                            Desarrollo de competencias en búsqueda y gestión de información científica
                        </p>
                    </div>
                </div>
            </v-col>
        </v-row>

        <!-- Debug Info (temporal) -->
        <v-row v-if="true" class="mb-4">
            <v-col cols="12">
                <v-alert type="info" variant="tonal">
                    <div class="d-flex justify-space-between align-center">
                        <div>
                            <strong>Debug Info:</strong><br>
                            Loading: {{ loading }}<br>
                            Error: {{ error }}<br>
                            Actividades: {{ actividades ? actividades.length : 'undefined' }}<br>
                            Store Available: {{ !!actividadesStore }}<br>
                            Store Error: {{ storeError }}<br>
                            Framework: {{ typeof $fetch !== 'undefined' ? 'Nuxt' : 'Vue' }}
                        </div>
                        <div>
                            <v-btn color="primary" size="small" @click="testAPI" :loading="testingAPI">
                                Test API
                            </v-btn>
                            <v-btn color="secondary" size="small" @click="reloadActividades" :loading="loading"
                                class="ml-2">
                                Recargar
                            </v-btn>
                        </div>
                    </div>
                    <div v-if="apiTestResult" class="mt-3">
                        <strong>Resultado API Test:</strong><br>
                        <pre>{{ apiTestResult }}</pre>
                    </div>
                </v-alert>
            </v-col>
        </v-row>

        <!-- Filters and Stats -->
        <v-row class="mb-6">
            <v-col cols="12" md="6">
                <v-select v-model="filtroTipo" :items="tiposActividad" label="Filtrar por tipo"
                    prepend-inner-icon="mdi-filter" variant="outlined" clearable density="comfortable"></v-select>
            </v-col>
            <v-col cols="12" md="6">
                <v-text-field v-model="busqueda" label="Buscar actividades" prepend-inner-icon="mdi-magnify"
                    variant="outlined" clearable density="comfortable"></v-text-field>
            </v-col>
        </v-row>

        <!-- Stats Cards -->
        <v-row class="mb-6">
            <v-col cols="6" md="3">
                <v-card color="primary" variant="tonal" class="text-center pa-4">
                    <v-icon size="40" class="mb-2">mdi-format-list-numbered</v-icon>
                    <div class="text-h4 font-weight-bold">{{ actividadesFiltradas?.length || 0 }}</div>
                    <div class="text-body-2">Total Actividades</div>
                </v-card>
            </v-col>
            <v-col cols="6" md="3">
                <v-card color="success" variant="tonal" class="text-center pa-4">
                    <v-icon size="40" class="mb-2">mdi-school</v-icon>
                    <div class="text-h4 font-weight-bold">{{ actividadesPorTipo?.práctica || 0 }}</div>
                    <div class="text-body-2">Prácticas</div>
                </v-card>
            </v-col>
            <v-col cols="6" md="3">
                <v-card color="info" variant="tonal" class="text-center pa-4">
                    <v-icon size="40" class="mb-2">mdi-cog</v-icon>
                    <div class="text-h4 font-weight-bold">{{ actividadesPorTipo?.técnica || 0 }}</div>
                    <div class="text-body-2">Técnicas</div>
                </v-card>
            </v-col>
            <v-col cols="6" md="3">
                <v-card color="warning" variant="tonal" class="text-center pa-4">
                    <v-icon size="40" class="mb-2">mdi-puzzle</v-icon>
                    <div class="text-h4 font-weight-bold">{{ (actividadesPorTipo?.integradora || 0) +
                        (actividadesPorTipo?.analítica || 0) }}</div>
                    <div class="text-body-2">Integradoras</div>
                </v-card>
            </v-col>
        </v-row>

        <!-- Loading State -->
        <v-row v-if="loading" justify="center" class="my-12">
            <v-col cols="12" class="text-center">
                <v-progress-circular indeterminate size="64" color="primary"></v-progress-circular>
                <p class="text-h6 mt-4">Cargando actividades...</p>
            </v-col>
        </v-row>

        <!-- Error State -->
        <v-alert v-if="error" type="error" variant="tonal" class="mb-6" closable>
            {{ error }}
        </v-alert>

        <!-- Activities Grid -->
        <v-row v-if="!loading && !error">
            <v-col v-for="actividad in actividadesFiltradas" :key="actividad.id" cols="12" lg="6" xl="4">
                <v-card class="actividad-card h-100 d-flex flex-column" elevation="2" hover>
                    <!-- Card Header -->
                    <v-card-title class="d-flex align-center pa-4 pb-2">
                        <v-chip :color="getTipoColor(actividad.tipo)" size="small" class="mr-3">
                            {{ actividad.tipo }}
                        </v-chip>
                        <span class="text-body-2 text-grey-darken-1">
                            {{ actividad.modulo }}
                        </span>
                    </v-card-title>

                    <!-- Card Content -->
                    <v-card-text class="flex-grow-1 pa-4">
                        <h3 class="text-h6 font-weight-bold mb-3 text-primary">
                            {{ actividad.titulo }}
                        </h3>

                        <p class="text-body-2 mb-4 text-grey-darken-1">
                            {{ actividad.descripcion }}
                        </p>

                        <div class="mb-3">
                            <div class="d-flex align-center mb-2">
                                <v-icon size="16" class="mr-2">mdi-clipboard-text</v-icon>
                                <span class="text-body-2 font-weight-medium">Instrucciones:</span>
                            </div>
                            <p class="text-body-2 text-grey-darken-1 ml-6">
                                {{ actividad.instrucciones }}
                            </p>
                        </div>

                        <div class="mb-3">
                            <div class="d-flex align-center mb-2">
                                <v-icon size="16" class="mr-2">mdi-chart-line</v-icon>
                                <span class="text-body-2 font-weight-medium">Evaluación:</span>
                            </div>
                            <p class="text-body-2 text-grey-darken-1 ml-6">
                                {{ actividad.evaluacion }}
                            </p>
                        </div>
                    </v-card-text>

                    <!-- Card Actions -->
                    <v-card-actions class="pa-4 pt-0">
                        <v-btn v-if="actividad.recurso && actividad.recurso.startsWith('http')"
                            :href="actividad.recurso" target="_blank" color="primary" variant="outlined" size="small"
                            prepend-icon="mdi-open-in-new">
                            Acceder al recurso
                        </v-btn>
                        <v-btn v-else color="grey" variant="outlined" size="small" disabled
                            prepend-icon="mdi-file-document">
                            Recurso interno
                        </v-btn>

                        <v-spacer></v-spacer>

                        <v-btn color="success" size="small" prepend-icon="mdi-play">
                            Iniciar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>

        <!-- Empty State -->
        <v-row v-if="!loading && !error && (!actividadesFiltradas || actividadesFiltradas.length === 0)"
            justify="center" class="my-12">
            <v-col cols="12" md="6" class="text-center">
                <v-icon size="80" color="grey-lighten-1" class="mb-4">
                    mdi-magnify
                </v-icon>
                <h3 class="text-h5 mb-2">No se encontraron actividades</h3>
                <p class="text-body-1 text-grey-darken-1">
                    Intenta ajustar los filtros de búsqueda
                </p>
                <v-btn color="primary" variant="outlined" @click="limpiarFiltros" class="mt-4">
                    Limpiar filtros
                </v-btn>
            </v-col>
        </v-row>

        <!-- Progress Indicator -->
        <v-row class="mt-8">
            <v-col cols="12">
                <v-card variant="tonal" color="info" class="pa-6">
                    <div class="d-flex align-center mb-4">
                        <v-icon size="32" class="mr-3">mdi-progress-check</v-icon>
                        <h3 class="text-h5 font-weight-bold">Tu Progreso</h3>
                    </div>
                    <v-progress-linear :model-value="33" height="12" color="success" bg-color="grey-lighten-3"
                        rounded></v-progress-linear>
                    <div class="d-flex justify-space-between align-center mt-2">
                        <span class="text-body-2">1 de 4 actividades completadas</span>
                        <span class="text-body-2 font-weight-bold">33%</span>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'

// Primero intentemos importar el store de diferentes maneras
let actividadesStore = null
let storeError = null

try {
    // Intento 1: Importación normal
    const { useActividadesStore } = await import('@/stores/actividades')
    actividadesStore = useActividadesStore()
} catch (err1) {
    console.error('Error importando store (intento 1):', err1)
    try {
        // Intento 2: Importación alternativa
        const { useActividadesStore } = await import('~/stores/actividades')
        actividadesStore = useActividadesStore()
    } catch (err2) {
        console.error('Error importando store (intento 2):', err2)
        storeError = err2.message
    }
}

const filtroTipo = ref(null)
const busqueda = ref('')
const testingAPI = ref(false)
const apiTestResult = ref(null)

// Si no hay store, crear datos de fallback
const actividades = actividadesStore?.actividades || ref([])
const loading = actividadesStore?.loading || ref(false)
const error = actividadesStore?.error || ref(storeError)
const fetchActividades = actividadesStore?.fetchActividades || (() => {
    console.log('fetchActividades no disponible')
})

// Debug: Para ver el estado del store
watch([actividades, loading, error], ([acts, load, err]) => {
    console.log('Store state:', { actividades: acts, loading: load, error: err })
}, { immediate: true })

// Computed properties
const tiposActividad = computed(() => {
    if (!actividades.value || actividades.value.length === 0) {
        return []
    }
    const tipos = [...new Set(actividades.value.map(a => a.tipo))]
    return tipos.map(tipo => ({
        title: tipo.charAt(0).toUpperCase() + tipo.slice(1),
        value: tipo
    }))
})

const actividadesPorTipo = computed(() => {
    if (!actividades.value || actividades.value.length === 0) {
        return { práctica: 0, técnica: 0, analítica: 0, integradora: 0 }
    }
    return actividades.value.reduce((acc, actividad) => {
        acc[actividad.tipo] = (acc[actividad.tipo] || 0) + 1
        return acc
    }, { práctica: 0, técnica: 0, analítica: 0, integradora: 0 })
})

const actividadesFiltradas = computed(() => {
    if (!actividades.value || actividades.value.length === 0) {
        return []
    }

    let filtradas = actividades.value

    if (filtroTipo.value) {
        filtradas = filtradas.filter(a => a.tipo === filtroTipo.value)
    }

    if (busqueda.value) {
        const termino = busqueda.value.toLowerCase()
        filtradas = filtradas.filter(a =>
            a.titulo.toLowerCase().includes(termino) ||
            a.descripcion.toLowerCase().includes(termino) ||
            a.modulo.toLowerCase().includes(termino)
        )
    }

    return filtradas
})

// Methods
const getTipoColor = (tipo) => {
    const colores = {
        'práctica': 'success',
        'técnica': 'info',
        'analítica': 'warning',
        'integradora': 'purple'
    }
    return colores[tipo] || 'grey'
}

const limpiarFiltros = () => {
    filtroTipo.value = null
    busqueda.value = ''
}

const testAPI = async () => {
    testingAPI.value = true
    const testResults = {}

    try {
        // Test 1: API directa
        console.log('Testing /api/actividades...')
        const response1 = await fetch('/api/actividades')
        testResults.directAPI = {
            status: response1.status,
            ok: response1.ok,
            data: response1.ok ? await response1.json() : 'Error'
        }

        // Test 2: API con $fetch (Nuxt)
        if (typeof $fetch !== 'undefined') {
            try {
                const response2 = await $fetch('/api/actividades')
                testResults.nuxtFetch = response2
            } catch (err) {
                testResults.nuxtFetch = `Error: ${err.message}`
            }
        }

        // Test 3: Datos hardcoded para verificar que el componente funciona
        if (!testResults.directAPI.ok) {
            console.log('API falló, usando datos hardcoded...')
            const hardcodedData = [
                {
                    id: 1,
                    modulo: "Navegación en bases de datos",
                    titulo: "Búsqueda real en una base académica",
                    descripcion: "Realiza una búsqueda en una base de datos académica como Scopus o ERIC utilizando operadores booleanos.",
                    tipo: "práctica",
                    recurso: "https://www.scopus.com/",
                    instrucciones: "Realiza una búsqueda con al menos 2 operadores booleanos y guarda una captura de pantalla con los resultados.",
                    evaluacion: "Rúbrica de calidad de búsqueda"
                },
                {
                    id: 2,
                    modulo: "Gestión de resultados",
                    titulo: "Importación de referencias en Mendeley",
                    descripcion: "Descarga al menos 3 artículos en formato RIS y organízalos en una carpeta temática usando Mendeley.",
                    tipo: "técnica",
                    recurso: "https://www.mendeley.com/",
                    instrucciones: "Entrega evidencia en forma de captura de pantalla del gestor con tus documentos organizados.",
                    evaluacion: "Checklist de cumplimiento"
                }
            ]

            // Asignar datos directamente
            actividades.value = hardcodedData
            testResults.hardcoded = 'Datos hardcoded asignados'
        } else {
            // Si la API funciona, asignar esos datos
            actividades.value = testResults.directAPI.data
        }

        apiTestResult.value = JSON.stringify(testResults, null, 2)
        console.log('API Test Results:', testResults)

    } catch (err) {
        testResults.error = err.message
        apiTestResult.value = JSON.stringify(testResults, null, 2)
        console.error('API Test Error:', err)
    } finally {
        testingAPI.value = false
    }
}

const reloadActividades = async () => {
    try {
        await fetchActividades()
    } catch (err) {
        console.error('Error recargando actividades:', err)
    }
}

// Lifecycle
onMounted(async () => {
    console.log('Componente montado, llamando fetchActividades...')
    console.log('URL actual:', window.location.href)

    // Verificar si la API funciona directamente
    try {
        console.log('Probando API directamente...')
        const response = await fetch('/api/actividades')
        console.log('Response status:', response.status)
        const data = await response.json()
        console.log('Data from API:', data)
    } catch (err) {
        console.error('Error directo de API:', err)
    }

    // Luego llamar al store
    try {
        await fetchActividades()
        console.log('Actividades cargadas:', actividades.value)
    } catch (err) {
        console.error('Error al cargar actividades:', err)
    }
})
</script>

<style scoped>
.actividad-card {
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.actividad-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.v-card-title {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.text-primary {
    color: rgb(var(--v-theme-primary)) !important;
}
</style>