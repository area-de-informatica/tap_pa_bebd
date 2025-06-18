<template>
  <v-container fluid class="navegacion-module">
    <!-- Header Principal -->
    <v-row class="mb-6">
      <v-col cols="12">
        <v-card class="header-card" elevation="8">
          <v-card-text class="pa-8">
            <div class="d-flex align-center mb-4">
              <v-icon size="48" color="primary" class="mr-4">
                mdi-database-search
              </v-icon>
              <div>
                <h1 class="text-h3 font-weight-bold text-primary mb-2">
                  {{ navegacionStore.modulo }}
                </h1>
                <p class="text-h6 text-medium-emphasis">
                  {{ navegacionStore.objetivo }}
                </p>
              </div>
            </div>
            
            <v-divider class="my-4"></v-divider>
            
            <p class="text-body-1 text-justify">
              {{ navegacionStore.introduccion }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Navegación por Pestañas -->
    <v-row>
      <v-col cols="12">
        <v-card elevation="4">
          <v-tabs
            v-model="activeTab"
            bg-color="primary"
            color="white"
            slider-color="accent"
            align-tabs="center"
            show-arrows
          >
            <v-tab value="fundamentos">
              <v-icon class="mr-2">mdi-book-open-variant</v-icon>
              Fundamentos
            </v-tab>
            <v-tab value="estrategias">
              <v-icon class="mr-2">mdi-chess-queen</v-icon>
              Estrategias
            </v-tab>
            <v-tab value="evaluacion">
              <v-icon class="mr-2">mdi-clipboard-check</v-icon>
              Evaluación
            </v-tab>
            <v-tab value="documentacion">
              <v-icon class="mr-2">mdi-file-document</v-icon>
              Documentación
            </v-tab>
          </v-tabs>

          <v-window v-model="activeTab" class="pa-6">
            <!-- Pestaña Fundamentos -->
            <v-window-item value="fundamentos">
              <div class="fundamentos-section">
                <v-row class="mb-6">
                  <v-col cols="12">
                    <v-alert
                      type="info"
                      variant="tonal"
                      prominent
                      border="start"
                    >
                      <template v-slot:prepend>
                        <v-icon>mdi-information</v-icon>
                      </template>
                      <div class="text-h6 mb-2">¿Qué es una Base de Datos Científica?</div>
                      <p class="mb-0">{{ navegacionStore.fundamentos.que_es }}</p>
                    </v-alert>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col
                    v-for="(tipo, index) in navegacionStore.fundamentos.tipos"
                    :key="index"
                    cols="12"
                    md="4"
                  >
                    <v-card
                      class="tipo-card h-100"
                      elevation="3"
                      hover
                      :color="getCardColor(index)"
                      variant="tonal"
                    >
                      <v-card-title class="d-flex align-center">
                        <v-icon :color="getIconColor(index)" class="mr-3" size="32">
                          {{ getTypeIcon(tipo.tipo) }}
                        </v-icon>
                        {{ tipo.tipo }}
                      </v-card-title>
                      
                      <v-card-text>
                        <p class="text-body-1 mb-4">{{ tipo.descripcion }}</p>
                        
                        <div class="ejemplos-section">
                          <v-chip-group column>
                            <v-chip
                              v-for="ejemplo in tipo.ejemplos"
                              :key="ejemplo"
                              :color="getIconColor(index)"
                              variant="outlined"
                              size="small"
                            >
                              {{ ejemplo }}
                            </v-chip>
                          </v-chip-group>
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </div>
            </v-window-item>

            <!-- Pestaña Estrategias -->
            <v-window-item value="estrategias">
              <div class="estrategias-section">
                <v-timeline side="end" align="start">
                  <v-timeline-item
                    v-for="(estrategia, index) in navegacionStore.estrategias_busqueda"
                    :key="index"
                    :dot-color="getTimelineColor(index)"
                    size="large"
                  >
                    <template v-slot:icon>
                      <v-icon color="white">{{ getStepIcon(estrategia.paso) }}</v-icon>
                    </template>

                    <v-card elevation="4" class="mb-4">
                      <v-card-title class="d-flex align-center">
                        <v-badge
                          :content="estrategia.paso"
                          color="primary"
                          class="mr-4"
                        >
                          <v-icon size="24">mdi-numeric-{{ estrategia.paso }}-circle</v-icon>
                        </v-badge>
                        {{ estrategia.titulo }}
                      </v-card-title>

                      <v-card-text>
                        <p class="text-body-1 mb-4">{{ estrategia.descripcion }}</p>

                        <!-- Operadores Booleanos -->
                        <div v-if="estrategia.operadores" class="mb-4">
                          <v-divider class="mb-4"></v-divider>
                          <h4 class="text-h6 mb-3">Operadores Booleanos</h4>
                          
                          <v-row>
                            <v-col
                              v-for="op in estrategia.operadores"
                              :key="op.operador"
                              cols="12"
                              md="4"
                            >
                              <v-card variant="outlined" class="h-100">
                                <v-card-text class="text-center">
                                  <v-chip
                                    :color="getOperatorColor(op.operador)"
                                    size="large"
                                    class="mb-3"
                                  >
                                    {{ op.operador }}
                                  </v-chip>
                                  <p class="text-body-2">{{ op.explicacion }}</p>
                                </v-card-text>
                              </v-card>
                            </v-col>
                          </v-row>

                          <v-alert
                            type="success"
                            variant="tonal"
                            class="mt-4"
                          >
                            <template v-slot:prepend>
                              <v-icon>mdi-lightbulb-on</v-icon>
                            </template>
                            <div class="text-subtitle-2 mb-1">Ejemplo práctico:</div>
                            <code class="text-body-2">{{ estrategia.ejemplo }}</code>
                          </v-alert>
                        </div>

                        <!-- Truncamiento y Comodines -->
                        <div v-if="estrategia.truncamiento" class="mb-4">
                          <v-divider class="mb-4"></v-divider>
                          <v-row>
                            <v-col cols="12" md="6">
                              <v-card variant="outlined" color="info">
                                <v-card-title class="text-h6">
                                  <v-icon class="mr-2">mdi-scissors-cutting</v-icon>
                                  Truncamiento
                                </v-card-title>
                                <v-card-text>
                                  <p>{{ estrategia.truncamiento.descripcion }}</p>
                                  <v-chip color="info" variant="outlined">
                                    {{ estrategia.truncamiento.ejemplo }}
                                  </v-chip>
                                </v-card-text>
                              </v-card>
                            </v-col>
                            <v-col cols="12" md="6">
                              <v-card variant="outlined" color="warning">
                                <v-card-title class="text-h6">
                                  <v-icon class="mr-2">mdi-star</v-icon>
                                  Comodines
                                </v-card-title>
                                <v-card-text>
                                  <p>{{ estrategia.comodines.descripcion }}</p>
                                  <v-chip color="warning" variant="outlined">
                                    {{ estrategia.comodines.ejemplo }}
                                  </v-chip>
                                </v-card-text>
                              </v-card>
                            </v-col>
                          </v-row>
                        </div>

                        <!-- Filtros -->
                        <div v-if="estrategia.filtros" class="mb-4">
                          <v-divider class="mb-4"></v-divider>
                          <h4 class="text-h6 mb-3">Filtros Disponibles</h4>
                          <v-chip-group>
                            <v-chip
                              v-for="filtro in estrategia.filtros"
                              :key="filtro"
                              color="secondary"
                              variant="outlined"
                            >
                              <v-icon start>mdi-filter</v-icon>
                              {{ filtro }}
                            </v-chip>
                          </v-chip-group>
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-timeline-item>
                </v-timeline>
              </div>
            </v-window-item>

            <!-- Pestaña Evaluación -->
            <v-window-item value="evaluacion">
              <div class="evaluacion-section">
                <v-row>
                  <v-col cols="12">
                    <h2 class="text-h4 mb-6 text-center">Criterios de Evaluación</h2>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col
                    v-for="(criterio, key) in navegacionStore.criterios_evaluacion"
                    :key="key"
                    cols="12"
                    md="6"
                    lg="3"
                  >
                    <v-card
                      class="criterio-card h-100"
                      elevation="6"
                      hover
                      :color="getCriterioColor(key)"
                      variant="tonal"
                    >
                      <v-card-title class="text-center pa-6">
                        <v-avatar
                          :color="getCriterioColor(key)"
                          size="64"
                          class="mb-4"
                        >
                          <v-icon color="white" size="32">
                            {{ getCriterioIcon(key) }}
                          </v-icon>
                        </v-avatar>
                        <div class="text-h6 text-capitalize">{{ key.replace('_', ' ') }}</div>
                      </v-card-title>

                      <v-card-text class="text-center">
                        <p class="text-body-1">{{ criterio }}</p>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>

                <!-- Checklist Interactivo -->
                <v-row class="mt-8">
                  <v-col cols="12">
                    <v-card elevation="4">
                      <v-card-title class="text-h5 pa-6">
                        <v-icon class="mr-3" color="success">mdi-clipboard-check</v-icon>
                        Checklist de Evaluación
                      </v-card-title>
                      
                      <v-card-text>
                        <v-list>
                          <v-list-item
                            v-for="(item, index) in checklistItems"
                            :key="index"
                          >
                            <template v-slot:prepend>
                              <v-checkbox
                                v-model="item.checked"
                                :color="item.checked ? 'success' : 'grey'"
                              ></v-checkbox>
                            </template>
                            
                            <v-list-item-title>{{ item.text }}</v-list-item-title>
                          </v-list-item>
                        </v-list>

                        <v-progress-linear
                          :model-value="checklistProgress"
                          color="success"
                          height="8"
                          rounded
                          class="mt-4"
                        ></v-progress-linear>
                        
                        <p class="text-center mt-2 text-body-2">
                          Progreso: {{ Math.round(checklistProgress) }}%
                        </p>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </div>
            </v-window-item>

            <!-- Pestaña Documentación -->
            <v-window-item value="documentacion">
              <div class="documentacion-section">
                <v-row>
                  <v-col cols="12">
                    <v-alert
                      type="warning"
                      variant="tonal"
                      prominent
                      border="start"
                      class="mb-6"
                    >
                      <template v-slot:prepend>
                        <v-icon>mdi-file-document-edit</v-icon>
                      </template>
                      <div class="text-h6 mb-2">Importancia de la Documentación</div>
                      <p class="mb-0">{{ navegacionStore.documentacion_busqueda }}</p>
                    </v-alert>
                  </v-col>
                </v-row>

                <!-- Plantilla de Documentación -->
                <v-row>
                  <v-col cols="12">
                    <v-card elevation="4">
                      <v-card-title class="text-h5 pa-6">
                        <v-icon class="mr-3" color="primary">mdi-file-document-outline</v-icon>
                        Plantilla de Documentación de Búsqueda
                      </v-card-title>

                      <v-card-text>
                        <v-form ref="documentacionForm">
                          <v-row>
                            <v-col cols="12" md="6">
                              <v-text-field
                                v-model="documentacionForm.fecha"
                                label="Fecha de búsqueda"
                                type="date"
                                variant="outlined"
                                prepend-inner-icon="mdi-calendar"
                              ></v-text-field>
                            </v-col>
                            
                            <v-col cols="12" md="6">
                              <v-text-field
                                v-model="documentacionForm.investigador"
                                label="Investigador"
                                variant="outlined"
                                prepend-inner-icon="mdi-account"
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12">
                              <v-textarea
                                v-model="documentacionForm.pregunta"
                                label="Pregunta de investigación"
                                variant="outlined"
                                rows="3"
                                prepend-inner-icon="mdi-help-circle"
                              ></v-textarea>
                            </v-col>

                            <v-col cols="12" md="6">
                              <v-select
                                v-model="documentacionForm.baseDatos"
                                :items="basesDatos"
                                label="Base de datos utilizada"
                                variant="outlined"
                                prepend-inner-icon="mdi-database"
                                multiple
                                chips
                              ></v-select>
                            </v-col>

                            <v-col cols="12" md="6">
                              <v-text-field
                                v-model="documentacionForm.estrategia"
                                label="Estrategia de búsqueda"
                                variant="outlined"
                                prepend-inner-icon="mdi-magnify"
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12">
                              <v-textarea
                                v-model="documentacionForm.limitaciones"
                                label="Limitaciones aplicadas"
                                variant="outlined"
                                rows="2"
                                prepend-inner-icon="mdi-filter"
                              ></v-textarea>
                            </v-col>

                            <v-col cols="12" md="4">
                              <v-text-field
                                v-model="documentacionForm.resultados"
                                label="Número de resultados"
                                type="number"
                                variant="outlined"
                                prepend-inner-icon="mdi-counter"
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                              <v-text-field
                                v-model="documentacionForm.seleccionados"
                                label="Artículos seleccionados"
                                type="number"
                                variant="outlined"
                                prepend-inner-icon="mdi-check-circle"
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                              <v-text-field
                                v-model="documentacionForm.excluidos"
                                label="Artículos excluidos"
                                type="number"
                                variant="outlined"
                                prepend-inner-icon="mdi-close-circle"
                              ></v-text-field>
                            </v-col>

                            <v-col cols="12">
                              <v-textarea
                                v-model="documentacionForm.observaciones"
                                label="Observaciones y comentarios"
                                variant="outlined"
                                rows="3"
                                prepend-inner-icon="mdi-note-text"
                              ></v-textarea>
                            </v-col>
                          </v-row>

                          <v-row class="mt-4">
                            <v-col cols="12" class="text-center">
                              <v-btn
                                color="primary"
                                size="large"
                                prepend-icon="mdi-download"
                                @click="exportarDocumentacion"
                              >
                                Exportar Documentación
                              </v-btn>
                              
                              <v-btn
                                color="secondary"
                                size="large"
                                prepend-icon="mdi-refresh"
                                variant="outlined"
                                class="ml-4"
                                @click="limpiarFormulario"
                              >
                                Limpiar
                              </v-btn>
                            </v-col>
                          </v-row>
                        </v-form>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </div>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>

    <!-- Botón de Acción Flotante -->
    <v-fab
      location="bottom end"
      size="large"
      color="primary"
      icon="mdi-help-circle"
      @click="mostrarAyuda = true"
    ></v-fab>

    <!-- Dialog de Ayuda -->
    <v-dialog v-model="mostrarAyuda" max-width="600">
      <v-card>
        <v-card-title class="text-h5">
          <v-icon class="mr-2">mdi-help-circle</v-icon>
          Ayuda Rápida
        </v-card-title>
        
        <v-card-text>
          <v-list>
            <v-list-item
              v-for="ayuda in ayudaItems"
              :key="ayuda.titulo"
              prepend-icon="mdi-lightbulb"
            >
              <v-list-item-title>{{ ayuda.titulo }}</v-list-item-title>
              <v-list-item-subtitle>{{ ayuda.descripcion }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card-text>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="mostrarAyuda = false">
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useNavegacionStore } from '@/stores/navegacion'

// Store
const navegacionStore = useNavegacionStore()

// Estado reactivo
const activeTab = ref('fundamentos')
const mostrarAyuda = ref(false)

// Formulario de documentación
const documentacionForm = ref({
  fecha: new Date().toISOString().substr(0, 10),
  investigador: '',
  pregunta: '',
  baseDatos: [],
  estrategia: '',
  limitaciones: '',
  resultados: '',
  seleccionados: '',
  excluidos: '',
  observaciones: ''
})

// Datos estáticos
const basesDatos = [
  'SCOPUS', 'Web of Science', 'ERIC', 'ScienceDirect', 
  'JSTOR', 'PsycINFO', 'CINAHL', 'IEEE Xplore', 'PubMed'
]

const checklistItems = ref([
  { text: '¿El artículo responde directamente a mi pregunta de investigación?', checked: false },
  { text: '¿La fuente es de una revista arbitrada o editorial reconocida?', checked: false },
  { text: '¿La información es actual y relevante para mi estudio?', checked: false },
  { text: '¿El tipo de estudio es apropiado para mi investigación?', checked: false },
  { text: '¿Los autores tienen credibilidad en el área de estudio?', checked: false },
  { text: '¿La metodología utilizada es sólida y apropiada?', checked: false }
])

const ayudaItems = [
  {
    titulo: 'Usa términos específicos',
    descripcion: 'Evita palabras muy generales. Sé específico en tu búsqueda.'
  },
  {
    titulo: 'Combina operadores',
    descripcion: 'Usa AND, OR, NOT para refinar tus resultados.'
  },
  {
    titulo: 'Aplica filtros',
    descripcion: 'Limita por fecha, idioma, tipo de documento.'
  },
  {
    titulo: 'Documenta todo',
    descripcion: 'Registra tu estrategia para reproducir la búsqueda.'
  }
]

// Computed
const checklistProgress = computed(() => {
  const checked = checklistItems.value.filter(item => item.checked).length
  return (checked / checklistItems.value.length) * 100
})

// Métodos
const getCardColor = (index) => {
  const colors = ['primary', 'secondary', 'accent']
  return colors[index % colors.length]
}

const getIconColor = (index) => {
  const colors = ['primary', 'secondary', 'accent']
  return colors[index % colors.length]
}

const getTypeIcon = (tipo) => {
  const icons = {
    'Bibliográficas': 'mdi-book-multiple',
    'Texto completo': 'mdi-file-document',
    'Especializadas': 'mdi-wrench'
  }
  return icons[tipo] || 'mdi-database'
}

const getTimelineColor = (index) => {
  const colors = ['primary', 'secondary', 'accent', 'success', 'info']
  return colors[index % colors.length]
}

const getStepIcon = (paso) => {
  const icons = {
    1: 'mdi-target',
    2: 'mdi-key',
    3: 'mdi-logic-and',
    4: 'mdi-scissors-cutting',
    5: 'mdi-filter'
  }
  return icons[paso] || 'mdi-numeric'
}

const getOperatorColor = (operador) => {
  const colors = {
    'AND': 'success',
    'OR': 'warning',
    'NOT': 'error'
  }
  return colors[operador] || 'primary'
}

const getCriterioColor = (key) => {
  const colors = {
    'relevancia': 'primary',
    'calidad': 'secondary',
    'actualizacion': 'accent',
    'tipo_estudio': 'success'
  }
  return colors[key] || 'primary'
}

const getCriterioIcon = (key) => {
  const icons = {
    'relevancia': 'mdi-target',
    'calidad': 'mdi-star',
    'actualizacion': 'mdi-calendar-clock',
    'tipo_estudio': 'mdi-file-chart'
  }
  return icons[key] || 'mdi-help-circle'
}

const exportarDocumentacion = () => {
  const data = {
    ...documentacionForm.value,
    fechaExportacion: new Date().toLocaleString()
  }
  
  const jsonData = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonData], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = `documentacion_busqueda_${data.fecha}.json`
  link.click()
  
  URL.revokeObjectURL(url)
}

const limpiarFormulario = () => {
  documentacionForm.value = {
    fecha: new Date().toISOString().substr(0, 10),
    investigador: '',
    pregunta: '',
    baseDatos: [],
    estrategia: '',
    limitaciones: '',
    resultados: '',
    seleccionados: '',
    excluidos: '',
    observaciones: ''
  }
}

// Lifecycle
onMounted(async () => {
  await navegacionStore.fetchNavegacion()
})
</script>

<style scoped>
.navegacion-module {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.header-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.header-card .v-card-text {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
}

.tipo-card {
  transition: all 0.3s ease;
  border-radius: 16px;
}

.tipo-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.criterio-card {
  transition: all 0.3s ease;
  border-radius: 16px;
  text-align: center;
}

.criterio-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.v-timeline-item {
  margin-bottom: 2rem;
}

.v-fab {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.v-tabs {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.v-window {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}

@media (max-width: 960px) {
  .header-card .v-card-text {
    padding: 1.5rem !important;
  }
  
  .tipo-card,
  .criterio-card {
    margin-bottom: 1rem;
  }
}
</style>