---
title: "Vibe Coding: Wie ich meinen Bewerbungsprozess in ein automatisiertes Astro-System verwandelt habe"
date: 2025-02-25
excerpt: "Vom statischen PDF zum automatisierten Job-Hub: Wie ich dank Astro und „Vibe Coding“ ein System gebaut habe, das personalisierte Lebensläufe und Anschreiben per CLI erstellt, PDFs im Build-Prozess bändigt und mir fertige Bewerbungs-E-Mails auf Knopfdruck generiert."
image: ../../assets/bewerbungsprozess-02.png
---

## Warum ich meinen Bewerbungsprozess in ein automatisiertes „Job-OS“ verwandelt habe

Hand aufs Herz: Bewerbungen schreiben nervt. Man jongliert mit Word-Dokumenten, korrigiert zum zehnten Mal das Datum im PDF und sucht verzweifelt den Namen des Ansprechpartners aus einer alten E-Mail.

Nachdem ich meine Website auf **Astro** umgestellt hatte, kam mir ein Gedanke: Wenn ich meine Inhalte ohnehin als Code verwalte, warum dann nicht auch meine Karriere-Unterlagen? Was als kleine Idee startete, endete in einem automatisierten System, das mir heute fast die gesamte Arbeit abnimmt. Und das Beste daran: Dank **Vibe Coding** stand das Grundgerüst innerhalb weniger Stunden.

![Die CV in der Browseransicht mit Downloadmöglichkeit als PDF](../../assets/bewerbungsprozess-02.png)

## Die Evolution: Fokus auf die Stelle, nicht nur die Firma

Oft bewirbt man sich bei einer Firma auf verschiedene Rollen. Mein System musste also flexibel sein. Statt einer simplen Datei pro Firma basiert alles auf spezifischen **Stellenanzeigen**.

Dank Vibe Coding – also dem intensiven Prompting und der Zusammenarbeit mit KI – konnte ich in kürzester Zeit komplexe TypeScript-Interfaces erstellen, die weit über „Name und Datum“ hinausgehen. Mein Frontmatter in den Markdown-Files sieht heute eher nach einer Datenbank-Struktur aus:

- **Stellenspezifische Metadaten:** Wer ist der Ansprechpartner? Wie lautet die genaue Anrede?
- **Tracking:** Welchen Status hat die Bewerbung? (In Vorbereitung, Abgeschickt, Gespräch...)
- **Deep Links:** Die Original-Stellenanzeige ist direkt verknüpft – kein Suchen mehr in alten Browser-Tabs.

## Der Workflow: Vom CLI-Skript zur fertigen Bewerbung

Früher habe ich Dateien manuell kopiert. Heute übernimmt das ein Skript, das mich per CLI abfragt: _„Deutsch oder Englisch? Welche Firma? Welche Stelle?“_ Das Skript schnappt sich den passenden „Base-CV“ (als Template) und erstellt die Markdown-Datei inklusive aller notwendigen Metadaten. Das Anschreiben verfasse ich dann direkt im Markdown-Body. So bleibt alles an einem Ort.

## Die PDF-Falle: Warum „On-the-Fly“ gescheitert ist

Ich bin eigentlich ein Fan von dynamischen Lösungen. Mein erster Impuls: „Ich generiere das PDF einfach live auf dem Server, wenn jemand den Link aufruft!“

Doch die Realität holte mich schnell ein:

1.  **Hosting:** Da ich statisch über Netlify hoste, wäre eine Serverless-Function für PDF-Rendering (inklusive Fonts und CSS) ein eigenes Riesenprojekt geworden.
2.  **CSS-Inkonsistenz:** Mein Versuch, alles über `@media print` zu lösen, endete im Chaos. Jeder Browser interpretierte Seitenumbrüche anders. Das Ergebnis war alles, aber nicht „pixel perfect“.

**Die Lösung:** Ich habe den Prozess in den **Build-Prozess** verlagert. Die PDFs werden vorproduziert und statisch bereitgestellt. Jede Stelle bekommt einen eindeutigen, kurzen **alphanumerischen Code** im Dateinamen. Das sieht clean aus und lässt sich als kurzer Link perfekt versenden.

## Das Dashboard: Mein privates Command Center

Hier kommt der Vibe-Coding-Vorteil richtig zum Tragen. Ich habe mir ein privates Dashboard gebaut (natürlich hinter einem Login), das alle Bewerbungen visualisiert.

Was dieses Dashboard für mich tut:

- **Status-Check:** Ich sehe sofort, wo ich bei welcher Stelle im Prozess stehe.
- **Direktzugriff:** Lebenslauf, Anschreiben und Stellenanzeige sind nur einen Klick entfernt.
- **Der E-Mail-Generator:** Mein absolutes Lieblingsfeature. Das Dashboard generiert mir per Knopfdruck eine fertige E-Mail. Betreffzeile, Anrede und sogar der Text aus dem Anschreiben werden direkt in meinen Mail-Client geladen. Ich muss nur noch auf „Senden“ klicken.

![Das Dashboard](../../assets/bewerbungsprozess-01.png)

## Fazit: Vibe Coding als Enabler

Das Spannendste an diesem Projekt war die Geschwindigkeit. Hätte ich jedes Interface und jedes Skript von Hand geschrieben, hätte ich bei den ersten CSS-Print-Problemen wahrscheinlich aufgegeben. Durch das „Viben“ mit der KI konnte ich mich auf die Logik und den Workflow konzentrieren, statt an Syntax-Details hängen zu bleiben.

Heute schicke ich Bewerbungen nicht mehr mit Bauchschmerzen ab, sondern mit der Gewissheit, dass mein System mir den Rücken freihält. Es ist professionell, es ist schnell und es ist zu 100% mein eigener Code.

**Wie handhabst du deine Unterlagen? Ist dein Lebenslauf noch ein „Dokument“ oder schon eine „Plattform“?**
