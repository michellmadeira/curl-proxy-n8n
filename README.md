# curl-proxy-n8n

Microserviço simples que executa comandos `curl` via Node.js para ser utilizado com n8n, permitindo o parsing completo dos headers de resposta — especialmente útil para integrações como upload da Gemini API (Google).

---

## ✨ Como funciona

Este microserviço expõe um endpoint `/run-curl` que aceita:

- `url` (string)
- `headers` (array de strings)
- `method` (default: POST)
- `body` (objeto opcional)
- `secret` (opcional, para autenticação via variável `SECRET_KEY`)

---

## 📦 Deploy com 1 clique

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/michellmadeira/curl-proxy-n8n)

---

## 🔄 Exemplo de chamada via n8n

```json
{
  "url": "https://generativelanguage.googleapis.com/upload/v1beta/files?key=...",
  "headers": [
    "X-Goog-Upload-Protocol: resumable",
    "X-Goog-Upload-Command: start",
    "X-Goog-Upload-Header-Content-Type: application/pdf",
    "Content-Type: application/json"
  ],
  "method": "POST",
  "body": {},
  "secret": "michel-top-access"
}
