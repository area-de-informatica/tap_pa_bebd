<!-- components/AppSidebar.vue -->
<template>
    <v-navigation-drawer v-model="drawerModel" :temporary="isMobile" :permanent="!isMobile" :width="sidebarWidth"
        class="app-sidebar" color="transparent" floating>
        <!-- Header del sidebar -->
        <div class="sidebar-header">
            <div class="logo-section">
                <v-icon icon="mdi-database" size="32" color="primary" class="logo-icon" />
                <div class="app-info">
                    <h3 class="app-title">DataBase Pro</h3>
                    <span class="app-version">v2.1.0</span>
                </div>
            </div>

            <!-- Botón de cerrar para móvil -->
            <v-btn v-if="isMobile" icon="mdi-close" variant="text" size="small" class="close-btn"
                @click="$emit('close')" />
        </div>

        <v-divider class="sidebar-divider" />

        <!-- Perfil de usuario -->
        <div class="user-profile">
            <v-avatar size="48" class="user-avatar">
                <v-img v-if="user.avatar" :src="user.avatar" :alt="user.name" />
                <v-icon v-else icon="mdi-account" size="24" />
            </v-avatar>

            <div class="user-info">
                <p class="user-name">{{ user.name || 'Usuario' }}</p>
                <p class="user-role">{{ user.role || 'Administrador' }}</p>
            </div>

            <v-menu>
                <template #activator="{ props }">
                    <v-btn icon="mdi-dots-vertical" variant="text" size="small" v-bind="props" />
                </template>
                <v-list>
                    <v-list-item @click="goToProfile">
                        <template #prepend>
                            <v-icon icon="mdi-account-cog" />
                        </template>
                        <v-list-item-title>Perfil</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="logout">
                        <template #prepend>
                            <v-icon icon="mdi-logout" />
                        </template>
                        <v-list-item-title>Cerrar Sesión</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>

        <v-divider class="sidebar-divider" />

        <!-- Buscador -->
        <div class="search-section">
            <v-text-field v-model="searchQuery" placeholder="Buscar..." prepend-inner-icon="mdi-magnify"
                variant="outlined" density="compact" hide-details class="search-field" clearable />
        </div>

        <!-- Navegación principal -->
        <v-list class="navigation-list" nav>
            <template v-for="item in filteredMenuItems" :key="item.title">
                <!-- Grupo de elementos -->
                <v-list-group v-if="item.children" :value="item.title" class="nav-group">
                    <template #activator="{ props }">
                        <v-list-item v-bind="props" :prepend-icon="item.icon" :title="item.title"
                            class="nav-item group-item">
                            <template #append>
                                <v-badge v-if="item.badge" :content="item.badge" color="error" inline />
                            </template>
                        </v-list-item>
                    </template>

                    <v-list-item v-for="child in item.children" :key="child.title" :to="child.to" :href="child.href"
                        :prepend-icon="child.icon" :title="child.title" class="nav-item child-item"
                        @click="handleNavigation(child)">
                        <template #append>
                            <v-badge v-if="child.badge" :content="child.badge" color="error" inline />
                        </template>
                    </v-list-item>
                </v-list-group>

                <!-- Elemento simple -->
                <v-list-item v-else :to="item.to" :href="item.href" :prepend-icon="item.icon" :title="item.title"
                    class="nav-item" @click="handleNavigation(item)">
                    <template #append>
                        <v-badge v-if="item.badge" :content="item.badge" color="error" inline />
                    </template>
                </v-list-item>
            </template>
        </v-list>

        <!-- Estado de conexión -->
        <div class="connection-status">
            <v-chip :color="connectionStatus.color" variant="tonal" size="small" class="status-chip">
                <template #prepend>
                    <v-icon :icon="connectionStatus.icon" />
                </template>
                {{ connectionStatus.text }}
            </v-chip>
        </div>

        <!-- Footer del sidebar -->
        <template #append>
            <div class="sidebar-footer">
                <v-divider class="sidebar-divider" />

                <!-- Configuraciones rápidas -->
                <div class="quick-settings">
                    <v-tooltip text="Modo oscuro">
                        <template #activator="{ props }">
                            <v-btn v-bind="props" :icon="darkMode ? 'mdi-weather-night' : 'mdi-weather-sunny'"
                                variant="text" size="small" @click="toggleDarkMode" />
                        </template>
                    </v-tooltip>

                    <v-tooltip text="Notificaciones">
                        <template #activator="{ props }">
                            <v-btn v-bind="props" :icon="notifications ? 'mdi-bell' : 'mdi-bell-off'" variant="text"
                                size="small" @click="toggleNotifications" />
                        </template>
                    </v-tooltip>

                    <v-tooltip text="Configuración">
                        <template #activator="{ props }">
                            <v-btn v-bind="props" icon="mdi-cog" variant="text" size="small" @click="goToSettings" />
                        </template>
                    </v-tooltip>
                </div>

                <!-- Información del sistema -->
                <div class="system-info">
                    <p class="info-text">CPU: {{ systemInfo.cpu }}%</p>
                    <p class="info-text">RAM: {{ systemInfo.ram }}%</p>
                    <p class="info-text">Uptime: {{ systemInfo.uptime }}</p>
                </div>
            </div>
        </template>
    </v-navigation-drawer>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useDisplay } from 'vuetify'

