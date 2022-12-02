<template>
  <div class="about">
    <h1>This is a home page</h1>
    <p>{{ user }}</p>
    <v-btn @click="handleLogout" to="/login">logout</v-btn>
  </div>
</template>

<script setup>
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';

const store = useStore();

const user = computed(() => store.getters.username);

const handleLogout = () => store.dispatch('logout');
</script>
