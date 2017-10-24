# 2015 Survey of visits to Visitor Attractions

## Overview
### What is this dashboard for?
Gives us a visual picture of the results of a survey of the English visitor attraction sector in 2015
### What does it do?
Gives us a breakdown of the visitor attraction sector in terms of key information such as the geographical density and entrance fees of the attractions. Shows the proportion of visits made to each category and each English region. Shows which region and which attraction category is most popular for visits and which ones are under visited.
### How does it work?
The dashboard displays data from a survey visually in various charts. When one chart is selected the other charts will show the corresponding information. For example, if the London region is selected in the first chart, the second chart will show only visits made in London. 

## Features
* A dashboard on the home page showing:
* A row chart of all the visitor attractions in the survey broken down by region.
* A row chart of all the visitor attractions in the survey broken down by category.
* A bar chart of the total number of visits in each region over 3 years.
* A piechart of the entrance fees of all the visitor attractions in the survey.
* A select menu to chose between rural, urban or coastal visits.
* Summary data of totals for visitor attractions surveyed, visits made in 2013, 2014 and 2015.
* An about page giving some background information about the survey data used.
* A step by step guide of the features on the dashboard.


## Tech Used
Some of the tech used includes:
* [Flask] and [Jinga2] (https://pypi.python.org/pypi/Flask/0.12)
    * We use **Flask** to create the website because it is a simple and flexible python web framework which allows more control over which components to use. We use **Jinga2** as the templating engine to seperate content from design. The 2 child templates are about.html and index.html.
* [Bootstrap] (http://getbootstrap.com/)
    * We use **Bootstrap** to give our project a simple, responsive layout
* [MongoDB] (https://www.mongodb.com/download-center#production)
	* We use **MongoDB** for easy storage and fast access.
* [D3] (https://github.com/d3/d3)
    * We use **D3** to visualise the data.
* [DC] (https://github.com/dc-js/dc.js) and [Crossfilter](https://github.com/square/crossfilter)
    * We use **DC** to make the dashboard interactive and **Crossfilter** to group and filter data quickly.
* [Intro.js] (https://github.com/usablica/intro.js.git)
    * We use **intro.js** to demonstrate features using a step by step guide.
* [Gunicorn] (http://gunicorn.org/)
    * We use **gunicorn** to serve our python web app.



	
## Testing
Website was tested for cross browser compatibility in the following browsers:
* Mozilla Firefox
* Google Chrome
* Internet Explorer
* Opera 3.4
Google Chrome DevTools' Device Mode was used to test the view in different screen sizes.

 
## Deployment to Heroku
1. I installed and registered with heroku (https://signup.heroku.com/).
2. I created a new heroku app with an address of immense-lake-83146, by entering  ```heroku create ``` at the command line
3. I used pip to install gunicorn.
4. I used the pip freeze command to create a requirements file (requirements.txt) inside the virtual environment.
5. I created a Procfile to tell heroku what coomand and what app to run.
6. I created a Procfile.windows file to locally host my app because gunicorn does not work on windows.
7. I committed and pushed the project to the master branch of the Heroku repository (https://git.heroku.com/immense-lake-83146.git.)
8. I used the cloud database service mLab add-on to deploy the mongodb database.
9. I imported the data from the file full_attractions_listing.csv into the database heroku_7r1rkpt6.
10. I updated my project to use the new mongodb database and committed and pushed the changes to the heroku repository.
