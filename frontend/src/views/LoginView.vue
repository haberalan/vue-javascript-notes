<template>
  <v-card min-width="280" max-width="360" class="py-3 px-6">
    <v-form @submit.prevent="handleSubmit" v-model="formValid">
      <v-row noGutters>
        <v-col cols="12" class="mb-8 text-center">
          <h1 class="text-h3">Notes</h1>
        </v-col>
        <v-col cols="12" class="mb-2">
          <v-text-field label="Username" variant="outlined" :rules="[rules.required, rules.login]" type="text" v-model="enteredUsername"></v-text-field>
        </v-col>
        <v-col cols="12" class="mb-2">
          <v-text-field
            label="Password"
            variant="outlined"
            :rules="[rules.required, rules.password]"
            :type="showPassword ? 'text' : 'password'"
            v-model="enteredPassword"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="handleToggleShowPassword"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" class="my-4 d-flex justify-center">
          <v-btn size="large" class="text-h5 font-weight-medium" type="submit" :disabled="!formValid" :loading="loading" color="app1">LOGIN</v-btn>
        </v-col>
        <v-col cols="12" v-if="error" class="mb-4">
          <p class="text-center text-error font-weight-medium">{{ error }}</p>
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
          <v-btn to="/signup" variant="plain" class="text-black">Don't have an account? Signup</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

// Toggle show password
const showPassword = ref(false);

const handleToggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

// Login input
const enteredUsername = ref('');

// Password input
const enteredPassword = ref('');

// Validation
const rules = {
  required: (val) => !!val || 'Field is required.',
  login: (val) => val.length >= 3 || 'Login must have at least 3 chars.',
  password: (val) => val.length >= 3 || 'Password must have at least 3 chars.',
};

// Handle submit and validation
const formValid = ref(false);
const loading = ref(false);
const error = ref(null);

const store = useStore();
const router = useRouter();

const handleSubmit = async () => {
  loading.value = true;
  error.value = null;

  try {
    await store.dispatch('auth', {
      username: enteredUsername,
      password: enteredPassword,
      mode: 'login',
    });

    router.replace('/');
  } catch (err) {
    error.value = err;
    enteredPassword.value = '';
  }

  loading.value = false;
};
</script>
