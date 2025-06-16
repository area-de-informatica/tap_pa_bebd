<!-- components/FloatingParticles.vue -->
<template>
    <div class="floating-particles">
        <div v-for="i in particleCount" :key="i" class="particle" :style="getParticleStyle(i)"></div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

// Props para personalizar las partículas
const props = defineProps({
    particleCount: {
        type: Number,
        default: 15
    }
})

// Colores temáticos para bases de datos
const databaseColors = [
    'rgba(21, 67, 96, 0.8)',    // Azul oscuro profesional
    'rgba(40, 116, 166, 0.7)',  // Azul medio
    'rgba(52, 152, 219, 0.6)',  // Azul claro
    'rgba(46, 204, 113, 0.5)',  // Verde datos
    'rgba(155, 89, 182, 0.4)',  // Púrpura sutil
]

// Estilos dinámicos para partículas flotantes
const getParticleStyle = (index) => {
    const delay = index * 0.5
    const duration = 8 + (index % 4)
    const size = 3 + (index % 6)
    const left = (index * 7) % 100

    // Seleccionar color basado en el índice de la partícula
    const colorIndex = index % databaseColors.length
    const particleColor = databaseColors[colorIndex]

    return {
        left: `${left}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        width: `${size}px`,
        height: `${size}px`,
        background: particleColor,
        boxShadow: `0 0 ${size * 2}px ${particleColor}`,
    }
}
</script>

<style scoped>
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
}

/* Animación mejorada para las partículas */
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
</style>