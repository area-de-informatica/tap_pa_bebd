<template>
  <v-container class="py-8">
    <!-- Loading con animación -->
    <div v-if="pending" class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">Cargando bases de datos...</p>
    </div>
    
    <div v-else class="content-wrapper">
      <!-- Hero Section del Módulo -->
      <section class="hero-module-section mb-12">
        <v-container fluid class="pa-0">
          <div class="hero-module-content">
            <v-container>
              <v-row justify="center" align="center" class="min-height-hero">
                <v-col cols="12" md="10" class="text-center">
                  <v-fade-transition appear>
                    <div>
                      <h1 class="display-1 font-weight-bold text-white mb-4">
                        <span class="module-title">{{ modulo }}</span>
                      </h1>
                      <p class="headline text-white mb-6 font-weight-light opacity-90">
                        Fundamentos esenciales para el manejo de información
                      </p>
                      <div class="objective-banner">
                        <div class="objective-content">
                          <v-icon color="white" size="large" class="mr-3">mdi-target</v-icon>
                          <span class="objective-text">{{ objetivo }}</span>
                        </div>
                      </div>
                    </div>
                  </v-fade-transition>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-container>
      </section>

      <!-- Definición con diseño atractivo -->
      <v-row justify="center" class="mb-12">
        <v-col cols="12" md="10">
          <v-card elevation="8" class="definition-card rounded-xl">
            <div class="card-header-gradient">
              <v-card-title class="card-title-modern">
                <div class="title-icon-container">
                  <v-icon size="40" color="white">mdi-book-open-page-variant</v-icon>
                </div>
                <div>
                  <h2 class="title-main">{{ contenido.definicion.titulo }}</h2>
                  <p class="title-sub">Conceptos fundamentales que debes conocer</p>
                </div>
              </v-card-title>
            </div>
            <v-card-text class="pa-8">
              <div class="definition-content">
                <p class="definition-text">{{ contenido.definicion.descripcion }}</p>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Comparación de Buscadores - Diseño Creativo -->
      <section class="comparison-section mb-12">
        <v-container>
          <div class="section-header text-center mb-8">
            <h2 class="section-title">{{ contenido.comparacion_buscadores.titulo }}</h2>
            <p class="section-subtitle">Análisis comparativo de herramientas de búsqueda</p>
            <div class="section-divider"></div>
          </div>
          
          <v-row>
            <v-col 
              v-for="(buscador, index) in contenido.comparacion_buscadores.comparativa" 
              :key="index"
              cols="12" 
              md="6" 
              lg="4"
              class="d-flex"
            >
              <v-card 
                elevation="6" 
                class="comparison-card-modern rounded-xl flex-grow-1"
                :style="{ animationDelay: `${index * 0.15}s` }"
              >
                <div class="comparison-card-header" :class="`bg-gradient-${index % 3 + 1}`">
                  <div class="comparison-icon-modern">
                    <v-icon size="32" color="white">mdi-magnify</v-icon>
                  </div>
                  <h3 class="comparison-title-modern">{{ buscador.nombre }}</h3>
                </div>
                
                <v-card-text class="pa-6">
                  <div class="comparison-content-modern">
                    <div class="type-badge">
                      <v-chip 
                        :color="getTypeColor(index)" 
                        variant="elevated" 
                        size="small"
                        class="mb-4"
                      >
                        {{ buscador.tipo }}
                      </v-chip>
                    </div>
                    
                    <div class="characteristics-section">
                      <h4 class="characteristics-title">Características principales:</h4>
                      <div class="characteristics-grid">
                        <div 
                          v-for="(caracteristica, idx) in buscador.caracteristicas" 
                          :key="idx"
                          class="characteristic-item"
                        >
                          <v-icon size="16" color="success" class="mr-2">mdi-check-circle</v-icon>
                          <span>{{ caracteristica }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Tipos de Bases de Datos - Diseño Timeline -->
      <section class="types-section mb-12">
        <v-card elevation="8" class="types-container rounded-xl">
          <div class="types-header">
            <v-card-title class="types-title-section">
              <v-icon size="48" color="white" class="mr-4">mdi-database</v-icon>
              <div>
                <h2 class="types-main-title">{{ contenido.tipos_bases_datos.titulo }}</h2>
                <p class="types-subtitle">Clasificación y características principales</p>
              </div>
            </v-card-title>
          </div>
          
          <v-card-text class="pa-0">
            <div class="timeline-container">
              <div 
                v-for="(categoria, index) in contenido.tipos_bases_datos.categorias" 
                :key="index"
                class="timeline-item"
                :class="{ 'timeline-item-reverse': index % 2 === 1 }"
                :style="{ animationDelay: `${index * 0.2}s` }"
              >
                <div class="timeline-marker">
                  <div class="timeline-number">{{ index + 1 }}</div>
                </div>
                
                <div class="timeline-content">
                  <v-card elevation="4" class="timeline-card rounded-lg">
                    <v-card-title class="timeline-card-title">
                      <h3>{{ categoria.nombre }}</h3>
                    </v-card-title>
                    <v-card-text class="timeline-card-content">
                      <p class="category-description-modern">{{ categoria.descripcion }}</p>
                      
                      <div class="examples-section-modern">
                        <h5 class="examples-title-modern">Ejemplos destacados:</h5>
                        <div class="examples-chips">
                          <v-chip 
                            v-for="(ejemplo, idx) in categoria.ejemplos" 
                            :key="idx"
                            :color="getExampleColor(index)"
                            variant="elevated"
                            size="small"
                            class="mr-2 mb-2"
                          >
                            {{ ejemplo }}
                          </v-chip>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </section>

      <!-- Acceso a Bases de Datos - Diseño Modular -->
      <section class="access-section mb-12">
        <div class="section-header text-center mb-8">
          <h2 class="section-title">{{ contenido.acceso_bases_datos.titulo }}</h2>
          <p class="section-subtitle">Métodos y formas de acceder a la información</p>
          <div class="section-divider"></div>
        </div>
        
        <v-row>
          <v-col 
            v-for="(tipo, index) in contenido.acceso_bases_datos.tipos" 
            :key="index"
            cols="12" 
            md="6"
            class="d-flex"
          >
            <v-card 
              elevation="6" 
              class="access-card-modern rounded-xl flex-grow-1"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <div class="access-card-top">
                <div class="access-icon-container" :class="`bg-access-${index % 4 + 1}`">
                  <v-icon size="40" color="white">mdi-key-variant</v-icon>
                </div>
              </div>
              
              <v-card-text class="pa-6">
                <h3 class="access-title-modern">{{ tipo.nombre }}</h3>
                <p class="access-description-modern">{{ tipo.descripcion }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </section>

      <!-- Importancia - Diseño Grid Interactivo -->
      <section class="importance-section">
        <v-card elevation="12" class="importance-container rounded-xl">
          <div class="importance-header">
            <v-card-title class="importance-title-section">
              <v-icon size="48" color="white" class="mr-4">mdi-star-circle</v-icon>
              <div>
                <h2 class="importance-main-title">{{ contenido.importancia.titulo }}</h2>
                <p class="importance-subtitle">Por qué son fundamentales en el mundo actual</p>
              </div>
            </v-card-title>
          </div>
          
          <v-card-text class="pa-8">
            <v-row>
              <v-col 
                v-for="(razon, index) in contenido.importancia.razones" 
                :key="index"
                cols="12" 
                md="6" 
                lg="4"
                class="d-flex"
              >
                <v-card 
                  elevation="4" 
                  class="importance-card-modern rounded-lg flex-grow-1"
                  :style="{ animationDelay: `${index * 0.12}s` }"
                >
                  <v-card-text class="pa-6 text-center">
                    <div class="importance-icon-container" :class="`bg-importance-${index % 6 + 1}`">
                      <span class="importance-number">{{ index + 1 }}</span>
                    </div>
                    <h4 class="importance-card-title">{{ razon.titulo }}</h4>
                    <p class="importance-card-description">{{ razon.descripcion }}</p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </section>
    </div>
  </v-container>
</template>

<script setup>
import { useBasesDatosStore } from '/stores/BasesDatos'
import { onMounted, ref } from 'vue'

const { modulo, objetivo, contenido, fetchBasesDatos } = useBasesDatosStore()
const pending = ref(true)

// Función para obtener colores por tipo
const getTypeColor = (index) => {
  const colors = ['primary', 'success', 'info', 'warning', 'error', 'purple']
  return colors[index % colors.length]
}

const getExampleColor = (index) => {
  const colors = ['info', 'success', 'warning', 'primary', 'purple', 'teal']
  return colors[index % colors.length]
}

onMounted(async () => {
  await fetchBasesDatos()
  pending.value = false
})
</script>

<style scoped>
.content-wrapper {
  animation: fadeInUp 0.8s ease-out;
}

/* Hero Section */
.hero-module-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
  border-radius: 0 0 2rem 2rem;
}

.hero-module-section::before {
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

.hero-module-content {
  position: relative;
  z-index: 1;
}

.min-height-hero {
  min-height: 50vh;
}

.module-title {
  font-size: 3.5rem;
  font-weight: 900;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  background: linear-gradient(45deg, #ffffff, #e3f2fd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.objective-banner {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 20px 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 800px;
  margin: 0 auto;
}

.objective-content {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
}

.objective-text {
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 1.5;
}

/* Loading Animation */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(102, 126, 234, 0.3);
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  color: #667eea;
  font-size: 1.2rem;
  margin-top: 1rem;
  font-weight: 500;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Definition Card */
.definition-card {
  background: white;
  overflow: hidden;
  border: 1px solid rgba(102, 126, 234, 0.1);
}

.card-header-gradient {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  padding: 0;
}

.card-title-modern {
  display: flex;
  align-items: center;
  padding: 30px;
  color: white;
}

.title-icon-container {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  padding: 15px;
  margin-right: 20px;
}

.title-main {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.title-sub {
  font-size: 1rem;
  opacity: 0.9;
  margin: 5px 0 0 0;
  font-weight: 400;
}

.definition-content {
  background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
  border-radius: 12px;
  padding: 25px;
  border-left: 4px solid #4facfe;
}

.definition-text {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #2c3e50;
  margin: 0;
}

/* Section Headers */
.section-header {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.section-subtitle {
  font-size: 1.2rem;
  color: #7f8c8d;
  font-weight: 400;
}

.section-divider {
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px;
  margin: 1rem auto;
}

/* Comparison Section */
.comparison-section {
  background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
  padding: 4rem 0;
  border-radius: 2rem;
}

.comparison-card-modern {
  background: white;
  overflow: hidden;
  transition: all 0.3s ease;
  animation: slideInUp 0.6s ease-out both;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.comparison-card-modern:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1) !important;
}

.comparison-card-header {
  padding: 25px;
  text-align: center;
  position: relative;
}

.bg-gradient-1 { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.bg-gradient-2 { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
.bg-gradient-3 { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }

.comparison-icon-modern {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  padding: 15px;
  display: inline-flex;
  margin-bottom: 15px;
}

.comparison-title-modern {
  color: white;
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.comparison-content-modern {
  height: 100%;
}

.type-badge {
  text-align: center;
}

.characteristics-section {
  margin-top: 1rem;
}

.characteristics-title {
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.characteristics-grid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.characteristic-item {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #555;
}

/* Types Section - Timeline */
.types-container {
  background: white;
  overflow: hidden;
}

.types-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0;
}

.types-title-section {
  display: flex;
  align-items: center;
  padding: 30px;
  color: white;
}

.types-main-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.types-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 5px 0 0 0;
  font-weight: 400;
}

.timeline-container {
  position: relative;
  padding: 3rem 1rem;
}

.timeline-container::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, #667eea, #764ba2);
  transform: translateX(-50%);
}

.timeline-item {
  display: flex;
  align-items: center;
  margin-bottom: 3rem;
  animation: slideInLeft 0.6s ease-out both;
}

.timeline-item-reverse {
  flex-direction: row-reverse;
  animation: slideInRight 0.6s ease-out both;
}

.timeline-marker {
  position: relative;
  z-index: 2;
  margin: 0 2rem;
}

.timeline-number {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.timeline-content {
  flex: 1;
  max-width: 400px;
}

.timeline-card {
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.timeline-card-title {
  background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.timeline-card-title h3 {
  color: #2c3e50;
  font-weight: 600;
  margin: 0;
}

.timeline-card-content {
  padding: 20px;
}

.category-description-modern {
  color: #555;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.examples-section-modern {
  margin-top: 1rem;
}

.examples-title-modern {
  font-size: 0.9rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.examples-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

/* Access Section */
.access-section {
  padding: 2rem 0;
}

.access-card-modern {
  background: white;
  overflow: hidden;
  transition: all 0.3s ease;
  animation: slideInUp 0.6s ease-out both;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.access-card-modern:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1) !important;
}

.access-card-top {
  padding: 20px 20px 0 20px;
  text-align: center;
}

.access-icon-container {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.bg-access-1 { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.bg-access-2 { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
.bg-access-3 { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }
.bg-access-4 { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); }

.access-title-modern {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1rem;
  text-align: center;
}

.access-description-modern {
  color: #555;
  line-height: 1.6;
  text-align: center;
}

/* Importance Section */
.importance-container {
  background: white;
  overflow: hidden;
}

.importance-header {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  padding: 0;
}

.importance-title-section {
  display: flex;
  align-items: center;
  padding: 30px;
  color: white;
}

.importance-main-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.importance-subtitle {
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 5px 0 0 0;
  font-weight: 400;
}

.importance-card-modern {
  background: white;
  transition: all 0.3s ease;
  animation: slideInUp 0.6s ease-out both;
  border: 1px solid rgba(0, 0, 0, 0.05);
  height: 100%;
}

.importance-card-modern:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1) !important;
}

.importance-icon-container {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-weight: bold;
  font-size: 1.2rem;
  color: white;
}

.bg-importance-1 { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.bg-importance-2 { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }
.bg-importance-3 { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); }
.bg-importance-4 { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); }
.bg-importance-5 { background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); }
.bg-importance-6 { background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); }

.importance-number {
  font-size: 1.2rem;
}

.importance-card-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 1rem 0 0.5rem 0;
}

.importance-card-description {
  color: #555;
  line-height: 1.6;
  font-size: 0.95rem;
}

/* Animations */
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

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .module-title {
    font-size: 2.5rem;
  }
  
  .objective-banner {
    padding: 15px 20px;
  }
  
  .objective-content {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .timeline-container::before {
    left: 30px;
  }
  
  .timeline-item,
  .timeline-item-reverse {
    flex-direction: row;
  }
  
  .timeline-marker {
    margin: 0 1rem 0 0;
  }
  
  .timeline-content {
    max-width: none;
  }
  
  .card-title-modern {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }
  
  .title-icon-container {
    margin-right: 0;
  }
  
  .types-title-section,
  .importance-title-section {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }
  
  .types-main-title,
  .importance-main-title {
    font-size: 1.5rem;
  }
  
  .comparison-card-modern {
    margin-bottom: 1rem;
  }
  
  .access-card-modern {
    margin-bottom: 1rem;
  }
  
  .importance-card-modern {
    margin-bottom: 1rem;
  }
  
  .hero-module-section {
    border-radius: 0 0 1rem 1rem;
  }
  
  .definition-content {
    padding: 20px;
  }
  
  .comparison-section {
    padding: 2rem 0;
  }
  
  .timeline-container {
    padding: 2rem 1rem;
  }
  
  .timeline-number {
    width: 50px;
    height: 50px;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .module-title {
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 1.7rem;
  }
  
  .title-main {
    font-size: 1.5rem;
  }
  
  .types-main-title,
  .importance-main-title {
    font-size: 1.3rem;
  }
  
  .objective-text {
    font-size: 1rem;
  }
  
  .definition-text {
    font-size: 1rem;
  }
  
  .comparison-title-modern {
    font-size: 1.2rem;
  }
  
  .access-title-modern {
    font-size: 1.1rem;
  }
  
  .importance-card-title {
    font-size: 1.1rem;
  }
  
  .timeline-card-content,
  .access-card-modern .v-card-text,
  .importance-card-modern .v-card-text {
    padding: 15px;
  }
  
  .card-title-modern,
  .types-title-section,
  .importance-title-section {
    padding: 20px;
  }
  
  .definition-content {
    padding: 15px;
  }
}
</style>