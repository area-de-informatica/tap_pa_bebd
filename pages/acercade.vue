<template>
    <div class="creditos-page">
        <!-- Hero Section -->
        <section class="hero-section">
            <v-container>
                <v-row justify="center">
                    <v-col cols="12" lg="8" class="text-center">
                        <div class="hero-content">
                            <h1 class="hero-title">
                                Equipo de Desarrollo
                            </h1>
                            <p class="hero-subtitle">
                                Profesionales comprometidos con la excelencia educativa y la innovación tecnológica
                            </p>
                            <div class="hero-divider"></div>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </section>

        <!-- Main Content -->
        <section class="main-content">
            <v-container>
                <!-- Loading State -->
                <div v-if="loading" class="loading-container">
                    <div class="loading-content">
                        <v-progress-circular indeterminate color="primary" size="48" width="3"></v-progress-circular>
                        <p class="loading-text">Cargando información del equipo</p>
                    </div>
                </div>

                <!-- Error State -->
                <v-row v-else-if="error" justify="center">
                    <v-col cols="12" md="8" lg="6">
                        <v-card class="error-card" elevation="0">
                            <v-card-text class="text-center pa-8">
                                <v-icon size="64" color="error" class="mb-4">mdi-alert-circle-outline</v-icon>
                                <h3 class="error-title mb-3">Error al cargar la información</h3>
                                <p class="error-message mb-6">{{ error }}</p>
                                <v-btn color="primary" outlined large @click="fetchCreditos" class="retry-btn">
                                    <v-icon left>mdi-refresh</v-icon>
                                    Reintentar
                                </v-btn>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>

                <!-- Team Grid -->
                <div v-else class="team-grid">
                    <v-row justify="center" class="team-row">
                        <v-col v-for="(miembro, index) in creditos" :key="index" cols="12" sm="6" lg="4" xl="3"
                            class="team-col">
                            <div class="member-card-wrapper">
                                <v-card class="member-card" elevation="0">
                                    <!-- Card Header -->
                                    <div class="card-header">
                                        <div class="avatar-container">
                                            <div class="avatar-wrapper">
                                                <v-avatar size="100" class="member-avatar">
                                                    <v-img :src="miembro.foto"
                                                        :alt="`${miembro.nombre} - ${miembro.rol}`"
                                                        @error="onImageError">
                                                        <template v-slot:placeholder>
                                                            <div class="avatar-placeholder">
                                                                <v-icon size="40"
                                                                    color="grey lighten-1">mdi-account</v-icon>
                                                            </div>
                                                        </template>
                                                    </v-img>
                                                </v-avatar>
                                                <div class="avatar-ring"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Card Content -->
                                    <v-card-text class="card-content">
                                        <div class="member-info">
                                            <h3 class="member-name">{{ miembro.nombre }}</h3>
                                            <div class="role-badge">
                                                <span class="role-text">{{ miembro.rol }}</span>
                                            </div>
                                            <p class="member-contribution">{{ miembro.aporte }}</p>
                                        </div>

                                        <!-- Contact Section -->
                                        <div class="contact-section">
                                            <div class="contact-item" @click="copyEmail(miembro.correo)">
                                                <v-icon size="16" color="primary">mdi-email-outline</v-icon>
                                                <span class="contact-text">{{ miembro.correo }}</span>
                                                <v-icon size="14" color="grey">mdi-content-copy</v-icon>
                                            </div>
                                        </div>

                                        <!-- Social Links -->
                                        <div class="social-section">
                                            <div class="social-links">
                                                <a v-if="miembro.redes.github" :href="miembro.redes.github"
                                                    target="_blank" class="social-link github"
                                                    aria-label="GitHub Profile">
                                                    <v-icon size="18">mdi-github</v-icon>
                                                </a>

                                                <a v-if="miembro.redes.linkedin" :href="miembro.redes.linkedin"
                                                    target="_blank" class="social-link linkedin"
                                                    aria-label="LinkedIn Profile">
                                                    <v-icon size="18">mdi-linkedin</v-icon>
                                                </a>

                                                <a v-if="miembro.redes.twitter" :href="miembro.redes.twitter"
                                                    target="_blank" class="social-link twitter"
                                                    aria-label="Twitter Profile">
                                                    <v-icon size="18">mdi-twitter</v-icon>
                                                </a>
                                            </div>
                                        </div>
                                    </v-card-text>
                                </v-card>
                            </div>
                        </v-col>
                    </v-row>
                </div>
            </v-container>
        </section>

        <!-- Footer Section -->
        <section class="footer-section">
            <v-container>
                <v-row justify="center">
                    <v-col cols="12" lg="10">
                        <div class="footer-content">
                            <div class="footer-main">
                                <h3 class="footer-title">Compromiso con la Excelencia</h3>
                                <p class="footer-description">
                                    Este Objeto Virtual de Aprendizaje representa el resultado de un trabajo
                                    colaborativo
                                    multidisciplinario, donde cada profesional ha contribuido con su experiencia única
                                    para crear una herramienta educativa de la más alta calidad.
                                </p>
                            </div>

                            <div class="footer-meta">
                                <div class="meta-divider"></div>
                                <div class="meta-info">
                                    <span class="meta-text">
                                        Desarrollado con dedicación y profesionalismo
                                    </span>
                                    <span class="meta-year">© {{ currentYear }}</span>
                                </div>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </section>

        <!-- Success Notification -->
        <v-snackbar v-model="notification.show" :color="notification.color" timeout="3000" top right shaped>
            <div class="notification-content">
                <v-icon left color="white">{{ notification.icon }}</v-icon>
                {{ notification.message }}
            </div>
            <template v-slot:action="{ attrs }">
                <v-btn icon small color="white" v-bind="attrs" @click="notification.show = false">
                    <v-icon size="18">mdi-close</v-icon>
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
import { useCreditosStore } from '/stores/creditos'
import { ref, computed, onMounted } from 'vue'

