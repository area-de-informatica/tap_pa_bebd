<script setup>
import { ref, onMounted } from 'vue'
import { useNavegacionStore } from '~/stores/navegacion'

const navegacionStore = useNavegacionStore()
const loading = ref(true)

onMounted(async () => {
  await navegacionStore.fetchNavegacion()
  loading.value = false
})
</script>

<template>
  <div class="navegacion-container">
    <!-- Loading -->
    <div v-if="loading" class="loading-container">
      <v-progress-circular
        indeterminate
        color="primary"
        size="64"
      />
      <p class="loading-text">Cargando contenido...</p>
    </div>

    <!-- Contenido principal -->
    <div v-else class="content-wrapper">
      <!-- Header Section -->
      <div class="hero-section">
        <v-container>
          <v-row justify="center">
            <v-col cols="12" md="10" lg="8">
              <h1 class="hero-title">{{ navegacionStore.modulo }}</h1>
              <div class="hero-objective">
                <h2 class="objective-title">Objetivo</h2>
                <p class="objective-text">{{ navegacionStore.objetivo }}</p>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <!-- Introducción -->
      <section class="intro-section">
        <v-container>
          <v-row justify="center">
            <v-col cols="12" md="10" lg="8">
              <v-card class="intro-card elegant-card">
                <v-card-text>
                  <h3 class="section-title">Introducción</h3>
                  <p class="intro-text">{{ navegacionStore.introduccion }}</p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Fundamentos -->
      <section class="fundamentos-section">
        <v-container>
          <v-row>
            <v-col cols="12">
              <h3 class="section-header">Fundamentos de las Bases de Datos</h3>
            </v-col>
            
            <!-- Qué es -->
            <v-col cols="12" md="6">
              <v-card class="fundamento-card elegant-card">
                <v-card-text>
                  <h4 class="card-title">¿Qué es una Base de Datos?</h4>
                  <p class="card-text">{{ navegacionStore.fundamentos.que_es }}</p>
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Tipos -->
            <v-col cols="12" md="6">
              <v-card class="tipos-card elegant-card">
                <v-card-text>
                  <h4 class="card-title">Tipos de Bases de Datos</h4>
                  <div class="tipos-list">
                    <div 
                      v-for="tipo in navegacionStore.fundamentos.tipos" 
                      :key="tipo.tipo"
                      class="tipo-item"
                    >
                      <h5 class="tipo-titulo">{{ tipo.tipo }}</h5>
                      <p class="tipo-descripcion">{{ tipo.descripcion }}</p>
                      <div class="ejemplos">
                        <span class="ejemplos-label">Ejemplos:</span>
                        <span 
                          v-for="(ejemplo, index) in tipo.ejemplos" 
                          :key="ejemplo"
                          class="ejemplo-tag"
                        >
                          {{ ejemplo }}<span v-if="index < tipo.ejemplos.length - 1">, </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Estrategias de Búsqueda -->
      <section class="estrategias-section">
        <v-container>
          <v-row>
            <v-col cols="12">
              <h3 class="section-header">Estrategias de Búsqueda</h3>
            </v-col>
            
            <v-col 
              v-for="estrategia in navegacionStore.estrategias_busqueda" 
              :key="estrategia.paso"
              cols="12" 
              lg="6"
            >
              <v-card class="estrategia-card elegant-card">
                <v-card-text>
                  <div class="paso-header">
                    <span class="paso-numero">{{ estrategia.paso }}</span>
                    <h4 class="paso-titulo">{{ estrategia.titulo }}</h4>
                  </div>
                  <p class="paso-descripcion">{{ estrategia.descripcion }}</p>
                  
                  <!-- Operadores booleanos -->
                  <div v-if="estrategia.operadores" class="operadores-section">
                    <h5 class="subsection-title">Operadores:</h5>
                    <div class="operadores-grid">
                      <div 
                        v-for="op in estrategia.operadores" 
                        :key="op.operador"
                        class="operador-item"
                      >
                        <span class="operador-tag">{{ op.operador }}</span>
                        <span class="operador-explicacion">{{ op.explicacion }}</span>
                      </div>
                    </div>
                    <div class="ejemplo-code">
                      <strong>Ejemplo:</strong>
                      <code>{{ estrategia.ejemplo }}</code>
                    </div>
                  </div>

                  <!-- Truncamiento y comodines -->
                  <div v-if="estrategia.truncamiento" class="truncamiento-section">
                    <div class="truncamiento-item">
                      <h5 class="subsection-title">Truncamiento:</h5>
                      <p>{{ estrategia.truncamiento.descripcion }}</p>
                      <code>{{ estrategia.truncamiento.ejemplo }}</code>
                    </div>
                    <div class="comodines-item">
                      <h5 class="subsection-title">Comodines:</h5>
                      <p>{{ estrategia.comodines.descripcion }}</p>
                      <code>{{ estrategia.comodines.ejemplo }}</code>
                    </div>
                  </div>

                  <!-- Filtros -->
                  <div v-if="estrategia.filtros" class="filtros-section">
                    <h5 class="subsection-title">Filtros disponibles:</h5>
                    <div class="filtros-chips">
                      <span 
                        v-for="filtro in estrategia.filtros" 
                        :key="filtro"
                        class="filtro-chip"
                      >
                        {{ filtro }}
                      </span>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Criterios de Evaluación -->
      <section class="criterios-section">
        <v-container>
          <v-row>
            <v-col cols="12">
              <h3 class="section-header">Criterios de Evaluación</h3>
            </v-col>
            
            <v-col cols="12" md="6" lg="3" v-for="(criterio, key) in navegacionStore.criterios_evaluacion" :key="key">
              <v-card class="criterio-card elegant-card">
                <v-card-text>
                  <h4 class="criterio-titulo">{{ key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ') }}</h4>
                  <p class="criterio-descripcion">{{ criterio }}</p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- Documentación -->
      <section class="documentacion-section">
        <v-container>
          <v-row justify="center">
            <v-col cols="12" md="10" lg="8">
              <v-card class="documentacion-card elegant-card">
                <v-card-text>
                  <h3 class="section-title">Documentación de Búsqueda</h3>
                  <p class="documentacion-text">{{ navegacionStore.documentacion_busqueda }}</p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>
    </div>
  </div>
</template>

<style scoped>
.navegacion-container {
  min-height: 100vh;
  position: relative;
}

.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  gap: 1rem;
}

.loading-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  margin: 0;
}

