# Sicilians Through Ellis Island and Beyond
## New Maps Plus MS Degree Final Project
## Overview
I want to design a map that explores Sicilian immigration to the United States in the late 19th-early 20th century.   
## Background
[Ellis Island](https://www.nps.gov/elis/index.htm) was the main immigrant processing station for the United States from 1892 to 1954. My great-grandfather went through Ellis Island three times (1905, 1912, and 1922)!  
My maternal grandmother’s parents were born in Augusta, Sicily, a town on the eastern coast near Syracuse. Like all of Sicily, many people left during this time period in search of a better life. I am interested in where those that left Augusta, or more broadly Sicily, settled in the United States.  
## Data
Both Ancestry.com and FamilySearch.org have the scanned manifests for Ellis Island and some other ports of entry for the US. However, not all the columns on the form are indexed in those databases, namely the "Final Destination" that I'm interested in.  
+ [Steve Morse’s Ellis Island search](https://stevemorse.org/ellis2/ellisgold.html?first_kind=1&FNM=&kind=close&LNM=) is a great search tool for Ellis Island records. I searched for all the passengers who listed Augusta as their residence. This file is [ellis_island_augusta.csv](data/ellis_island_augusta.csv), which includes about 5,000 passengers. The search results only give me their arrival date and ship name, though.  
+ [Italians to America Passenger Data File, 1855 - 1900](https://aad.archives.gov/aad/series-description.jsp?s=4433&cat=GP44&bc=,sl&col=1002) The National Archives has a database of Itailian immigrants with additional columns, including destination and literacy, which I haven't seen in other resources. As an example, [manifest_list_example.csv](data/manifest_list_example.csv) is one manifest. I don't know if it's possible to bulk download this data, so that is something I need to explore.
  + [National Archives API](https://github.com/usnationalarchives/Catalog-API) Maybe this will be helpful?
+ [Immigrant Ships Transcribers Guild NY Arrivals](https://immigrantships.net/nycarrivals1_6.html) This group transcribes entire manifests.
I need to investigate this resource further, but I could use some of the other resources to identify manifests to search for on this site.
