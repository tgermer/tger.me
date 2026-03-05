---
title: ClearControl.
description: Webbasiertes Design-Tool für konsistente Beschriftungen von Smart-Home-Fernbedienungen – visuell und direkt im Browser.
featured: true
technologies: React, TypeScript, Vite, CSS Modules, i18next, jsPDF, JSZip
date: 2026-02-01
image: ../../assets/portfolio/clearcontrol.png
linkGithub: https://github.com/tgermer/ha-remote-designer
linkWebsite: https://clearcontrol.de
type: Website, WebApp
aiBuilt: true
---

**ClearControl** ist ein webbasiertes Design-Tool zur Erstellung einfacher, konsistenter Beschriftungen für physische Smart-Home-Fernbedienungen. Wer mit erweiterten Automatisierungen arbeitet – Single Press, Double Press, Long Press – verliert schnell den Überblick, welche Taste was auslöst. ClearControl löst genau dieses Problem.

## Herausforderung

Moderne Smart-Home-Fernbedienungen können pro Taste mehrere Aktionen auslösen. Ohne klare Beschriftung vergessen selbst erfahrene Nutzer schnell die Belegung – besonders bei selten genutzten Szenen oder Geräten. Bisherige Lösungen erforderten externe Design-Software und waren aufwändig.

## Lösung

ClearControl bietet einen intuitiven Editor direkt im Browser: Labels gestalten, Icons auswählen, druckfertige Vorlagen exportieren – ohne Design-Kenntnisse.

## Features

- **Label-Editor** – Einfache Gestaltung ohne externe Design-Software
- **Icon-Bibliothek** – Material Design Icons und optionale Philips Hue Icons mit individuellen Farben
- **Preset-Galerie** – Echte Beispielkonfigurationen als Startpunkt
- **Druckfertige Exporte** – SVG-Labels, PDF-Aufkleber-Sheets (A4/Letter) und Multi-Page SVG-ZIP
- **Lokale Speicherung** – Mehrere Fernbedienungen direkt im Browser verwalten, JSON-Backup per Export/Import
- **Teilbare Links** – Konfigurationen per URL teilen

## Technologien

- **React 19** – UI-Framework mit TypeScript
- **Vite 7** – Build-Tool und Dev-Server
- **i18next** – Internationalisierung (Deutsch & Englisch) mit Browser-Language-Detection
- **Tabler Icons & Material Design Icons** – Icon-Bibliotheken, ergänzt durch eigene Hue-Icons (SVG)
- **CSS Modules** – Modulares Styling ohne UI-Framework
- **jsPDF / svg2pdf.js** – PDF-Export direkt im Browser
- **JSZip** – ZIP-Download für Multi-Page SVG-Exporte
- **lz-string** – URL-basierter State für teilbare Design-Links
- **Plausible Analytics** – Datenschutzfreundliches Tracking