// Props
const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    }
})

// Emits
const emit = defineEmits(['close'])

// Composables
const router = useRouter()
const route = useRoute()
const { mobile } = useDisplay()

// Reactive data
const searchQuery = ref('')
const darkMode = ref(false)
const notifications = ref(true)
const sidebarWidth = ref(280)

// Computed
const isMobile = computed(() => mobile.value)

const drawerModel = computed({
    get: () => props.isOpen,
    set: (value) => {
        if (!value) emit('close')
    }
})

// Datos de usuario (normalmente vendrían de un store)
const user = ref({
    name: 'Juan Pérez',
    role: 'Administrador',
    avatar: null
})

// Estado de conexión
const connectionStatus = computed(() => {
    // Aquí podrías conectar con tu lógica de estado real
    return {
        color: 'success',
        icon: 'mdi-check-circle',
        text: 'Conectado'
    }
})

// Información del sistema (simulada)
const systemInfo = ref({
    cpu: 45,
    ram: 62,
    uptime: '2d 14h'
})

// Elementos del menú
const menuItems = ref([
    {
        title: 'Dashboard',
        icon: 'mdi-view-dashboard',
        to: '/',
        badge: null
    },
    {
        title: 'Bases de Datos',
        icon: 'mdi-database',
        children: [
            {
                title: 'Explorador',
                icon: 'mdi-folder-open',
                to: '/databases/explorer'
            },
            {
                title: 'Consultas',
                icon: 'mdi-code-tags',
                to: '/databases/queries'
            },
            {
                title: 'Esquemas',
                icon: 'mdi-sitemap',
                to: '/databases/schemas'
            },
            {
                title: 'Respaldos',
                icon: 'mdi-backup-restore',
                to: '/databases/backups',
                badge: '3'
            }
        ]
    },
    {
        title: 'Tablas',
        icon: 'mdi-table',
        children: [
            {
                title: 'Ver Tablas',
                icon: 'mdi-table-large',
                to: '/tables/view'
            },
            {
                title: 'Crear Tabla',
                icon: 'mdi-table-plus',
                to: '/tables/create'
            },
            {
                title: 'Importar',
                icon: 'mdi-upload',
                to: '/tables/import'
            },
            {
                title: 'Exportar',
                icon: 'mdi-download',
                to: '/tables/export'
            }
        ]
    },
    {
        title: 'Usuarios',
        icon: 'mdi-account-group',
        children: [
            {
                title: 'Lista de Usuarios',
                icon: 'mdi-account-multiple',
                to: '/users/list'
            },
            {
                title: 'Permisos',
                icon: 'mdi-shield-account',
                to: '/users/permissions'
            },
            {
                title: 'Roles',
                icon: 'mdi-account-key',
                to: '/users/roles'
            }
        ]
    },
    {
        title: 'Monitoreo',
        icon: 'mdi-monitor-dashboard',
        children: [
            {
                title: 'Rendimiento',
                icon: 'mdi-chart-line',
                to: '/monitoring/performance'
            },
            {
                title: 'Logs',
                icon: 'mdi-text-box-outline',
                to: '/monitoring/logs',
                badge: '12'
            },
            {
                title: 'Alertas',
                icon: 'mdi-alert',
                to: '/monitoring/alerts',
                badge: '2'
            }
        ]
    },
    {
        title: 'Configuración',
        icon: 'mdi-cog',
        to: '/settings'
    },
    {
        title: 'Ayuda',
        icon: 'mdi-help-circle',
        children: [
            {
                title: 'Documentación',
                icon: 'mdi-book-open',
                href: 'https://docs.example.com'
            },
            {
                title: 'Tutoriales',
                icon: 'mdi-school',
                to: '/help/tutorials'
            },
            {
                title: 'Soporte',
                icon: 'mdi-lifebuoy',
                to: '/help/support'
            }
        ]
    }
])

