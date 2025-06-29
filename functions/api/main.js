export default {
  async fetch(request) {
    return new Response("Hallo – Worker funktioniert!", {
      headers: { "Content-Type": "text/plain" },
    });
  }
};
