# Sicilians Through Ellis Island and Beyond
## New Maps Plus MS Degree Final Project
## Overview
I want to design a map that explores Sicilian immigration to the United States in the late 19th-early 20th century.   
## Background
[Ellis Island](https://www.nps.gov/elis/index.htm) was the main immigrant processing station for the United States from 1892 to 1954. My great-grandfather went through Ellis Island three times (1905, 1912, and 1922)! The ship manifests have lists of passengers, as well as age, sex, marital status, occupation, destination, and some other items depending on the year.  
My maternal grandmother’s parents were born in Augusta, Sicily, a town on the eastern coast near Syracuse. Like all of Sicily, many people left during this time period in search of a better life. I am interested in where those that left Augusta, or more broadly Sicily, settled in the United States.  
## Data
+ [Italians to America Passenger Data File, 1855 - 1900](https://aad.archives.gov/aad/series-description.jsp?s=4433&cat=GP44&bc=,sl&col=1002) The National Archives has a database of Itailian immigrants from transcribed passenger manifests with some demographic data and the passenger's previous residence and final destination. I scraped this data using the jupyter notebook [NARA_scraper.ipynb]: [italians_to_america.csv](data/italians_to_america.csv)  
+ [List of the communes in Sicily](https://en.wikipedia.org/wiki/List_of_communes_of_Sicily) from Wikipedia
+ Province boundaries for Italy from http://www.diva-gis.org/. I am using modern-day boundaries.
+ Other data sources for possible inclusion:
  + Both Ancestry.com and FamilySearch.org have the scanned manifests for Ellis Island and some other ports of entry for the US. However, not all the columns on the form are indexed in those databases, namely the "Final Destination" that I'm interested in.  
  + [Steve Morse’s Ellis Island search](https://stevemorse.org/ellis2/ellisgold.html?first_kind=1&FNM=&kind=close&LNM=) is a great search tool for Ellis Island records. I searched for all the passengers who listed Augusta as their residence. This file is [ellis_island_augusta.csv](data/ellis_island_augusta.csv), which includes about 5,000 passengers. The search results only give me their arrival date and ship name, though. To further analyze this data, I would need to transcribe the rest of the manifest.  
  + [Immigrant Ships Transcribers Guild NY Arrivals](https://immigrantships.net/nycarrivals1_6.html) This group transcribes entire manifests and has them listed by arrival year and ship name.
