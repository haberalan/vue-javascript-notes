<template>
  <v-card class="py-3 px-1 text-left d-flex flex-column justify-space-between" max-width="360" height="200">
    <v-card-title>
      <h2 class="text-h4 text-truncate">{{ props.title }}</h2>
      <p class="text-overline text-truncate">{{ dateToNow(props.updatedAt) }} AGO</p>
    </v-card-title>
    <v-card-text>
      <p class="text-body-1 text-truncate">{{ props.text }}...</p>
    </v-card-text>
    <v-card-actions class="d-flex justify-end">
      <v-btn :to="`/note/${props.id}`">OPEN</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { defineProps } from 'vue';
import { formatDistanceToNow } from 'date-fns';

const dateToNow = (val) => formatDistanceToNow(new Date(val));

const props = defineProps({
  id: String,
  title: String,
  text: String,
  updatedAt: String,
});
</script>
