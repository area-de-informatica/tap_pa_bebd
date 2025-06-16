<!-- components/BackgroundEffects.vue -->
<template>
    <div class="background-effects">
        <div class="wave-effect wave-1"></div>
        <div class="wave-effect wave-2"></div>
        <div class="data-grid"></div>
    </div>
</template>

<script setup>
// No necesita lógica adicional
</script>

<style scoped>
.background-effects {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
}

/* Efecto de ondas sutiles */
.wave-effect {
    position: absolute;
    width: 100%;
    height: 100%;
}

.wave-1 {
    background:
        radial-gradient(circle at 20% 80%, rgba(52, 152, 219, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(46, 204, 113, 0.08) 0%, transparent 50%);
    animation: wave 8s ease-in-out infinite;
}

.wave-2 {
    background:
        radial-gradient(circle at 40% 40%, rgba(21, 67, 96, 0.06) 0%, transparent 50%);
    animation: wave 12s ease-in-out infinite reverse;
}

/* Efecto de cuadrícula sutil para simular base de datos */
.data-grid {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image:
        linear-gradient(rgba(52, 152, 219, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(52, 152, 219, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: gridShift 20s linear infinite;
}

@keyframes wave {

    0%,
    100% {
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

@keyframes gridShift {
    0% {
        transform: translate(0, 0);
    }

    100% {
        transform: translate(50px, 50px);
    }
}
</style>