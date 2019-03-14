# Sicilians Through Ellis Island and Beyond  
## 1855-1900

I. Introduction

I want to design a map that explores Sicilian immigration to the United States in the late 19th-early 20th century.   
[Ellis Island](https://www.nps.gov/elis/index.htm) was the main immigrant processing station for the United States from 1892 to 1954. My great-grandfather went through Ellis Island three times (1905, 1912, and 1922)! The ship manifests have lists of passengers, as well as other items such as age, sex, marital status, occupation, and destination depending on the year.  
My maternal grandmother’s parents were born in Augusta, Sicily, a town on the eastern coast near Syracuse. Like all of Sicily, many people left during this time period in search of a better life. I am interested in where those that left Augusta, or more broadly Sicily, settled in the United States.  
My aim is for the user to gain some understanding of the history of immigration to the United States by exploring a small slice of that story. 
  
II. Methodology

First provide a general statement summarizing the following subsections (one or two sentences).
 A. Data

+ Sources
    + [Italians to America Passenger Data File, 1855 - 1900](https://aad.archives.gov/aad/series-description.jsp?s=4433&cat=GP44&bc=,sl&col=1002) The National Archives has a database of Itailian immigrants from transcribed passenger manifests with some demographic data and the passenger's previous residence and final destination.
    + [List of the communes in Sicily](https://en.wikipedia.org/wiki/List_of_communes_of_Sicily) from Wikipedia
    + Province boundaries for Italy from http://www.diva-gis.org/. I am using modern-day boundaries.

+ Wrangling and analysis process
    + I scraped the passenger and manifest header data using the jupyter notebook [NARA_scraper.ipynb], resulting in three passenger data files ([italians_parta.csv](data/italians_parta.csv), [italians_partb.csv](data/italians_partb.csv), and [italans_partc.csv](data/italians_partc.csv)) and [manifest_list_1855_1900.csv](data/manifest_list_1855_1900.csv).  
    + In the jupyter notebook [Italians_data_exploration.ipynb], I combined the three passenger data files into [italians_to_america.csv](data/italians_to_america.csv). 
+ an example of the cleaned data  
 |**LastName**|**FirstName**|**Age**|**Occupation**|**Literacy**|**CountryofOrigin**|**CityTownofLastResidence**|**DestinationCityTown**|**TransitTravelCompartment**|**ManifestID**|**Province**|**ShipName**|**Port**|**Arrival**
:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:
0|BUONGIORNO|ANTONIO|49|BLACKSMITH|READ & WRITE|ITALY|SCIACCA|NEW YORK|Return trip to USA - non US Citizen [Transit];...|82236|Agrigento|EMS|NAPLES|12/29/1892
1|BUONGIORNO|GIUSEPPE|60|BLACKSMITH|READ & WRITE|ITALY|SCIACCA|NEW YORK|Return trip to USA - non US Citizen [Transit];...|82236|Agrigento|EMS|NAPLES|12/29/1892
2|CARUSO|FRANCESCA|Infant in months: 10|INFANT|NO|ITALY|SCIACCA|NEW YORK|Return trip to USA - non US Citizen [Transit];...|82236|Agrigento|EMS|NAPLES|12/29/1892
3|CARUSO|FRANCESCO|3|CHILD, YOUNGSTER|NO|ITALY|SCIACCA|NEW YORK|Return trip to USA - non US Citizen [Transit];...|82236|Agrigento|EMS|NAPLES|12/29/1892
4|CARUSO|ROSA|38|WIFE|READ & WRITE|ITALY|SCIACCA|NEW YORK|Return trip to USA - non US Citizen [Transit];...|82236|Agrigento|EMS|NAPLES|12/29/1892
5|ATTANASIO|GIUSEPPE|21|LABORER|UNKNOWN|ITALY|PALERMO|NEW YORK|Staying in the USA [Transit]; Stowaway [Travel]|80591|Palermo|GOTTARDO|ANTWERP|11/30/1884
6|CORRAO|VINCENZO|23|CARPENTER|UNKNOWN|ITALY|PALERMO|NEW YORK|Staying in the USA [Transit]; Stowaway [Travel]|80591|Palermo|GOTTARDO|ANTWERP|11/30/1884
7|CUBILLO|ROSARIO|40|UNKNOWN|UNKNOWN|ITALY|MESSINA|NEW YORK|Staying in the USA [Transit]; Stowaway [Travel]|63|Messina|ALESIA|MESSINA & NAPLES|04/25/1885
8|DACQUISTO|LORENZO|22|BLACKSMITH|UNKNOWN|ITALY|PALERMO|NEW YORK|Staying in the USA [Transit]; Stowaway [Travel]|80591|Palermo|GOTTARDO|ANTWERP|11/30/1884
9|DERASE|LUIGI|Unknown|UNKNOWN|UNKNOWN|ITALY|MESSINA|NEW YORK|Staying in the USA [Transit]; Stowaway [Travel]|63|Messina|ALESIA|MESSINA & NAPLES|04/25/1885
 
+ anticipated format when ready for web map
  + My final data files will be: a csv containing the passenger data and a GeoJSON containing the Province boundaries for Sicily.
+ additional content you'll want to obtain or generate for the final map (supplementary descriptive text, images, etc).

 B. Medium for delivery
 
 The map will be a web-brower-based application accessible across mobile and desktop devices. 

 C. Application layout
 
 D. Thematic representation 
 
 E. User interaction
 The user will click on 

 F. Aesthetics and design considerations  
 
 G. Conclusion
