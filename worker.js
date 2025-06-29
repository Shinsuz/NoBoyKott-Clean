export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname === "/" ? "/index.html" : url.pathname;
    return await env.__STATIC_CONTENT.fetch(new Request(path, request));
  }
}
