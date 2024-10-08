---
title: "Topic Modelling: A Case Study of News Reporting Differences"
date: 2024-08-17
draft: false
tags: ["media bias", "Qatar World Cup", "data analysis", "data visualization", Topic Modeling]
author: "Justus Meyer zu Bexten, Oliver Perle, Tarek Nassri"
---

The 2022 Qatar World Cup was more than just a sporting spectacle; it ignited a global conversation about sports, politics, and culture. To understand how different media outlets framed this event, we embark on a fascinating journey through thousands of articles published in the Guardian and Al Jazeera between 2010 and 2023.  Our toolbox is filled with multiple analytical methods, but today, we'll shine a spotlight on the insightful world of topic modeling.

## Finding key themes over thousands of articles
Topic Modelling is a sophisticated text-mining method, uncovering hidden patterns and themes within a vast collection of documents. It employs statistical algorithms to identify groups of words (or "topics") that frequently occur together, assuming they characterize a topic or theme.

It is like a smart librarian that doesn't really know what the books are about: To find topics, he groups books together that share significant words among themselves. In the end, each group of books likely treats a similar topic, even though the librarian doesn't know what the topic is.

## Insigths of Topic Modeling:
The result of Topic Modelling are topics characterized by their significant words. It remains up to the human to interpret what these word groups likely mean.
Let's take a look at some of the topics we found in the Guardian and Al Jazeera articles about the Qatar World Cup:
> **blatter, bid, vote, ethic_commitee:** This topic seems to revolve around the FIFA corruption scandal and the subsequent investigations.

> **worker, wage, amnesty:** This topic likely covers the issues of worker rights and conditions in Qatar.

> **power, sense, sportswashing:** This topic might relate to the concept of "sportswashing," where countries use sports events to improve their image.

> **bribe investigation, charge, warner:** This topic could be about the legal proceedings and corruption charges against FIFA officials.

> **woman, gay, armband, lgbtq:** This topic seems to focus on LGBTQ topics and human rights issues in the context of the World Cup.

There are many other topics (we decided to create 20 groups), these are ones that were of our particular interest. The most important other topic likely is the one about the actual sports events and the progress of the tournament (**group, group_stage, knockout_stage, playoff**), but we decided to focus on the more controversial topics.

Topic modelling also allows us to assign each article to one of the topics we found, giving us a valuable tool to analyze news bias!

## News Bias: Which topic receives attention?

>![Topics over time in the Guardian](/restricted_topic_freq_guardian.png)
Topics over time in the Guardian

>![Topics over time in Al Jazeera](/restricted_topics_overtime_jazeera.png)
Topics over time in Al Jazeera

Here we can see what percentage of articles each year (with the general topic "Qatar World Cup") was assigned to the five described topics.
A key difference is the intensity and longe-livedness of the topic of Corruption (blatter, bid, vote, ethic_commitee) in the Guardian compared to Al Jazeera. We could interpret that the topic was deemed less newsworthy by the editors of Al Jazeera.


A key similarity is the long-livedness and intensity of the topic of Worker Rights (worker, wage, amnesty) in both newspapers. This could indicate that the topic was deemed important by both newspapers.

>![Articles published over time in the Guardian and Al Jazeera](/articles_published_by_source_and_year.png)
While minor topics spring up more frequently in the Guardian, this is simply due to the higher number of articles in the Guardian compared to Al Jazeera. However we can also observe that the Guardian did way more reporting before the conduction of the World Cup, while Al Jazeera started to report more during the event.

## Conclusion
Topic Modelling is a powerful tool to uncover hidden patterns and themes in large text datasets. By applying this method to news articles from the Guardian and Al Jazeera about the Qatar World Cup, we gained valuable insights into the differences in reporting between these two media outlets. The analysis revealed variations in the attention given to different topics, highlighting potential biases in news coverage. There are many more insights to be gained, for example by analyzing the tone of the language used throughout the articles... But that is a story for another day!

Another area where Topic Modelling can be applied is for example the analysis of product reviews, where without reading thousands of reviews an overview of the main topics and opinions can be gained.

## Aknowledgements
These Results are a small part of a Project conducted at the University of Leipzig, together with [**Oliver Perle**](https://www.linkedin.com/in/oliver-perle-08b58a23a/) and **Tarek Nassri**. I would like to thank them for the nice cooperation!
