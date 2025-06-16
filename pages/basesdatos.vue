<template>
  <v-container class="py-8">
    <!-- Loading con animación -->
    <div v-if="pending" class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">Cargando bases de datos...</p>
    </div>
    
    <div v-else class="content-wrapper">
      <!-- Header del Módulo -->
      <v-card
        class="enhanced-card mb-8 module-header-card"
        elevation="8"
        @mouseenter="onCardHover"
        @mouseleave="onCardLeave"
      >
        <div class="card-glow"></div>
        <v-card-title class="card-title">
          <span class="title-icon">🗄️</span>
          <span class="title-text">{{ modulo }}</span>
        </v-card-title>
        <v-card-subtitle class="card-subtitle">
          Fundamentos esenciales para el manejo de información
        </v-card-subtitle>
        <v-card-text class="card-content">
          <div class="objective-text">
            <span class="objective-label">Objetivo:</span>
            {{ objetivo }}
          </div>
        </v-card-text>
      </v-card>

      <!-- Definición -->
      <v-card
        class="enhanced-card mb-8 definition-card"
        elevation="8"
        @mouseenter="onCardHover"
        @mouseleave="onCardLeave"
      >
        <div class="card-glow"></div>
        <v-card-title class="card-title">
          <span class="title-icon">📖</span>
          <span class="title-text">{{ contenido.definicion.titulo }}</span>
        </v-card-title>
        <v-card-subtitle class="card-subtitle">
          Conceptos fundamentales que debes conocer
        </v-card-subtitle>
        <v-card-text class="card-content">
          <div class="definition-text">
            {{ contenido.definicion.descripcion }}
          </div>
        </v-card-text>
      </v-card>

      <!-- Comparación de Buscadores -->
      <v-card
        class="enhanced-card mb-8 comparison-card"
        elevation="8"
        @mouseenter="onCardHover"
        @mouseleave="onCardLeave"
      >
        <div class="card-glow"></div>
        <v-card-title class="card-title">
          <span class="title-icon">🔍</span>
          <span class="title-text">{{ contenido.comparacion_buscadores.titulo }}</span>
        </v-card-title>
        <v-card-subtitle class="card-subtitle">
          Análisis comparativo de herramientas de búsqueda
        </v-card-subtitle>
        <v-card-text class="card-content">
          <div class="comparison-grid">
            <div 
              v-for="(buscador, index) in contenido.comparacion_buscadores.comparativa" 
              :key="index"
              class="comparison-item"
              :style="{ animationDelay: `${index * 0.15}s` }"
            >
              <div class="comparison-header">
                <div class="comparison-icon">🔍</div>
                <h4 class="comparison-name">{{ buscador.nombre }}</h4>
              </div>
              <div class="comparison-details">
                <div class="detail-item">
                  <span class="detail-label">Tipo:</span>
                  <span class="detail-value">{{ buscador.tipo }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Características:</span>
                  <div class="characteristics-list">
                    <span 
                      v-for="(caracteristica, idx) in buscador.caracteristicas" 
                      :key="idx"
                      class="characteristic-tag"
                    >
                      {{ caracteristica }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <!-- Tipos de Bases de Datos -->
      <v-card
        class="enhanced-card mb-8 types-card"
        elevation="8"
        @mouseenter="onCardHover"
        @mouseleave="onCardLeave"
      >
        <div class="card-glow"></div>
        <v-card-title class="card-title">
          <span class="title-icon">🗂️</span>
          <span class="title-text">{{ contenido.tipos_bases_datos.titulo }}</span>
        </v-card-title>
        <v-card-subtitle class="card-subtitle">
          Clasificación y características principales
        </v-card-subtitle>
        <v-card-text class="card-content">
          <div class="types-grid">
            <div 
              v-for="(categoria, index) in contenido.tipos_bases_datos.categorias" 
              :key="index"
              class="type-category"
              :style="{ animationDelay: `${index * 0.2}s` }"
            >
              <div class="category-header">
                <div class="category-number">{{ index + 1 }}</div>
                <h4 class="category-title">{{ categoria.nombre }}</h4>
              </div>
              <p class="category-description">{{ categoria.descripcion }}</p>
              <div class="examples-section">
                <span class="examples-label">Ejemplos:</span>
                <div class="examples-list">
                  <span 
                    v-for="(ejemplo, idx) in categoria.ejemplos" 
                    :key="idx"
                    class="example-tag"
                  >
                    {{ ejemplo }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <!-- Acceso a Bases de Datos -->
      <v-card
        class="enhanced-card mb-8 access-card"
        elevation="8"
        @mouseenter="onCardHover"
        @mouseleave="onCardLeave"
      >
        <div class="card-glow"></div>
        <v-card-title class="card-title">
          <span class="title-icon">🔑</span>
          <span class="title-text">{{ contenido.acceso_bases_datos.titulo }}</span>
        </v-card-title>
        <v-card-subtitle class="card-subtitle">
          Métodos y formas de acceder a la información
        </v-card-subtitle>
        <v-card-text class="card-content">
          <div class="access-list">
            <div 
              v-for="(tipo, index) in contenido.acceso_bases_datos.tipos" 
              :key="index"
              class="access-item"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <div class="access-icon">🔓</div>
              <div class="access-content">
                <h4 class="access-title">{{ tipo.nombre }}</h4>
                <p class="access-description">{{ tipo.descripcion }}</p>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <!-- Importancia -->
      <v-card
        class="enhanced-card importance-card"
        elevation="8"
        @mouseenter="onCardHover"
        @mouseleave="onCardLeave"
      >
        <div class="card-glow"></div>
        <v-card-title class="card-title">
          <span class="title-icon">⭐</span>
          <span class="title-text">{{ contenido.importancia.titulo }}</span>
        </v-card-title>
        <v-card-subtitle class="card-subtitle">
          Por qué son fundamentales en el mundo actual
        </v-card-subtitle>
        <v-card-text class="card-content">
          <div class="importance-grid">
            <div 
              v-for="(razon, index) in contenido.importancia.razones" 
              :key="index"
              class="importance-item"
              :style="{ animationDelay: `${index * 0.12}s` }"
            >
              <div class="importance-number">{{ index + 1 }}</div>
              <div class="importance-content">
                <h4 class="importance-title">{{ razon.titulo }}</h4>
                <p class="importance-description">{{ razon.descripcion }}</p>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script setup>
import { useBasesDatosStore } from '@/stores/BasesDatos'
import { onMounted, ref } from 'vue'

const { modulo, objetivo, contenido, fetchBasesDatos } = useBasesDatosStore()
const pending = ref(true)

// Animaciones de hover para las tarjetas
const onCardHover = (event) => {
  const card = event.currentTarget
  const glow = card.querySelector('.card-glow')
  
  card.style.transform = 'translateY(-10px) scale(1.02)'
  card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)'
  
  if (glow) {
    glow.style.opacity = '1'
    glow.style.transform = 'scale(1.1)'
  }
}

const onCardLeave = (event) => {
  const card = event.currentTarget
  const glow = card.querySelector('.card-glow')
  
  card.style.transform = 'translateY(0) scale(1)'
  card.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)'
  
  if (glow) {
    glow.style.opacity = '0'
    glow.style.transform = 'scale(1)'
  }
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
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  color: white;
  font-size: 1.2rem;
  margin-top: 1rem;
  font-weight: 500;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Enhanced Cards */
.enhanced-card {
  position: relative;
  background: rgba(30, 30, 30, 0.9) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.enhanced-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #3498db, #9b59b6, #e74c3c, #f39c12);
  background-size: 300% 100%;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.card-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  opacity: 0;
  transition: all 0.4s ease;
  pointer-events: none;
}

/* Card Content Styling */
.card-title {
  display: flex;
  align-items: center;
  color: white !important;
  font-size: 1.5rem !important;
  font-weight: 700 !important;
  padding: 24px 24px 8px 24px !important;
}

.title-icon {
  font-size: 2rem;
  margin-right: 12px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.title-text {
  background: linear-gradient(135deg, #fff, #e0e0e0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.card-subtitle {
  color: rgba(255, 255, 255, 0.7) !important;
  font-size: 1rem !important;
  padding: 0 24px 16px 24px !important;
  font-weight: 400;
}

.card-content {
  color: rgba(255, 255, 255, 0.9) !important;
  font-size: 1rem !important;
  line-height: 1.6;
  padding: 0 24px 24px 24px !important;
}

/* Specific Card Colors */
.module-header-card::before {
  background: linear-gradient(90deg, #2c3e50, #3498db);
}

.definition-card::before {
  background: linear-gradient(90deg, #8e44ad, #3498db);
}

.comparison-card::before {
  background: linear-gradient(90deg, #e67e22, #f39c12);
}

.types-card::before {
  background: linear-gradient(90deg, #27ae60, #2ecc71);
}

.access-card::before {
  background: linear-gradient(90deg, #e74c3c, #c0392b);
}

.importance-card::before {
  background: linear-gradient(90deg, #f39c12, #d35400);
}

/* Module Header Styles */
.objective-text {
  background: rgba(255, 255, 255, 0.05);
  padding: 16px;
  border-radius: 8px;
  border-left: 3px solid #3498db;
}

.objective-label {
  font-weight: 600;
  color: #3498db;
  margin-right: 8px;
}

/* Definition Styles */
.definition-text {
  background: rgba(255, 255, 255, 0.05);
  padding: 16px;
  border-radius: 8px;
  border-left: 3px solid #8e44ad;
  line-height: 1.7;
}

/* Comparison Grid */
.comparison-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.comparison-item {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  animation: slideInUp 0.6s ease-out both;
}

.comparison-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.comparison-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.comparison-icon {
  font-size: 1.5rem;
  margin-right: 12px;
  background: linear-gradient(135deg, #e67e22, #f39c12);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.comparison-name {
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
}

.comparison-details {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-label {
  font-weight: 600;
  color: #f39c12;
  font-size: 0.9rem;
}

.detail-value {
  color: rgba(255, 255, 255, 0.9);
}

.characteristics-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.characteristic-tag {
  background: rgba(255, 255, 255, 0.1);
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Types Grid */
.types-grid {
  display: grid;
  gap: 20px;
}

.type-category {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  animation: slideInLeft 0.6s ease-out both;
}

.type-category:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(8px);
}

.category-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.category-number {
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1rem;
  margin-right: 16px;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(39, 174, 96, 0.3);
}

.category-title {
  color: white;
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;
}

.category-description {
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 16px 0;
  line-height: 1.6;
}

.examples-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.examples-label {
  font-weight: 600;
  color: #2ecc71;
  font-size: 0.9rem;
}

.examples-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.example-tag {
  background: rgba(46, 204, 113, 0.2);
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 0.9rem;
  color: #2ecc71;
  border: 1px solid rgba(46, 204, 113, 0.3);
  font-weight: 500;
}

/* Access List */
.access-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.access-item {
  display: flex;
  align-items: flex-start;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border-left: 3px solid #e74c3c;
  animation: slideInRight 0.6s ease-out both;
  transition: all 0.3s ease;
}

.access-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(-8px);
}

.access-icon {
  font-size: 1.8rem;
  margin-right: 16px;
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.access-content {
  flex: 1;
}

.access-title {
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.access-description {
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  line-height: 1.5;
}

/* Importance Grid */
.importance-grid {
  display: grid;
  gap: 16px;
}

.importance-item {
  display: flex;
  align-items: flex-start;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  animation: slideInUp 0.6s ease-out both;
}

.importance-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.importance-number {
  background: linear-gradient(135deg, #f39c12, #d35400);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1rem;
  margin-right: 16px;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(243, 156, 18, 0.3);
}

.importance-content {
  flex: 1;
}

.importance-title {
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.importance-description {
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  line-height: 1.5;
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
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 968px) {
  .comparison-grid {
    grid-template-columns: 1fr;
  }
  
  .type-category:hover {
    transform: translateY(-4px);
  }
  
  .access-item:hover {
    transform: translateY(-4px);
  }
}

@media (max-width: 768px) {
  .card-title {
    font-size: 1.3rem !important;
  }
  
  .title-icon {
    font-size: 1.5rem;
  }
  
  .comparison-item,
  .type-category,
  .access-item,
  .importance-item {
    padding: 16px;
  }
  
  .comparison-header,
  .category-header {
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }
  
  .comparison-icon,
  .category-number,
  .access-icon,
  .importance-number {
    margin: 0;
  }
}
</style>
