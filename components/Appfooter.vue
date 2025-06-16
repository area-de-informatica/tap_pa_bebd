<!-- components/AppFooter.vue -->
<template>
    <v-footer class="database-footer">
        <div class="footer-content">
            <!-- Sección principal del footer -->
            <div class="footer-main">
                <!-- Logo/Título -->
                <div class="footer-brand">
                    <div class="brand-icon">
                        <div class="db-icon">
                            <div class="db-cylinder"></div>
                            <div class="db-cylinder middle"></div>
                            <div class="db-cylinder bottom"></div>
                        </div>
                    </div>
                    <div class="brand-text">
                        <h3>DataSearch Pro</h3>
                        <p>Explorando el futuro de las bases de datos</p>
                    </div>
                </div>

                <!-- Enlaces rápidos -->
                <div class="footer-links">
                    <div class="link-section">
                        <h4>Navegación</h4>
                        <ul>
                            <li><nuxt-link to="/">Inicio</nuxt-link></li>
                            <li><nuxt-link to="/navegacion">Navegación</nuxt-link></li>
                            <li><nuxt-link to="/estrategiasbusquedas">Estrategias</nuxt-link></li>
                        </ul>
                    </div>

                    <div class="link-section">
                        <h4>Recursos</h4>
                        <ul>
                            <li><nuxt-link to="/basesdatos">Bases de Datos</nuxt-link></li>
                            <li><nuxt-link to="/gestionresultados">Gestión</nuxt-link></li>
                            <li><nuxt-link to="/futuro">Futuro</nuxt-link></li>
                        </ul>
                    </div>

                    <div class="link-section">
                        <h4>Información</h4>
                        <ul>
                            <li><a href="#" @click.prevent>Documentación</a></li>
                            <li><a href="#" @click.prevent>Tutoriales</a></li>
                            <li><a href="#" @click.prevent>Soporte</a></li>
                        </ul>
                    </div>
                </div>

                <!-- Estadísticas animadas -->
                <div class="footer-stats">
                    <div class="stat-item">
                        <div class="stat-number" ref="statQueries">{{ animatedQueries }}</div>
                        <div class="stat-label">Consultas Procesadas</div>
                        <div class="stat-bar">
                            <div class="stat-fill queries"></div>
                        </div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number" ref="statDatabases">{{ animatedDatabases }}</div>
                        <div class="stat-label">Bases de Datos</div>
                        <div class="stat-bar">
                            <div class="stat-fill databases"></div>
                        </div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number" ref="statUsers">{{ animatedUsers }}</div>
                        <div class="stat-label">Usuarios Activos</div>
                        <div class="stat-bar">
                            <div class="stat-fill users"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Barra inferior -->
            <div class="footer-bottom">
                <div class="footer-divider"></div>
                <div class="footer-bottom-content">
                    <div class="copyright">
                        <p>&copy; {{ currentYear }} DataSearch Pro. Todos los derechos reservados.</p>
                        <p>Desarrollado con 💙 para la búsqueda eficiente en bases de datos</p>
                    </div>
                    <div class="footer-tech">
                        <div class="tech-badges">
                            <span class="tech-badge">Vue.js</span>
                            <span class="tech-badge">Nuxt.js</span>
                            <span class="tech-badge">Vuetify</span>
                            <span class="tech-badge pulse">SQL</span>
                            <span class="tech-badge">NoSQL</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Partículas de datos flotantes en el footer -->
            <div class="footer-particles">
                <div v-for="i in 8" :key="i" class="data-particle" :style="getDataParticleStyle(i)">
                    {{ getDataSymbol(i) }}
                </div>
            </div>
        </div>
    </v-footer>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

// Datos reactivos para las estadísticas animadas
const animatedQueries = ref(0)
const animatedDatabases = ref(0)
const animatedUsers = ref(0)

const currentYear = new Date().getFullYear()

// Metas finales para las animaciones
const targetQueries = 125430
const targetDatabases = 247
const targetUsers = 1850

// Símbolos relacionados con datos
const dataSymbols = ['₁', '₀', '∑', '∞', '≈', '∆', '∫', '∇']

// Función para animar números
const animateNumber = (ref, target, duration = 2000) => {
    const start = Date.now()
    const startValue = 0

    const animate = () => {
        const now = Date.now()
        const progress = Math.min((now - start) / duration, 1)

        // Usar easing para una animación más suave
        const easeProgress = 1 - Math.pow(1 - progress, 3)
        ref.value = Math.floor(startValue + (target - startValue) * easeProgress)

        if (progress < 1) {
            requestAnimationFrame(animate)
        }
    }

    requestAnimationFrame(animate)
}

