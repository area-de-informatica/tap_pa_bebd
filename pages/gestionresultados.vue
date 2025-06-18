<template>
  <v-container fluid class="gestion-resultados">
    <!-- Header con animación -->
    <v-row class="mb-8">
      <v-col cols="12">
        <v-card
          class="hero-card pa-8 text-center"
          color="primary"
          dark
          elevation="8"
        >
          <v-card-text>
            <v-icon size="80" class="mb-4" color="white">
              mdi-book-open-page-variant
            </v-icon>
            <h1 class="display-1 font-weight-bold mb-4">
              {{ store.modulo }}
            </h1>
            <p class="subtitle-1 mb-0">
              {{ store.objetivo }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Introducción -->
    <v-row class="mb-6">
      <v-col cols="12">
        <v-card class="introduction-card" elevation="4">
          <v-card-title class="d-flex align-center">
            <v-icon color="primary" class="mr-3">mdi-information-outline</v-icon>
            <span class="text-h5">Introducción</span>
          </v-card-title>
          <v-card-text>
            <p class="text-body-1 text-justify">
              {{ store.introduccion }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Tabs de secciones -->
    <v-row>
      <v-col cols="12">
        <v-card elevation="6">
          <v-tabs
            v-model="activeTab"
            bg-color="primary"
            color="white"
            grow
            show-arrows
          >
            <v-tab
              v-for="(seccion, index) in store.secciones"
              :key="index"
              :value="index"
              class="font-weight-medium"
            >
              <v-icon class="mr-2">{{ getTabIcon(index) }}</v-icon>
              {{ seccion.titulo }}
            </v-tab>
          </v-tabs>

          <v-window v-model="activeTab" class="pa-4">
            <!-- Exportación de Resultados -->
            <v-window-item :value="0" v-if="store.secciones[0]">
              <div class="section-content">
                <v-card-title class="text-h4 mb-4 text-primary">
                  <v-icon size="40" class="mr-3">mdi-export</v-icon>
                  {{ store.secciones[0].titulo }}
                </v-card-title>
                
                <v-card-text>
                  <p class="text-body-1 mb-6">{{ store.secciones[0].descripcion }}</p>
                  
                  <v-row>
                    <v-col md="6" cols="12">
                      <v-card class="feature-card h-100" color="blue-grey-50">
                        <v-card-title class="text-primary">
                          <v-icon class="mr-2">mdi-download</v-icon>
                          Exportación Automática
                        </v-card-title>
                        <v-card-text>
                          <v-chip
                            v-for="(item, idx) in store.secciones[0].exportacion_automatica"
                            :key="idx"
                            class="ma-1"
                            color="primary"
                            variant="outlined"
                            prepend-icon="mdi-check-circle"
                          >
                            {{ item }}
                          </v-chip>
                        </v-card-text>
                      </v-card>
                    </v-col>
                    
                    <v-col md="6" cols="12">
                      <v-card class="feature-card h-100" color="green-lighten-5">
                        <v-card-title class="text-success">
                          <v-icon class="mr-2">mdi-lightbulb-on</v-icon>
                          Buenas Prácticas
                        </v-card-title>
                        <v-card-text>
                          <v-list density="compact">
                            <v-list-item
                              v-for="(practica, idx) in store.secciones[0].buenas_practicas"
                              :key="idx"
                              class="px-0"
                            >
                              <template v-slot:prepend>
                                <v-icon color="success" size="small">mdi-check-bold</v-icon>
                              </template>
                              <v-list-item-content>
                                <v-list-item-title class="text-wrap">
                                  {{ practica }}
                                </v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                          </v-list>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card-text>
              </div>
            </v-window-item>

            <!-- Gestores Bibliográficos -->
            <v-window-item :value="1" v-if="store.secciones[1]">
              <div class="section-content">
                <v-card-title class="text-h4 mb-4 text-primary">
                  <v-icon size="40" class="mr-3">mdi-folder-multiple</v-icon>
                  {{ store.secciones[1].titulo }}
                </v-card-title>
                
                <v-card-text>
                  <p class="text-body-1 mb-6">{{ store.secciones[1].descripcion }}</p>
                  
                  <!-- Gestores principales -->
                  <h3 class="text-h5 mb-4 text-primary">Principales Gestores</h3>
                  <v-row class="mb-8">
                    <v-col
                      v-for="(gestor, idx) in store.secciones[1].principales_gestores"
                      :key="idx"
                      md="4"
                      cols="12"
                    >
                      <v-card class="gestor-card h-100" elevation="3" hover>
                        <v-card-title class="text-center">
                          <v-avatar size="60" :color="getGestorColor(idx)" class="mb-2">
                            <v-icon size="30" color="white">{{ getGestorIcon(idx) }}</v-icon>
                          </v-avatar>
                          <div class="w-100 text-h6">{{ gestor.nombre }}</div>
                        </v-card-title>
                        <v-card-text class="text-center">
                          <p class="text-body-2">{{ gestor.descripcion }}</p>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                  
                  <!-- Funciones clave -->
                  <h3 class="text-h5 mb-4 text-primary">Funciones Clave</h3>
                  <v-expansion-panels class="mb-4">
                    <v-expansion-panel
                      v-for="(funcion, idx) in store.secciones[1].funciones_clave"
                      :key="idx"
                      :title="`Función ${idx + 1}`"
                    >
                      <v-expansion-panel-text>
                        <v-chip
                          color="primary"
                          variant="tonal"
                          prepend-icon="mdi-cog"
                          class="mb-2"
                        >
                          {{ funcion }}
                        </v-chip>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-card-text>
              </div>
            </v-window-item>

            <!-- Normas APA -->
            <v-window-item :value="2" v-if="store.secciones[2]">
              <div class="section-content">
                <v-card-title class="text-h4 mb-4 text-primary">
                  <v-icon size="40" class="mr-3">mdi-format-quote-close</v-icon>
                  {{ store.secciones[2].titulo }}
                </v-card-title>
                
                <v-card-text>
                  <p class="text-body-1 mb-6">{{ store.secciones[2].descripcion }}</p>
                  
                  <!-- Citas en texto -->
                  <v-card class="mb-6" color="indigo-lighten-5">
                    <v-card-title class="text-indigo">
                      <v-icon class="mr-2">mdi-format-text</v-icon>
                      Citas en Texto
                    </v-card-title>
                    <v-card-text>
                      <v-row>
                        <v-col md="6" cols="12">
                          <v-card class="citation-card" variant="outlined">
                            <v-card-title class="text-h6">Cita Narrativa</v-card-title>
                            <v-card-text>
                              <p class="text-body-2 mb-2">
                                {{ store.secciones[2].citas_en_texto.narrativa.descripcion }}
                              </p>
                              <v-alert type="info" variant="tonal" class="text-body-2">
                                <strong>Ejemplo:</strong> {{ store.secciones[2].citas_en_texto.narrativa.ejemplo }}
                              </v-alert>
                            </v-card-text>
                          </v-card>
                        </v-col>
                        
                        <v-col md="6" cols="12">
                          <v-card class="citation-card" variant="outlined">
                            <v-card-title class="text-h6">Cita Parentética</v-card-title>
                            <v-card-text>
                              <p class="text-body-2 mb-2">
                                {{ store.secciones[2].citas_en_texto.parentetica.descripcion }}
                              </p>
                              <v-alert type="success" variant="tonal" class="text-body-2">
                                <strong>Ejemplo:</strong> {{ store.secciones[2].citas_en_texto.parentetica.ejemplo }}
                              </v-alert>
                            </v-card-text>
                          </v-card>
                        </v-col>
                      </v-row>
                      
                      <v-alert type="warning" variant="tonal" class="mt-4">
                        <strong>Citas largas:</strong> {{ store.secciones[2].citas_en_texto.larga }}
                      </v-alert>
                    </v-card-text>
                  </v-card>
                  
                  <!-- Referencias finales -->
                  <v-card class="mb-6" color="green-lighten-5">
                    <v-card-title class="text-green-darken-2">
                      <v-icon class="mr-2">mdi-format-list-bulleted</v-icon>
                      Referencias Finales
                    </v-card-title>
                    <v-card-text>
                      <h4 class="text-h6 mb-3">Principios</h4>
                      <v-list density="compact" class="mb-4">
                        <v-list-item
                          v-for="(principio, idx) in store.secciones[2].referencias_finales.principios"
                          :key="idx"
                          class="px-0"
                        >
                          <template v-slot:prepend>
                            <v-icon color="green" size="small">mdi-check-circle</v-icon>
                          </template>
                          <v-list-item-content>
                            <v-list-item-title>{{ principio }}</v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                      
                      <h4 class="text-h6 mb-3">Ejemplo de Referencia</h4>
                      <v-card class="reference-example" color="green" variant="outlined">
                        <v-card-text>
                          <code class="text-body-2">
                            {{ store.secciones[2].referencias_finales.ejemplo }}
                          </code>
                        </v-card-text>
                      </v-card>
                    </v-card-text>
                  </v-card>
                  
                  <!-- Cambios APA 7 -->
                  <v-card color="orange-lighten-5">
                    <v-card-title class="text-orange-darken-2">
                      <v-icon class="mr-2">mdi-update</v-icon>
                      Cambios en APA 7ª Edición
                    </v-card-title>
                    <v-card-text>
                      <v-chip
                        v-for="(cambio, idx) in store.secciones[2].cambios_apa7"
                        :key="idx"
                        class="ma-1"
                        color="orange"
                        variant="tonal"
                        prepend-icon="mdi-new-box"
                      >
                        {{ cambio }}
                      </v-chip>
                    </v-card-text>
                  </v-card>
                </v-card-text>
              </div>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>

    <!-- Botón de acción flotante -->
    <v-fab
      icon="mdi-help-circle"
      location="bottom end"
      size="large"
      color="primary"
      @click="showHelp = !showHelp"
    ></v-fab>

    <!-- Dialog de ayuda -->
    <v-dialog v-model="showHelp" max-width="600">
      <v-card>
        <v-card-title class="text-h5 text-primary">
          <v-icon class="mr-2">mdi-help-circle</v-icon>
          Ayuda - Gestión de Resultados
        </v-card-title>
        <v-card-text>
          <p class="mb-4">
            Esta página te guía a través de los aspectos fundamentales de la gestión de resultados
            en investigación académica:
          </p>
          <v-list density="compact">
            <v-list-item prepend-icon="mdi-export">
              <strong>Exportación:</strong> Aprende a exportar y guardar referencias
            </v-list-item>
            <v-list-item prepend-icon="mdi-folder-multiple">
              <strong>Gestores:</strong> Conoce las herramientas de gestión bibliográfica
            </v-list-item>
            <v-list-item prepend-icon="mdi-format-quote-close">
              <strong>Normas APA:</strong> Domina las reglas de citación actualizadas
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="showHelp = false">Entendido</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useGestionResultadosStore } from '/stores/gestionResultados'

// Store
const store = useGestionResultadosStore()

// Reactive data
const activeTab = ref(0)
const showHelp = ref(false)

// Methods
const getTabIcon = (index) => {
  const icons = ['mdi-export', 'mdi-folder-multiple', 'mdi-format-quote-close']
  return icons[index] || 'mdi-file-document'
}

const getGestorColor = (index) => {
  const colors = ['red', 'blue', 'green']
  return colors[index] || 'primary'
}

const getGestorIcon = (index) => {
  const icons = ['mdi-book', 'mdi-book-open', 'mdi-book-multiple']
  return icons[index] || 'mdi-book'
}

// Lifecycle
onMounted(async () => {
  await store.fetchGestionResultados()
})
</script>

<style scoped>
.gestion-resultados {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.hero-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.introduction-card {
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.section-content {
  min-height: 400px;
  padding: 20px;
}

.feature-card {
  border-radius: 12px;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.gestor-card {
  border-radius: 12px;
  transition: all 0.3s ease;
}

.gestor-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

.citation-card {
  border-radius: 8px;
  height: 100%;
}

.reference-example {
  border-radius: 8px;
  border: 2px dashed #ddd;
}

.reference-example code {
  font-family: 'Courier New', monospace;
  line-height: 1.5;
  word-wrap: break-word;
}

.v-expansion-panel {
  border-radius: 8px !important;
  margin-bottom: 8px;
}

.v-tab {
  text-transform: none !important;
  font-weight: 500;
}

.v-chip {
  font-weight: 500;
}

.text-justify {
  text-align: justify;
}

/* Animaciones */
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

.section-content {
  animation: fadeInUp 0.6s ease-out;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero-card {
    margin: 0 8px;
  }
  
  .section-content {
    padding: 12px;
  }
  
  .display-1 {
    font-size: 2rem !important;
  }
}
</style>