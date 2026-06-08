# Open-Graph-Bilder in diesem Projekt

Diese Seite erzeugt ihre Open-Graph-Bilder nicht manuell als statische Grafikdateien, sondern baut sie beim Astro-Build automatisch aus einem zentralen Template. Dadurch bekommen alle wichtigen Seitentypen ein einheitliches Erscheinungsbild, ohne dass pro Seite eigene Bilddateien gepflegt werden müssen.

## Ziel des Setups

- Eine zentrale OG-Optik für die gesamte Website
- Automatische Generierung für statische Seiten, Blogposts, Portfolio-Projekte und Bewerbungsseiten
- Keine doppelte Pflege von Titel, Beschreibung und Bildinhalt
- Absolute OG-URLs in den Meta-Tags, damit Social-Plattformen die Bilder sauber auflösen können

## Architektur

Die Lösung besteht aus zwei Ebenen:

1. Ein zentrales Meta-Tag-Setup in den Layouts
2. Ein dynamischer Astro-Endpoint, der die OG-Bilder erzeugt

### 1. Meta-Tags in den Layouts

Die allgemeine Website nutzt [`src/layouts/BaseLayout.astro`](/Users/tgermer/git/tgermer-astro/src/layouts/BaseLayout.astro:1).

Dort passiert Folgendes:

- `ogImage` wird als Prop an das Layout übergeben
- relative Bildpfade wie `/og/blog.jpg` werden mit `new URL(..., Astro.site)` in absolute URLs umgewandelt
- daraus werden `og:image` und `twitter:image` gesetzt
- zusätzlich werden `og:title`, `og:description`, `og:type` und `og:url` gesetzt

Standardwert ist:

```astro
ogImage = "/assets/og-image.jpg"
```

Für Bewerbungsseiten gibt es ein separates Layout unter [`src/layouts/ResumeLayout.astro`](/Users/tgermer/git/tgermer-astro/src/layouts/ResumeLayout.astro:1). Das macht dasselbe Prinzip, aber mit reduziertem Head-Setup, weil diese Seiten nicht Teil des normalen öffentlichen Seitenaufbaus sind.

### 2. OG-Generator als Astro-Route

Die eigentliche Bildgenerierung liegt in [`src/pages/og/[...slug].ts`](/Users/tgermer/git/tgermer-astro/src/pages/og/[...slug].ts:1).

Die Route erzeugt Bilder für URLs wie:

- `/og/index.jpg`
- `/og/blog.jpg`
- `/og/blog/<slug>.jpg`
- `/og/portfolio.jpg`
- `/og/portfolio/<slug>.jpg`
- `/og/de/about.jpg`
- `/og/en/cv.jpg`
- `/og/apply/<slug>.jpg`

Die Bilder werden beim Build statisch erzeugt. Im gebauten Output liegen sie dann z. B. unter `dist/og/...`.

## Wie die Bilder erzeugt werden

Der Generator arbeitet in drei Schritten:

1. Daten sammeln
2. Layout als SVG rendern
3. SVG in JPEG umwandeln

### 1. Daten sammeln

Im Generator werden Inhalte aus mehreren Quellen zusammengeführt:

- statische Seiten aus [`src/data/pages.ts`](/Users/tgermer/git/tgermer-astro/src/data/pages.ts:1)
- sprachabhängige Seiten aus [`src/data/i18n.ts`](/Users/tgermer/git/tgermer-astro/src/data/i18n.ts:1)
- Blogposts aus der Collection `blog`
- Portfolio-Projekte aus der Collection `portfolio`
- Bewerbungen aus der Collection `apply`

Diese Daten werden in `ogPages` als Mapping `slug -> { title, description, icon? }` vorbereitet.

Wichtig dabei:

- Blog-OGs verwenden automatisch `post.data.title` und `post.data.description`
- Portfolio-OGs können zusätzlich ein Projekt-Icon als Overlay bekommen
- Bewerbungs-OGs bauen ihren Titel dynamisch aus `position`, `company`, `initiative` und `lang`

### 2. Layout als SVG rendern

Die Funktion `renderOgImage(page)` baut das eigentliche Kartenlayout.

Das Template ist bewusst zentralisiert und für alle Seitentypen gleich:

- blauer Verlauf als Hintergrund
- schmale helle Akzentleiste links
- Textblock links
- ausgeschnittenes Foto rechts aus [`src/assets/og/og-image-part.jpg`](/Users/tgermer/git/tgermer-astro/src/assets/og/og-image-part.jpg)
- optionales Icon-Overlay bei Portfolio-Seiten

Zusätzlich gibt es einfache Schutzlogik für lange Texte:

- Titel werden ab 80 Zeichen gekürzt
- Beschreibungen werden ab 100 Zeichen gekürzt
- bei langen Titeln wird die Beschreibung ganz ausgeblendet, damit sich Textblöcke nicht überlagern

Das Rendering des SVGs übernimmt `satori`.

### 3. SVG in JPEG umwandeln

Nach dem SVG-Render passiert die Konvertierung in zwei weiteren Schritten:

- `@resvg/resvg-js` rendert das SVG zu PNG
- `sharp` wandelt das PNG in JPEG um

Das finale Bild hat:

- Format: `1200 x 630`
- Ausgabe: JPEG
- Qualität: `80`

Die Response bekommt außerdem ein aggressives Cache-Header-Setup:

```ts
"Cache-Control": "public, max-age=31536000, immutable"
```

## Eingesetzte Libraries

