<template>
  <v-card min-width="280" max-width="360" class="py-3 px-6">
    <v-form @submit.prevent="handleSubmit" v-model="formValid">
      <v-row noGutters>
        <v-col cols="12" class="mb-8 text-center">
          <h1 class="text-h3">Notes</h1>
        </v-col>
        <v-col cols="12" class="mb-2">
          <v-text-field
            label="Username"
            variant="outlined"
            :rules="[rules.required, rules.login]"
            type="text"
            v-model="enteredUsername"
            hint="Must be in range of 3-30 chars."
          ></v-text-field>
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
            hint="Must contain symbol, number, sign and 8 chars."
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" class="mb-2">
          <v-text-field
            label="Confirm Password"
            variant="outlined"
            :rules="[rules.required, rules.confirmPassword]"
            :type="showPassword ? 'text' : 'password'"
            v-model="enteredConfirmPassword"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="handleToggleShowPassword"
            hint="Passwords must be the same."
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" class="my-4 d-flex justify-center">
          <v-btn size="large" class="text-h5 font-weight-medium" type="submit" :disabled="!formValid" :loading="loading" color="app1">SIGNUP</v-btn>
        </v-col>
        <v-col cols="12" v-if="error" class="mb-4">
          <p class="text-center text-error font-weight-medium">{{ error }}</p>
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
          <v-btn to="/login" variant="plain" class="text-black">Already have an account? Login</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

// Toggle show password
const showPassword = ref(false);

const handleToggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

// Login input
const enteredUsername = ref('');

// Password input
const enteredPassword = ref('');

// Confirm Password input
const enteredConfirmPassword = ref('');

// Validation
const rules = {
  required: (val) => !!val || 'Field is required.',
  login: (val) => val.length >= 3 || val.length <= 30 || 'Must be in range of 3-30 chars.',
  password: (val) =>
    (val.length >= 8 &&
      val.length < 50 &&
      // eslint-disable-next-line
      /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(val) &&
      /[a-z]/.test(val) &&
      /[A-Z]/.test(val) &&
      /[0-9]/.test(val)) ||
    'Must contain symbol, number, sign and 8 chars.',
  confirmPassword: (val) => (val.length >= 8 && val === enteredPassword.value) || 'Passwords must be the same.',
};

// Handle submit and form validation
const formValid = ref(false);
const loading = ref(false);
const error = ref(false);

const store = useStore();
const router = useRouter();

const handleSubmit = async () => {
  loading.value = true;
  error.value = null;

  try {
    await store.dispatch('auth', {
      username: enteredUsername,
      password: enteredPassword,
      mode: 'signup',
    });

    router.replace('/');
  } catch (err) {
    error.value = err;
    enteredPassword.value = '';
    enteredConfirmPassword.value = '';
  }

  loading.value = false;
};
</script>
