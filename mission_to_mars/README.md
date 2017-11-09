
<h2>(Step 1) Scraping - Mars News</h2>


```python
# Dependencies
from bs4 import BeautifulSoup
import requests
import pandas as pd
import time
from splinter import Browser


# URL of page to be scraped
url = 'https://mars.nasa.gov/news/'

# Retrieve page with the requests module
response = requests.get(url)
# Create BeautifulSoup object; parse with 'lxml'
soup = BeautifulSoup(response.text, 'lxml')


# Retrieve the parent divs for all articles
results = soup.find_all('div', class_='slide')

# Loop through results to retrieve news_title and summary
mars_information=[]

for result in results:
    news_title = result.find('div', class_='content_title').text
    news_p = result.find('div', class_='rollover_description_inner').text
    mars_information.append({"Title": news_title,"Summary": news_p})

mars_information=pd.DataFrame(mars_information)
mars_information
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Summary</th>
      <th>Title</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>\nOn a part of "Vera Rubin Ridge" where rover-...</td>
      <td>\n\nMartian Ridge Brings Out Rover's Color Tal...</td>
    </tr>
    <tr>
      <th>1</th>
      <td>\nWhen NASA's Mars Pathfinder touched down in ...</td>
      <td>\n\nNext Mars Rover Will Have 23 'Eyes'\n\n</td>
    </tr>
    <tr>
      <th>2</th>
      <td>\nNASA's Mars rover Curiosity team is working ...</td>
      <td>\n\nMars Rover Mission Progresses Toward Resum...</td>
    </tr>
    <tr>
      <th>3</th>
      <td>\nWhen NASA scientists want to follow the path...</td>
      <td>\n\nTake a Walk on Mars -- in Your Own Living ...</td>
    </tr>
    <tr>
      <th>4</th>
      <td>\nMars has an invisible magnetic “tail” that i...</td>
      <td>\n\nNASA’s MAVEN Mission Finds Mars Has a Twis...</td>
    </tr>
    <tr>
      <th>5</th>
      <td>\nThe discovery of evidence for ancient sea-fl...</td>
      <td>\n\nMars Study Yields Clues to Possible Cradle...</td>
    </tr>
  </tbody>
</table>
</div>



<h2>(Step 1)  Scraping - JPL Mars Space Images </h2>


```python

browser = Browser('chrome', headless=False)
url = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
browser.visit(url)

url_list=[]
# Iterate through all pages
try:
    for x in range(100):
        # HTML object
        html = browser.html
        # Parse HTML with Beautiful Soup
        soup = BeautifulSoup(html, 'html.parser')
        # Retrieve all elements that contain book information
        urls = soup.find_all('li', class_='slide')
    # Iterate through each book
        for url in urls:
             # Use Beautiful Soup's find() method to navigate and retrieve attributes
            a_url = url.find('a')['data-fancybox-href']
            url_list.append(a_url)
except:
    print('')

full_url_list = ['https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars' + url for url in url_list]
pd.options.display.max_colwidth = 99999
# full_url_list=pd.DataFrame(full_url_list)
full_url_list=pd.DataFrame({'URLs':full_url_list})
full_url_list.head()
```

    





<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>URLs</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>https://www.jpl.nasa.gov/spaceimages/?search=&amp;category=Mars/spaceimages/images/largesize/PIA22024_hires.jpg</td>
    </tr>
    <tr>
      <th>1</th>
      <td>https://www.jpl.nasa.gov/spaceimages/?search=&amp;category=Mars/spaceimages/images/largesize/PIA22023_hires.jpg</td>
    </tr>
    <tr>
      <th>2</th>
      <td>https://www.jpl.nasa.gov/spaceimages/?search=&amp;category=Mars/spaceimages/images/largesize/PIA22022_hires.jpg</td>
    </tr>
    <tr>
      <th>3</th>
      <td>https://www.jpl.nasa.gov/spaceimages/?search=&amp;category=Mars/spaceimages/images/largesize/PIA22021_hires.jpg</td>
    </tr>
    <tr>
      <th>4</th>
      <td>https://www.jpl.nasa.gov/spaceimages/?search=&amp;category=Mars/spaceimages/images/largesize/PIA22020_hires.jpg</td>
    </tr>
  </tbody>
</table>
</div>



<h2>(Step 1)  Scraping - Weather/Tweets</h2>


```python
 # URL of page to be scraped
url = 'https://twitter.com/marswxreport?lang=en'

# Retrieve page with the requests module
response = requests.get(url)
# Create BeautifulSoup object; parse with 'lxml'
soup = BeautifulSoup(response.text, 'lxml')


# Retrieve the parent divs for all articles
results = soup.find_all('div', class_='js-tweet-text-container')
mars_weather=[]

