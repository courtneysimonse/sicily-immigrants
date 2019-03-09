# Sicilians Through Ellis Island and Beyond  
## 1855-1900

I. Introduction

I want to design a map that explores Sicilian immigration to the United States in the late 19th-early 20th century.   
[Ellis Island](https://www.nps.gov/elis/index.htm) was the main immigrant processing station for the United States from 1892 to 1954. My great-grandfather went through Ellis Island three times (1905, 1912, and 1922)! The ship manifests have lists of passengers, as well as age, sex, marital status, occupation, destination, and some other items depending on the year.  
My maternal grandmother’s parents were born in Augusta, Sicily, a town on the eastern coast near Syracuse. Like all of Sicily, many people left during this time period in search of a better life. I am interested in where those that left Augusta, or more broadly Sicily, settled in the United States. 

Provide an introductory paragraph or two. This should answer the following questions for your reader:

    What geographical phenomena or processes does the map represent?
        what are the real world entities or processes you are mapping?
        where are do these entities or processes occur?
        when did these phenomena or processes happen?
    What work will the map do?
        Frame this answer in terms of the intended user or audience and the user experience (UX) you're seeking to create. - e.g., "The map will appeal to X people and show/reveal/explore Y and Z to them ...".
        Then, describe how it will affect the user. - e.g., "The user will be informed/inspired/motivated/emotional/made more curious ...".
        Finally, provide a statement of the project's broader impact. - e.g., "The map will help provide an unmet need for society to better understand X."

[possible mockup/wireframe here]
II. Methodology

First provide a general statement summarizing the following subsections (one or two sentences).
 A. Data

What are the content requirements for your map? Provide a description of the following:

+ data source(s) with links
    + [Italians to America Passenger Data File, 1855 - 1900](https://aad.archives.gov/aad/series-description.jsp?s=4433&cat=GP44&bc=,sl&col=1002) The National Archives has a database of Itailian immigrants from transcribed passenger manifests with some demographic data and the passenger's previous residence and final destination. I scraped this data using the jupyter notebook [NARA_scraper.ipynb]: [italians_to_america.csv](data/italians_to_america.csv)  
    + [List of the communes in Sicily](https://en.wikipedia.org/wiki/List_of_communes_of_Sicily) from Wikipedia
    + Province boundaries for Italy from http://www.diva-gis.org/. I am using modern-day boundaries.

+ wrangling and analysis process (include indication of tools you used, e.g., QGIS, spreadsheet applications, Python/Jupyter Notebooks, pandos, etc)
+ an example of the cleaned data (e.g., the first 10 rows of a pandas GeoDataframe or CSV file ... could be a screenshot or you can format example within a Markdown table. If in Jupyter notebooks export to HTML and copy/paste the table created with a DataFrame)
+ anticipated format when ready for web map (e.g., GeoJSON/CSV flat files, remote-hosted PostGres database, etc).
+ additional content you'll want to obtain or generate for the final map (supplementary descriptive text, images, etc).

 B. Medium for delivery
 
 The map will be a web-brower-based application accessible across mobile and desktop devices. 

Begin with a topic sentence, something like, "The map will be a web browser-based application accessible across mobile and desktop devices ...."

Then provide a description of your anticipated technology stack and likely JavaScript libraries. For most of us the baseline will be HTML/SVG/CSS/JS and Leaflet. We'll likely want to user a responsive framework (i.e., Bootstrap, Assembly.css).

Given your representation and interaction requirements listed below, consider what other libraries you may use. For example, if you're going to do some buffer analysis perhaps you'll use Turf.js. If classifying data on the fly, perhaps simple-statistics.js. If doing address geolocation in a search bar or routing, then note these as well.

It will be nice to include active links to these libraries within the Markdown proposal.
 C. Application layout

Here you'll want to consider the general layout of the web page and how it will "respond" to different device sizes. It's probably easiest to include 2 or three very simple wireframes showing mobile, tablet, and desktop layouts (not detailed mockups).

Also see: https://gistbok.ucgis.org/bok-topics/mobile-maps-and-responsive-design 
 D. Thematic representation

Here describe how the data will be visually represented (points, lines, polygons) and what thematic technique you will employ (icons or proportional symbols for points, classified choropleth for polygons).

You may also want to indicate what visual variables you will use to encode your information (i.e., the size of the proportional symbol to encode the amount of X, different hues to encode nominal distinctions between features).

Also see: https://gistbok.ucgis.org/bok-topics/symbolization-and-visual-variables (Links to an external site.)Links to an external site.
 (Links to an external site.)Links to an external site.E. User interaction

In this section describe how the user will engage or interact with the map. Will be a more simple scrolling interface? With the user need to pan/zoom and hover or click on features to retrieve information? Will there be additional user interaction elements for selecting, filtering, or changing the map?

Describe what the user interface will be composed of (toggle buttons, search forms, .etc) and the result. How will the UI elements affect the representation of the data or map experience?

Include additional mockups of either the entire application or specific parts of the user interface.

You may want to include an example of a user persona/scenario here if it helps describe the intent of your map design (see MAP673 modules 05/06).

Also see: https://gistbok.ucgis.org/bok-topics/user-interface-and-user-experience-uiux-design

F. Aesthetics and design considerations

Here a full-blown mockup may be useful, but not necessary. You may also simply offer some anticipated design solutions for your map. Think about:

    colors (what's the tone of the map?)
    dark vs light motif
    font choices
    modern or flat design? something more flamboyant or artsy?

G. Conclusion

Provide a brief (one or two paragraphs) statement to conclude the proposal. This will likely be restating what you said in the introduction, but also (re)consider the format we used in the first assignment (a topic with a motivating question): https://uk.instructure.com/courses/1932127/assignments/10232395
