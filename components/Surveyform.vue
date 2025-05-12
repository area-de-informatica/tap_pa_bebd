
<template>
  <v-container v-if="question">
    <v-card class="mx-auto pa-4" max-width="flex" elevation="2" theme="dark">
      <v-card-title class="text-h6">
        {{ question.question }}
      </v-card-title>

      <v-card-text>
        <v-row dense>
          <v-col
            v-for="answer in question.answers"
            :key="answer.id"
            cols="12"
          >
            <v-btn
              block
              color="primary"
              @click="selectAnswer(answer)"
            >
              {{ answer.a }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title :class="selectedAnswer?.title === 'correct' ? 'text-success' : 'text-error'">
          {{ selectedAnswer?.title === 'correct' ? '✅ Correcto' : '❌ Incorrecto' }}
        </v-card-title>
        <v-card-text>
          {{ selectedAnswer?.just }}
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text="Cerrar" @click="dialog = false" />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>

  <div v-else class="text-center py-10">
    <v-progress-circular indeterminate color="primary" />
    <p>Cargando pregunta...</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const question = ref(null)
const dialog = ref(false)
const selectedAnswer = ref(null)

const { data, error } = await useFetch('/api/equipos')

if (data.value) {
  const found = data.value.find(q => q.id === 2 && q.type === 'form')
  if (found) {
    question.value = found
  }
}

function selectAnswer(answer) {
  selectedAnswer.value = answer
  dialog.value = true
}
</script>
