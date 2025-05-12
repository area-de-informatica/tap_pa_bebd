
export default defineEventHandler(() => {
  const equipos = [
    {
      id: 1,
      question: "¿Qué equipo semifinalista de champions league ha ganado más veces esta competición?",
      answers: [
        {
          a: "Psg",
          b: "Arsenal",
          c: "Barcelona",
          d: "Inter"
        },
      ],
      type: "multiple-choice"
    },
    {
      id: 2,
      question: "¿Qué equipos jugarán la final de Champions League?",
      answers: [
        {
          id: 1,
          a: "PSG vs Barcelona",
          title: "incorrect",
          just: "Psg pasó a la final luego de eliminar al Arsenal con un resultado global de 3-1. No obstante, el barcelona cayó frente al inter en una serie global de 7-6"
        },
        {
          id: 2,
          a: "Arsenal vs Inter",
          title: "incorrect",
          just: "Inter pasó a la final luego de eliminar al barcelona con un resultado global de 7-6. El arsenal cayó frente al psg en una serie global de 3-1"
        },
        {
          id: 3,
          a: "Inter vs psg",
          title: "correct",
          just: "Inter pasó a la final luego de eliminar al barcelona con un resultado global de 7-6. El psg pasó a la final luego de eliminar al arsenal con un resultado global de 3-1"
        },
        {
          id: 4,
          a: "arsenal vs barcelona",
          title: "incorrect",
          just: "Arsenal cayó frente al psg con un resultado global de 3-1. El barcelona cayó frente al inter en una serie global de 7-6"
        },
        {
          id: 5,
          a: "arsenal vs psg",
          title: "incorrect",
          just: "Arsenal cayó frente al psg con un resultado global de 3-1. El psg pasó a la final luego de eliminar al arsenal con un resultado global de 3-1"
        }
      ],
      type: "form"
    }
  ]

  return equipos
})
