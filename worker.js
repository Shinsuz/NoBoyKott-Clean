const CT = {
  html: "text/html; charset=UTF-8",
  css:  "text/css; charset=UTF-8",
  js:   "application/javascript",
  json: "application/json",
  png:  "image/png",
  jpg:  "image/jpeg",
  jpeg: "image/jpeg",
  svg:  "image/svg+xml",
  mp3:  "audio/mpeg",
  mp4:  "video/mp4"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let pathname = url.pathname;

    // ✨ Rewrite für Ordnerpfade wie /Wissen oder /Nasheeds
    if (!pathname.includes(".") && !pathname.endsWith("/")) {
      pathname += "/"; // mache z.B. /Wissen → /Wissen/
    }
    if (pathname.endsWith("/")) {
      pathname += "index.html"; // z.B. /Wissen/ → /Wissen/index.html
    }

    const parts = pathname.slice(1).split(".");
    const ext   = parts.length > 1 ? parts.pop().toLowerCase() : null;
    const prefix = parts.join(".") + ".";

    // Suche hash-Datei im KV
    const { keys } = await env.__STATIC_CONTENT.list({ prefix, limit: 10 });
    const key = keys.find(k => ext ? k.name.endsWith("." + ext) : true)?.name;

    if (!key) {
      return new Response(`404 – kein Asset für ${pathname}`, { status: 404 });
    }

    const data = await env.__STATIC_CONTENT.get(key, { type: "arrayBuffer" });
    if (!data) {
      return new Response(`404 – Datei ${key} nicht geladen`, { status: 404 });
    }

    const contentType = CT[ext] || "application/octet-stream";
    return new Response(data, {
      status: 200,
      headers: { "Content-Type": contentType }
    });
  }
};
