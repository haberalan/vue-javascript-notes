<template>
  <v-app>
    <router-view v-slot="{ Component }" name="header">
      <transition name="scroll-y-transition" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <v-main class="d-flex justify-center align-center">
      <router-view v-slot="{ Component }">
        <transition name="scroll-y-transition" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>
    <the-footer />
  </v-app>
</template>

<script setup>
import TheFooter from './components/layout/TheFooter.vue';
</script>
