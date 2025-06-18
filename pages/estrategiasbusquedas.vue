<template>
  <div class="estrategias-busqueda">
    <!-- Hero Section with Advanced Animation -->
    <v-container fluid class="hero-section pa-0">
      <v-row no-gutters>
        <v-col cols="12">
          <div class="hero-gradient py-16 position-relative overflow-hidden">
            <!-- Animated Background Elements -->
            <div class="floating-elements">
              <div class="floating-circle circle-1"></div>
              <div class="floating-circle circle-2"></div>
              <div class="floating-circle circle-3"></div>
              <div class="floating-triangle triangle-1"></div>
              <div class="floating-triangle triangle-2"></div>
            </div>
            
            <!-- Particle Animation Layer -->
            <div class="particles-container">
              <div v-for="i in 20" :key="i" :class="`particle particle-${i}`"></div>
            </div>
            
            <v-container class="position-relative" style="z-index: 2;">
              <v-row justify="center">
                <v-col cols="12" md="10" lg="8">
                  <div class="text-center hero-content">
                    <!-- Animated Icon -->
                    <div class="hero-icon-container mb-6">
                      <div class="icon-backdrop"></div>
                      <v-icon size="100" color="white" class="hero-icon">
                        mdi-magnify-plus-outline
                      </v-icon>
                      <div class="icon-pulse"></div>
                    </div>
                    
                    <!-- Animated Title -->
                    <h1 class="hero-title text-h2 text-md-h1 font-weight-black text-white mb-4">
                      <span class="title-word" v-for="(word, index) in titleWords" :key="index" :style="`animation-delay: ${index * 0.2}s`">
                        {{ word }}
                      </span>
                    </h1>
                    
                    <!-- Subtitle with Typewriter Effect -->
                    <div class="hero-subtitle-container mb-8">
                      <p class="hero-subtitle text-h5 text-white font-weight-light">
                        <span class="typewriter">{{ displayedSubtitle }}</span>
                        <span class="cursor" :class="{ 'blink': showCursor }">|</span>
                      </p>
                    </div>
                    
                    <!-- Enhanced Stats Cards -->
                    <v-row justify="center" class="hero-stats">
                      <v-col cols="4" sm="auto" v-for="(stat, index) in stats" :key="index">
                        <v-card 
                          class="stat-card pa-4 mx-2" 
                          elevation="12"
                          :style="`animation-delay: ${0.5 + index * 0.15}s`"
                        >
                          <div class="stat-content">
                            <div class="stat-icon-bg">
                              <v-icon size="24" :color="stat.color">{{ stat.icon }}</v-icon>
                            </div>
                            <div class="text-h3 font-weight-black mb-1" :class="`${stat.color}--text`">
                              {{ stat.value }}
                            </div>
                            <div class="text-caption text-uppercase font-weight-bold grey--text text--darken-1">
                              {{ stat.label }}
                            </div>
                          </div>
                          <div class="stat-glow" :class="`stat-glow-${stat.color}`"></div>
                        </v-card>
                      </v-col>
                    </v-row>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- Content Sections - All Displayed in Parallel -->
    <v-container class="py-12">
      
      <!-- Section 1: Palabras Clave -->
      <v-row class="mb-12">
        <v-col cols="12">
          <v-card class="main-card glass-effect" elevation="16">
            <div class="card-header primary-gradient">
              <v-card-title class="white--text pa-6">
                <div class="header-content">
                  <div class="header-icon-container">
                    <v-icon size="32" color="white">mdi-key-variant</v-icon>
                  </div>
                  <div>
                    <h2 class="text-h4 font-weight-bold mb-2">{{ contenido.contenido.palabras_clave.titulo }}</h2>
                    <p class="text-body-1 opacity-90 ma-0">Elementos fundamentales para búsquedas efectivas</p>
                  </div>
                </div>
              </v-card-title>
            </div>
            
            <v-card-text class="pa-8">
              <v-alert 
                type="info" 
                border="left" 
                colored-border 
                elevation="4" 
                class="info-alert mb-8"
              >
                <div class="alert-content">
                  <v-icon color="info" size="24" class="mr-3">mdi-information</v-icon>
                  <span class="text-body-1">{{ contenido.contenido.palabras_clave.definicion }}</span>
                </div>
              </v-alert>

              <v-row>
                <v-col cols="12" lg="6">
                  <v-card class="step-card glass-card" elevation="8">
                    <div class="card-header success-gradient">
                      <v-card-title class="white--text">
                        <v-icon left color="white" size="24">mdi-format-list-numbered</v-icon>
                        <span class="text-h6 font-weight-bold">Proceso de Identificación</span>
                      </v-card-title>
                    </div>
                    <v-card-text class="pa-6">
                      <v-timeline dense class="modern-timeline">
                        <v-timeline-item
                          v-for="(paso, index) in contenido.contenido.palabras_clave.como_identificarlas"
                          :key="index"
                          color="success"
                          small
                          fill-dot
                        >
                          <template v-slot:icon>
                            <span class="timeline-number white--text font-weight-bold">{{ index + 1 }}</span>
                          </template>
                          <v-card class="timeline-card elevation-4" hover>
                            <v-card-text class="py-3">
                              <p class="text-body-1 ma-0">{{ paso }}</p>
                            </v-card-text>
                          </v-card>
                        </v-timeline-item>
                      </v-timeline>
                    </v-card-text>
                  </v-card>
                </v-col>
                
                <v-col cols="12" lg="6">
                  <v-card class="example-card glass-card" elevation="8">
                    <div class="card-header orange-gradient">
                      <v-card-title class="white--text">
                        <v-icon left color="white" size="24">mdi-lightbulb</v-icon>
                        <span class="text-h6 font-weight-bold">Ejemplo Interactivo</span>
                      </v-card-title>
                    </div>
                    <v-card-text class="pa-6">
                      <div class="example-section mb-6">
                        <div class="section-header mb-4">
                          <v-chip class="section-chip" color="secondary" text-color="white" size="large">
                            <v-icon left size="18">mdi-book-open-page-variant</v-icon>
                            Caso de Estudio
                          </v-chip>
                        </div>
                        <div class="topic-card pa-4 mb-4">
                          <p class="text-h6 font-weight-medium mb-0">
                            "{{ contenido.contenido.palabras_clave.ejemplo.tema }}"
                          </p>
                        </div>
                      </div>
                      
                      <v-divider class="my-6"></v-divider>
                      
                      <div class="keywords-section">
                        <div class="section-header mb-4">
                          <v-chip class="section-chip" color="primary" text-color="white" size="large">
                            <v-icon left size="18">mdi-tag-multiple</v-icon>
                            Palabras Clave Extraídas
                          </v-chip>
                        </div>
                        <div class="keywords-grid">
                          <v-chip
                            v-for="(keyword, index) in contenido.contenido.palabras_clave.ejemplo.palabras_clave"
                            :key="keyword"
                            class="keyword-chip ma-2"
                            :style="`animation-delay: ${index * 0.1}s`"
                            color="success"
                            outlined
                            large
                          >
                            <v-icon left size="16">mdi-tag</v-icon>
                            {{ keyword }}
                          </v-chip>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Section 2: Sinónimos -->
      <v-row class="mb-12">
        <v-col cols="12">
          <v-card class="main-card glass-effect" elevation="16">
            <div class="card-header success-gradient">
              <v-card-title class="white--text pa-6">
                <div class="header-content">
                  <div class="header-icon-container">
                    <v-icon size="32" color="white">mdi-swap-horizontal</v-icon>
                  </div>
                  <div>
                    <h2 class="text-h4 font-weight-bold mb-2">{{ contenido.contenido.sinonimos_terminos_relacionados.titulo }}</h2>
                    <p class="text-body-1 opacity-90 ma-0">Amplía tu vocabulario de búsqueda</p>
                  </div>
                </div>
              </v-card-title>
            </div>
            
            <v-card-text class="pa-8">
              <v-alert 
                type="warning" 
                border="left" 
                colored-border 
                elevation="4" 
                class="warning-alert mb-8"
              >
                <div class="alert-content">
                  <v-icon color="warning" size="24" class="mr-3">mdi-alert</v-icon>
                  <span class="text-body-1">{{ contenido.contenido.sinonimos_terminos_relacionados.importancia }}</span>
                </div>
              </v-alert>

              <v-row>
                <v-col cols="12" lg="6">
                  <v-card class="task-card glass-card" elevation="8">
                    <div class="card-header info-gradient">
                      <v-card-title class="white--text">
                        <v-icon left color="white" size="24">mdi-check-circle</v-icon>
                        <span class="text-h6 font-weight-bold">Plan de Acción</span>
                      </v-card-title>
                    </div>
                    <v-card-text class="pa-6">
                      <v-list class="transparent">
                        <v-list-item
                          v-for="(tarea, index) in contenido.contenido.sinonimos_terminos_relacionados.tareas"
                          :key="index"
                          class="task-item px-0"
                        >
                          <v-list-item-icon class="mr-4">
                            <div class="task-icon-container">
                              <v-icon color="success" size="20">mdi-arrow-right-circle</v-icon>
                            </div>
                          </v-list-item-icon>
                          <v-list-item-content>
                            <v-list-item-title class="text-body-1 font-weight-medium">
                              {{ tarea }}
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-card-text>
                  </v-card>
                </v-col>
                
                <v-col cols="12" lg="6">
                  <v-card class="synonym-card glass-card" elevation="8">
                    <div class="card-header purple-gradient">
                      <v-card-title class="white--text">
                        <v-icon left color="white" size="24">mdi-format-quote-open</v-icon>
                        <span class="text-h6 font-weight-bold">Ejemplos Dinámicos</span>
                      </v-card-title>
                    </div>
                    <v-card-text class="pa-6">
                      <div class="synonym-group mb-8">
                        <div class="group-header mb-4">
                          <v-chip class="group-chip" color="blue" text-color="white" size="large">
                            <v-icon left size="18">mdi-laptop</v-icon>
                            Tecnología
                          </v-chip>
                        </div>
                        <div class="synonyms-container">
                          <v-chip
                            v-for="(sinonimo, index) in contenido.contenido.sinonimos_terminos_relacionados.ejemplo.tecnologia"
                            :key="sinonimo"
                            class="synonym-tag ma-1"
                            :style="`animation-delay: ${index * 0.1}s`"
                            color="blue lighten-4"
                            outlined
                            hover
                          >
                            {{ sinonimo }}
                          </v-chip>
                        </div>
                      </div>
                      
                      <v-divider class="my-6"></v-divider>
                      
                      <div class="synonym-group">
                        <div class="group-header mb-4">
                          <v-chip class="group-chip" color="purple" text-color="white" size="large">
                            <v-icon left size="18">mdi-account-group</v-icon>
                            Educación Inclusiva
                          </v-chip>
                        </div>
                        <div class="synonyms-container">
                          <v-chip
                            v-for="(sinonimo, index) in contenido.contenido.sinonimos_terminos_relacionados.ejemplo.educacion_inclusiva"
                            :key="sinonimo"
                            class="synonym-tag ma-1"
                            :style="`animation-delay: ${index * 0.1}s`"
                            color="purple lighten-4"
                            outlined
                            hover
                          >
                            {{ sinonimo }}
                          </v-chip>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Section 3: Operadores Booleanos -->
      <v-row class="mb-12">
        <v-col cols="12">
          <v-card class="main-card glass-effect" elevation="16">
            <div class="card-header info-gradient">
              <v-card-title class="white--text pa-6">
                <div class="header-content">
                  <div class="header-icon-container">
                    <v-icon size="32" color="white">mdi-logic-and</v-icon>
                  </div>
                  <div>
                    <h2 class="text-h4 font-weight-bold mb-2">{{ contenido.contenido.operadores_booleanos.titulo }}</h2>
                    <p class="text-body-1 opacity-90 ma-0">Lógica avanzada para búsquedas precisas</p>
                  </div>
                </div>
              </v-card-title>
            </div>
            
            <v-card-text class="pa-8">
              <v-alert 
                type="info" 
                border="left" 
                colored-border 
                elevation="4" 
                class="info-alert mb-8"
              >
                <div class="alert-content">
                  <v-icon color="info" size="24" class="mr-3">mdi-information</v-icon>
                  <span class="text-body-1">{{ contenido.contenido.operadores_booleanos.descripcion }}</span>
                </div>
              </v-alert>

              <v-row>
                <v-col
                  v-for="(operador, index) in contenido.contenido.operadores_booleanos.operadores"
                  :key="operador.operador"
                  cols="12"
                  md="4"
                >
                  <v-card 
                    class="operator-card glass-card h-100" 
                    elevation="12" 
                    hover
                    :style="`animation-delay: ${index * 0.2}s`"
                  >
                    <div class="operator-header" :class="`${getOperatorColor(operador.operador)}-gradient`">
                      <v-card-title class="white--text text-center pa-6">
                        <div class="w-100">
                          <div class="text-h3 font-weight-black">{{ operador.operador }}</div>
                        </div>
                      </v-card-title>
                    </div>
                    <v-card-text class="pa-6">
                      <div class="operator-content">
                        <div class="mb-4">
                          <h4 class="text-h6 font-weight-bold mb-2 grey--text text--darken-3">Función:</h4>
                          <p class="text-body-1 ma-0">{{ operador.funcion }}</p>
                        </div>
                        <v-divider class="my-4"></v-divider>
                        <div>
                          <h4 class="text-h6 font-weight-bold mb-3 grey--text text--darken-3">Ejemplo:</h4>
                          <div class="example-container">
                            <v-chip 
                              class="example-chip" 
                              :color="getOperatorColor(operador.operador)" 
                              text-color="white"
                              large
                            >
                              <v-icon left size="16">mdi-code-tags</v-icon>
                              {{ operador.ejemplo }}
                            </v-chip>
                          </div>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>

              <v-alert 
                type="success" 
                border="left" 
                colored-border 
                elevation="4" 
                class="success-alert mt-8"
              >
                <div class="alert-content">
                  <v-icon color="success" size="24" class="mr-3">mdi-lightbulb</v-icon>
                  <div>
                    <strong class="text-h6">Consejo Profesional:</strong>
                    <p class="text-body-1 mt-2 ma-0">{{ contenido.contenido.operadores_booleanos.consejo }}</p>
                  </div>
                </div>
              </v-alert>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Section 4: Truncadores -->
      <v-row class="mb-12">
        <v-col cols="12">
          <v-card class="main-card glass-effect" elevation="16">
            <div class="card-header warning-gradient">
              <v-card-title class="white--text pa-6">
                <div class="header-content">
                  <div class="header-icon-container">
                    <v-icon size="32" color="white">mdi-asterisk</v-icon>
                  </div>
                  <div>
                    <h2 class="text-h4 font-weight-bold mb-2">{{ contenido.contenido.truncadores_comodines.titulo }}</h2>
                    <p class="text-body-1 opacity-90 ma-0">Herramientas avanzadas de búsqueda flexible</p>
                  </div>
                </div>
              </v-card-title>
            </div>
            
            <v-card-text class="pa-8">
              <v-row>
                <v-col cols="12" lg="6">
                  <v-card class="truncator-card glass-card" elevation="8">
                    <div class="card-header orange-gradient">
                      <v-card-title class="white--text">
                        <v-icon left color="white" size="24">mdi-format-text</v-icon>
                        <span class="text-h6 font-weight-bold">Truncadores</span>
                      </v-card-title>
                    </div>
                    <v-card-text class="pa-6">
                      <div class="feature-content">
                        <p class="text-body-1 mb-6 leading-relaxed">
                          {{ contenido.contenido.truncadores_comodines.truncadores.descripcion }}
                        </p>
                        <div class="example-showcase">
                          <div class="example-label mb-3">
                            <v-chip color="orange" text-color="white" size="small">
                              <v-icon left size="14">mdi-play</v-icon>
                              Ejemplo
                            </v-chip>
                          </div>
                          <v-alert type="warning" dense class="example-alert">
                            <div class="d-flex align-center">
                              <v-icon color="warning" class="mr-2">mdi-code-tags</v-icon>
                              <code class="example-code">{{ contenido.contenido.truncadores_comodines.truncadores.ejemplo }}</code>
                            </div>
                          </v-alert>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
                
                <v-col cols="12" lg="6">
                  <v-card class="wildcard-card glass-card" elevation="8">
                    <div class="card-header blue-gradient">
                      <v-card-title class="white--text">
                        <v-icon left color="white" size="24">mdi-help-circle</v-icon>
                        <span class="text-h6 font-weight-bold">Comodines</span>
                      </v-card-title>
                    </div>
                    <v-card-text class="pa-6">
                      <div class="feature-content">
                        <p class="text-body-1 mb-6 leading-relaxed">
                          {{ contenido.contenido.truncadores_comodines.comodines.descripcion }}
                        </p>
                        <div class="example-showcase">
                          <div class="example-label mb-3">
                            <v-chip color="blue" text-color="white" size="small">
                              <v-icon left size="14">mdi-play</v-icon>
                              Ejemplo
                            </v-chip>
                          </div>
                          <v-alert type="info" dense class="example-alert">
                            <div class="d-flex align-center">
                              <v-icon color="info" class="mr-2">mdi-code-tags</v-icon>
                              <code class="example-code">{{ contenido.contenido.truncadores_comodines.comodines.ejemplo }}</code>
                            </div>
                          </v-alert>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>

              <v-alert 
                type="warning" 
                border="left" 
                colored-border 
                elevation="4" 
                class="warning-alert mt-8"
              >
                <div class="alert-content">
                  <v-icon color="warning" size="24" class="mr-3">mdi-information</v-icon>
                  <div>
                    <strong class="text-h6">Nota Importante:</strong>
                    <p class="text-body-1 mt-2 ma-0">{{ contenido.contenido.truncadores_comodines.nota }}</p>
                  </div>
                </div>
              </v-alert>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Section 5: Filtros -->
      <v-row class="mb-12">
        <v-col cols="12">
          <v-card class="main-card glass-effect" elevation="16">
            <div class="card-header purple-gradient">
              <v-card-title class="white--text pa-6">
                <div class="header-content">
                  <div class="header-icon-container">
                    <v-icon size="32" color="white">mdi-filter-variant</v-icon>
                  </div>
                  <div>
                    <h2 class="text-h4 font-weight-bold mb-2">{{ contenido.contenido.filtros.titulo }}</h2>
                    <p class="text-body-1 opacity-90 ma-0">Refina y perfecciona tus resultados</p>
                  </div>
                </div>
              </v-card-title>
            </div>
            
            <v-card-text class="pa-8">
              <v-alert 
                type="info" 
                border="left" 
                colored-border 
                elevation="4" 
                class="info-alert mb-8"
              >
                <div class="alert-content">
                  <v-icon color="info" size="24" class="mr-3">mdi-information</v-icon>
                  <span class="text-body-1">{{ contenido.contenido.filtros.descripcion }}</span>
                </div>
              </v-alert>

              <v-row>
                <v-col
                  v-for="(filtro, index) in contenido.contenido.filtros.filtros_recomendados"
                  :key="index"
                  cols="12"
                  sm="6"
                  lg="3"
                >
                  <v-card 
                    class="filter-card glass-card h-100" 
                    elevation="8" 
                    hover
                    :style="`animation-delay: ${index * 0.15}s`"
                  >
                    <div class="filter-header purple-gradient">
                      <v-card-title class="white--text text-center pa-4">
                        <div class="w-100">
                          <div class="filter-icon-container mb-2">
                            <v-icon size="36" color="white">
                              {{ getFilterIcon(index) }}
                            </v-icon>
                          </div>
                          <div class="text-h6 font-weight-bold">Filtro {{ index + 1 }}</div>
                        </div>
                      </v-card-title>
                    </div>
                    <v-card-text class="pa-4 text-center">
                      <p class="text-body-1 font-weight-medium ma-0">{{ filtro }}</p>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

    </v-container>

    <!-- Enhanced Floating Action Button -->
    <v-btn
      fab
      fixed
      bottom
      right
      color="primary"
      class="floating-btn"
      elevation="12"
      @click="scrollToTop"
      v-show="showFab"
    >
      <v-icon>mdi-arrow-up</v-icon>
    </v-btn>

    <!-- Progress Indicator -->
    <div class="progress-container" v-show="showProgress">
      <div class="progress-bar" :style="`width: ${scrollProgress}%`"></div>
    </div>
  </div>
