<template>
  <v-container justify="center" align="center">
    <v-progress-circular indeterminate v-if="loading || deleted" />
    <p v-else-if="!loading && error">{{ error }}</p>
    <p v-else-if="!loading && !error && !item">The note you are looking for doesn't exist.</p>
    <v-card v-else max-width="440" class="text-left pa-3">
      <v-form @submit.prevent="handleSubmit" v-model="formValid">
        <v-card-title>
          <p class="text-overline mb-4">LAST EDIT {{ dateToNow(item.updatedAt) }} ago</p>
          <h2 class="text-h4 title-height" v-if="!editing">{{ item.title }}</h2>
          <v-text-field v-else v-model="enteredTitle" class="title-height mb-8" variant="outlined" label="Title" :rules="[rules.title]" />
        </v-card-title>
        <v-card-text>
          <p v-if="!editing" class="text-height">{{ item.text }}</p>
          <v-textarea
            v-else
            v-model="enteredText"
            class="text-height"
            no-resize
            variant="outlined"
            label="Text"
            counter
            persistent-counter
            :rules="[rules.text]"
          />
        </v-card-text>
        <v-card-actions class="d-flex justify-space-between mt-8">
          <v-btn v-if="!editing" @click="handleEdit">EDIT</v-btn>
          <v-btn v-if="!editing" icon="mdi-delete" @click="handleDelete" color="app1" />
          <v-btn v-if="editing" @click="handleEdit">CANCEL</v-btn>
          <v-btn v-if="editing" color="app1" variant="elevated" type="submit" :disabled="!formValid">SAVE</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { computed, defineProps, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { formatDistanceToNow } from 'date-fns';

const props = defineProps({
  id: String,
});

const store = useStore();

// Fetching item
const loading = ref(false);
const error = ref(null);

const item = computed(() => store.getters['notes/note'](props.id));

const dateToNow = (val) => formatDistanceToNow(new Date(val));

onMounted(async () => {
  if (!item.value) {
    loading.value = true;
    try {
      await store.dispatch('notes/getNotes');
    } catch (err) {
      error.value = err;
    }
  }

  loading.value = false;
});

// Edit
const editing = ref(false);

const handleEdit = () => {
  editing.value = !editing.value;
  enteredTitle.value = item.value.title;
  enteredText.value = item.value.text;
};

const enteredTitle = ref('');
const enteredText = ref('');

// Delete
const router = useRouter();

const deleted = ref(false);

const handleDelete = async () => {
  try {
    await store.dispatch('notes/deleteNote', { id: item.value._id });
    deleted.value = true;
    router.push('/');
  } catch (err) {
    error.value = err;
  }
};

// Validation and updating item
const rules = {
  title: (val) => (val.length >= 3 && val.length <= 30) || 'Title must be in 3-30 chars.',
  text: (val) => (val.length >= 3 && val.length <= 255) || 'Text must be in 3-255 chars.',
};

const formValid = ref(true);

const handleSubmit = async () => {
  if (formValid.value) {
    loading.value = true;
    editing.value = false;
    try {
      await store.dispatch('notes/updateNote', {
        id: item.value._id,
        title: enteredTitle.value,
        text: enteredText.value,
      });
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
