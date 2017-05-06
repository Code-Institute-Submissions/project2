# 2015 Survey of visits to Visitor Attractions

##Overview
###What is this dashboard for?
Gives us a visual picture of the trends in the visitor attraction sector in 2015
###What does it do?
Gives us a breakdown of the visitor attraction sector in terms of key information such as geographical regions, categories and entrance fees.  
###How does it work?
The dashboard displays data from a survey visually in various charts. Each chart will react to the other charts when selected.

##Features
A dashboard on the home page showing:
A row chart of all the visitor attractions in the survey broken down by region.
A row chart of all the visitor attractions in the survey broken down by category.
A bar chart of the total number of visits in each region.
A bar chart of the total number of visits in each region.
A piechart of the entrance fee groupings of all the visitor attractions in the survey.
A select menu to chose between rural, urban or coastal visits.
Summary data of totals for visitor attractions surveyed, visits made in 2013, 2014 and 2015.
An about page giving some background information about the survey data used.  


##Tech Used
Some of the tech used includes:
- [Flask](https://pypi.python.org/pypi/Flask/0.12)
	- We use **Flask** to create the website because it is a simple and flexible python web framework which allows more control over which components to use.
- [Jinga2]
	- We use **Jinga2** as the templating engine to seperate content from design. The 2 child templates are about.html and index.html. 
- [Bootstrap](http://getbootstrap.com/)
    - We use **Bootstrap** to give our project a simple, responsive layout
- [MongoDB](https://www.mongodb.com/download-center#production)
	- We use **MongoDB for easy storage and fast access.
- [Crossfilter](https://github.com/square/crossfilter)
	- We use **Crossfilter** to group and filter data quickly.
- [D3](https://github.com/d3/d3)
	- We use **D3** to visualise the data.
- [DC](https://github.com/dc-js/dc.js)
	- We use **DC** to make the dashboard interactive.


##Contributing

 
### Getting the code up and running
1. Firstly you will need to clone this repository by running the ```git clone https://github.com/Kazkal/project2``` command
2. After you've that you'll need to make sure that you have **bootstrap** and **bower** installed
  1. You can get **npm** by installing Node from [here](https://nodejs.org/en/)
  2. Once you've done this you'll need to run the following command:
     `npm install -g bower # this may require sudo on Mac/Linux`
3. Once **npm** and **bower** are installed, you'll need to install all of the dependencies in *package.json* and *bower.json*
  ```
  npm install
 
  bower install
  ```
4. After those dependencies have been installed you'll need to make sure that you have **http-server** installed. You can install this by running the following: ```npm install -g http-server # this also may require sudo on Mac/Linux```
5. Once **http-server** is installed run ```http-server -c-1```
6. The project will now run on [localhost](http://127.0.0.1:8080)
7. Make changes to the code and if you think it belongs in here then just submit a pull request
