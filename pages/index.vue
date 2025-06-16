<template>
  <div>
    <!-- Hero Section -->
    <v-container fluid class="hero-section pa-0">
      <v-row no-gutters>
        <v-col cols="12">
          <div class="hero-content">
            <v-container>
              <v-row justify="center" align="center" class="min-height-hero">
                <v-col cols="12" md="8" class="text-center">
                  <v-fade-transition appear>
                    <div>
                      <h1 class="display-1 font-weight-bold text-white mb-4">
                        <span class="bases">Busqueda</span> en bases de datos
                      </h1>
                      <p class="headline text-white mb-6 font-weight-light">
                        Objeto Virtual de Aprendizaje
                      </p>
                      <v-btn color="primary" size="large" elevation="4" @click="scrollToContent" class="mx-2">
                        <v-icon left>mdi-play-circle</v-icon>
                        Comenzar
                      </v-btn>
                      <v-btn variant="outlined" color="white" size="large" @click="scrollToRoutes" class="mx-2 mt-2">
                        <v-icon left>mdi-map</v-icon>
                        Ver Rutas
                      </v-btn>
                    </div>
                  </v-fade-transition>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- Contenido Principal -->
    <section ref="contentSection">
      <v-container class="py-12">
        <!-- Objetivo General -->
        <v-row justify="center" class="mb-8">
          <v-col cols="12" md="10">
            <v-card elevation="2" class="rounded-lg">
              <v-card-text class="pa-8">
                <div class="d-flex align-center mb-4">
                  <v-icon color="primary" size="large" class="mr-3">
                    mdi-target
                  </v-icon>
                  <h2 class="text-h4 font-weight-bold text-primary">
                    Objetivo General
                  </h2>
                </div>
                <p class="text-body-1 text-justify leading-relaxed">
                  {{ inicio.objetivo_general }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Información Clave -->
        <v-row class="mb-8">
          <!-- Público Objetivo -->
          <v-col cols="12" md="6">
            <v-card elevation="2" class="h-100 rounded-lg">
              <v-card-text class="pa-6">
                <div class="d-flex align-center mb-4">
                  <v-icon color="success" size="large" class="mr-3">
                    mdi-account-group
                  </v-icon>
                  <h3 class="text-h5 font-weight-bold text-success">
                    Público Objetivo
                  </h3>
                </div>
                <v-list class="transparent">
                  <v-list-item v-for="(publico, index) in inicio.publico_objetivo" :key="index" class="px-0">
                    <template v-slot:prepend>
                      <v-icon color="success" size="small">
                        mdi-check-circle
                      </v-icon>
                    </template>
                    <v-list-item-title class="text-body-1">
                      {{ publico }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Requisitos Previos -->
          <v-col cols="12" md="6">
            <v-card elevation="2" class="h-100 rounded-lg">
              <v-card-text class="pa-6">
                <div class="d-flex align-center mb-4">
                  <v-icon color="info" size="large" class="mr-3">
                    mdi-information
                  </v-icon>
                  <h3 class="text-h5 font-weight-bold text-info">
                    Requisitos Previos
                  </h3>
                </div>
                <p class="text-body-1">
                  {{ inicio.requisitos_previos }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Descripción de la Estructura -->
        <v-row justify="center" class="mb-8">
          <v-col cols="12" md="10">
            <v-card elevation="2" class="rounded-lg">
              <v-card-text class="pa-8">
                <div class="d-flex align-center mb-4">
                  <v-icon color="warning" size="large" class="mr-3">
                    mdi-file-tree
                  </v-icon>
                  <h2 class="text-h4 font-weight-bold text-warning">
                    Estructura del OVA
                  </h2>
                </div>
                <p class="text-body-1 text-justify leading-relaxed">
                  {{ estructura_ova.descripcion }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Rutas de Aprendizaje -->
    <section id="rutas-aprendizaje">
      <v-container fluid class="routes-section py-12" ref="routesSection">
        <v-container>
          <v-row justify="center" class="mb-8">
            <v-col cols="12" class="text-center">
              <h2 class="display-1 font-weight-bold text-white mb-4">
                Rutas de Aprendizaje
              </h2>
              <p class="text-h6 text-white font-weight-light">
                Descubre el camino estructurado hacia el dominio de la búsqueda científica
              </p>
            </v-col>
          </v-row>

          <v-row>
            <v-col v-for="(ruta, index) in estructura_ova.rutas_aprendizaje" :key="ruta.numero" cols="12" sm="6" md="4"
              lg="3" class="d-flex">
              <v-card elevation="4" class="flex-grow-1 rounded-lg transition-card" :class="getCardClass(index)"
                @click="navigateToRoute(ruta)" style="cursor: pointer;">
                <v-card-text class="pa-6 text-center">
                  <div class="mb-4">
                    <v-avatar :color="getRouteColor(index)" size="60" class="elevation-3">
                      <span class="text-h5 font-weight-bold text-white">
                        {{ ruta.numero }}
                      </span>
                    </v-avatar>
                  </div>
                  <h3 class="text-h6 font-weight-bold mb-3">
                    {{ ruta.titulo }}
                  </h3>
                  <p class="text-body-2 text-medium-emphasis">
                    {{ ruta.descripcion }}
                  </p>
                </v-card-text>
                <v-card-actions class="justify-center pb-4">
                  <v-btn :color="getRouteColor(index)" variant="outlined" size="small">
                    <v-icon left size="small">mdi-arrow-right</v-icon>
                    Explorar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-container>
    </section>

    <!-- Call to Action -->
    <v-container class="py-12">
      <v-row justify="center">
        <v-col cols="12" md="8" class="text-center">
          <v-card elevation="8" class="rounded-lg cta-card">
            <v-card-text class="pa-8">
              <v-icon color="primary" size="64" class="mb-4">
                mdi-rocket-launch
              </v-icon>
              <h2 class="text-h4 font-weight-bold mb-4">
                ¡Comienza tu Viaje de Aprendizaje!
              </h2>
              <p class="text-h6 mb-6 text-medium-emphasis">
                Desarrolla habilidades esenciales para la investigación académica
              </p>
              <v-btn color="primary" size="x-large" elevation="4" @click="startLearning" class="px-8">
                <v-icon left>mdi-play</v-icon>
                Iniciar Ahora
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Loading Overlay -->
    <v-overlay v-model="loading" class="align-center justify-center">
      <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useInicioStore } from '~/stores/inicio'
import { useRouter } from 'vue-router'

// Composables
const inicioStore = useInicioStore()
const router = useRouter()

// Refs para elementos del DOM
const loading = ref(false)
const contentSection = ref(null)
const routesSection = ref(null)

// Computed properties para acceder a los datos del store
const inicio = computed(() => inicioStore.inicio)
const estructura_ova = computed(() => inicioStore.estructura_ova)

// Colores para las rutas
const routeColors = [
  'primary',
  'success',
  'info',
  'warning',
  'error',
  'purple',
  'teal',
  'orange',
  'indigo'
]

// Métodos
const getRouteColor = (index) => {
  return routeColors[index % routeColors.length]
}

const getCardClass = (index) => {
  const baseClass = 'route-card'
  return `${baseClass} ${baseClass}--${getRouteColor(index)}`
}

const scrollToContent = () => {
  if (contentSection.value) {
    contentSection.value.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}

const scrollToRoutes = () => {
  const routesElement = document.getElementById('rutas-aprendizaje')
  if (routesElement) {
    routesElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}

const navigateToRoute = (ruta) => {
  // Implementa la navegación según tu estructura de rutas
  console.log('Navegando a:', ruta)
  
  // Opciones de navegación que puedes usar:
  
  // Opción 1: Navegar usando el número de la ruta
  // router.push(`/ruta/${ruta.numero}`)
  
  // Opción 2: Navegar usando un slug basado en el título
  // const slug = ruta.titulo.toLowerCase().replace(/\s+/g, '-')
  // router.push(`/ruta/${slug}`)
  
  // Opción 3: Navegar con parámetros de query
  // router.push({ name: 'ruta', query: { id: ruta.numero } })
  
  // Opción 4: Navegar a una ruta específica con el objeto completo
  // router.push({ name: 'ruta-detalle', params: { id: ruta.numero }, state: { ruta } })
  
  // Por ahora, como ejemplo, navegamos a una ruta genérica
  router.push(`/ruta/${ruta.numero}`)
}

const startLearning = () => {
  // Navegar a la primera ruta o página de bienvenida
  if (estructura_ova.value?.rutas_aprendizaje?.length > 0) {
    navigateToRoute(estructura_ova.value.rutas_aprendizaje[0])
  } else {
    // Si no hay rutas disponibles, navegar a una página de introducción
    router.push('/introduccion')
  }
}

// Lifecycle
onMounted(async () => {
  loading.value = true
  try {
    await inicioStore.fetchInicio()
  } catch (error) {
    console.error('Error al cargar datos:', error)
    // Aquí podrías mostrar un mensaje de error al usuario
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="rgba(255,255,255,0.1)"><polygon points="1000,100 1000,0 0,100"/></svg>') no-repeat;
  background-size: cover;
  opacity: 0.3;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.min-height-hero {
  min-height: 70vh;
}

.routes-section {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.transition-card {
  transition: all 0.3s ease;
}

.transition-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15) !important;
}

.route-card {
  border-top: 4px solid transparent;
}

.route-card--primary {
  border-top-color: rgb(var(--v-theme-primary));
}

.route-card--success {
  border-top-color: rgb(var(--v-theme-success));
}

.route-card--info {
  border-top-color: rgb(var(--v-theme-info));
}

.route-card--warning {
  border-top-color: rgb(var(--v-theme-warning));
}

.route-card--error {
  border-top-color: rgb(var(--v-theme-error));
}

.route-card--purple {
  border-top-color: #9c27b0;
}

.route-card--teal {
  border-top-color: #009688;
}

.route-card--orange {
  border-top-color: #ff9800;
}

.route-card--indigo {
  border-top-color: #3f51b5;
}

.cta-card {
  background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
}

.leading-relaxed {
  line-height: 1.75;
}

@media (max-width: 600px) {
  .hero-section .display-1 {
    
    font-size: 2rem !important;
  }

  .hero-section .headline {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    font-size: 1.25rem !important;
  }

  .min-height-hero {
    min-height: 60vh;
  }
}
.bases
{
  color: blue;
  font-size: 3.5rem;
  font-weight: bold;
  font-family: 'Arial', sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}
</style>