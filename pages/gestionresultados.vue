<template>
  <v-container class="py-8">
    <div v-if="pending" class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">Cargando módulo...</p>
    </div>

    <div v-else class="content-wrapper">
      <!-- Objetivo del módulo -->
      <v-card class="enhanced-card mb-8 objective-card" elevation="8" @mouseenter="onCardHover" @mouseleave="onCardLeave">
        <div class="card-glow"></div>
        <v-card-title class="card-title">
          <span class="title-icon">🎯</span>
          <span class="title-text">Objetivo del Módulo</span>
        </v-card-title>
        <v-card-subtitle class="card-subtitle">Meta principal de esta sección</v-card-subtitle>
        <v-card-text class="card-content">{{ data.objetivo }}</v-card-text>
      </v-card>

      <!-- Introducción -->
      <v-card class="enhanced-card mb-8 introduction-card" elevation="8" @mouseenter="onCardHover" @mouseleave="onCardLeave">
        <div class="card-glow"></div>
        <v-card-title class="card-title">
          <span class="title-icon">📖</span>
          <span class="title-text">Introducción</span>
        </v-card-title>
        <v-card-subtitle class="card-subtitle">Contexto general del módulo</v-card-subtitle>
        <v-card-text class="card-content">{{ data.introduccion }}</v-card-text>
      </v-card>

      <!-- Secciones del módulo -->
      <v-card v-for="(seccion, index) in data.secciones" :key="index" class="enhanced-card mb-8" elevation="8" @mouseenter="onCardHover" @mouseleave="onCardLeave">
        <div class="card-glow"></div>
        <v-card-title class="card-title">
          <span class="title-icon">📌</span>
          <span class="title-text">{{ seccion.titulo }}</span>
        </v-card-title>
        <v-card-subtitle class="card-subtitle">{{ seccion.descripcion }}</v-card-subtitle>
        <v-card-text class="card-content">
          <!-- Exportación -->
          <div v-if="seccion.exportacion_automatica">
            <strong>Exportación Automática:</strong>
            <ul>
              <li v-for="(item, i) in seccion.exportacion_automatica" :key="i">{{ item }}</li>
            </ul>
          </div>

          <div v-if="seccion.buenas_practicas">
            <strong>Buenas Prácticas:</strong>
            <ul>
              <li v-for="(item, i) in seccion.buenas_practicas" :key="i">{{ item }}</li>
            </ul>
          </div>

          <div v-if="seccion.principales_gestores">
            <strong>Principales Gestores:</strong>
            <ul>
              <li v-for="(gestor, i) in seccion.principales_gestores" :key="i">
                <strong>{{ gestor.nombre }}:</strong> {{ gestor.descripcion }}
              </li>
            </ul>
          </div>

          <div v-if="seccion.funciones_clave">
            <strong>Funciones Clave:</strong>
            <ul>
              <li v-for="(item, i) in seccion.funciones_clave" :key="i">{{ item }}</li>
            </ul>
          </div>

          <div v-if="seccion.citas_en_texto">
            <strong>Citas en el Texto:</strong>
            <ul>
              <li><strong>Narrativa:</strong> {{ seccion.citas_en_texto.narrativa.descripcion }}<br><em>{{ seccion.citas_en_texto.narrativa.ejemplo }}</em></li>
              <li><strong>Paréntetica:</strong> {{ seccion.citas_en_texto.parentetica.descripcion }}<br><em>{{ seccion.citas_en_texto.parentetica.ejemplo }}</em></li>
              <li><strong>Larga:</strong> {{ seccion.citas_en_texto.larga }}</li>
            </ul>
          </div>

          <div v-if="seccion.referencias_finales">
            <strong>Referencias Finales:</strong>
            <ul>
              <li v-for="(principio, i) in seccion.referencias_finales.principios" :key="i">{{ principio }}</li>
            </ul>
            <p><strong>Ejemplo:</strong> <em>{{ seccion.referencias_finales.ejemplo }}</em></p>
          </div>

          <div v-if="seccion.cambios_apa7">
            <strong>Cambios en APA 7ª edición:</strong>
            <ul>
              <li v-for="(item, i) in seccion.cambios_apa7" :key="i">{{ item }}</li>
            </ul>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const data = ref({})
const pending = ref(true)

onMounted(async () => {
  try {
    const res = await fetch('/api/gestion-resultados')
    data.value = await res.json()
  } catch (e) {
    console.error('Error cargando datos:', e)
  } finally {
    pending.value = false
  }
})

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
</script>

<style scoped>
@import "~/assets/styles/cards-shared.css"; /* Usa este si tienes un archivo global de estilos compartidos */

.content-wrapper {
  animation: fadeInUp 0.8s ease-out;
}

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
</style>
