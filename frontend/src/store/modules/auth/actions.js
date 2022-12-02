export default {
  async auth(context, payload) {
    const mode = payload.mode;
    let url = `${process.env.VUE_APP_API}user/${mode}`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: payload.username,
        password: payload.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw Error(data.error || 'There was an error.');
    }

    localStorage.setItem('VUE_JAVASCRIPT_NOTES-username', data.username);
    localStorage.setItem('VUE_JAVASCRIPT_NOTES-token', data.token);
    localStorage.setItem('VUE_JAVASCRIPT_NOTES-lastUpdated', data.lastUpdated);

    context.commit('setUser', {
      username: data.username,
      token: data.token,
      lastUpdated: data.lastUpdated,
    });
  },
  logout(context) {
    localStorage.removeItem('VUE_JAVASCRIPT_NOTES-username');
    localStorage.removeItem('VUE_JAVASCRIPT_NOTES-token');
    localStorage.removeItem('VUE_JAVASCRIPT_NOTES-lastUpdated');

    context.commit('setUser', {});
  },
  tryLogin(context) {
    const username = localStorage.getItem('VUE_JAVASCRIPT_NOTES-username');
    const token = localStorage.getItem('VUE_JAVASCRIPT_NOTES-token');
    const lastUpdated = localStorage.getItem('VUE_JAVASCRIPT_NOTES-lastUpdated');

    context.commit('setUser', {
      username,
      token,
      lastUpdated,
    });
  },
};