</template>

<script>
import { useEstrategiasBusquedaStore } from '/stores/EstrategiasBusqueda'

export default {
  name: 'EstrategiasBusqueda',
  
  data() {
    return {
      activeTab: 0,
      showFab: false,
      showProgress: false,
      scrollProgress: 0,
      displayedSubtitle: '',
      showCursor: true,
      typewriterIndex: 0,
      
      stats: [
        { value: '5', label: 'Técnicas', icon: 'mdi-tools', color: 'primary' },
        { value: '3', label: 'Operadores', icon: 'mdi-logic-and', color: 'success' },
        { value: '100%', label: 'Efectividad', icon: 'mdi-chart-line', color: 'warning' }
      ],
      
      tabs: [
        { title: 'Palabras Clave', icon: 'mdi-key-variant' },
        { title: 'Sinónimos', icon: 'mdi-swap-horizontal' },
        { title: 'Operadores', icon: 'mdi-logic-and' },
        { title: 'Truncadores', icon: 'mdi-asterisk' },
        { title: 'Filtros', icon: 'mdi-filter-variant' }
      ],
      
      contenido: {
        modulo: '',
        objetivo: '',
        contenido: {
          palabras_clave: {
            titulo: '',
            definicion: '',
            como_identificarlas: [],
            ejemplo: {
              tema: '',
              palabras_clave: []
            }
          },
          sinonimos_terminos_relacionados: {
            titulo: '',
            importancia: '',
            tareas: [],
            ejemplo: {
              tecnologia: [],
              educacion_inclusiva: []
            }
          },
          operadores_booleanos: {
            titulo: '',
            descripcion: '',
            operadores: [],
            consejo: ''
          },
          truncadores_comodines: {
            titulo: '',
            truncadores: {
              descripcion: '',
              ejemplo: ''
            },
            comodines: {
              descripcion: '',
              ejemplo: ''
            },
            nota: ''
          },
          filtros: {
            titulo: '',
            descripcion: '',
            filtros_recomendados: []
          }
        }
      }
    }
  },

  computed: {
    titleWords() {
      return this.contenido.modulo.split(' ')
    },
    
    subtitleText() {
      return this.contenido.objetivo
    }
  },

  async mounted() {
    await this.loadContent()
    this.initializeAnimations()
    window.addEventListener('scroll', this.handleScroll)
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
    clearInterval(this.typewriterTimer)
    clearInterval(this.cursorTimer)
  },

  methods: {
    async loadContent() {
      const store = useEstrategiasBusquedaStore()
      await store.fetchEstrategiasBusqueda()
      this.contenido = {
        modulo: store.modulo,
        objetivo: store.objetivo,
        contenido: store.contenido
      }
    },

    initializeAnimations() {
      // Typewriter effect
      this.startTypewriter()
      // Cursor blinking
      this.cursorTimer = setInterval(() => {
        this.showCursor = !this.showCursor
      }, 530)
    },

    startTypewriter() {
      const text = this.subtitleText
      this.typewriterTimer = setInterval(() => {
        if (this.typewriterIndex < text.length) {
          this.displayedSubtitle += text.charAt(this.typewriterIndex)
          this.typewriterIndex++
        } else {
          clearInterval(this.typewriterTimer)
        }
      }, 80)
    },

    getOperatorColor(operator) {
      const colors = {
        'AND': 'success',
        'OR': 'warning',
        'NOT': 'primary'
      }
      return colors[operator] || 'primary'
    },

    getOperatorIcon(operator) {
      const icons = {
        'AND': 'mdi-logic-and',
        'OR': 'mdi-logic-or',
        'NOT': 'mdi-logic-not'
      }
      return icons[operator] || 'mdi-help-circle'
    },

    getFilterIcon(index) {
      const icons = [
        'mdi-calendar-range',
        'mdi-translate',
        'mdi-file-document',
        'mdi-tag-multiple'
      ]
      return icons[index] || 'mdi-filter'
    },

    handleScroll() {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      
      this.showFab = scrollTop > 300
      this.showProgress = scrollTop > 100
      this.scrollProgress = (scrollTop / docHeight) * 100
    },

    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style scoped>
/* Hero Section Styles */
.hero-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.hero-gradient::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(255,255,255,0.08) 0%, transparent 50%);
  animation: shimmer 8s ease-in-out infinite alternate;
}

