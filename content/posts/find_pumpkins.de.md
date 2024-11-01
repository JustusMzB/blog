---
draft: false
date: 2024-11-01
Title: 'An einem Gewinnspiel teilnehmen dank Webscraping'
author: 'Justus Meyer zu Bexten'
tags: [Python, Web Scraping, E-Fellows, Sweepstakes, OpenAI, AI]
---

2024 veranstaltete E-Fellows.net, eine Online-Stipendien- und Karriereplattform, zu Halloween ein Gewinnspiel. In ihrer Sammlung von Arbeitgeberporträts, also Seiten, die verschiedene Unternehmen vorstellen, hatten sie Bilder von Kürbis-'Körben' mit Süßigkeiten versteckt. Um am Gewinnspiel teilzunehmen, hatte ich die folgenden Ziele:

- 8 gefüllte Kürbiskörbe finden
- Die Namen der Unternehmen notieren, auf deren Seiten sie versteckt waren
- Das Motiv auf der Verpackung der Süßigkeiten notieren
- Die Anzahl der Süßigkeiten in jedem Korb notieren
Da E-Fellows ein ziemlich großes Unternehmensportfolio hat, wollte ich nicht viel Zeit damit verbringen, Werbung zu lesen. Stattdessen beschloss ich, einen Web Scraper zu schreiben, der die Arbeit für mich erledigt, und dabei ein wenig meine Web-Scraping-Fähigkeiten zu üben.

## Einfach erklärt
Während eine Website in unserem Browser wie eine schöne und übersichtliche Seite aussieht, wird sie tatsächlich in einer Datei mit HTML-Code übertragen. Dieser Code definiert die Struktur der Seite in verschiedenen Elementen, die jeweils Attribute haben. Ein Beispiel wäre ein Bild-Tag:
```<img src="https://randomsource/image.jpg" alt="A picture">```

Dieser Tag weist den Browser an, ein Bild anzuzeigen, und das Attribut 'src' teilt dem Browser mit, wo er das Bild finden kann. Mithilfe der Entwicklertools in Ihrem Browser können Sie sich diesen Code ansehen. Attribute wie 'src' oder 'class' können verwendet werden, um Elemente auf einer Seite zu identifizieren und automatisch nach ihnen zu suchen. Über Ihren Browser können Sie im Bereich "Entwicklertools" den Code identifizieren, der die Elemente darstellt, an denen Sie interessiert sind, und wiederkehrende Themen z. B. in der Bildquelle verwenden, um die Elemente zu identifizieren, an denen Sie interessiert sind.

Wir verwenden dies, um ein Programm in Python, einer gängigen Programmiersprache, zu schreiben, das eine Liste aller Unternehmensportrait-Seiten erstellt und dann jede automatisch durchsucht, um die Bilder der Kürbiskörbe zu finden. Wenn Sie dies zum ersten Mal tun würden, würde es wahrscheinlich eine Weile dauern. Aber zum Glück habe ich etwas Übung. Abgesehen vom Schreiben dieses Textes habe ich also nur ein paar Minuten gebraucht, um den Code zu schreiben und auszuführen.

## Die Liste der Unternehmensseiten abrufen
Der erste Schritt besteht darin, eine Liste aller Unternehmensportrait-Seiten zu erhalten. Dies geschieht, indem man sich die Hauptseite ansieht und die Links zu den Unternehmensseiten mithilfe der Übersichtsseite aller Unternehmen findet.


```python
import requests # For making HTTP requests
from bs4 import BeautifulSoup # For parsing the pages
from IPython.display import display, Markdown # For displaying Markdown
from tqdm.auto import tqdm # For displaying progress bars

base_company_portrait_url = "https://www.e-fellows.net/unternehmen"

```


