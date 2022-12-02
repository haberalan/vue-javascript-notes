<template>
  <v-container class="d-flex justify-space-between align-center">
    <router-link to="/" class="text-h4 text-lg-h3 font-weight-medium link">Notes</router-link>
    <v-btn variant="text" class="mx-1 text-h5 font-weight-medium" @click="handleLogout">LOGOUT</v-btn>
  </v-container>
</template>

<script setup>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();

const router = useRouter();

const handleLogout = () => {
  store.dispatch('logout');
  store.dispatch('notes/clearNotes');

  router.replace('/login');
};
</script>

<style scoped>
.link {
  color: inherit;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
}
.link:hover {
  color: #616161;
}
</style>
