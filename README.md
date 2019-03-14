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

What are the content requirements for your map? Provide a description of the following:

+ data source(s) with links
    + [Italians to America Passenger Data File, 1855 - 1900](https://aad.archives.gov/aad/series-description.jsp?s=4433&cat=GP44&bc=,sl&col=1002) The National Archives has a database of Itailian immigrants from transcribed passenger manifests with some demographic data and the passenger's previous residence and final destination.
    + [List of the communes in Sicily](https://en.wikipedia.org/wiki/List_of_communes_of_Sicily) from Wikipedia
    + Province boundaries for Italy from http://www.diva-gis.org/. I am using modern-day boundaries.

+ wrangling and analysis process (include indication of tools you used, e.g., QGIS, spreadsheet applications, Python/Jupyter Notebooks, pandos, etc)
    +  I scraped the passenger and manifest header data using the jupyter notebook [NARA_scraper.ipynb], resulting in [italians_to_america.csv](data/italians_to_america.csv) and [manifest_list_1855_1900.csv](data/manifest_list_1855_1900.csv).  
+ an example of the cleaned data (e.g., the first 10 rows of a pandas GeoDataframe or CSV file ... could be a screenshot or you can format example within a Markdown table. If in Jupyter notebooks export to HTML and copy/paste the table created with a DataFrame)

+ anticipated format when ready for web map (e.g., GeoJSON/CSV flat files, remote-hosted PostGres database, etc).
+ additional content you'll want to obtain or generate for the final map (supplementary descriptive text, images, etc).

 B. Medium for delivery
 
 The map will be a web-brower-based application accessible across mobile and desktop devices. 

 C. Application layout
 
 D. Thematic representation  

 F. Aesthetics and design considerations  
 
 G. Conclusion