export default {
    name: 'CreditosPage',
    setup() {
        const creditosStore = useCreditosStore()
        const notification = ref({
            show: false,
            message: '',
            color: 'success',
            icon: 'mdi-check-circle'
        })

        // Reactive references from store
        const { creditos, loading, error, fetchCreditos } = creditosStore

        // Computed properties
        const currentYear = computed(() => new Date().getFullYear())

        // Methods
        const copyEmail = async (email) => {
            try {
                await navigator.clipboard.writeText(email)
                showNotification('Email copiado al portapapeles', 'success', 'mdi-check-circle')
            } catch (err) {
                showNotification('No se pudo copiar el email', 'error', 'mdi-alert-circle')
            }
        }

        const showNotification = (message, color = 'success', icon = 'mdi-check-circle') => {
            notification.value = {
                show: true,
                message,
                color,
                icon
            }
        }

        const onImageError = (event) => {
            // Fallback to professional avatar placeholder
            const svg = `data:image/svg+xml;base64,${btoa(`
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" fill="#F8F9FA"/>
          <circle cx="50" cy="35" r="15" fill="#E9ECEF"/>
          <path d="M20 85C20 72.85 29.85 63 42 63H58C70.15 63 80 72.85 80 85V90H20V85Z" fill="#E9ECEF"/>
        </svg>
      `)}`
            event.target.src = svg
        }

        // Lifecycle
        onMounted(() => {
            fetchCreditos()
        })

        return {
            creditos,
            loading,
            error,
            notification,
            currentYear,
            fetchCreditos,
            copyEmail,
            onImageError
        }
    }
}
</script>

<style scoped>
/* Global Styles */
.creditos-page {
    min-height: 100vh;
    background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);
    font-family: 'Inter', 'Roboto', sans-serif;
}

/* Hero Section */
.hero-section {
    padding: 80px 0 60px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    position: relative;
    overflow: hidden;
}

.hero-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23ffffff" fill-opacity="0.05"><circle cx="30" cy="30" r="1.5"/></g></svg>');
}

.hero-content {
    position: relative;
    z-index: 2;
}

.hero-title {
    font-size: 3.5rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 1.5rem;
    letter-spacing: -0.025em;
    line-height: 1.1;
}

.hero-subtitle {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 300;
    max-width: 600px;
    margin: 0 auto 2rem;
    line-height: 1.6;
}

.hero-divider {
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #ffffff 0%, rgba(255, 255, 255, 0.5) 100%);
    margin: 0 auto;
    border-radius: 2px;
}

/* Main Content */
.main-content {
    padding: 80px 0;
}

.loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
}

.loading-content {
    text-align: center;
}

.loading-text {
    margin-top: 1.5rem;
    font-size: 1rem;
    color: #6c757d;
    font-weight: 500;
}

.error-card {
    border: 1px solid #e9ecef;
    border-radius: 16px;
}

.error-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #495057;
}

.error-message {
    color: #6c757d;
    font-size: 1rem;
}

.retry-btn {
    border-radius: 8px;
    text-transform: none;
    font-weight: 500;
}

/* Team Grid */
.team-grid {
    max-width: 1200px;
    margin: 0 auto;
}

.team-row {
    gap: 2rem;
}

.team-col {
    padding: 0 1rem;
}

.member-card-wrapper {
    height: 100%;
}

.member-card {
    height: 100%;
    border-radius: 20px;
    border: 1px solid #e9ecef;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    background: #ffffff;
    position: relative;
    overflow: hidden;
}

.member-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    transform: scaleX(0);
    transition: transform 0.3s ease;
}

