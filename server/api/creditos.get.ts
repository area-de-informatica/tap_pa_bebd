// server/api/creditos.js

export default defineEventHandler(() => {
    return [
        {
            nombre: "Yeison Morelo Chávez",
            correo: "ymorelochavez49@correo.unicordoba.edu.co",
            rol: "Coordinador del proyecto",
            aporte: "Diseño de la estructura del sistema y desarrollo de los módulos principales.",
            redes: {
                github: "https://github.com/yeison-2000",
                linkedin: "https://www.linkedin.com/in/yeison-morelo-784853354/",
                twitter: ""
            },
            foto: "/img/yeison.png"
        },
        {
            nombre: "Jander Ensuncho Pérez",
            correo: "jensunchoperez17@correo.unicordoba.edu.co",
            rol: "Desarrollador Frontend",
            aporte: "Diseño de interfaz con Vuetify y conexión con el store de Pinia.",
            redes: {
                github: "",
                linkedin: "",
                twitter: ""
            },
            foto: "/img/jander.jpg"
        },
        {
            nombre: "Miguel Angel Hernandez Gomezcasseres",
            correo: "Gomescasseres310@gmail.com",
            rol: "Investigador",
            aporte: "Recolección de fuentes científicas para fundamentar el contenido.",
            redes: {
                github: "",
                linkedin: "",
                twitter: ""
            },
            foto: "/img/miguel.jpg"
        },
        {
            nombre: "Juan Fernando Miranda Fabra",
            correo: "jmirandafabra41@correo.unicordoba.edu.co",
            rol: "Editor de contenido",
            aporte: "Redacción y corrección de textos dentro del OVA.",
            redes: {
                github: "https://github.com/Juanfermiranda15",
                linkedin: "",
                twitter: ""
            },
            foto: "/img/juanfer.png"
        }
    ]
})