```python
list_page = requests.get(base_company_portrait_url)

soup = BeautifulSoup(list_page.content, 'html.parser')
company_links = []

# Get all company links from the page by class.
for link in soup.find_all(class_='headline__link', recursive=True):
    company_links.append(link.get('href'))

display(Markdown(f"We found **{len(company_links)}** companies on the page.\
      \nAssume scanning each page for pumpkins takes 30 seconds.\
      \nThat is **{len(company_links) * 30 / 60}** minutes of scanning."))
```


We found **101** companies on the page.      
Assume scanning each page for pumpkins takes 30 seconds.      
That is **50.5** minutes of scanning.


## Unser Ziel analysieren
Der nächste Schritt besteht darin, herauszufinden, wie wir die Kürbiskörbe identifizieren können. Wir tun dies, indem wir uns den HTML-Code der Seite ansehen und ein gemeinsames Thema in der Bildquelle finden. Von der Aktionsseite haben wir ein Beispiel für den Kürbis, den wir suchen:
```
<img class="image__img" src="https://www.e-fellows.net/uploads/NEU-Medienbibliothek/Unternehmen/00_Gewinnspiel/_contentSmall/Bonbon-Schaedel-2024.jpg" srcset="https://www.e-fellows.net/uploads/NEU-Medienbibliothek/Unternehmen/00_Gewinnspiel/_750xAUTO_crop_center-center_none/Bonbon-Schaedel-2024.jpg 2x" width="375" height="161" loading="lazy" role="presentation">
```
![Pumpkin](https://www.e-fellows.net/uploads/NEU-Medienbibliothek/Unternehmen/00_Gewinnspiel/_contentSmall/Bonbon-Schaedel-2024.jpg)

Wir haben auch einen leeren Kürbis gefunden:
```
<img class="image__img" src="https://www.e-fellows.net/uploads/NEU-Medienbibliothek/Unternehmen/00_Gewinnspiel/_contentSmall/Niete-2024.jpg" srcset="https://www.e-fellows.net/uploads/NEU-Medienbibliothek/Unternehmen/00_Gewinnspiel/_750xAUTO_crop_center-center_none/Niete-2024.jpg 2x" width="375" height="161" loading="lazy" role="presentation">
```
![Empty Pumpkin](https://www.e-fellows.net/uploads/NEU-Medienbibliothek/Unternehmen/00_Gewinnspiel/_contentSmall/Niete-2024.jpg)

Sieht aus, als wollten wir in der URL nach "Gewinnspiel" suchen. Lass uns das tun.




```python
def img_has_in_url(page_soup, keyword):
    if not isinstance(page_soup, BeautifulSoup): 
        page_soup = BeautifulSoup(page_soup, 'html.parser')
        
    for img in page_soup.find_all('img'):
        if keyword in img.get('src'):
            # We print the source url for further insights.
            print(img.get('src'))
            return True
        
for company_link in tqdm(company_links):
    company_page = requests.get(company_link)
    if img_has_in_url(company_page.content, "Gewinnspiel"):
        print(company_link)
        print("has pumpkin \n")
```


      0%|          | 0/101 [00:00<?, ?it/s]


    https://www.e-fellows.net/uploads/NEU-Medienbibliothek/Unternehmen/00_Gewinnspiel/_contentSmall/Bonbon-Schaedel-2024.jpg
    https://www.e-fellows.net/unternehmen/gleiss-lutz
    has pumpkin 
    
    https://www.e-fellows.net/uploads/NEU-Medienbibliothek/Unternehmen/00_Gewinnspiel/_contentSmall/Bonbon-Geist-2024.jpg
    https://www.e-fellows.net/unternehmen/forvis-mazars
    has pumpkin 
    
    https://www.e-fellows.net/uploads/NEU-Medienbibliothek/Unternehmen/00_Gewinnspiel/_contentSmall/Bonbon-Kuerbis-2024.jpg
    https://www.e-fellows.net/unternehmen/enova
    has pumpkin 
    
    https://www.e-fellows.net/uploads/NEU-Medienbibliothek/Unternehmen/00_Gewinnspiel/_contentSmall/Bonbon-Fledermaus-2024.jpg
    https://www.e-fellows.net/unternehmen/lidl/trainee-programm
    has pumpkin 
    
    https://www.e-fellows.net/uploads/NEU-Medienbibliothek/Unternehmen/00_Gewinnspiel/_contentSmall/Niete-2024.jpg
    https://www.e-fellows.net/unternehmen/hkp-group
    has pumpkin 
    
    https://www.e-fellows.net/uploads/NEU-Medienbibliothek/Unternehmen/00_Gewinnspiel/_contentSmall/Niete-2024.jpg
    https://www.e-fellows.net/unternehmen/allianz-consulting
    has pumpkin 
    
    https://www.e-fellows.net/uploads/NEU-Medienbibliothek/Unternehmen/00_Gewinnspiel/_contentSmall/Niete-2024.jpg
    https://www.e-fellows.net/unternehmen/rsm-ebner-stolz-management-consultants-gmbh
    has pumpkin 
    
    https://www.e-fellows.net/uploads/NEU-Medienbibliothek/Unternehmen/00_Gewinnspiel/_contentSmall/Bonbon-Spinne-2024.jpg
    https://www.e-fellows.net/unternehmen/wavestone
    has pumpkin 
    
    https://www.e-fellows.net/uploads/NEU-Medienbibliothek/Unternehmen/00_Gewinnspiel/_contentSmall/Bonbon-Auge-2024.jpg
    https://www.e-fellows.net/unternehmen/pepsico
    has pumpkin 
    
    https://www.e-fellows.net/uploads/NEU-Medienbibliothek/Unternehmen/00_Gewinnspiel/_contentSmall/Niete-2024.jpg
    https://www.e-fellows.net/unternehmen/ey
    has pumpkin 
    
    https://www.e-fellows.net/uploads/NEU-Medienbibliothek/Unternehmen/00_Gewinnspiel/_contentSmall/Bonbon-Katze-2024.jpg
    https://www.e-fellows.net/unternehmen/basf
    has pumpkin 
    
    https://www.e-fellows.net/uploads/NEU-Medienbibliothek/Unternehmen/00_Gewinnspiel/_contentSmall/Niete-2024.jpg
    https://www.e-fellows.net/unternehmen/munich-re
    has pumpkin 
    
    https://www.e-fellows.net/uploads/NEU-Medienbibliothek/Unternehmen/00_Gewinnspiel/_contentSmall/Bonbon-Hut-2024.jpg
    https://www.e-fellows.net/unternehmen/capgemini
    has pumpkin 
    
    https://www.e-fellows.net/uploads/NEU-Medienbibliothek/Unternehmen/00_Gewinnspiel/_contentSmall/Niete-2024.jpg
    https://www.e-fellows.net/unternehmen/burda/trainee-programm
    has pumpkin 
    
    https://www.e-fellows.net/uploads/NEU-Medienbibliothek/Unternehmen/00_Gewinnspiel/_contentSmall/Niete-2024.jpg
    https://www.e-fellows.net/unternehmen/deutsche-bank
    has pumpkin 
    


Wir stellen fest, dass nur einige Kürbisse voll sind, während andere leer sind. Wir können auch sehen, dass die vollen "Bonbon" in ihrer Bildquelle haben. Lassen Sie uns das Problem neu definieren, indem wir den Kürbis mit "Bonbon" in der URL finden.


```python
def has_full_pumpkin(page_soup):
    return img_has_in_url(page_soup, "Bonbon")

winning_links = []
for company_link in tqdm(company_links):
    company_page = requests.get(company_link)
    if has_full_pumpkin(company_page.content):
        print(company_link)
        print("has full pumpkin")
        winning_links.append(company_link)
```


      0%|          | 0/101 [00:00<?, ?it/s]


    https://www.e-fellows.net/uploads/NEU-Medienbibliothek/Unternehmen/00_Gewinnspiel/_contentSmall/Bonbon-Schaedel-2024.jpg
    https://www.e-fellows.net/unternehmen/gleiss-lutz
    has full pumpkin
    https://www.e-fellows.net/uploads/NEU-Medienbibliothek/Unternehmen/00_Gewinnspiel/_contentSmall/Bonbon-Geist-2024.jpg
    https://www.e-fellows.net/unternehmen/forvis-mazars
    has full pumpkin
    https://www.e-fellows.net/uploads/NEU-Medienbibliothek/Unternehmen/00_Gewinnspiel/_contentSmall/Bonbon-Kuerbis-2024.jpg
    https://www.e-fellows.net/unternehmen/enova
    has full pumpkin
    https://www.e-fellows.net/uploads/NEU-Medienbibliothek/Unternehmen/00_Gewinnspiel/_contentSmall/Bonbon-Fledermaus-2024.jpg
    https://www.e-fellows.net/unternehmen/lidl/trainee-programm
    has full pumpkin
    https://www.e-fellows.net/uploads/NEU-Medienbibliothek/Unternehmen/00_Gewinnspiel/_contentSmall/Bonbon-Spinne-2024.jpg
    https://www.e-fellows.net/unternehmen/wavestone
    has full pumpkin
    https://www.e-fellows.net/uploads/NEU-Medienbibliothek/Unternehmen/00_Gewinnspiel/_contentSmall/Bonbon-Auge-2024.jpg
    https://www.e-fellows.net/unternehmen/pepsico
    has full pumpkin
    https://www.e-fellows.net/uploads/NEU-Medienbibliothek/Unternehmen/00_Gewinnspiel/_contentSmall/Bonbon-Katze-2024.jpg
    https://www.e-fellows.net/unternehmen/basf
    has full pumpkin
    https://www.e-fellows.net/uploads/NEU-Medienbibliothek/Unternehmen/00_Gewinnspiel/_contentSmall/Bonbon-Hut-2024.jpg
    https://www.e-fellows.net/unternehmen/capgemini
    has full pumpkin


## Die Lösung
Dies gibt uns eine Liste aller Unternehmensseiten, die ein Bild eines Kürbis Korbes haben. Jetzt müssen wir nur noch auf diese Websites gehen und die Süßigkeiten zählen, wir können sogar Motiv und Unternehmen aus den Bildquellen bestimmen. E-Fellows hat ein Format vorgegeben, in dem die Ergebnisse dargestellt werden sollen. Nach diesem Format werden wir die Ergebnisse wie folgt darstellen:
```
Capgemini/Bonbons: 2/Motiv: Hut
BASF/Bonbons: 3/Motiv: Katze
Pepsico/Bonbons: 4/Motiv: Auge
Wavestone/Bonbons: 7/Motiv: Spinne
Enova/Bonbons: 5/Motiv: Kürbis
Lidl/Bonbons: 6/Motiv: Fledermaus
Forvis Mazars/Bonbons: 4/Motiv: Geist
Gleiss Lutz/Bonbons: 5/Motiv: Schädel
```

## Zusätzlicher Spaß
## Automatisches Extrahieren von Namen und Motiven
Ich beschloss, zum Spaß und als Proof of Concept noch ein paar Dinge zu tun. Wie würden wir zum Beispiel den Firmennamen und das Motiv automatisch aus der Bildquelle extrahieren? Wir können dies mit regulären Ausdrücken tun, einer leistungsstarken Methode, um Muster in und aus Text zu beschreiben und zu extrahieren.


```python
import re

def get_sweet_link(page_soup):
    if not isinstance(page_soup, BeautifulSoup): 
        page_soup = BeautifulSoup(page_soup, 'html.parser')
        
    for link in page_soup.find_all('img'):
        if "Bonbon" in link.get('src'):
            return link.get('src')

sweet_pages = [requests.get(link) for link in winning_links]
sweet_image_links = [get_sweet_link(page.content) for page in sweet_pages]

```


```python
bonbon_regex = r"https://www.e-fellows.net/.*/Bonbon-(\w*)-2024.jpg"
company_regex = r"https://www.e-fellows.net/unternehmen/([\w\-]*)/?.*"

bonbon_motives = [re.findall(bonbon_regex, link)[0] for link in sweet_image_links]
company_names = [re.findall(company_regex, link)[0] for link in winning_links]

pairs = zip(company_names, bonbon_motives)
for pair in pairs:
    display(Markdown(f"Company: **{pair[0]}** has the motive: **{pair[1]}**"))
```


Company: **gleiss-lutz** has the motive: **Schaedel**



Company: **forvis-mazars** has the motive: **Geist**



Company: **enova** has the motive: **Kuerbis**



Company: **lidl** has the motive: **Fledermaus**



Company: **wavestone** has the motive: **Spinne**



Company: **pepsico** has the motive: **Auge**



Company: **basf** has the motive: **Katze**



Company: **capgemini** has the motive: **Hut**


### Automatisches Zählen von Süßigkeiten mit OpenAI?

Stellen Sie sich vor, Sie müssten die Süßigkeiten in den Kürbissen nicht zählen. Wir könnten Gewinnspiel nach Gewinnspiel automatisch durchführen! Also versuchen wir auch, die Bonbons mit dem GPT-4o von OpenAI zu zählen, ihrem neuesten multimodalen Modell.


```python
import json
def count_candy(image_url, openai_key):
    # Wrapper to a specific OpenAI API Call
    response = requests.post("https://api.openai.com/v1/chat/completions",
    headers={
        "Authorization": f"Bearer {openai_key}",
        "Content-Type": "application/json"},
    data= json.dumps(
    {
    "model": "gpt-4o",
    "messages": [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": "How many Candies are in the Pumpkin? Answer with a number only."
          },
          {
            "type": "image_url",
            "image_url": {
              "url": image_url
            }
          }
        ]
      }
    ],
    "max_tokens": 300
  }
          )
  )
    return response.json()

try:
    openai_key = open("openai_key.txt", "r").read()
except FileNotFoundError:
    import getpass
    openai_key = getpass.getpass("Please enter your OpenAI key: ")

# Do a test request, and print response
resp = count_candy(sweet_image_links[0], openai_key)
resp['choices'][0]['message']['content']


```




    '8'




```python
def candy_count_to_number_wrapper(response):
    return int(response['choices'][0]['message']['content'])

counts = [candy_count_to_number_wrapper(count_candy(link, openai_key)) for link in sweet_image_links]
```


```python
# Print the results in the official format
for i in zip(company_names, counts, bonbon_motives):
    print(f"{i[0]}/Bonbons: {i[1]}/Motiv: {i[2]}")
```

    gleiss-lutz/Bonbons: 7/Motiv: Schaedel
    forvis-mazars/Bonbons: 5/Motiv: Geist
    enova/Bonbons: 8/Motiv: Kuerbis
    lidl/Bonbons: 7/Motiv: Fledermaus
    wavestone/Bonbons: 11/Motiv: Spinne
    pepsico/Bonbons: 7/Motiv: Auge
    basf/Bonbons: 5/Motiv: Katze
    capgemini/Bonbons: 2/Motiv: Hut


Schade, dass die KI die Bonbons nicht zuverlässig zählen konnte... Aber wenn sie es könnte, hätte diese Idee perfekt funktioniert!

## Meine Erkenntnisse
Ohne den zusätzlichen Spaß und das Schreiben von erklärendem Text konnte ich die Lösung für unser Problem in etwa 30 Minuten finden. Das ist weit weniger als die sehr optimistischen 50 Minuten, die ich manuell gebraucht hätte. Ich bin mir sicher, dass es so sehr viel mehr Spaß gemacht hat... Ich kann diesen Ansatz jedem empfehlen, der sich in einer ähnlichen Situation befindet, es ist eine lustige Übung. Eine weitere Erkenntnis ist, KI nicht blind zu vertrauen, sie kann noch nicht so gut zählen.

Das war erfolgreich, mal sehen, ob ich den Preis gewinne.