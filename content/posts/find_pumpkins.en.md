---
draft: false
date: 2024-11-01
Title: 'Getting into a sweepstakes thanks to Webscraping'
author: 'Justus Meyer zu Bexten'
tags: [Python, Web Scraping, E-Fellows, Gewinnspiel, OpenAI, KI]
---

In 2024, E-Fellows.net, an online scholarship and career platform, hosted a sweepstakes on Halloween. In their collection of employer portraits, pages presenting various companies, they had hidden images of pumpkin 'baskets', containing candies.

To enter the sweepstakes, I had the following objectives:
- Find 8 filled pumpkin baskets
- Note the names of the companies they were hidden on
- Note the motive shown on the candies packaging
- Note the number of candies in each basket

As E-Fellows has a rather large company portfolio, I didn't want to use a substancial amount of my time on reading advertisement. 
Instead, I decided to write a web scraper to do the job for me, and got a little practice for my web-scraping skills in the process.

## In Layman's Terms
While a website looks like a nice and tidy page to us in our browser, it is actually represented in a file of HTML code. This code defines the structure of the page, in various elements, each of which have attributes. 
An example would be an image tag: 
```<img src="https://randomsource/image.jpg" alt="A picture">```
This tag tells the browser to display an image, and the `src` attribute tells the browser where to find the image. Using the developer tools in your browser, you can look at this code. 
Attributes like `src` or `class` can be used to identify elements on a page, and search for them automatically. Through your browser, in the "developer tools" section, you can identify the code that represents the elements you are interested in, and use reoccuring themes in e.g. the image source to identify the elements you are interested in.

We use this to write a program in Python, a common programming language, to create a list of all company protrait pages, and then look through each automatically to find the pumpkin basket images.
If you did this for the first time, it would probably take you a while. But fortunately, I have some practice. So aside from writing this text, I only needed a few minutes to write the code and run it.



## Aquiring the List of Company Pages
The first step is to get a list of all company portrait pages. This is done by looking at the main page, and finding the links to the company pages, using the overview page of all companies.


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


## Analyzing our Target
The next step is to find out how we can identify the pumpkin baskets. We do this by looking at the HTML code of the page, and finding a common theme in the image source.

From the promotion page, we have a sample of the pumpkin we are looking for:
```
<img class="image__img" src="https://www.e-fellows.net/uploads/NEU-Medienbibliothek/Unternehmen/00_Gewinnspiel/_contentSmall/Bonbon-Schaedel-2024.jpg" srcset="https://www.e-fellows.net/uploads/NEU-Medienbibliothek/Unternehmen/00_Gewinnspiel/_750xAUTO_crop_center-center_none/Bonbon-Schaedel-2024.jpg 2x" width="375" height="161" loading="lazy" role="presentation">
```
![Pumpkin](https://www.e-fellows.net/uploads/NEU-Medienbibliothek/Unternehmen/00_Gewinnspiel/_contentSmall/Bonbon-Schaedel-2024.jpg)

We also found an empty pumpkin:
```
<img class="image__img" src="https://www.e-fellows.net/uploads/NEU-Medienbibliothek/Unternehmen/00_Gewinnspiel/_contentSmall/Niete-2024.jpg" srcset="https://www.e-fellows.net/uploads/NEU-Medienbibliothek/Unternehmen/00_Gewinnspiel/_750xAUTO_crop_center-center_none/Niete-2024.jpg 2x" width="375" height="161" loading="lazy" role="presentation">
```
![Empty Pumpkin](https://www.e-fellows.net/uploads/NEU-Medienbibliothek/Unternehmen/00_Gewinnspiel/_contentSmall/Niete-2024.jpg)

Looks like we want to look for "Gewinnspiel" in the URL. Let's do that.




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
    


We discover that only some pumpkins are full, while others are empty. We can also see that the full ones have "Bonbon" in their image source. Let's re-define the problem as finding the pumpkin with "Bonbon" in the URL.


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


## The Solution
This gives us a list of all company pages that have a pumpkin basket image.
Now we only have to go on these websites and count the candies, we can even determine Motive and Company from the image sources.
E-Fellows has specified a fromat in which to present the results. According to this format, we will present the results in the following way:

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

## Additional Fun
### Automatically Extracting Names and Motives
I decided to do some more things for fun and proof of concept. How, for example, would we automatically extract the company name and the motive from the image source? We can do this using regular expressions, a powerful way to describe and extract patterns in and from text.


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


### Automatically Counting Candy with OpenAI?
Now imagine not having to count the candies in the pumpkins. We could automatically do sweepstake after sweepstake! So we also try to count the candies using OpenAI's GPT-4o, their most recent multimodal model.


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


Unfortunately, the AI was not able to count the candies reliably... But if it could, this Idea would have worked perfectly!

## My Takeaways
Without the additional fun parts and writing explaining text, I was able to find the solution to our problem in around 30 minutes. This is far less that the very optimistic 50 minutes I would have taken manually, and I am sure that it was way more fun... I can reccommend this approach to anyone who is in a similar situation, it's a fun exercise. Another  takeaway is to not blindly trust AI, it's not able to count that well yet.

This was successful, let's see if I win the price.
