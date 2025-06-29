export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    const path = url.pathname === "/" ? "/index.html" : url.pathname

    try {
      return await env.ASSETS.fetch(new Request(path, request))
    } catch (err) {
      return new Response("404 – Datei nicht gefunden", { status: 404 })
    }
  }
}
