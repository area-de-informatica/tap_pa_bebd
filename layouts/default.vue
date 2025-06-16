<template>
  <v-app class="animated-app" :style="{ background: currentGradient }">
    <!-- Barra de navegación con colores animados -->
    <v-app-bar 
      app 
      dark
      :style="{ 
        background: currentNavbarColor,
        transition: 'background 2s ease-in-out'
      }"
    >
      <v-spacer />
      <v-btn to="/" text>Inicio</v-btn>
      <v-btn to="/navegacion" text>Navegación</v-btn>
      <v-btn to="/estrategiasbusquedas" text>Estrategias</v-btn>
      <v-btn to="/basesdatos" text>Bases de Datos</v-btn>
      <v-btn to="/gestionresultados" text>Gestión de Resultados</v-btn>

      <v-btn to="/futuro" text>Futuro</v-btn>
    </v-app-bar>

    <!-- Contenido principal -->
    <v-main class="main-content">
      <div class="cursor-glow" ref="cursorGlow"></div>
      <div class="floating-particles">
        <div 
          v-for="i in 15" 
          :key="i" 
          class="particle" 
          :style="getParticleStyle(i)"
        ></div>
      </div>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const cursorGlow = ref(null)

// Gradientes que irán cambiando en todo el fondo
const gradients = [
  'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
  'linear-gradient(135deg, #8e44ad 0%, #3498db 100%)',
  'linear-gradient(135deg, #e74c3c 0%, #f39c12 100%)',
  'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
  'linear-gradient(135deg, #34495e 0%, #9b59b6 100%)',
  'linear-gradient(135deg, #16a085 0%, #f4d03f 100%)',
  'linear-gradient(135deg, #d35400 0%, #e67e22 100%)',
  'linear-gradient(135deg, #2980b9 0%, #6bb6ff 100%)'
]

// Colores sutiles para la barra de navegación que coordinan con los gradientes
const navbarColors = [
  'linear-gradient(90deg, rgba(44, 62, 80, 0.9) 0%, rgba(52, 152, 219, 0.8) 100%)',
  'linear-gradient(90deg, rgba(142, 68, 173, 0.9) 0%, rgba(52, 152, 219, 0.8) 100%)',
  'linear-gradient(90deg, rgba(231, 76, 60, 0.9) 0%, rgba(243, 156, 18, 0.8) 100%)',
  'linear-gradient(90deg, rgba(39, 174, 96, 0.9) 0%, rgba(46, 204, 113, 0.8) 100%)',
  'linear-gradient(90deg, rgba(52, 73, 94, 0.9) 0%, rgba(155, 89, 182, 0.8) 100%)',
  'linear-gradient(90deg, rgba(22, 160, 133, 0.9) 0%, rgba(244, 208, 63, 0.8) 100%)',
  'linear-gradient(90deg, rgba(211, 84, 0, 0.9) 0%, rgba(230, 126, 34, 0.8) 100%)',
  'linear-gradient(90deg, rgba(41, 128, 185, 0.9) 0%, rgba(107, 182, 255, 0.8) 100%)'
]

// Colores para las partículas que coordinan con cada tema
const particleColorSets = [
  // Azul clásico
  ['rgba(52, 152, 219, 0.8)', 'rgba(44, 62, 80, 0.7)', 'rgba(174, 214, 241, 0.6)'],
  // Púrpura-azul
  ['rgba(142, 68, 173, 0.8)', 'rgba(52, 152, 219, 0.7)', 'rgba(187, 143, 206, 0.6)'],
  // Rojo-naranja
  ['rgba(231, 76, 60, 0.8)', 'rgba(243, 156, 18, 0.7)', 'rgba(245, 183, 177, 0.6)'],
  // Verde
  ['rgba(39, 174, 96, 0.8)', 'rgba(46, 204, 113, 0.7)', 'rgba(169, 223, 191, 0.6)'],
  // Gris-púrpura
  ['rgba(52, 73, 94, 0.8)', 'rgba(155, 89, 182, 0.7)', 'rgba(195, 155, 211, 0.6)'],
  // Turquesa-amarillo
  ['rgba(22, 160, 133, 0.8)', 'rgba(244, 208, 63, 0.7)', 'rgba(162, 217, 206, 0.6)'],
  // Naranja
  ['rgba(211, 84, 0, 0.8)', 'rgba(230, 126, 34, 0.7)', 'rgba(245, 176, 65, 0.6)'],
  // Azul cielo
  ['rgba(41, 128, 185, 0.8)', 'rgba(107, 182, 255, 0.7)', 'rgba(174, 214, 241, 0.6)']
]

