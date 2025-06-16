<template>
  <v-container class="py-8">
    <!-- Loading con animación -->
    <div v-if="pending" class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">Cargando inicio...</p>
    </div>
    
    <div v-else class="content-wrapper">
      <!-- Objetivo General -->
      <v-card
        class="enhanced-card mb-8 objective-card"
        elevation="8"
        @mouseenter="onCardHover"
        @mouseleave="onCardLeave"
      >
        <div class="card-glow"></div>
        <v-card-title class="card-title">
          <span class="title-icon">🎯</span>
          <span class="title-text">Objetivo General</span>
        </v-card-title>
        <v-card-subtitle class="card-subtitle">
          Propósito principal del OVA
        </v-card-subtitle>
        <v-card-text class="card-content">
          {{ inicio.objetivo_general }}
        </v-card-text>
      </v-card>

      <!-- Público Objetivo -->
      <v-card
        class="enhanced-card mb-8 audience-card"
        elevation="8"
        @mouseenter="onCardHover"
        @mouseleave="onCardLeave"
      >
        <div class="card-glow"></div>
        <v-card-title class="card-title">
          <span class="title-icon">👥</span>
          <span class="title-text">Público Objetivo</span>
        </v-card-title>
        <v-card-subtitle class="card-subtitle">
          Usuarios a quienes está dirigido
        </v-card-subtitle>
        <v-card-text class="card-content">
          <div class="audience-list">
            <div 
              v-for="(item, index) in inicio.publico_objetivo" 
              :key="index"
              class="audience-item"
              :style="{ animationDelay: `${index * 0.2}s` }"
            >
              <span class="bullet">•</span>
              <span>{{ item }}</span>
            </div>
          </div>
        </v-card-text>
      </v-card>

      <!-- Requisitos Previos -->
      <v-card
        class="enhanced-card mb-8 requirements-card"
        elevation="8"
        @mouseenter="onCardHover"
        @mouseleave="onCardLeave"
      >
        <div class="card-glow"></div>
        <v-card-title class="card-title">
          <span class="title-icon">📌</span>
          <span class="title-text">Requisitos Previos</span>
        </v-card-title>
        <v-card-subtitle class="card-subtitle">
          Conocimientos necesarios antes de comenzar
        </v-card-subtitle>
        <v-card-text class="card-content">
          {{ inicio.requisitos_previos }}
        </v-card-text>
      </v-card>

      <!-- Estructura del OVA -->
      <v-card
        class="enhanced-card structure-card"
        elevation="8"
        @mouseenter="onCardHover"
        @mouseleave="onCardLeave"
      >
        <div class="card-glow"></div>
        <v-card-title class="card-title">
          <span class="title-icon">📚</span>
          <span class="title-text">Estructura del OVA</span>
        </v-card-title>
        <v-card-subtitle class="card-subtitle">
          Cómo se organiza este objeto virtual de aprendizaje
        </v-card-subtitle>
        <v-card-text class="card-content">
          <p class="description-text mb-6">{{ estructura_ova.descripcion }}</p>
          
          <div class="routes-grid">
            <div 
              v-for="ruta in estructura_ova.rutas_aprendizaje" 
              :key="ruta.numero"
              class="route-item"
              :style="{ animationDelay: `${ruta.numero * 0.1}s` }"
            >
              <div class="route-number">{{ ruta.numero }}</div>
              <div class="route-content">
                <h4 class="route-title">{{ ruta.titulo }}</h4>
                <p class="route-description">{{ ruta.descripcion }}</p>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script setup>
import { useInicioStore } from '@/stores/inicio'
import { onMounted, ref } from 'vue'

const { inicio, estructura_ova, fetchInicio } = useInicioStore()
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
  await fetchInicio()
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
.objective-card::before {
  background: linear-gradient(90deg, #3498db, #2ecc71);
}

.audience-card::before {
  background: linear-gradient(90deg, #9b59b6, #e74c3c);
}

.requirements-card::before {
  background: linear-gradient(90deg, #f39c12, #e67e22);
}

.structure-card::before {
  background: linear-gradient(90deg, #1abc9c, #3498db);
}

/* Audience List */
.audience-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.audience-item {
  display: flex;
  align-items: center;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border-left: 3px solid #9b59b6;
  animation: slideInLeft 0.6s ease-out both;
  transition: all 0.3s ease;
}

.audience-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(8px);
}

.bullet {
  color: #9b59b6;
  font-size: 1.5rem;
  margin-right: 12px;
  font-weight: bold;
}

/* Routes Grid */
.description-text {
  background: rgba(255, 255, 255, 0.05);
  padding: 16px;
  border-radius: 8px;
  border-left: 3px solid #1abc9c;
}

.routes-grid {
  display: grid;
  gap: 16px;
}

.route-item {
  display: flex;
  align-items: flex-start;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  animation: slideInUp 0.6s ease-out both;
}

.route-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.route-number {
  background: linear-gradient(135deg, #1abc9c, #3498db);
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
  box-shadow: 0 4px 12px rgba(26, 188, 156, 0.3);
}

.route-content {
  flex: 1;
}

.route-title {
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.route-description {
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
@media (max-width: 768px) {
  .card-title {
    font-size: 1.3rem !important;
  }
  
  .title-icon {
    font-size: 1.5rem;
  }
  
  .route-item {
    flex-direction: column;
    text-align: center;
  }
  
  .route-number {
    margin: 0 0 12px 0;
  }
}
</style>