// Elementos filtrados por búsqueda
const filteredMenuItems = computed(() => {
    if (!searchQuery.value) return menuItems.value

    const query = searchQuery.value.toLowerCase()

    return menuItems.value.filter(item => {
        // Buscar en el título del item principal
        if (item.title.toLowerCase().includes(query)) return true

        // Buscar en los hijos si los tiene
        if (item.children) {
            return item.children.some(child =>
                child.title.toLowerCase().includes(query)
            )
        }

        return false
    }).map(item => {
        // Si tiene hijos, filtrar los hijos también
        if (item.children) {
            return {
                ...item,
                children: item.children.filter(child =>
                    child.title.toLowerCase().includes(query)
                )
            }
        }
        return item
    })
})

// Methods
const handleNavigation = (item) => {
    if (isMobile.value) {
        emit('close')
    }

    if (item.href) {
        window.open(item.href, '_blank')
    }
}

const toggleDarkMode = () => {
    darkMode.value = !darkMode.value
    // Aquí conectarías con tu sistema de temas
    console.log('Dark mode:', darkMode.value)
}

const toggleNotifications = () => {
    notifications.value = !notifications.value
    console.log('Notifications:', notifications.value)
}

const goToProfile = () => {
    router.push('/profile')
    if (isMobile.value) emit('close')
}

const goToSettings = () => {
    router.push('/settings')
    if (isMobile.value) emit('close')
}

const logout = () => {
    // Aquí implementarías tu lógica de logout
    console.log('Logging out...')
    router.push('/login')
}

const updateSystemInfo = () => {
    // Simular actualización de información del sistema
    systemInfo.value = {
        cpu: Math.floor(Math.random() * 100),
        ram: Math.floor(Math.random() * 100),
        uptime: `${Math.floor(Math.random() * 10)}d ${Math.floor(Math.random() * 24)}h`
    }
}

// Lifecycle
onMounted(() => {
    // Actualizar información del sistema cada 30 segundos
    const interval = setInterval(updateSystemInfo, 30000)

    onUnmounted(() => {
        clearInterval(interval)
    })
})

// Watchers
watch(() => route.path, () => {
    // Limpiar búsqueda al cambiar de ruta
    searchQuery.value = ''
})
</script>

<style scoped>
.app-sidebar {
    background: rgba(255, 255, 255, 0.95) !important;
    backdrop-filter: blur(20px);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
}

.sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 16px;
    background: rgba(21, 67, 96, 0.1);
    backdrop-filter: blur(10px);
}

.logo-section {
    display: flex;
    align-items: center;
    gap: 12px;
}

