# Sicilians Through Ellis Island and Beyond, 1855-1900

## I. Introduction

This geospatial data project and map explores Sicilian immigration to the United States in the late 19th-early 20th century.

New York City was a major port of entry for most of US history. [Castle Garden](https://www.nps.gov/cacl/index.htm), the country's first immigration center, operated from 1855 to 1890. It was replaced by [Ellis Island](https://www.nps.gov/elis/index.htm), which was the main immigrant processing station for the United States from 1892 to 1954. My great-grandfather landed in New York three times (1905, 1912, and 1922)! The ship manifests have lists of passengers, as well as other items such as age, sex, marital status, occupation, and destination depending on the year. .

The following examples are drawn from primary historical data including passenger lists of vessels arriving at New York from 1820 to 1897, indexes of passenger lists of vessels arriving in New York from 1820 to 1846, NARA publications M261 and M237 / United States, and Immigration and Naturalization Service, accessed via familysearch.org.

![Manifest Example 1870](images/ManifestExample1870.jpg "1870")  
**Figure 01.** Manifest Example 1870.

![](images/ManifestExample1892.jpg "1892") 
**Figure 02.** Manifest Example 1892.
 
![Manifest Example 1905](images/ManifestExample1905.jpg "1905")  
**Figure 03.** Manifest Example 1905.

My maternal grandmother’s parents were born in Augusta, Sicily, a town on the eastern coast near Syracuse. Like all of Sicily, many people left during this time period in search of a better life. This project provides a map interface for visualizing where those who left Augusta ,and Sicily more broadly, settled in the United States.

Users can gain  understanding of the history of immigration to the United States by exploring a small slice of that story.

## II. Methodology

### A. Data

#### 1. Data sources
  
+ [Italians to America Passenger Data File, 1855 - 1900](https://aad.archives.gov/aad/series-description.jsp?s=4433&cat=GP44&bc=,sl&col=1002) The National Archives has a database of Italian immigrants from transcribed passenger manifests with some demographic data and the passenger's previous residence and final destination.
+ Wikipedia publishes a [list of the communes in Sicily](https://en.wikipedia.org/wiki/List_of_communes_of_Sicily).
+ Province boundaries for Italy derived from http://www.diva-gis.org/ (modern-day province boundaries).

#### 2. Data wrangling and analysis process
  
+ I scraped the passenger and manifest header data using the process documented in Jupyter notebook (see [data/NARA_scraper.ipynb](project-files/NARA_scraper.ipynb)), resulting in four passenger data files
  + [italians_parta.csv](project-files/italians_parta.csv), 
  + [italians_partb.csv](project-files/italians_partb.csv), 
  + [italans_partc.csv](project-files/italians_partc.csv)), and
  + [manifest_list_1855_1900.csv](project-files/manifest_list_1855_1900.csv).  
+ In the jupyter notebook [Italians_data_exploration.ipynb](project-files/Italians_data_exploration.ipynb), I combined the three passenger data files into [italians_to_america.csv](data/italians_to_america.csv). 
+ I then used the list of communes in Sicily [communes_sicily.csv](data/communes_sicily.csv) to filter the passengers to only those that reported a last previous residence in Sicily. I did not account for multiple communes with the same name or any now defunct communes in this analysis. I then added the province name as a new column by matching with the commune name. Finally, I converted the Manifest ID to be "int" to match the manifest list file and added the manifest header information to the passenger data file.


|       | **LastName** | **FirstName** |       **Age**        |  **Occupation**  | **Literacy** | **CountryofOrigin** | **CityTownofLastResidence** | **DestinationCityTown** |           **TransitTravelCompartment**            | **ManifestID** | **Province** | **ShipName** |     **Port**     | **Arrival** |
| :---: | :----------: | :-----------: | :------------------: | :--------------: | :----------: | :-----------------: | :-------------------------: | :---------------------: | :-----------------------------------------------: | :------------: | :----------: | :----------: | :--------------: | :---------: |
|   0   |  BUONGIORNO  |    ANTONIO    |          49          |    BLACKSMITH    | READ & WRITE |        ITALY        |           SCIACCA           |        NEW YORK         | Return trip to USA - non US Citizen [Transit];... |     82236      |  Agrigento   |     EMS      |      NAPLES      | 12/29/1892  |
|   1   |  BUONGIORNO  |   GIUSEPPE    |          60          |    BLACKSMITH    | READ & WRITE |        ITALY        |           SCIACCA           |        NEW YORK         | Return trip to USA - non US Citizen [Transit];... |     82236      |  Agrigento   |     EMS      |      NAPLES      | 12/29/1892  |
|   2   |    CARUSO    |   FRANCESCA   | Infant in months: 10 |      INFANT      |      NO      |        ITALY        |           SCIACCA           |        NEW YORK         | Return trip to USA - non US Citizen [Transit];... |     82236      |  Agrigento   |     EMS      |      NAPLES      | 12/29/1892  |
|   3   |    CARUSO    |   FRANCESCO   |          3           | CHILD, YOUNGSTER |      NO      |        ITALY        |           SCIACCA           |        NEW YORK         | Return trip to USA - non US Citizen [Transit];... |     82236      |  Agrigento   |     EMS      |      NAPLES      | 12/29/1892  |
|   4   |    CARUSO    |     ROSA      |          38          |       WIFE       | READ & WRITE |        ITALY        |           SCIACCA           |        NEW YORK         | Return trip to USA - non US Citizen [Transit];... |     82236      |  Agrigento   |     EMS      |      NAPLES      | 12/29/1892  |
|   5   |  ATTANASIO   |   GIUSEPPE    |          21          |     LABORER      |   UNKNOWN    |        ITALY        |           PALERMO           |        NEW YORK         |  Staying in the USA [Transit]; Stowaway [Travel]  |     80591      |   Palermo    |   GOTTARDO   |     ANTWERP      | 11/30/1884  |
|   6   |    CORRAO    |   VINCENZO    |          23          |    CARPENTER     |   UNKNOWN    |        ITALY        |           PALERMO           |        NEW YORK         |  Staying in the USA [Transit]; Stowaway [Travel]  |     80591      |   Palermo    |   GOTTARDO   |     ANTWERP      | 11/30/1884  |
|   7   |   CUBILLO    |    ROSARIO    |          40          |     UNKNOWN      |   UNKNOWN    |        ITALY        |           MESSINA           |        NEW YORK         |  Staying in the USA [Transit]; Stowaway [Travel]  |       63       |   Messina    |    ALESIA    | MESSINA & NAPLES | 04/25/1885  |
|   8   |  DACQUISTO   |    LORENZO    |          22          |    BLACKSMITH    |   UNKNOWN    |        ITALY        |           PALERMO           |        NEW YORK         |  Staying in the USA [Transit]; Stowaway [Travel]  |     80591      |   Palermo    |   GOTTARDO   |     ANTWERP      | 11/30/1884  |
|   9   |    DERASE    |     LUIGI     |       Unknown        |     UNKNOWN      |   UNKNOWN    |        ITALY        |           MESSINA           |        NEW YORK         |  Staying in the USA [Transit]; Stowaway [Travel]  |       63       |   Messina    |    ALESIA    | MESSINA & NAPLES | 04/25/1885  |

**Figure 04.** Example table of cleaned data after Jupyter Notebook and Python processing.

The final data files ready for the web map are 1.) a CSV containing the passenger data with associated point data and a 2.) GeoJSON file containing the province boundaries for Sicily. These data are joined at runtime within the client's browser.