for result in results:
    weather_tweet= result.find('p', class_='tweet-text').text
#     print('-----------------')
#     print(weather_tweet)
    mars_weather.append({"Tweet": weather_tweet})

mars_weather=pd.DataFrame(mars_weather)
mars_weather[mars_weather['Tweet'].str.contains("Sol 1")]
mars_weather.head()
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Tweet</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Sol 1867 (Nov 06, 2017), Sunny, high -24C/-11F, low -78C/-108F, pressure at 8.48 hPa, daylight 05:55-17:38</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Sol 1865 (Nov 04, 2017), Sunny, high -31C/-23F, low -80C/-112F, pressure at 8.52 hPa, daylight 05:56-17:38</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Sol 1862 (Nov 01, 2017), Sunny, high -30C/-22F, low -81C/-113F, pressure at 8.54 hPa, daylight 05:56-17:39</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Sol 1858 (Oct 28, 2017), Sunny, high -28C/-18F, low -81C/-113F, pressure at 8.57 hPa, daylight 05:57-17:40</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Sol 1856 (Oct 26, 2017), Sunny, high -28C/-18F, low -80C/-112F, pressure at 8.59 hPa, daylight 05:57-17:40</td>
    </tr>
  </tbody>
</table>
</div>



<h2>(Step 1)  Scraping - Mars Facts</h2>


```python
 # URL of page to be scraped
url = 'https://space-facts.com/mars/'

# Retrieve page with the requests module
response = requests.get(url)
# Create BeautifulSoup object; parse with 'lxml'
soup = BeautifulSoup(response.text, 'lxml')


# Retrieve the parent divs for all articles
results = soup.find_all('tr')
# results = soup.find_all('table', class_='tablepress-id-mars')
mars_facts=[]



# data_rows = soup.findAll('td') 
# print(data_rows)

for result in results:
    fact= result.find('td', class_='column-1').text
    data= result.find('td', class_='column-2').text
    mars_facts.append({"Data": data, "Fact": fact})

mars_facts=pd.DataFrame(mars_facts)
mars_facts=mars_facts[['Fact', 'Data']]
mars_facts
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Fact</th>
      <th>Data</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Equatorial Diameter:</td>
      <td>6,792 km\n</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Polar Diameter:</td>
      <td>6,752 km\n</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Mass:</td>
      <td>6.42 x 10^23 kg (10.7% Earth)</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Moons:</td>
      <td>2 (Phobos &amp; Deimos)</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Orbit Distance:</td>
      <td>227,943,824 km (1.52 AU)</td>
    </tr>
    <tr>
      <th>5</th>
      <td>Orbit Period:</td>
      <td>687 days (1.9 years)\n</td>
    </tr>
    <tr>
      <th>6</th>
      <td>Surface Temperature:</td>
      <td>-153 to 20 °C</td>
    </tr>
    <tr>
      <th>7</th>
      <td>First Record:</td>
      <td>2nd millennium BC</td>
    </tr>
    <tr>
      <th>8</th>
      <td>Recorded By:</td>
      <td>Egyptian astronomers</td>
    </tr>
  </tbody>
</table>
</div>



<h2>(Step 2)  HTML </h2>


```python
mars_facts_HTML = mars_facts.to_html()
mars_facts_HTML
```




    '<table border="1" class="dataframe">\n  <thead>\n    <tr style="text-align: right;">\n      <th></th>\n      <th>Fact</th>\n      <th>Data</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th>0</th>\n      <td>Equatorial Diameter:</td>\n      <td>6,792 km\\n</td>\n    </tr>\n    <tr>\n      <th>1</th>\n      <td>Polar Diameter:</td>\n      <td>6,752 km\\n</td>\n    </tr>\n    <tr>\n      <th>2</th>\n      <td>Mass:</td>\n      <td>6.42 x 10^23 kg (10.7% Earth)</td>\n    </tr>\n    <tr>\n      <th>3</th>\n      <td>Moons:</td>\n      <td>2 (Phobos &amp; Deimos)</td>\n    </tr>\n    <tr>\n      <th>4</th>\n      <td>Orbit Distance:</td>\n      <td>227,943,824 km (1.52 AU)</td>\n    </tr>\n    <tr>\n      <th>5</th>\n      <td>Orbit Period:</td>\n      <td>687 days (1.9 years)\\n</td>\n    </tr>\n    <tr>\n      <th>6</th>\n      <td>Surface Temperature:</td>\n      <td>-153 to 20 °C</td>\n    </tr>\n    <tr>\n      <th>7</th>\n      <td>First Record:</td>\n      <td>2nd millennium BC</td>\n    </tr>\n    <tr>\n      <th>8</th>\n      <td>Recorded By:</td>\n      <td>Egyptian astronomers</td>\n    </tr>\n  </tbody>\n</table>'