let gradientIndex = 0
let gradientInterval = null
let mouseX = 0
let mouseY = 0

const currentGradient = ref(gradients[0])
const currentNavbarColor = ref(navbarColors[0])
const currentParticleColors = ref(particleColorSets[0])

// Cambiar gradientes automáticamente
const startGradientAnimation = () => {
  gradientInterval = setInterval(() => {
    gradientIndex = (gradientIndex + 1) % gradients.length
    currentGradient.value = gradients[gradientIndex]
    currentNavbarColor.value = navbarColors[gradientIndex]
    currentParticleColors.value = particleColorSets[gradientIndex]
  }, 4000) // Cambia cada 4 segundos
}

// Efecto de brillo que sigue el cursor
const updateCursorGlow = (event) => {
  mouseX = event.clientX
  mouseY = event.clientY
  
  if (cursorGlow.value) {
    cursorGlow.value.style.left = `${mouseX - 150}px`
    cursorGlow.value.style.top = `${mouseY - 150}px`
  }
}

// Estilos dinámicos para partículas flotantes con colores cambiantes
const getParticleStyle = (index) => {
  const delay = index * 0.5
  const duration = 8 + (index % 4)
  const size = 4 + (index % 8)
  const left = (index * 7) % 100
  
  // Seleccionar color basado en el índice de la partícula
  const colorIndex = index % currentParticleColors.value.length
  const particleColor = currentParticleColors.value[colorIndex]
  
  return {
    left: `${left}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    width: `${size}px`,
    height: `${size}px`,
    background: particleColor,
    boxShadow: `0 0 ${size * 2}px ${particleColor}`,
    transition: 'all 2s ease-in-out'
  }
}

onMounted(() => {
  startGradientAnimation()
  document.addEventListener('mousemove', updateCursorGlow)
})

onUnmounted(() => {
  if (gradientInterval) {
    clearInterval(gradientInterval)
  }
  document.removeEventListener('mousemove', updateCursorGlow)
})
</script>

<style scoped>
.animated-app {
  transition: background 2s ease-in-out;
  min-height: 100vh;
}

.main-content {
  position: relative;
  overflow: hidden;
}

.cursor-glow {
  position: fixed;
  width: 300px;
  height: 300px;
  pointer-events: none;
  z-index: 1000;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 255, 255, 0.15) 30%,
    rgba(255, 255, 255, 0.05) 60%,
    transparent 100%
  );
  border-radius: 50%;
  transition: all 0.2s ease;
  filter: blur(1px);
}

.floating-particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.particle {
  position: absolute;
  border-radius: 50%;
  animation: float infinite ease-in-out;
  /* El color y box-shadow se definen dinámicamente en JavaScript */
  transition: all 2s ease-in-out;
}

/* Animación mejorada con más variaciones */
@keyframes float {
  0% {
    transform: translateY(100vh) rotate(0deg) scale(0.5);
    opacity: 0;
  }
  10% {
    opacity: 1;
    transform: translateY(90vh) rotate(36deg) scale(1);
  }
  25% {
    transform: translateY(75vh) rotate(90deg) scale(0.8);
  }
  50% {
    transform: translateY(50vh) rotate(180deg) scale(1.2);
  }
  75% {
    transform: translateY(25vh) rotate(270deg) scale(0.9);
  }
  90% {
    opacity: 1;
    transform: translateY(10vh) rotate(324deg) scale(1);
  }
  100% {
    transform: translateY(-100px) rotate(360deg) scale(0.3);
    opacity: 0;
  }
}

/* Efecto de ondas en el fondo */
.main-content::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%);
  animation: wave 6s ease-in-out infinite;
  pointer-events: none;
  z-index: 0;
}

.main-content::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  animation: wave 8s ease-in-out infinite reverse;
  pointer-events: none;
  z-index: 0;
}

@keyframes wave {
  0%, 100% {
    transform: scale(1) rotate(0deg);
    opacity: 0.3;
  }
  33% {
    transform: scale(1.1) rotate(120deg);
    opacity: 0.5;
  }
  66% {
    transform: scale(0.9) rotate(240deg);
    opacity: 0.4;
  }
}

/* Asegurar que el contenido esté por encima de los efectos */
:deep(.v-main__wrap) {
  position: relative;
  z-index: 100;
  backdrop-filter: blur(0.5px);
}

/* Efecto glassmorphism sutil en el contenido */
:deep(.v-card) {
  background: rgba(255, 255, 255, 0.85) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Animación de aparición suave para el contenido */
:deep(.v-main__wrap > *) {
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
</style>