export default {
  async getNotes(context) {
    const res = await fetch(process.env.VUE_APP_API + 'notes/all', {
      headers: {
        Authorization: `Bearer ${context.rootGetters.token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'There was an error.');
    }

    context.commit('setNotes', { items: data });
  },
  async createNote(context, payload) {
    console.log('creating');
    const res = await fetch(process.env.VUE_APP_API + 'notes/create', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${context.rootGetters.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: payload.title,
        text: payload.text,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'There was an error.');
    }

    context.commit('addNote', { item: data });

    return data._id;
  },
  async updateNote(context, payload) {
    const res = await fetch(process.env.VUE_APP_API + 'notes/update/' + payload.id, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${context.rootGetters.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: payload.title,
        text: payload.text,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'There was an error.');
    }

    context.commit('updateNote', { item: { ...data, title: payload.title, text: payload.text } });
  },
  async deleteNote(context, payload) {
    const res = await fetch(process.env.VUE_APP_API + 'notes/delete/' + payload.id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${context.rootGetters.token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'There was an error.');
    }

    context.commit('removeNote', { item: data });
  },
  async clearNotes(context) {
    context.commit('setNotes', { items: [] });
  },
};
