<!-- components/AppNavbar.vue -->
<template>
    <v-app-bar app dark class="database-navbar" :height="navbarHeight">
        <!-- Mobile menu button -->
        <v-app-bar-nav-icon class="d-lg-none mobile-menu-btn" @click="drawer = !drawer" />

        <!-- Logo/Brand (optional) -->
        <v-toolbar-title class="brand-title d-none d-md-flex">
            BEBD
        </v-toolbar-title>

        <v-spacer />

        <!-- Desktop Navigation -->
        <div class="d-none d-lg-flex navigation-container">
            <v-btn v-for="item in navigationItems" :key="item.to" :to="item.to" text class="nav-btn"
                :class="{ 'active-route': $route.path === item.to }">
                <v-icon left small class="mr-1">{{ item.icon }}</v-icon>
                {{ item.title }}
            </v-btn>
        </div>

        <!-- Tablet Navigation (medium screens) -->
        <div class="d-none d-md-flex d-lg-none tablet-nav">
            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn text class="nav-btn" v-bind="attrs" v-on="on">
                        <v-icon left>mdi-menu</v-icon>
                        Menú
                    </v-btn>
                </template>
                <v-list class="menu-list">
                    <v-list-item v-for="item in navigationItems" :key="item.to" :to="item.to" class="menu-item">
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
    </v-app-bar>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" temporary app class="mobile-drawer">
        <v-list-item class="drawer-header">
            <v-list-item-avatar>
                <v-icon large color="primary">mdi-database-search</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title class="font-weight-bold">
                    Sistema DB
                </v-list-item-title>
                <v-list-item-subtitle>
                    Gestión de Bases de Datos
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-divider />

        <v-list nav>
            <v-list-item v-for="item in navigationItems" :key="item.to" :to="item.to" class="mobile-nav-item"
                @click="drawer = false">
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
const drawer = ref(false)

const navigationItems = [
    { title: 'Inicio', to: '/', icon: 'mdi-home' },
    { title: 'Bases de Datos', to: '/basesdatos', icon: 'mdi-database' },
    { title: 'Estrategias', to: '/estrategiasbusquedas', icon: 'mdi-strategy' },
    { title: 'Navegación', to: '/navegacion', icon: 'mdi-compass' },
    { title: 'Gestión de Resultados', to: '/gestionresultados', icon: 'mdi-file-chart' },
    { title: 'Actividades', to: '/actividades', icon: 'mdi-clipboard-check' },
    { title: 'Evaluacion', to: '/evaluacion', icon: 'mdi-school' },
    { title: 'Futuro', to: '/futuro', icon: 'mdi-crystal-ball' },
    { title: 'Acerca de', to: '/acercade', icon: 'mdi-information' }
]

const navbarHeight = computed(() => {
    return mobile.value ? 56 : 64
})
</script>

<style scoped>
.database-navbar {
    background: linear-gradient(135deg,
            rgba(21, 67, 96, 0.95) 0%,
            rgba(40, 116, 166, 0.9) 50%,
            rgba(21, 67, 96, 0.95) 100%) !important;
    backdrop-filter: blur(15px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.brand-title {
    display: flex;
    font-size: 1.5rem;
    font-weight: 600;
    color: #ffffff;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.navigation-container {
    gap: 1px;
}

.nav-btn {
    color: white;
    position: right;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    margin: 0 4px;
    padding: 8px 16px;
    border-radius: 8px;
    font-weight: 500;
    text-transform: none;
    min-width: auto;
}

.nav-btn::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #3498db, #2ecc71);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateX(-50%);
    border-radius: 1px;
}

.nav-btn:hover::before,
.nav-btn.active-route::before {
    width: 70%;
}

.nav-btn:hover {
    transform: translateY(-1px);
    color: #3498db !important;
    background-color: rgba(255, 255, 255, 0.1);
    text-shadow: 0 0 8px rgba(52, 152, 219, 0.6);
}

.nav-btn.active-route {
    color: #2ecc71 !important;
    background-color: rgba(46, 204, 113, 0.1);
}

.mobile-menu-btn {
    transition: all 0.3s ease;
}

.mobile-menu-btn:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: scale(1.05);
}

.tablet-nav .nav-btn {
    padding: 8px 20px;
}

.menu-list {
    background: linear-gradient(135deg,
            rgba(21, 67, 96, 0.98) 0%,
            rgba(40, 116, 166, 0.95) 100%);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    margin-top: 8px;
}

.menu-item {
    transition: all 0.3s ease;
    border-radius: 8px;
    margin: 4px 8px;
}

.menu-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateX(4px);
}

.mobile-drawer {
    background: linear-gradient(180deg,
            rgba(21, 67, 96, 0.98) 0%,
            rgba(40, 116, 166, 0.95) 100%);
    backdrop-filter: blur(15px);
}

.drawer-header {
    padding: 16px;
    background: rgba(255, 255, 255, 0.05);
    margin-bottom: 8px;
}

.mobile-nav-item {
    margin: 4px 12px;
    border-radius: 12px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-nav-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateX(8px);
}

.mobile-nav-item.v-list-item--active {
    background-color: rgba(46, 204, 113, 0.2);
    color: #2ecc71;
}

/* Responsive adjustments */
@media (max-width: 599px) {
    .nav-btn {
        padding: 6px 12px;
        font-size: 0.875rem;
    }

    .brand-title {
        font-size: 1.1rem;
    }
}

@media (min-width: 600px) and (max-width: 959px) {
    .nav-btn {
        padding: 8px 14px;
        font-size: 0.9rem;
    }
}

@media (min-width: 960px) and (max-width: 1263px) {
    .nav-btn {
        padding: 8px 12px;
        font-size: 0.9rem;
        margin: 0 2px;
    }

    .navigation-container {
        gap: 2px;
    }
}

@media (min-width: 1264px) {
    .nav-btn {
        padding: 10px 18px;
        margin: 0 6px;
    }

    .navigation-container {
        gap: 8px;
    }
}

/* Animation for drawer */
.mobile-drawer {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Accessibility improvements */
.nav-btn:focus {
    outline: 2px solid #3498db;
    outline-offset: 2px;
}

.mobile-nav-item:focus {
    background-color: rgba(255, 255, 255, 0.1);
}

/* Dark theme adjustments */
@media (prefers-color-scheme: dark) {
    .database-navbar {
        border-bottom-color: rgba(255, 255, 255, 0.15);
    }

    .menu-list {
        border-color: rgba(255, 255, 255, 0.15);
    }
}

/* Reduced motion for accessibility */
@media (prefers-reduced-motion: reduce) {

    .nav-btn,
    .mobile-nav-item,
    .menu-item,
    .mobile-menu-btn {
        transition: none;
    }

    .nav-btn::before {
        transition: none;
    }
}
</style>