---
title: "Topic Modeling: Eine Fallstudie zu Unterschieden in der Nachrichtenberichterstattung"
date: 2024-08-17
draft: false
tags: ["media bias", "Qatar World Cup", "data analysis", "data visualization", Topic Modeling]
author: "Justus Meyer zu Bexten, Oliver Perle, Tarek Nassri"
---

Der 2022 Qatar World Cup war mehr als nur ein sportliches Spektakel; er entfachte eine globale Diskussion über Sport, Politik und Kultur. Um zu verstehen, wie verschiedene Medien dieses Ereignis darstellten, begeben wir uns auf eine faszinierende Reise durch Tausende von Artikeln, die zwischen 2010 und 2023 im Guardian und Al Jazeera veröffentlicht wurden. Unser Werkzeugkasten ist voll mit vielen Analysemethoden, aber heute konzentrieren wir uns auf die Welt der Topic Modeling.

## Schlüsselthemen in Tausenden von Artikeln finden

Topic Modeling ist eine Text-Mining-Methode, die versteckte Muster und Themen in einer riesigen Sammlung von Dokumenten aufdeckt. Sie verwendet statistische Algorithmen, um Gruppen von Wörtern (oder "Themen") zu identifizieren, die häufig zusammen auftreten, unter der Annahme, dass sie ein Thema oder einen Themenbereich charakterisieren.

Das ist so wie ein Bibliothekar, der nicht wirklich weiß, worum es in den Büchern geht: Um Themen zu finden, gruppiert er Bücher zusammen, die wichtige Wörter untereinander teilen. Am Ende behandelt jede Gruppe von Büchern wahrscheinlich ein ähnliches Thema, obwohl der Bibliothekar nicht weiß, was das Thema ist oder genau bedeutet.

## Erkenntnisse der Topic Modeling:

Das Ergebnis der Topic Modeling sind Themen, die durch ihre signifikanten Wörter charakterisiert sind. Es bleibt dem Menschen überlassen, zu interpretieren, was diese Wortgruppen wahrscheinlich bedeuten.

Schauen wir uns einige der Themen an, die wir in den Guardian- und Al Jazeera-Artikeln über die Fußballweltmeisterschaft in Katar gefunden haben:

> **blatter, bid, vote, ethic_commitee:** Dieses Thema scheint sich um den FIFA-Korruptionsskandal und die anschließenden Ermittlungen zu drehen.

> **worker, wage, amnesty:** Dieses Thema deckt wahrscheinlich die Fragen der Arbeitnehmerrechte und -bedingungen in Katar ab.

> **power, sense, sportswashing:** Dieses Thema könnte sich auf das Konzept des "Sportswashing" beziehen, bei dem Länder Sportveranstaltungen nutzen, um ihr Image zu verbessern.

> **bribe investigation, charge, warner:** Dieses Thema könnte sich mit den Gerichtsverfahren und Korruptionsvorwürfen gegen FIFA-Funktionäre befassen.

> **woman, gay, armband, lgbtq:** Dieses Thema scheint sich auf LGBTQ-Themen und Menschenrechtsfragen im Zusammenhang mit der Weltmeisterschaft zu konzentrieren.

Es gibt viele andere Themen (wir haben uns entschieden, 20 Gruppen zu erstellen), dies sind diejenigen, die für uns von besonderem Interesse waren. Das wichtigste andere Thema ist wahrscheinlich das über die eigentlichen Sportereignisse und den Verlauf des Turniers (**group, group_stage, knockout_stage, playoff**), aber wir haben uns entschieden, uns auf die kontroverseren Themen zu konzentrieren.

Die Topic Modeling ermöglicht es uns auch, jeden Artikel einem der von uns gefundenen Themen zuzuordnen, was uns ein wertvolles Instrument zur Analyse von Nachrichtenbias bietet!

## Nachrichtenbias: Welches Thema erhält Aufmerksamkeit?

>![Topics over time in the Guardian](/restricted_topic_freq_guardian.png)
Themen im Zeitverlauf im Guardian

>![Topics over time in Al Jazeera](/restricted_topics_overtime_jazeera.png)
Themen im Zeitverlauf in Al Jazeera

Hier sehen wir, welcher Prozentsatz der Artikel jedes Jahr (mit dem allgemeinen Thema "Fußballweltmeisterschaft Katar") den fünf beschriebenen Themen zugeordnet wurde.

Ein wesentlicher Unterschied ist die Intensität und Langlebigkeit des Themas Korruption (blatter, bid, vote, ethic_commitee) im Guardian im Vergleich zu Al Jazeera. Wir könnten interpretieren, dass das Thema von den Redakteuren von Al Jazeera als weniger berichtenswert erachtet wurde.

Eine wichtige Ähnlichkeit ist die Langlebigkeit und Intensität des Themas Arbeitnehmerrechte (worker, wage, amnesty) in beiden Zeitungen. Dies könnte darauf hindeuten, dass das Thema von beiden Zeitungen als wichtig erachtet wurde.

>![Articles published over time in the Guardian and Al Jazeera](/articles_published_by_source_and_year.png)
Während kleinere Themen im Guardian häufiger auftauchen, liegt dies einfach an der höheren Anzahl von Artikeln im Guardian im Vergleich zu Al Jazeera. Wir können jedoch auch beobachten, dass der Guardian vor der Durchführung der Weltmeisterschaft viel mehr berichtet hat, während Al Jazeera während der Veranstaltung mehr zu berichten begann.

## Fazit

Topic Modeling ist ein leistungsstarkes Werkzeug, um versteckte Muster und Themen in großen Textdatensätzen aufzudecken. Durch die Anwendung dieser Methode auf Nachrichtenartikel aus dem Guardian und Al Jazeera über die Fußballweltmeisterschaft in Katar haben wir wertvolle Einblicke in die Unterschiede in der Berichterstattung zwischen diesen beiden Medien gewonnen. Die Analyse zeigte Unterschiede in der Aufmerksamkeit, die verschiedenen Themen gewidmet wurde, und hob potenzielle Verzerrungen in der Nachrichtenberichterstattung hervor. Es gibt noch viele weitere Erkenntnisse zu gewinnen, zum Beispiel durch die Analyse des Tons der in den Artikeln verwendeten Sprache... Aber das ist eine Geschichte für einen anderen Tag!

Ein anderer Bereich in dem Topic Modeling zum einsatz kommen kann ist zum Beispiel die Analyse von Produktrezensionen, wo ohne das lesen von tausenden von Rezensionen ein Überblick über die wichtigsten Themen und Meinungen gewonnen werden kann.

## Danksagung

Diese Ergebnisse sind ein kleiner Teil eines Projekts, das an der Universität Leipzig zusammen mit [**Oliver Perle**](https://www.linkedin.com/in/oliver-perle-08b58a23a/) und **Tarek Nassri** durchgeführt wurde. Ich möchte ihnen für die nette Zusammenarbeit danken!