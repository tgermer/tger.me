---
title: LIFE-EQ
description: Interaktiver Life-Equalizer – finde heraus, wo du im Leben stehst und wo du hin willst. Mit echtem Sound.
featured: true
technologies: React, Vite, Tailwind CSS, Web Audio API
date: 2026-03-01
image: ../../assets/portfolio/life-eq.png
imageFit: cover
linkWebsite: https://life-eq.tger.me
type: WebApp
aiBuilt: true
---

**LIFE-EQ** verwandelt eine klassische Coaching-Übung in ein interaktives Mischpult fürs Leben. Statt auf einem ausgedruckten PDF mit Stiften herumzumalen, wählt man seine fünf wichtigsten Lebensbereiche aus und stellt über Fader den IST- und SOLL-Zustand ein – wie an einem echten Equalizer.

## Hintergrund

Die Idee entstand aus einer Hausaufgabe im Mentoring mit [Lisa Kurzenberger](https://www.lisa-kurzenberger.de/?utm_source=tger.me&utm_medium=referral&utm_campaign=portfolio-life-eq). Die Originalübung „LIFE-EQ" von Work Life Romance kommt als PDF: fünf Kategorien auswählen, Regler auf Papier einzeichnen, IST und SOLL vergleichen. Mein erster Gedanke: „Das schreit nach einer Webapp." Und weil der Name schon nach Musik klingt – warum nicht auch echten Sound draus machen?

## Features

- **Kategorie-Auswahl** – 25 Lebensbereiche wie Kreativität, Freiheit, Familie oder Karriere – davon fünf auswählen
- **Dual-Fader pro Kategorie** – IST-Zustand und SOLL-Zustand unabhängig einstellen, wie an einem Mischpult
- **Sound-Engine** – Jede Fader-Kombination erzeugt einen eigenen Klang. Der IST-Sound klingt anders als der SOLL-Sound
- **Share-Link** – Einstellungen per URL teilen, damit andere den eigenen Life-EQ sehen können
- **Screenshot-Export** – Equalizer als Bild herunterladen, z.B. fürs Coaching-Gespräch

## Technologien

- **React 19** – Aktuellste Version, reines JSX ohne TypeScript – bewusst minimales Setup
- **Vite 7** – Build-Tool und Dev-Server
- **Tailwind CSS 4** – Styling über das offizielle Vite-Plugin
- **Web Audio API** – Sound-Generierung direkt im Browser
- **html-to-image** – Screenshot-Export von DOM-Elementen
