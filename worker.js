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

    // === DEBUGGING ===
    console.log(`Angeforderter Pfad: ${pathname}`); // [1] Logge den Pfad

    // === CACHE-BUSTING ===
    if (pathname.match(/\?v=\d+/)) {
      pathname = pathname.split('?')[0]; // [2] Ignoriere Version-Parameter
    }

    if (!pathname.includes(".") && !pathname.endsWith("/")) {
      pathname += "/"; 
    }
    if (pathname.endsWith("/")) {
      pathname += "index.html"; 
    }

    const parts = pathname.slice(1).split(".");
    const ext = parts.length > 1 ? parts.pop().toLowerCase() : null;
    const prefix = parts.join(".") + ".";

    // === KV-ABFRAGE MIT DEBUG ===
    const { keys } = await env.__STATIC_CONTENT.list({ prefix, limit: 10 });
    console.log(`Gefundene Keys für ${prefix}:`, keys.map(k => k.name)); // [3]

    const key = keys.find(k => ext ? k.name.endsWith("." + ext) : true)?.name;
    
    if (!key) {
      console.error(`404: Kein Key für ${pathname}`); // [4]
      return new Response(`404 – kein Asset für ${pathname}`, { status: 404 });
    }

    // === CACHE-CONTROL HEADER ===
    const data = await env.__STATIC_CONTENT.get(key, { type: "arrayBuffer" });
    if (!data) {
      console.error(`404: Datei ${key} nicht im KV`); // [5]
      return new Response(`404 – Datei ${key} nicht geladen`, { status: 404 });
    }

    const headers = {
      "Content-Type": CT[ext] || "application/octet-stream",
      "Cache-Control": "no-cache, no-store, must-revalidate" // [6] Cache deaktivieren
    };

    console.log(`200: Geliefert ${key} als ${headers["Content-Type"]}`); // [7]
    return new Response(data, { status: 200, headers });
  }
};