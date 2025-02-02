---
draft: false
date: 2025-02-02
title: 'Google zeigt keine Geburtstage mehr an – So kannst du sie wiederherstellen!'
author: 'Justus Meyer zu Bexten'
tags: [Google Kalender, Geburtstage, Automatisierung, Kontakte Export, Datenschutz, GDPR]
description: 'Google zeigt aufgrund der DSGVO keine Kontakt-Geburtstage mehr im Kalender an. Erfahre, wie du mit einem einfachen Tool Geburtstags-Erinnerungen wiederherstellen kannst.'
---

In der EU zeigt Google seit einiger Zeit keine Geburtstage deiner Kontakte mehr im Google Kalender an. Der Grund dafür ist die Datenschutz-Grundverordnung (DSGVO), was eigentlich eine gute Sache ist – aber nervig für Leute wie mich, die darauf angewiesen sind. Schließlich möchte ich kein unzuverlässiger Freund oder Familienmitglied sein, das ständig Geburtstage vergisst.

Also habe ich ein Tool entwickelt, das deine exportierten Google-Kontakte einliest und daraus eine ICS-Datei erstellt, die du einfach in deinen Kalender importieren kannst. Das Beste daran? Alles läuft direkt im Browser, ohne dass Daten auf irgendeinen Server hochgeladen werden. Und wenn du mir nicht vertraust – was absolut verständlich ist – kannst du dir den Quellcode auf [GitHub](https://github.com/JustusMzB/blog/blob/main/static/js/birthday_processor.js) anschauen.

### **So funktioniert das Tool:**

1. **Exportiere deine Google-Kontakte:**  
   Folge den Anweisungen in der [Google-Kontakte-Hilfe](https://support.google.com/contacts/answer/7199294), um deine Kontakte im CSV-Format herunterzuladen.

2. **Lade die CSV-Datei ins Tool:**  
   Nutze das Tool unten, um deine exportierte CSV-Datei hochzuladen. Es wird automatisch eine ICS-Datei mit wiederkehrenden Geburtstagsereignissen generiert.

3. **Importiere die ICS-Datei in den Google Kalender:**  
   Google erklärt in seiner [Kalender-Hilfe](https://support.google.com/calendar/answer/37118), wie du Ereignisse in deinen Kalender importierst. Kurz gesagt:
   - Gehe zu [Google Kalender](https://calendar.google.com/).
   - Öffne die Einstellungen über das Zahnrad-Symbol oben rechts.
   - Gehe zu „Importieren & Exportieren“ und lade dort die erstellte ICS-Datei hoch.
   - Wähle den gewünschten Kalender aus und klicke auf „Importieren.“

Wenn du diese Schritte befolgst, kannst du wieder alle Geburtstage deiner Kontakte direkt im Kalender sehen – und vergisst hoffentlich keinen mehr!

{{< birthday_processor >}}