Die OG-Pipeline nutzt im Wesentlichen:

- `satori` für das deklarative Bildlayout
- `@resvg/resvg-js` für SVG -> PNG
- `sharp` für PNG -> JPEG

In diesem Repo sind `satori` und `@resvg/resvg-js` direkte Abhängigkeiten in [`package.json`](/Users/tgermer/git/tgermer-astro/package.json:1). `sharp` wird im Endpoint ebenfalls direkt importiert und zur JPEG-Konvertierung genutzt; verfügbar ist es in der aktuellen Installation ebenfalls.

Zusätzlich werden Schriftdateien direkt aus `@fontsource/ibm-plex-sans` geladen, damit das Bildlayout dieselbe Typografie nutzt wie die Seite.

## Wie eine Seite ihr OG-Bild bekommt

Normale Seiten übergeben einfach ihren OG-Pfad an das Layout.

Beispiele:

- Startseite in [`src/pages/index.astro`](/Users/tgermer/git/tgermer-astro/src/pages/index.astro:17): `ogImage="/og/index.jpg"`
- Blog-Übersicht in [`src/pages/blog.astro`](/Users/tgermer/git/tgermer-astro/src/pages/blog.astro:14): `ogImage="/og/blog.jpg"`
- Portfolio-Übersicht in [`src/pages/portfolio.astro`](/Users/tgermer/git/tgermer-astro/src/pages/portfolio.astro:15): `ogImage="/og/portfolio.jpg"`
- Referenzen in [`src/pages/references.astro`](/Users/tgermer/git/tgermer-astro/src/pages/references.astro:39): `ogImage="/og/references.jpg"`
- Tools in [`src/pages/tools.astro`](/Users/tgermer/git/tgermer-astro/src/pages/tools.astro:6): `ogImage="/og/tools.jpg"`

Für dynamische Detailseiten wird der Pfad aus dem Slug gebaut:

- Blogpost: [`src/pages/blog/[slug].astro`](/Users/tgermer/git/tgermer-astro/src/pages/blog/[slug].astro:31)
- Portfolio-Detail: [`src/pages/portfolio/[slug].astro`](/Users/tgermer/git/tgermer-astro/src/pages/portfolio/[slug].astro:21)
- Bewerbung: [`src/pages/apply/[slug].astro`](/Users/tgermer/git/tgermer-astro/src/pages/apply/[slug].astro:156)

Das Entscheidende ist: Die Seite selbst rendert das Bild nicht. Sie verweist nur auf eine URL unter `/og/...`. Der eigentliche Bildinhalt kommt zentral aus dem OG-Endpoint.

## Was beim Build passiert

Über `getStaticPaths()` in [`src/pages/og/[...slug].ts`](/Users/tgermer/git/tgermer-astro/src/pages/og/[...slug].ts:239) werden alle OG-Ziele vorab definiert.

Für jedes definierte Ziel erzeugt Astro beim Build eine echte Datei. Im bestehenden Build-Output sieht man das bereits, z. B.:

- `dist/og/index.jpg`
- `dist/og/blog.jpg`
- `dist/og/blog/2026-02-17-wie-ich-zum-vibe-coding-kam.jpg`
- `dist/og/portfolio/clearcontrol.jpg`
- `dist/og/apply/tq1w2h.jpg`

Das Setup ist also build-time-generated, nicht on-demand per Runtime-Server.

## Vorteile dieses Ansatzes

- Ein zentrales Design für alle Social-Preview-Bilder
- Neue Inhalte bekommen automatisch ein passendes OG-Bild
- Titel und Beschreibungen kommen direkt aus den eigentlichen Inhaltsdaten
- Kein manuelles Exportieren von Social-Grafiken
- Build-Artefakte sind statisch und CDN-freundlich

## Grenzen des aktuellen Setups

- Alle Seitentypen teilen sich dieselbe Grundoptik
- Das Template ist bewusst eher simpel und textbasiert
- Es gibt aktuell keine per-Page individuellen Hintergrundbilder
- Lange Titel werden pragmatisch gekürzt statt typografisch komplex umgebrochen

Für dieses Projekt ist das sinnvoll, weil Konsistenz wichtiger ist als individuelle Key Visuals.

## Wie man das Muster in ein anderes Projekt überträgt

Die übertragbare Grundidee ist:

1. Ein zentrales OG-Template bauen
2. Alle relevanten Seiten-/Content-Daten in einer Mapping-Struktur sammeln
3. Für jede Zielseite einen stabilen `/og/...`-Pfad erzeugen
4. Diesen Pfad in den globalen Meta-Tags verwenden
5. Die Bilder bereits beim Build als statische Dateien ausgeben

Wenn du das in einem anderen Astro-Projekt nachbauen willst, brauchst du im Kern:

- eine Route wie `src/pages/og/[...slug].ts`
- ein einheitliches `renderOgImage()`-Template
- `getStaticPaths()` für alle gewünschten OG-Ziele
- ein Layout, das `ogImage` in absolute URLs umwandelt und in `og:image` bzw. `twitter:image` schreibt

## Kurzfassung

Die Website nutzt ein zentrales, build-time generiertes OG-System. Seiten verweisen nur auf `/og/...`-Pfade, und ein Astro-Endpoint erzeugt daraus aus Inhaltsdaten automatisch JPEGs im Format `1200 x 630`. Gerendert wird mit `satori`, `resvg` und `sharp`, eingebunden wird das Ergebnis über die globalen Layout-Meta-Tags.