@keyframes shimmer {
  0% { opacity: 0.5; }
  100% { opacity: 1; }
}

/* Floating Elements */
.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.floating-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
}

.circle-1 {
  width: 120px;
  height: 120px;
  top: 10%;
  left: 10%;
  animation: float 20s infinite ease-in-out;
}

.circle-2 {
  width: 80px;
  height: 80px;
  top: 60%;
  right: 15%;
  animation: float 25s infinite ease-in-out reverse;
}

.circle-3 {
  width: 60px;
  height: 60px;
  bottom: 20%;
  left: 20%;
  animation: float 30s infinite ease-in-out;
}

.floating-triangle {
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
}

.triangle-1 {
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  border-bottom: 52px solid rgba(255,255,255,0.08);
  top: 30%;
  right: 25%;
  animation: rotate 40s infinite linear;
}

.triangle-2 {
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 35px solid rgba(255,255,255,0.06);
  bottom: 30%;
  right: 10%;
  animation: rotate 35s infinite linear reverse;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Particles */
.particles-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: rgba(255,255,255,0.6);
  border-radius: 50%;
  animation: particle-float 15s infinite linear;
}

.particle:nth-child(odd) {
  animation-duration: 20s;
  animation-delay: -5s;
}

.particle:nth-child(even) {
  animation-duration: 25s;
  animation-delay: -10s;
}

