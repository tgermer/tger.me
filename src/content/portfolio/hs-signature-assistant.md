---
title: HS-Signature-Assistant.
description: Digitale Unterschriften für Hochschulen – direkt im Browser statt mit InDesign und Kommandozeile. In Minuten statt Stunden.
featured: true
technologies: React, TypeScript, Vite, Tailwind CSS, perfect-freehand, pdf-lib, JSZip
date: 2026-02-24
icon: /assets/hs-signature-assistant-icon.svg
image: ../../assets/portfolio/hs-signature-assistant-icon.svg
imageBackgroundColor: "#6d5cc6"
linkWebsite: https://signature.tger.me
type: Website, WebApp
aiBuilt: true
---

Der **HS-Signature-Assistant** digitalisiert den gesamten Unterschriften-Prozess für Hochschulen. Statt Hauspost, Scanner, Photoshop, InDesign und Kommandozeile erledigen Dozierende ihre Unterschrift in wenigen Klicks direkt im Browser – inklusive automatischem Export in alle benötigten Formate.

## Herausforderung: Ein technischer Hürdenlauf

Der bisherige Prozess für Dozierenden-Unterschriften war aufwändig und fehleranfällig:

- **Post-Chaos**: Warten auf Hauspost oder Briefe vom Dozierenden.
- **Grafik-Werkstatt**: Scannen, Freistellen in Photoshop, manuelle Vektorisierung in InDesign und mühsames Bereinigen.
- **IT-Marathon**: Export in vier Formate (PDF, SVG, PNG, EMF) und Konvertierung über die Kommandozeile mit Inkscape.

Ein einzelner Vorgang konnte so bis zu einer Stunde dauern.

## Lösung: Ein neuer Workflow in vier Schritten

1. **Link versenden** – Ein personalisierter Link wird per E-Mail an den Dozierenden geschickt.
2. **Digital unterschreiben** – Der Dozierende öffnet den Link, unterschreibt im Browser und lädt ein fertiges ZIP-Paket mit allen Formaten herunter.
3. **Ablegen** – Das ZIP-File wird in einem geschützten OneDrive-Ordner abgelegt.
4. **Fertig** – Die fertige EMF-Datei wird direkt in die Dozierendenverwaltung übernommen, um ab jetzt automatisiert auf bspw. Abschlussdokument gedruckt zu werden.

## Features

- **Automatische Formatkonvertierung** – Liefert PDF, SVG, PNG und EMF direkt fix und fertig, ohne InDesign oder Inkscape.
- **Personalisierte Links** – Vorbefüllte Felder für Name und Titel schließen Tippfehler von vornherein aus.
- **Keine Installation nötig** – Läuft vollständig im Browser, für Verwaltung und Dozierende gleichermaßen.
- **Papierlos** – Keine Hauspost, kein Scannen, keine verlorenen Briefe.
- **DSGVO-konform** – Alle Daten werden lokal und nur im Browser verarbeitet.

## Technologien

- **React + TypeScript** – Typsichere, komponentenbasierte Benutzeroberfläche
- **Vite** – Schneller Dev-Server und optimierter Build
- **Tailwind CSS** – Utility-First-Styling
- **perfect-freehand** – Natürlich wirkende Stiftstriche auf dem Canvas
- **pdf-lib** – PDF-Erzeugung direkt im Browser
- **JSZip** – ZIP-Paket mit allen Exportformaten zum Download