.logo-icon {
    animation: rotate 20s linear infinite;
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.app-info {
    display: flex;
    flex-direction: column;
}

.app-title {
    font-size: 1.2rem;
    font-weight: bold;
    color: #154360;
    margin: 0;
    line-height: 1.2;
}

.app-version {
    font-size: 0.75rem;
    color: #7f8c8d;
    font-weight: 500;
}

.close-btn {
    opacity: 0.7;
}

.sidebar-divider {
    margin: 0 16px;
    opacity: 0.3;
}

.user-profile {
    display: flex;
    align-items: center;
    padding: 16px;
    gap: 12px;
    background: rgba(21, 67, 96, 0.05);
    margin: 8px;
    border-radius: 12px;
    transition: all 0.3s ease;
}

.user-profile:hover {
    background: rgba(21, 67, 96, 0.1);
    transform: translateY(-1px);
}

.user-avatar {
    border: 2px solid rgba(21, 67, 96, 0.2);
    transition: all 0.3s ease;
}

.user-avatar:hover {
    border-color: #2874a6;
    box-shadow: 0 4px 12px rgba(21, 67, 96, 0.3);
}

.user-info {
    flex: 1;
}

.user-name {
    font-weight: 600;
    color: #2c3e50;
    margin: 0;
    font-size: 0.9rem;
}

.user-role {
    font-size: 0.75rem;
    color: #7f8c8d;
    margin: 0;
}

.search-section {
    padding: 16px;
}

.search-field {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 8px;
}

.navigation-list {
    padding: 0 8px;
    flex: 1;
}

.nav-item {
    margin: 2px 0;
    border-radius: 8px;
    transition: all 0.3s ease;
}

.nav-item:hover {
    background: rgba(21, 67, 96, 0.1) !important;
    transform: translateX(4px);
}

.nav-item.router-link-active {
    background: rgba(21, 67, 96, 0.15) !important;
    color: #154360 !important;
    font-weight: 600;
}

.child-item {
    margin-left: 20px;
    border-left: 2px solid rgba(21, 67, 96, 0.2);
}

.child-item:hover {
    border-left-color: #2874a6;
}

.group-item {
    font-weight: 600;
}

.connection-status {
    padding: 16px;
    text-align: center;
}

.status-chip {
    animation: pulse 2s infinite;
}

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.8;
    }
}

.sidebar-footer {
    padding: 16px;
    background: rgba(21, 67, 96, 0.05);
}

.quick-settings {
    display: flex;
    justify-content: space-around;
    margin-bottom: 12px;
}

.system-info {
    text-align: center;
}

.info-text {
    font-size: 0.7rem;
    color: #7f8c8d;
    margin: 2px 0;
}

/* Responsive */
@media (max-width: 768px) {
    .sidebar-header {
        padding: 16px;
    }

    .app-title {
        font-size: 1.1rem;
    }

    .user-profile {
        margin: 4px;
        padding: 12px;
    }

    .search-section {
        padding: 12px;
    }

    .navigation-list {
        padding: 0 4px;
    }
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
    .app-sidebar {
        background: rgba(30, 30, 30, 0.95) !important;
    }

    .app-title {
        color: #ecf0f1;
    }

    .user-name {
        color: #ecf0f1;
    }

    .nav-item:hover {
        background: rgba(255, 255, 255, 0.1) !important;
    }

    .nav-item.router-link-active {
        background: rgba(255, 255, 255, 0.15) !important;
        color: #ecf0f1 !important;
    }
}

/* Animaciones personalizadas */
.nav-item {
    position: relative;
    overflow: hidden;
}

.nav-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(21, 67, 96, 0.1), transparent);
    transition: left 0.5s ease;
}

.nav-item:hover::before {
    left: 100%;
}

/* Scrollbar personalizado */
.app-sidebar :deep(.v-navigation-drawer__content) {
    scrollbar-width: thin;
    scrollbar-color: rgba(21, 67, 96, 0.3) transparent;
}

.app-sidebar :deep(.v-navigation-drawer__content)::-webkit-scrollbar {
    width: 6px;
}

.app-sidebar :deep(.v-navigation-drawer__content)::-webkit-scrollbar-track {
    background: transparent;
}

.app-sidebar :deep(.v-navigation-drawer__content)::-webkit-scrollbar-thumb {
    background: rgba(21, 67, 96, 0.3);
    border-radius: 3px;
}

.app-sidebar :deep(.v-navigation-drawer__content)::-webkit-scrollbar-thumb:hover {
    background: rgba(21, 67, 96, 0.5);
}
</style>