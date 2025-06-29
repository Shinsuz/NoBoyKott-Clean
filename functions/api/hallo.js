export async function onRequestGet(context) {
  return new Response("Hallo 👋 – alles läuft!", {
    headers: { "Content-Type": "text/plain" }
  });
}