.particle-1 { top: 10%; left: 10%; }
.particle-2 { top: 20%; left: 30%; }
.particle-3 { top: 30%; left: 50%; }
.particle-4 { top: 40%; left: 70%; }
.particle-5 { top: 50%; left: 90%; }
.particle-6 { top: 60%; left: 20%; }
.particle-7 { top: 70%; left: 40%; }
.particle-8 { top: 80%; left: 60%; }
.particle-9 { top: 90%; left: 80%; }
.particle-10 { top: 15%; left: 85%; }

@keyframes particle-float {
  0% { transform: translateY(0px) translateX(0px) scale(0); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-100vh) translateX(50px) scale(1); opacity: 0; }
}

/* Hero Content */
.hero-content {
  animation: fadeInUp 1s ease-out;
}

.hero-icon-container {
  position: relative;
  display: inline-block;
}

.icon-backdrop {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(20px);
  animation: pulse 3s ease-in-out infinite;
}

.hero-icon {
  position: relative;
  z-index: 2;
  animation: iconFloat 4s ease-in-out infinite;
}

.icon-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 160px;
  height: 160px;
  border: 2px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  animation: ripple 2s ease-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.05); }
}

@keyframes iconFloat {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(5deg); }
}

@keyframes ripple {
  0% { transform: translate(-50%, -50%) scale(0.8); opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(1.2); opacity: 0; }
}