### B. Medium for delivery

The map will be a web-based application accessible across mobile and desktop devices through web browsers.

### C. Application layout  

![Layout Image](images/wireframe.JPG "basic layout")  
**Figure 05.** Initial application wireframe (modified through subsequent design iterations).
 
The mobile design will responsibly adjust to accommodate varying screen sizes.

### D. Thematic representation  

The map of Sicily represents provices encoded with a nomimal color scheme. Marker clusters will represent number of people who immigrated to the US, and individual points are accessible through zooming and clicking on the Markerclusters.

### E. User interaction  

The user will first click on a province in Sicily to focus on passengers from that province. That province will then stay highlighted as a visual reminder. A year slider will let the user narrow the range of years and filter the mapped features. Hovering on the destination points will allow the user to see the number of immigrants represented, as well as additional information such as age, occupation, and literacy.

### F. Aesthetics and design considerations

The design should look clean, not cluttered, and subtly incorporation of Italian colors (red, green, and white).

### G. Conclusion

Ellis Island and its predecessor, Castle Garden, processed many immigrants. Today, over 40% of Americans can trace their roots back to one of these immigrants ([Ellis Island Fact Sheet](https://www.nps.gov/npnh/learn/news/fact-sheet-elis.htm)). This map explores migration from Sicily to the United States and allows users to identify patterns of emigration and settlement.  The broader impact of the map contributes to a fuller understanding of US immigration.
