# GitHub Pages Deployment für Slidev

## 🚀 Setup-Anleitung

### 1. GitHub Pages aktivieren

1. Gehe zu deinem Repository auf GitHub
2. Klicke auf **Settings** (Einstellungen)
3. Navigiere zu **Pages** (im linken Menü unter "Code and automation")
4. Unter **Source** wähle: **GitHub Actions**

### 2. Deployment auslösen

Der Workflow wird automatisch getriggert, wenn du einen Tag mit `v` am Anfang erstellst:

```bash
# Erstelle einen Tag lokal
git tag v1.0.0

# Pushe den Tag zu GitHub
git push origin v1.0.0
```

### 3. Alternative Tag-Formate

Der Workflow unterstützt alle Tags, die mit `v` beginnen:
- `v1.0.0` ✅
- `v2.1.3` ✅
- `v1.0.0-beta` ✅
- `v2023.11.20` ✅
- `version1.0` ❌ (startet nicht mit 'v')

### 4. Deployment überprüfen

1. Gehe zu **Actions** in deinem Repository
2. Warte bis der Workflow "Deploy Slidev to GitHub Pages" abgeschlossen ist (grüner Haken ✅)
3. Deine Präsentation ist verfügbar unter:
   ```
   https://<username>.github.io/<repository-name>/
   ```
   Beispiel: `https://secorvo-jen.github.io/prompting-intro/`

### 5. Neues Release erstellen

Für eine neue Version:

```bash
# Committen und pushen aller Änderungen
git add .
git commit -m "Update presentation"
git push

# Neuen Tag erstellen und pushen
git tag v1.1.0
git push origin v1.1.0
```

## 🔧 Workflow-Details

### Was passiert beim Deployment?

1. **Trigger**: Tag mit `v*` wird gepusht
2. **Build**:
   - Repository wird ausgecheckt
   - Node.js 20 wird installiert
   - Dependencies werden installiert (`npm ci`)
   - Slidev-Präsentation wird gebaut (`npm run build`)
3. **Deploy**:
   - Gebaufte Dateien werden als Artifact hochgeladen
   - GitHub Pages wird automatisch aktualisiert

### Build-Output

- Gebaute Dateien befinden sich in `./dist`
- Enthält: HTML, CSS, JavaScript und Assets
- Vollständig statische Website (keine Server nötig)

## 📝 Troubleshooting

### Fehler: "Pages not enabled"
→ Stelle sicher, dass GitHub Pages in den Repository-Settings aktiviert ist (siehe Schritt 1)

### Fehler: "Permission denied"
→ Überprüfe, dass der Workflow die richtigen Permissions hat (sollte automatisch gesetzt sein)

### Fehler: "Build failed"
→ Überprüfe lokal mit `npm run build`, ob die Präsentation korrekt baut

### Deployment dauert lange
→ Erster Deployment kann 2-5 Minuten dauern, spätere sind schneller

## 🎨 Anpassungen

### Workflow manuell triggern

Falls du den Workflow auch manuell starten möchtest, füge dies hinzu:

```yaml
on:
  push:
    tags:
      - 'v*'
  workflow_dispatch:  # Ermöglicht manuelles Triggern
```

### Base Path anpassen

Falls deine Präsentation nicht im Root veröffentlicht wird:

In `vite.config.ts`:
```typescript
export default {
  base: '/prompting-intro/',  // Dein Repository-Name
}
```

## 📚 Ressourcen

- [GitHub Pages Dokumentation](https://docs.github.com/en/pages)
- [Slidev Dokumentation](https://sli.dev/)
- [GitHub Actions Dokumentation](https://docs.github.com/en/actions)
