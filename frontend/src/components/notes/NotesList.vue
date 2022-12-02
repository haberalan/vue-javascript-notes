<template>
  <v-row>
    <v-col cols="12" md="6" lg="4" v-for="item in items" :key="item._id" align="center" justify="center">
      <notes-list-item :id="item._id" :title="item.title" :text="item.text" :updatedAt="item.updatedAt" />
    </v-col>
    <v-col cols="12" md="6" lg="4" align="center" justify="center" class="d-flex justify-center align-center new-note">
      <v-btn size="x-large" variant="plain" to="/new">New note</v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';

import NotesListItem from './NotesListItem.vue';

const store = useStore();

const items = computed(() => store.getters['notes/notes']);
</script>

<style scoped>
.new-note {
  height: 200px;
}
</style>
