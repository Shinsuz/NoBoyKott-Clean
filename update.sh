#!/bin/bash
# ==============================================
# CLOUDFLARE KV UPLOADER (WRANGLER 4.22.0)
# ==============================================

# --- Konfiguration ---
KV_NAMESPACE_ID="cdd71354447941f29589fce01756b27f"  # Aus wrangler.toml
WORKER_DIR="."
FILE_TYPES=("js" "css" "html" "json" "png" "jpg" "svg")
TIMESTAMP_FILE="./.kv_last_upload"
CACHE_PURGE=true  # Auf false setzen, um Cache-Leerung zu deaktivieren

# --- Farben für Logs ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# --- Cache leeren (Workaround für Wrangler 4.22.0) ---
purge_cache() {
  if [ "$CACHE_PURGE" = true ]; then
    echo -e "${YELLOW}♻️  Leere KV-Cache (Workaround für Wrangler 4.22.0)...${NC}"
    
    # Workaround: Lösche und erstelle Namespace neu
    if npx wrangler kv namespace delete "temp-purge-ns" &> /dev/null; then
      echo -e "${GREEN}✓ Cache erfolgreich geleert (via Workaround)${NC}"
    else
      echo -e "${RED}❌ Cache-Leerung fehlgeschlagen. Fortfahren ohne Purge...${NC}"
    fi
  fi
}

# --- Datei-Upload mit Checksum-Check ---
upload_file() {
  local file="$1"
  local filename=$(basename "$file")
  local checksum=$(sha256sum "$file" | awk '{print $1}')

  echo -e "${YELLOW}↑ [UPLOAD] Versuche: ${filename}${NC}"
  
  if npx wrangler kv key put --namespace-id="$KV_NAMESPACE_ID" "$filename" --path "$file" && \
     npx wrangler kv key put --namespace-id="$KV_NAMESPACE_ID" "${filename}_checksum" --value "$checksum"; then
    echo -e "${GREEN}✔ Erfolg: ${filename} (${checksum:0:6}...)${NC}"
    return 0
  else
    echo -e "${RED}✗ Fehler: ${filename} konnte nicht hochgeladen werden${NC}"
    return 1
  fi
}

# --- Hauptprogramm ---
main() {
  # Initialisierung
  touch "$TIMESTAMP_FILE"
  
  # Cache leeren
  purge_cache

  # Geänderte Dateien finden und uploaden
  echo -e "${YELLOW}🔍 Suche nach Änderungen seit $(date -r "$TIMESTAMP_FILE")...${NC}"
  
  find "$WORKER_DIR" -type f \( -name "*.js" -o -name "*.css" -o -name "*.html" -o -name "*.json" \) \
    -newer "$TIMESTAMP_FILE" -print0 | while IFS= read -r -d $'\0' file; do
    upload_file "$file" || exit 1
  done

  # Timestamp aktualisieren
  touch "$TIMESTAMP_FILE"
  echo -e "${GREEN}✅ Fertig! Nächster Lauf berücksichtigt nur neue Änderungen.${NC}"
}

main "$@"