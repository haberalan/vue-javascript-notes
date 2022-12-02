<template>
  <v-container class="mt-16 align-self-start container" full-height>
    <v-progress-circular indeterminate v-if="loading" />
    <p v-else-if="!loading && error" class="d-flex justify-center text-h5 mt-16">{{ error }}</p>
    <div v-else-if="!loading && !error && items.length === 0" class="d-flex flex-column justify-center align-center">
      <p class="text-h5 mt-16">You don't have any notes.</p>
      <v-btn to="/new" class="mt-4" size="x-large" variant="plain">New note</v-btn>
    </div>
    <notes-list v-else />
  </v-container>
</template>

<script setup>
import { computed, onMounted, ref } from '@vue/runtime-core';
import { useStore } from 'vuex';

import NotesList from '../components/notes/NotesList.vue';

const store = useStore();

// Fetch notes
const loading = ref(false);
const error = ref(null);

const items = computed(() => store.getters['notes/notes']);

onMounted(async () => {
  if (items.value.length === 0) {
    loading.value = true;
    try {
      await store.dispatch('notes/getNotes');
    } catch (err) {
      error.value = err;
    }

    loading.value = false;
  }
});
</script>

<style scoped>
.container {
  max-width: 1300px;
}
</style>