// Estilos para partículas de datos
const getDataParticleStyle = (index) => {
    const delay = index * 0.8
    const duration = 12 + (index % 4)
    const left = (index * 12) % 100

    return {
        left: `${left}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
    }
}

// Obtener símbolo de datos
const getDataSymbol = (index) => {
    return dataSymbols[index % dataSymbols.length]
}

onMounted(() => {
    // Animar estadísticas con diferentes retrasos
    setTimeout(() => animateNumber(animatedQueries, targetQueries, 3000), 500)
    setTimeout(() => animateNumber(animatedDatabases, targetDatabases, 2500), 1000)
    setTimeout(() => animateNumber(animatedUsers, targetUsers, 2000), 1500)
})
</script>

<style scoped>
.database-footer {
    background: linear-gradient(180deg,
            rgba(21, 67, 96, 0.95) 0%,
            rgba(15, 52, 76, 0.98) 100%);
    color: #ecf0f1;
    position: relative;
    overflow: hidden;
    border-top: 2px solid rgba(52, 152, 219, 0.3);
}

.footer-content {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px 20px;
}

.footer-main {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    gap: 40px;
    margin-bottom: 30px;
}

/* Marca/Logo */
.footer-brand {
    display: flex;
    align-items: center;
    gap: 15px;
}

.brand-icon {
    position: relative;
}

.db-icon {
    position: relative;
    width: 40px;
    height: 45px;
}

.db-cylinder {
    width: 40px;
    height: 12px;
    background: linear-gradient(135deg, #3498db, #2ecc71);
    border-radius: 20px;
    position: absolute;
    border: 2px solid rgba(255, 255, 255, 0.3);
    animation: dbPulse 2s ease-in-out infinite;
}

.db-cylinder.middle {
    top: 15px;
    animation-delay: 0.5s;
}

.db-cylinder.bottom {
    top: 30px;
    animation-delay: 1s;
}

.brand-text h3 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
    background: linear-gradient(45deg, #3498db, #2ecc71);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.brand-text p {
    margin: 5px 0 0 0;
    color: #bdc3c7;
    font-size: 0.9rem;
}

/* Enlaces */
.footer-links {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
}

.link-section h4 {
    color: #3498db;
    margin-bottom: 15px;
    font-size: 1.1rem;
    position: relative;
}

.link-section h4::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 30px;
    height: 2px;
    background: linear-gradient(90deg, #3498db, #2ecc71);
}

.link-section ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.link-section li {
    margin-bottom: 8px;
}

.link-section a {
    color: #bdc3c7;
    text-decoration: none;
    transition: all 0.3s ease;
    position: relative;
}

.link-section a:hover {
    color: #3498db;
    transform: translateX(5px);
}

/* Estadísticas */
.footer-stats {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.stat-item {
    text-align: center;
}

.stat-number {
    font-size: 1.8rem;
    font-weight: bold;
    color: #3498db;
    margin-bottom: 5px;
}

.stat-label {
    font-size: 0.85rem;
    color: #95a5a6;
    margin-bottom: 8px;
}

.stat-bar {
    width: 100%;
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    overflow: hidden;
}

.stat-fill {
    height: 100%;
    border-radius: 2px;
    animation: fillBar 3s ease-out 1s forwards;
    width: 0%;
}

.stat-fill.queries {
    background: linear-gradient(90deg, #3498db, #2980b9);
}

.stat-fill.databases {
    background: linear-gradient(90deg, #2ecc71, #27ae60);
}

.stat-fill.users {
    background: linear-gradient(90deg, #9b59b6, #8e44ad);
}

/* Footer inferior */
.footer-divider {
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg,
            transparent 0%,
            rgba(52, 152, 219, 0.5) 50%,
            transparent 100%);
    margin-bottom: 20px;
}

.footer-bottom-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
}

.copyright p {
    margin: 0;
    color: #95a5a6;
    font-size: 0.85rem;
}

.tech-badges {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.tech-badge {
    background: rgba(52, 152, 219, 0.2);
    color: #3498db;
    padding: 4px 12px;
    border-radius: 15px;
    font-size: 0.8rem;
    border: 1px solid rgba(52, 152, 219, 0.3);
    transition: all 0.3s ease;
}

.tech-badge:hover {
    background: rgba(52, 152, 219, 0.3);
    transform: translateY(-2px);
}

.tech-badge.pulse {
    animation: pulse 2s ease-in-out infinite;
}

/* Partículas de datos */
.footer-particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
}

.data-particle {
    position: absolute;
    color: rgba(52, 152, 219, 0.3);
    font-size: 1.5rem;
    font-weight: bold;
    animation: floatData infinite ease-in-out;
}

/* Animaciones */
@keyframes dbPulse {

    0%,
    100% {
        box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
        transform: scale(1);
    }

    50% {
        box-shadow: 0 0 15px rgba(52, 152, 219, 0.8);
        transform: scale(1.05);
    }
}

@keyframes fillBar {
    to {
        width: 100%;
    }
}

@keyframes pulse {

    0%,
    100% {
        box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
    }

    50% {
        box-shadow: 0 0 15px rgba(52, 152, 219, 0.8);
    }
}

@keyframes floatData {
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 0.3;
    }

    50% {
        transform: translateY(-20px) rotate(180deg);
        opacity: 0.6;
    }

    100% {
        transform: translateY(0) rotate(360deg);
        opacity: 0.3;
    }
}

/* Responsive */
@media (max-width: 768px) {
    .footer-main {
        grid-template-columns: 1fr;
        gap: 30px;
        text-align: center;
    }

    .footer-links {
        grid-template-columns: 1fr;
        gap: 20px;
    }

    .footer-bottom-content {
        flex-direction: column;
        text-align: center;
    }
}
</style>