.member-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    border-color: #667eea;
}

.member-card:hover::before {
    transform: scaleX(1);
}

/* Card Header */
.card-header {
    padding: 2rem 2rem 1rem;
    text-align: center;
}

.avatar-container {
    position: relative;
    display: inline-block;
}

.avatar-wrapper {
    position: relative;
}

.member-avatar {
    border: 4px solid #ffffff;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.avatar-ring {
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border: 2px solid transparent;
    border-radius: 50%;
    background: linear-gradient(45deg, #667eea, #764ba2) border-box;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.member-card:hover .avatar-ring {
    opacity: 1;
}

.avatar-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: #f8f9fa;
}

/* Card Content */
.card-content {
    padding: 1rem 2rem 2rem;
}

.member-info {
    text-align: center;
    margin-bottom: 1.5rem;
}

.member-name {
    font-size: 1.375rem;
    font-weight: 600;
    color: #212529;
    margin-bottom: 0.5rem;
    line-height: 1.3;
}

.role-badge {
    margin-bottom: 1rem;
}

.role-text {
    display: inline-block;
    padding: 0.375rem 1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #ffffff;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.member-contribution {
    font-size: 0.95rem;
    color: #6c757d;
    line-height: 1.6;
    margin: 0;
}

/* Contact Section */
.contact-section {
    margin-bottom: 1.5rem;
}

.contact-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1rem;
    background: #f8f9fa;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    gap: 0.5rem;
}

.contact-item:hover {
    background: #e7f3ff;
    transform: translateY(-1px);
}

.contact-text {
    font-size: 0.875rem;
    color: #495057;
    font-weight: 500;
    flex: 1;
    text-align: center;
}

/* Social Section */
.social-section {
    text-align: center;
}

.social-links {
    display: flex;
    justify-content: center;
    gap: 0.75rem;
}

.social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    text-decoration: none;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.social-link::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    transform: scale(0);
    transition: transform 0.3s ease;
}

.social-link:hover::before {
    transform: scale(1);
}

.social-link.github {
    background: #f8f9fa;
    color: #24292e;
}

.social-link.github:hover {
    color: #ffffff;
}

.social-link.github::before {
    background: #24292e;
}

.social-link.linkedin {
    background: #f8f9fa;
    color: #0077b5;
}

.social-link.linkedin:hover {
    color: #ffffff;
}

.social-link.linkedin::before {
    background: #0077b5;
}

.social-link.twitter {
    background: #f8f9fa;
    color: #1da1f2;
}

.social-link.twitter:hover {
    color: #ffffff;
}

.social-link.twitter::before {
    background: #1da1f2;
}

.social-link .v-icon {
    position: relative;
    z-index: 2;
}

/* Footer Section */
.footer-section {
    padding: 60px 0;
    background: #f8f9fa;
    border-top: 1px solid #e9ecef;
}

.footer-content {
    text-align: center;
}

.footer-main {
    margin-bottom: 2.5rem;
}

.footer-title {
    font-size: 1.75rem;
    font-weight: 600;
    color: #212529;
    margin-bottom: 1rem;
}

.footer-description {
    font-size: 1rem;
    color: #6c757d;
    line-height: 1.7;
    max-width: 700px;
    margin: 0 auto;
}

.footer-meta {
    padding-top: 2rem;
}

.meta-divider {
    width: 100px;
    height: 1px;
    background: #dee2e6;
    margin: 0 auto 1.5rem;
}

.meta-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 500px;
    margin: 0 auto;
}

.meta-text {
    font-size: 0.875rem;
    color: #6c757d;
    font-weight: 500;
}

.meta-year {
    font-size: 0.875rem;
    color: #adb5bd;
}

/* Notification */
.notification-content {
    display: flex;
    align-items: center;
}

/* Responsive Design */
@media (max-width: 1264px) {
    .team-row {
        gap: 1.5rem;
    }
}

@media (max-width: 960px) {
    .hero-title {
        font-size: 2.75rem;
    }

    .hero-subtitle {
        font-size: 1.125rem;
    }

    .team-row {
        gap: 1rem;
    }

    .meta-info {
        flex-direction: column;
        gap: 0.5rem;
    }
}

@media (max-width: 600px) {
    .hero-section {
        padding: 60px 0 40px;
    }

    .hero-title {
        font-size: 2.25rem;
    }

    .hero-subtitle {
        font-size: 1rem;
    }

    .main-content {
        padding: 60px 0;
    }

    .team-col {
        padding: 0 0.5rem;
    }

    .card-header {
        padding: 1.5rem 1.5rem 1rem;
    }

    .card-content {
        padding: 1rem 1.5rem 1.5rem;
    }

    .footer-section {
        padding: 40px 0;
    }
}
</style>