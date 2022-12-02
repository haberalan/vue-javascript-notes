<template>
  <v-container justify="center" align="center">
    <v-card max-width="440" class="text-left pa-3">
      <v-form @submit.prevent="handleSubmit" v-model="formValid">
        <v-card-title>
          <h2 class="text-center center text-h3 mb-8">New note</h2>
          <v-text-field v-model="enteredTitle" class="title-height mb-8" variant="outlined" label="Title" :rules="[rules.title]" />
        </v-card-title>
        <v-card-text>
          <v-textarea v-model="enteredText" class="text-height" no-resize variant="outlined" label="Text" counter persistent-counter :rules="[rules.text]" />
        </v-card-text>
        <v-card-actions class="d-flex justify-center mt-8">
          <v-btn type="submit" :disabled="!formValid" :loading="loading" color="app1" variant="elevated">ADD</v-btn>
        </v-card-actions>
        <p v-if="error" class="text-h5">{{ error }}</p>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();

// Fetching item
const loading = ref(false);
const error = ref(null);

const enteredTitle = ref('');
const enteredText = ref('');

// Delete
const router = useRouter();

// Validation and updating item
const rules = {
  title: (val) => (val.length >= 3 && val.length <= 30) || 'Title must be in 3-30 chars.',
  text: (val) => (val.length >= 3 && val.length <= 255) || 'Text must be in 3-255 chars.',
};

const formValid = ref(true);

const handleSubmit = async () => {
  if (formValid.value) {
    loading.value = true;
    try {
      const id = await store.dispatch('notes/createNote', {
        title: enteredTitle.value,
        text: enteredText.value,
      });

      router.push(`/note/${id}`);
    } catch (err) {
      error.value = err;
    }
  }

  loading.value = false;
};
</script>

<style scoped>
.title-height {
  max-height: 60px;
  height: 60px;
}

.text-height {
  max-height: 140px;
  height: 140px;
}
</style>
