<!-- layouts/default.vue -->
<template>
  <v-app class="database-app">
    <!-- Loading overlay -->
    <transition name="fade">
      <div v-if="isLoading" class="loading-overlay">
        <v-progress-circular indeterminate size="64" color="primary" class="loading-spinner" />
        <p class="loading-text">Cargando aplicación...</p>
      </div>
    </transition>

    <!-- Componente de navegación -->
    <AppNavbar @toggle-sidebar="toggleSidebar" />

    <!-- Sidebar lateral opcional -->
    <AppSidebar v-if="showSidebar" :is-open="sidebarOpen" @close="closeSidebar" />

    <!-- Contenido principal -->
    <v-main class="main-content" :class="{ 'with-sidebar': showSidebar && sidebarOpen }">
      <!-- Efectos de fondo -->
      <BackgroundEffects />

      <!-- Partículas flotantes -->
      <FloatingParticles :particle-count="particleCount" />

      <!-- Breadcrumbs -->
      <div v-if="showBreadcrumbs" class="breadcrumbs-wrapper">
        <v-breadcrumbs :items="breadcrumbItems" class="custom-breadcrumbs">
          <template #divider>
            <v-icon icon="mdi-chevron-right" size="small" />
          </template>
        </v-breadcrumbs>
      </div>

      <!-- Contenido de la página -->
      <div class="content-wrapper">
        <!-- Error boundary -->
        <div v-if="hasError" class="error-container">
          <v-alert type="error" variant="tonal" closable @click:close="clearError">
            <template #title>
              Error en la aplicación
            </template>
            {{ errorMessage }}
          </v-alert>
        </div>

        <!-- Slot principal para el contenido -->
        <transition name="page-transition" mode="out-in">
          <slot />
        </transition>
      </div>

      <!-- Scroll to top button -->
      <transition name="fade">
        <v-btn v-if="showScrollTop" class="scroll-top-btn" icon="mdi-chevron-up" size="large" color="primary"
          elevation="4" @click="scrollToTop" />
      </transition>
    </v-main>

    <!-- Componente de footer -->
    <AppFooter />

    <!-- Snackbar para notificaciones globales -->
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="snackbar.timeout" location="top right"
      variant="tonal">
      {{ snackbar.message }}
      <template #actions>
        <v-btn variant="text" @click="snackbar.show = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>

    <!-- Dialog de confirmación global -->
    <v-dialog v-model="confirmDialog.show" max-width="400" persistent>
      <v-card>
        <v-card-title class="text-h6">
          {{ confirmDialog.title }}
        </v-card-title>
        <v-card-text>
          {{ confirmDialog.message }}
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="handleConfirmCancel">
            Cancelar
          </v-btn>
          <v-btn color="primary" variant="tonal" @click="handleConfirmAccept">
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppNavbar from '~/components/AppNavbar.vue'
import AppFooter from '~/components/Appfooter.vue'
import AppSidebar from '~/components/AppSidebar.vue'
import BackgroundEffects from '~/components/BackgroundEffects.vue'
import FloatingParticles from '~/components/FloatingParticles.vue'

// Reactive data
const isLoading = ref(true)
const sidebarOpen = ref(false)
const showScrollTop = ref(false)
const hasError = ref(false)
const errorMessage = ref('')

// Configuración dinámica
const particleCount = ref(12)
const showSidebar = ref(true)
const showBreadcrumbs = ref(true)

// Snackbar global
const snackbar = ref({
  show: false,
  message: '',
  color: 'info',
  timeout: 4000
})

// Dialog de confirmación global
const confirmDialog = ref({
  show: false,
  title: '',
  message: '',
  onConfirm: null,
  onCancel: null
})

// Route watcher para breadcrumbs
const route = useRoute()

const breadcrumbItems = computed(() => {
  const items = [
    { title: 'Inicio', href: '/' }
  ]

  if (route.path !== '/') {
    const pathSegments = route.path.split('/').filter(Boolean)
    pathSegments.forEach((segment, index) => {
      const path = '/' + pathSegments.slice(0, index + 1).join('/')
      items.push({
        title: segment.charAt(0).toUpperCase() + segment.slice(1),
        href: path,
        disabled: index === pathSegments.length - 1
      })
    })
  }

  return items
})