/* Title Animation */
.title-word {
  display: inline-block;
  animation: titleSlide 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(50px);
  margin-right: 0.3em;
}

@keyframes titleSlide {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Typewriter Effect */
.typewriter {
  font-family: 'Courier New', monospace;
}

.cursor {
  font-weight: 100;
  color: rgba(255,255,255,0.8);
  animation: blink 1s infinite;
}

.cursor.blink {
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* Stats Cards */
.stat-card {
  border-radius: 16px !important;
  background: rgba(255,255,255,0.95) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.2);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  animation: statsSlideUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

.stat-card:hover {
  transform: translateY(-10px) scale(1.05);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15) !important;
}

.stat-content {
  position: relative;
  z-index: 2;
}

.stat-icon-bg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(103, 126, 234, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 8px;
}

.stat-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 16px;
}

.stat-card:hover .stat-glow {
  opacity: 0.1;
}

.stat-glow-primary { background: linear-gradient(45deg, #667eea, #764ba2); }
.stat-glow-success { background: linear-gradient(45deg, #4caf50, #2e7d32); }
.stat-glow-warning { background: linear-gradient(45deg, #ff9800, #f57c00); }

@keyframes statsSlideUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Tabs Styling */
.tabs-container {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0,0,0,0.1);
}

.modern-tabs {
  background: transparent !important;
}

.modern-tab {
  text-transform: none !important;
  font-weight: 500 !important;
  min-width: 140px !important;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.modern-tab:hover {
  background: rgba(103, 126, 234, 0.05);
}

.tab-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tab-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.tab-active .tab-icon-container {
  background: rgba(103, 126, 234, 0.1);
}

.tab-text {
  font-size: 0.875rem;
}

/* Content Transitions */
.tab-content-wrapper {
  min-height: 400px;
}

.content-transition {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.content-active {
  opacity: 1;
  transform: translateY(0);
}

/* Glass Effect Cards */
.glass-effect {
  background: rgba(255,255,255,0.95) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.2);
}

.glass-card {
  background: rgba(255,255,255,0.98) !important;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255,255,255,0.15);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  animation: cardSlideIn 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

.glass-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.1) !important;
}

@keyframes cardSlideIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Gradient Headers */
.primary-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.success-gradient {
  background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
}

.info-gradient {
  background: linear-gradient(135deg, #2196f3 0%, #1565c0 100%);
}

.warning-gradient {
  background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
}

.orange-gradient {
  background: linear-gradient(135deg, #ff5722 0%, #d84315 100%);
}

.blue-gradient {
  background: linear-gradient(135deg, #03a9f4 0%, #0277bd 100%);
}

.purple-gradient {
  background: linear-gradient(135deg, #9c27b0 0%, #6a1b9a 100%);
}

/* Header Content */
.header-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(10px);
}

/* Enhanced Alerts */
.info-alert,
.warning-alert,
.success-alert {
  border-radius: 12px !important;
  border-width: 3px !important;
  backdrop-filter: blur(10px);
}

.alert-content {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

/* Timeline Styling */
.modern-timeline {
  padding-left: 0;
}

.timeline-number {
  font-size: 12px;
  line-height: 1;
}

.timeline-card {
  margin-left: 16px;
  border-radius: 8px !important;
  border-left: 3px solid #4caf50;
  transition: all 0.2s ease;
}

.timeline-card:hover {
  transform: translateX(5px);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2) !important;
}

/* Sections and Chips */
.section-chip,
.group-chip {
  font-size: 0.875rem !important;
  height: 36px !important;
  font-weight: 600 !important;
}

.topic-card {
  background: linear-gradient(135deg, #f5f5f5 0%, #eeeeee 100%);
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.05);
}

/* Keywords and Tags */
.keywords-grid,
.synonyms-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.keyword-chip,
.synonym-tag {
  animation: chipSlideIn 0.5s ease-out forwards;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.2s ease;
}

.keyword-chip:hover,
.synonym-tag:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
}

@keyframes chipSlideIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Operator Cards */
.operator-card {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  animation: operatorSlideIn 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(40px);
}

.operator-card:hover {
  transform: translateY(-15px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15) !important;
}

.operator-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(10px);
  margin: 0 auto;
}

.operator-content {
  padding: 8px 0;
}

.example-container {
  display: flex;
  justify-content: center;
}

.example-chip {
  font-family: 'Courier New', monospace !important;
  font-size: 0.875rem !important;
  padding: 8px 16px !important;
  height: auto !important;
  white-space: nowrap;
}

@keyframes operatorSlideIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Feature Content */
.feature-content {
  padding: 8px 0;
}

.leading-relaxed {
  line-height: 1.7;
}

.example-showcase {
  background: rgba(0,0,0,0.02);
  border-radius: 8px;
  padding: 16px;
}

.example-label {
  display: flex;
  justify-content: center;
}

.example-alert {
  border-radius: 8px !important;
  margin: 0;
}

.example-code {
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  font-weight: 600;
  background: rgba(255,255,255,0.5);
  padding: 2px 6px;
  border-radius: 4px;
}

/* Filter Cards */
.filter-card {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  animation: filterSlideIn 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

.filter-card:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 12px 25px rgba(156, 39, 176, 0.2) !important;
}

.filter-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(10px);
  margin: 0 auto;
}

@keyframes filterSlideIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Task Items */
.task-item {
  border-radius: 8px;
  transition: all 0.2s ease;
  margin-bottom: 8px;
}

.task-item:hover {
  background: rgba(76, 175, 80, 0.05);
  transform: translateX(5px);
}

.task-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(76, 175, 80, 0.1);
}

/* Floating Action Button */
.floating-btn {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
}

.floating-btn:hover {
  transform: translateY(-3px) scale(1.1);
  box-shadow: 0 8px 25px rgba(103, 126, 234, 0.4) !important;
}

/* Progress Indicator */
.progress-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: rgba(255,255,255,0.1);
  z-index: 1000;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s ease;
  box-shadow: 0 0 10px rgba(103, 126, 234, 0.5);
}

/* Responsive Design */
@media (max-width: 1264px) {
  .hero-content {
    padding: 0 16px;
  }
  
  .header-content {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
}

@media (max-width: 960px) {
  .hero-gradient {
    min-height: 80vh;
  }
  
  .hero-title {
    font-size: 2.5rem !important;
    line-height: 1.2;
  }
  
  .hero-subtitle {
    font-size: 1.25rem !important;
  }
  
  .stat-card {
    margin: 4px !important;
  }
  
  .modern-tab {
    min-width: 100px !important;
  }
  
  .tab-text {
    display: none;
  }
}

@media (max-width: 600px) {
  .hero-title {
    font-size: 2rem !important;
  }
  
  .hero-subtitle {
    font-size: 1.1rem !important;
  }
  
  .hero-icon {
    font-size: 60px !important;
  }
  
  .icon-backdrop {
    width: 100px;
    height: 100px;
  }
  
  .icon-pulse {
    width: 120px;
    height: 120px;
  }
  
  .floating-circle,
  .floating-triangle {
    display: none;
  }
  
  .particles-container {
    display: none;
  }
}

/* Animation Utilities */
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

/* Smooth Scrolling */
html {
  scroll-behavior: smooth;
}

/* Selection Styling */
::selection {
  background: rgba(103, 126, 234, 0.3);
  color: inherit;
}

::-moz-selection {
  background: rgba(103, 126, 234, 0.3);
  color: inherit;
}
</style>