<template>
  <v-container fluid class="pa-0">
    <!-- Loading State -->
    <v-overlay v-if="loading" class="align-center justify-center">
      <v-progress-circular
        :size="70"
        :width="7"
        color="primary"
        indeterminate
      />
    </v-overlay>

    <!-- Error State -->
    <v-alert
      v-if="error"
      type="error"
      variant="tonal"
      class="ma-4"
      closable
      @click:close="error = null"
    >
      <v-alert-title>Error al cargar el contenido</v-alert-title>
      {{ error }}
      <template #append>
        <v-btn
          variant="outlined"
          size="small"
          @click="fetchData"
          class="ml-2"
        >
          Reintentar
        </v-btn>
      </template>
    </v-alert>

    <!-- Main Content -->
    <div v-if="!loading && !error && data">
      <!-- Hero Section -->
      <v-sheet
        color="gradient-primary"
        class="text-white pa-8 mb-6"
        style="background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)"
      >
        <v-container>
          <v-row align="center">
            <v-col cols="12" md="8">
              <h1 class="text-h3 font-weight-bold mb-4">
                {{ data.modulo }}
              </h1>
              <p class="text-h6 font-weight-light opacity-90">
                {{ data.objetivo }}
              </p>
            </v-col>
            <v-col cols="12" md="4" class="text-center">
              <v-icon size="120" color="white" class="opacity-30">
                mdi-magnify-scan
              </v-icon>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>

      <v-container>
        <!-- Introduction -->
        <v-card class="mb-8" elevation="2">
          <v-card-title class="bg-blue-grey-50">
            <v-icon class="mr-2" color="primary">mdi-information</v-icon>
            Introducción
          </v-card-title>
          <v-card-text class="pa-6">
            <p class="text-body-1 line-height-relaxed">
              {{ data.introduccion }}
            </p>
          </v-card-text>
        </v-card>

        <!-- Sections -->
        <v-row>
          <v-col
            v-for="(seccion, index) in data.secciones"
            :key="index"
            cols="12"
            lg="6"
            class="mb-4"
          >
            <v-card
              height="100%"
              elevation="3"
              class="section-card"
              @click="toggleExpansion(index)"
              :class="{ 'expanded': expandedSections.includes(index) }"
            >
              <!-- Card Header -->
              <v-card-title class="pa-4 pb-2">
                <div class="d-flex align-center justify-space-between w-100">
                  <div class="d-flex align-center">
                    <v-avatar
                      size="40"
                      :color="getSectionColor(index)"
                      class="mr-3"
                    >
                      <v-icon color="white">
                        {{ getSectionIcon(index) }}
                      </v-icon>
                    </v-avatar>
                    <h3 class="text-h6 font-weight-medium">
                      {{ seccion.titulo }}
                    </h3>
                  </div>
                  <v-btn
                    icon
                    variant="text"
                    size="small"
                  >
                    <v-icon>
                      {{ expandedSections.includes(index) ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                    </v-icon>
                  </v-btn>
                </div>
              </v-card-title>

              <!-- Card Content -->
              <v-expand-transition>
                <div v-show="expandedSections.includes(index)">
                  <v-divider></v-divider>
                  <v-card-text class="pa-4">
                    <p class="text-body-2 mb-4">
                      {{ seccion.descripcion }}
                    </p>

                    <!-- Ejemplos -->
                    <div v-if="seccion.ejemplos" class="mb-4">
                      <h4 class="text-subtitle-1 font-weight-medium mb-2 text-primary">
                        <v-icon size="small" class="mr-1">mdi-lightbulb</v-icon>
                        Ejemplos
                      </h4>
                      <v-list density="compact" class="bg-grey-50 rounded">
                        <v-list-item
                          v-for="(ejemplo, idx) in seccion.ejemplos"
                          :key="idx"
                          class="px-3 py-2"
                        >
                          <template #prepend>
                            <v-icon size="small" color="success">mdi-check-circle</v-icon>
                          </template>
                          <v-list-item-title class="text-body-2">
                            {{ ejemplo }}
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </div>

                    <!-- Ventajas -->
                    <div v-if="seccion.ventajas" class="mb-4">
                      <h4 class="text-subtitle-1 font-weight-medium mb-2 text-success">
                        <v-icon size="small" class="mr-1">mdi-star</v-icon>
                        Ventajas
                      </h4>
                      <v-list density="compact" class="bg-green-50 rounded">
                        <v-list-item
                          v-for="(ventaja, idx) in seccion.ventajas"
                          :key="idx"
                          class="px-3 py-2"
                        >
                          <template #prepend>
                            <v-icon size="small" color="success">mdi-thumb-up</v-icon>
                          </template>
                          <v-list-item-title class="text-body-2">
                            {{ ventaja }}
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </div>

                    <!-- Herramientas -->
                    <div v-if="seccion.herramientas" class="mb-4">
                      <h4 class="text-subtitle-1 font-weight-medium mb-2 text-purple">
                        <v-icon size="small" class="mr-1">mdi-tools</v-icon>
                        Herramientas
                      </h4>
                      <v-chip-group>
                        <v-chip
                          v-for="(herramienta, idx) in seccion.herramientas"
                          :key="idx"
                          color="purple"
                          variant="outlined"
                          size="small"
                        >
                          {{ herramienta }}
                        </v-chip>
                      </v-chip-group>
                    </div>

                    <!-- Tareas -->
                    <div v-if="seccion.tareas" class="mb-4">
                      <h4 class="text-subtitle-1 font-weight-medium mb-2 text-orange">
                        <v-icon size="small" class="mr-1">mdi-clipboard-list</v-icon>
                        Tareas
                      </h4>
                      <v-list density="compact" class="bg-orange-50 rounded">
                        <v-list-item
                          v-for="(tarea, idx) in seccion.tareas"
                          :key="idx"
                          class="px-3 py-2"
                        >
                          <template #prepend>
                            <v-icon size="small" color="orange">mdi-circle-medium</v-icon>
                          </template>
                          <v-list-item-title class="text-body-2">
                            {{ tarea }}
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </div>

                    <!-- Plataformas -->
                    <div v-if="seccion.plataformas" class="mb-4">
                      <h4 class="text-subtitle-1 font-weight-medium mb-2 text-indigo">
                        <v-icon size="small" class="mr-1">mdi-web</v-icon>
                        Plataformas
                      </h4>
                      <v-list density="compact" class="bg-indigo-50 rounded">
                        <v-list-item
                          v-for="(plataforma, idx) in seccion.plataformas"
                          :key="idx"
                          class="px-3 py-2"
                        >
                          <template #prepend>
                            <v-icon size="small" color="indigo">mdi-launch</v-icon>
                          </template>
                          <v-list-item-title class="text-body-2">
                            {{ plataforma }}
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </div>

                    <!-- Usos -->
                    <div v-if="seccion.usos" class="mb-4">
                      <h4 class="text-subtitle-1 font-weight-medium mb-2 text-teal">
                        <v-icon size="small" class="mr-1">mdi-application</v-icon>
                        Usos
                      </h4>
                      <v-list density="compact" class="bg-teal-50 rounded">
                        <v-list-item
                          v-for="(uso, idx) in seccion.usos"
                          :key="idx"
                          class="px-3 py-2"
                        >
                          <template #prepend>
                            <v-icon size="small" color="teal">mdi-arrow-right</v-icon>
                          </template>
                          <v-list-item-title class="text-body-2">
                            {{ uso }}
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </div>

                    <!-- Principios (para consideraciones éticas) -->
                    <div v-if="seccion.principios" class="mb-4">
                      <h4 class="text-subtitle-1 font-weight-medium mb-2 text-red">
                        <v-icon size="small" class="mr-1">mdi-shield-check</v-icon>
                        Principios Éticos
                      </h4>
                      <v-list density="compact" class="bg-red-50 rounded">
                        <v-list-item
                          v-for="(principio, idx) in seccion.principios"
                          :key="idx"
                          class="px-3 py-2"
                        >
                          <template #prepend>
                            <v-icon size="small" color="red">mdi-alert-circle</v-icon>
                          </template>
                          <v-list-item-title class="text-body-2">
                            {{ principio }}
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </div>

                    <!-- Ejemplo individual -->
                    <div v-if="seccion.ejemplo" class="mb-4">
                      <h4 class="text-subtitle-1 font-weight-medium mb-2 text-primary">
                        <v-icon size="small" class="mr-1">mdi-star-outline</v-icon>
                        Ejemplo Destacado
                      </h4>
                      <v-alert
                        type="info"
                        variant="tonal"
                        density="compact"
                        class="text-body-2"
                      >
                        {{ seccion.ejemplo }}
                      </v-alert>
                    </div>
                  </v-card-text>
                </div>
              </v-expand-transition>

              <!-- Collapsed Content Preview -->
              <v-card-text
                v-if="!expandedSections.includes(index)"
                class="pa-4 pt-2"
              >
                <p class="text-body-2 text-grey-darken-1 mb-0">
                  {{ seccion.descripcion.substring(0, 100) }}...
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Action Buttons -->
        <v-row class="mt-6">
          <v-col cols="12" class="text-center">
            <v-btn
              color="primary"
              variant="elevated"
              size="large"
              class="mr-4"
              @click="expandAll"
            >
              <v-icon class="mr-2">mdi-expand-all</v-icon>
              Expandir Todo
            </v-btn>
            <v-btn
              color="secondary"
              variant="outlined"
              size="large"
              @click="collapseAll"
            >
              <v-icon class="mr-2">mdi-collapse-all</v-icon>
              Contraer Todo
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useFuturoStore } from '/stores/futuro'

// Store
const futuroStore = useFuturoStore()

// Reactive properties from store
const data = computed(() => futuroStore.data)
const loading = computed(() => futuroStore.loading)
const error = computed(() => futuroStore.error)

// Local state
const expandedSections = ref([])

// Methods
const fetchData = () => {
  futuroStore.fetchData()
}

const toggleExpansion = (index) => {
  const idx = expandedSections.value.indexOf(index)
  if (idx > -1) {
    expandedSections.value.splice(idx, 1)
  } else {
    expandedSections.value.push(index)
  }
}

const expandAll = () => {
  if (data.value?.secciones) {
    expandedSections.value = data.value.secciones.map((_, index) => index)
  }
}

const collapseAll = () => {
  expandedSections.value = []
}

const getSectionColor = (index) => {
  const colors = ['primary', 'success', 'purple', 'orange', 'indigo', 'teal', 'red']
  return colors[index % colors.length]
}

const getSectionIcon = (index) => {
  const icons = [
    'mdi-brain',
    'mdi-rocket-launch',
    'mdi-cog-clockwise',
    'mdi-robot',
    'mdi-telescope',
    'mdi-message-text',
    'mdi-shield-check'
  ]
  return icons[index % icons.length]
}
</script>

<style scoped>
.line-height-relaxed {
  line-height: 1.7;
}

.section-card {
  transition: all 0.3s ease;
  cursor: pointer;
}

.section-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
}

.section-card.expanded {
  border: 2px solid #1976d2;
}

.gradient-primary {
  position: relative;
  overflow: hidden;
}

.gradient-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="rgba(255,255,255,0.1)"><polygon points="0,0 0,100 200,80 400,100 600,60 800,90 1000,70 1000,0"/></svg>') repeat-x;
  background-size: 1000px 100px;
}

/* Custom scrollbar for lists */
.v-list {
  max-height: 300px;
  overflow-y: auto;
}

.v-list::-webkit-scrollbar {
  width: 4px;
}

.v-list::-webkit-scrollbar-track {
  background: transparent;
}

.v-list::-webkit-scrollbar-thumb {
  background: #bdbdbd;
  border-radius: 2px;
}

.v-list::-webkit-scrollbar-thumb:hover {
  background: #757575;
}
</style>