// Methods
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const closeSidebar = () => {
  sidebarOpen.value = false
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const clearError = () => {
  hasError.value = false
  errorMessage.value = ''
}

const showNotification = (message, color = 'info', timeout = 4000) => {
  snackbar.value = {
    show: true,
    message,
    color,
    timeout
  }
}

const showConfirmDialog = (title, message, onConfirm, onCancel = null) => {
  confirmDialog.value = {
    show: true,
    title,
    message,
    onConfirm,
    onCancel
  }
}

const handleConfirmAccept = () => {
  if (confirmDialog.value.onConfirm) {
    confirmDialog.value.onConfirm()
  }
  confirmDialog.value.show = false
}

const handleConfirmCancel = () => {
  if (confirmDialog.value.onCancel) {
    confirmDialog.value.onCancel()
  }
  confirmDialog.value.show = false
}

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 300
}

const handleError = (error) => {
  hasError.value = true
  errorMessage.value = error.message || 'Ha ocurrido un error inesperado'
  console.error('Layout Error:', error)
}

// Lifecycle hooks
onMounted(() => {
  // Simular carga inicial
  setTimeout(() => {
    isLoading.value = false
  }, 1500)

  // Event listeners
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('error', handleError)

  // Ajustar partículas según el rendimiento del dispositivo
  if (navigator.hardwareConcurrency < 4) {
    particleCount.value = 6
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('error', handleError)
})

// Watchers
watch(() => route.path, () => {
  // Cerrar sidebar en rutas móviles
  if (window.innerWidth < 768) {
    sidebarOpen.value = false
  }
})

// Provide global methods para uso en componentes hijos
provide('showNotification', showNotification)
provide('showConfirmDialog', showConfirmDialog)
provide('handleError', handleError)
</script>

<style scoped>
.database-app {
  /* Fondo base temático para bases de datos */
  background: linear-gradient(135deg,
      #154360 0%,
      /* Azul oscuro profesional */
      #2874a6 25%,
      /* Azul medio */
      #1b4f72 50%,
      /* Azul profundo */
      #21618c 75%,
      /* Azul corporativo */
      #1a5490 100%
      /* Azul final */
    );
  min-height: 100vh;
  color: #ecf0f1;
  position: relative;
}

/* Loading overlay */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(21, 67, 96, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(10px);
}

.loading-text {
  margin-top: 20px;
  font-size: 1.1rem;
  color: #ecf0f1;
  animation: pulse 2s infinite;
}

.main-content {
  position: relative;
  overflow: hidden;
  min-height: calc(100vh - 64px);
  transition: margin-left 0.3s ease;
}

.main-content.with-sidebar {
  margin-left: 280px;
}

.breadcrumbs-wrapper {
  position: relative;
  z-index: 101;
  padding: 10px 20px 0;
}

.custom-breadcrumbs {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 8px 16px;
  margin-bottom: 10px;
}

.content-wrapper {
  position: relative;
  z-index: 100;
  backdrop-filter: blur(0.5px);
  padding: 20px;
  min-height: calc(100vh - 140px);
}

.error-container {
  margin-bottom: 20px;
}

.scroll-top-btn {
  position: fixed;
  bottom: 80px;
  right: 20px;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3) !important;
}

/* Transiciones */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.page-transition-enter-active,
.page-transition-leave-active {
  transition: all 0.4s ease;
}

.page-transition-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.page-transition-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* Efecto glassmorphism para las tarjetas */
:deep(.v-card) {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Animación de aparición suave para el contenido */
:deep(.content-wrapper > *) {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.7;
  }
}

/* Mejoras para el footer */
:deep(.v-footer) {
  background: rgba(21, 67, 96, 0.95) !important;
  backdrop-filter: blur(15px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
}

/* Mejoras para breadcrumbs */
:deep(.v-breadcrumbs-item) {
  color: rgba(255, 255, 255, 0.8);
}

:deep(.v-breadcrumbs-item--disabled) {
  color: rgba(255, 255, 255, 0.6);
}

/* Responsive design */
@media (max-width: 768px) {
  .main-content.with-sidebar {
    margin-left: 0;
  }

  .content-wrapper {
    padding: 15px;
  }

  .scroll-top-btn {
    bottom: 20px;
    right: 15px;
  }

  .breadcrumbs-wrapper {
    padding: 10px 15px 0;
  }
}

@media (max-width: 480px) {
  .content-wrapper {
    padding: 10px;
  }

  .loading-text {
    font-size: 1rem;
  }
}

/* Mejoras de accesibilidad */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Dark mode enhancements */
@media (prefers-color-scheme: dark) {
  :deep(.v-card) {
    background: rgba(30, 30, 30, 0.9) !important;
    color: #ecf0f1;
  }
}
</style>