.content-wrapper {
  padding: 2rem 0;
}

/* Hero Section */
.hero-section {
  padding: 3rem 0;
  text-align: center;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a; /* Cambiado a un gris muy oscuro */
  margin-bottom: 2rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-objective {
  background: rgba(26, 26, 26, 0.9); /* Fondo más oscuro */
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.objective-title {
  color: white;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.objective-text {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
}

/* Sections */
.intro-section,
.fundamentos-section,
.estrategias-section,
.criterios-section,
.documentacion-section {
  padding: 3rem 0;
}

.section-header {
  color: #2c3e50; /* Título de sección más oscuro */
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.section-title {
  color: #1a1a1a; /* Títulos de tarjetas más oscuros */
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

/* Cards - Fondo más oscuro */
.elegant-card {
  background: rgba(45, 45, 45, 0.95) !important; /* Fondo gris oscuro */
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  height: 100%;
}

.elegant-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  background: rgba(50, 50, 50, 0.98) !important;
}

/* Texto en las tarjetas - colores claros para contraste */
.elegant-card .section-title,
.elegant-card .card-title,
.elegant-card .criterio-titulo,
.elegant-card .paso-titulo {
  color: #ffffff !important; /* Títulos blancos */
}

.elegant-card .card-text,
.elegant-card .intro-text,
.elegant-card .documentacion-text,
.elegant-card .paso-descripcion,
.elegant-card .criterio-descripcion {
  color: #e0e0e0 !important; /* Texto gris claro */
}

/* IMPORTANTE: Evitar que el texto se opaque en hover */
.elegant-card:hover .v-card-text,
.elegant-card:hover .card-title,
.elegant-card:hover .card-text,
.elegant-card:hover p,
.elegant-card:hover h1,
.elegant-card:hover h2,
.elegant-card:hover h3,
.elegant-card:hover h4,
.elegant-card:hover h5,
.elegant-card:hover span {
  opacity: 1 !important;
}

/* Card Content */
.card-title {
  color: #ffffff;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.card-text,
.intro-text,
.documentacion-text {
  color: #e0e0e0;
  line-height: 1.6;
  font-size: 1rem;
  margin: 0;
}

/* Tipos de bases de datos */
.tipos-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.tipo-item {
  padding: 1rem;
  background: rgba(52, 152, 219, 0.2);
  border-radius: 10px;
  border-left: 4px solid #3498db;
}

.tipo-titulo {
  color: #5dade2; /* Azul más claro para contraste */
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.tipo-descripcion {
  color: #d5d8dc; /* Gris claro */
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

.ejemplos {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.ejemplos-label {
  font-weight: 600;
  color: #ffffff;
  font-size: 0.9rem;
}

.ejemplo-tag {
  color: #5dade2;
  font-weight: 500;
  font-size: 0.9rem;
}

/* Estrategias */
.paso-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.paso-numero {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.paso-titulo {
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
}

.paso-descripcion {
  color: #e0e0e0;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.subsection-title {
  color: #5dade2;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

/* Operadores */
.operadores-section {
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(52, 152, 219, 0.15);
  border-radius: 10px;
}

.operadores-grid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.operador-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.operador-tag {
  background: #3498db;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.85rem;
  min-width: 50px;
  text-align: center;
}

.operador-explicacion {
  color: #d5d8dc;
  font-size: 0.9rem;
}

.ejemplo-code {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
}

.ejemplo-code strong {
  color: #ffffff;
}

.ejemplo-code code {
  background: none;
  color: #e74c3c;
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 0.9rem;
  display: block;
  margin-top: 0.5rem;
}

/* Truncamiento */
.truncamiento-section {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.truncamiento-item,
.comodines-item {
  padding: 1rem;
  background: rgba(46, 204, 113, 0.2);
  border-radius: 10px;
  border-left: 4px solid #27ae60;
}

.truncamiento-item .subsection-title,
.comodines-item .subsection-title {
  color: #58d68d;
}

.truncamiento-item p,
.comodines-item p {
  color: #d5d8dc;
}

.truncamiento-item code,
.comodines-item code {
  background: rgba(39, 174, 96, 0.2);
  color: #58d68d;
  padding: 0.3rem 0.6rem;
  border-radius: 5px;
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 0.9rem;
  display: inline-block;
  margin-top: 0.5rem;
}

/* Filtros */
.filtros-section {
  margin-top: 1.5rem;
}

.filtros-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.filtro-chip {
  background: linear-gradient(135deg, #9b59b6, #8e44ad);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

/* Criterios */
.criterio-card {
  text-align: center;
}

.criterio-titulo {
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-transform: capitalize;
}

.criterio-descripcion {
  color: #e0e0e0;
  line-height: 1.5;
  font-style: italic;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .section-header {
    font-size: 1.5rem;
  }
  
  .paso-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .operador-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.3rem;
  }
  
  .truncamiento-section {
    gap: 0.5rem;
  }
}
</style>