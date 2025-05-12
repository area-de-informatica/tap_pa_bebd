<template>
  <v-card
    v-if="question"
    padding="12px"
    class="px-2 mx-auto"
    max-width="10000"
    rounded="lg"
    theme="dark"
    :title="`Pregunta ${question.id}`"
    variant="flat"
  >
    <v-card-text>
      <p class="text-h6 mb-4">{{ question.question }}</p>

      <v-item-group>
        <v-item
          v-for="(answer, key) in question.answers[0]"
          :key="key"
        >
          <template v-slot:default>
            <v-btn
              block
              class="mb-2"
              :color="getColor(answer)"
              @click="selectAnswer(answer)"
            >
              {{ key.toUpperCase() }}. {{ answer }}
            </v-btn>
          </template>
        </v-item>
      </v-item-group>

      <v-btn
        v-if="selectedAnswer"
        color="blue"
        class="mt-4"
        @click="reset"
        block
      >
        Intentar de nuevo
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'

const question = ref(null)
const selectedAnswer = ref(null)
const correctAnswer = 'Barcelona'

// Obtener los datos desde la API
const { data } = await useFetch('/api/equipos')
if (data.value?.length) {
  question.value = data.value[0]
}

// Acción al seleccionar respuesta
function selectAnswer(answer) {
  if (!selectedAnswer.value) {
    selectedAnswer.value = answer
  }
}

// Obtener color del botón
function getColor(answer) {
  if (!selectedAnswer.value) return 'primary'
  if (answer === correctAnswer) return 'green'
  if (answer !== correctAnswer && answer === selectedAnswer.value) return 'red'
  return 'grey'
}

// Reiniciar selección
function reset() {
  selectedAnswer.value = null
}
</script>
