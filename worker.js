export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    let pathname = url.pathname === "/" ? "/index.html" : url.pathname

    try {
      const asset = await env.ASSETS.fetch(new Request(pathname, request))
      return asset
    } catch (e) {
      return new Response("404 – Datei nicht gefunden", { status: 404 })
    }
  }
}
