queue()
   .defer(d3.json, "/visitBritainKK/attractions")
   .await(makeGraphs);

function makeGraphs(error, attractionsJson) {

   //Clean attractionsJson data
   var visitorAttractionsData = attractionsJson;

   //Create a Crossfilter instance
   var ndx = crossfilter(visitorAttractionsData);

   //Define Dimensions
   var cruDim = ndx.dimension(function (d) {
       return d["cru"];
   });
   var categoryDim = ndx.dimension(function (d) {
       return d["category"];
   });
   var regionDim = ndx.dimension(function (d) {
       return d["region"];
   });
    var chargeDim = ndx.dimension(function (d) {
       return d["charge_band"];
   });


   //Calculate metrics
   var totalVisits2015ByRegion = regionDim.group().reduceSum(function(d) {return d["2015_visitors"]});
   var totalVisits2014ByRegion = regionDim.group().reduceSum(function(d) {return d["2014_visitors"]});
   var totalVisits2013ByRegion = regionDim.group().reduceSum(function(d) {return d["2013_visitors"]});
   var numAttractionsByRegion = regionDim.group();
   var totalVisits2014ByCategory = categoryDim.group().reduceSum(function(d) {return d["2014_visitors"]});
   var totalVisits2015ByCategory = categoryDim.group().reduceSum(function(d) {return d["2015_visitors"]});
   var numAttractionsByChargeBand = chargeDim.group();
   var totalVisitorsByCru = cruDim.group().reduceSum(function (d) {return d["2015_visitors"]});


   var all = ndx.groupAll();
   var totalVisitors2015 = ndx.groupAll().reduceSum(function (d) {
       return d["2015_visitors"];
   });
   var totalVisitors2014 = ndx.groupAll().reduceSum(function (d) {
       return d["2014_visitors"];
   });
    var totalVisitors2013 = ndx.groupAll().reduceSum(function (d) {
       return d["2013_visitors"];
   });
     var totalVisitors2012 = ndx.groupAll().reduceSum(function (d) {
       return d["2012_visitors"];
   });
    var totalVisitors2011 = ndx.groupAll().reduceSum(function (d) {
       return d["2011_visitors"];
   });

   //Charts - define the chart types objects using DC.js library.
    // We also bind the charts to the div ID’s in index.html.
   var RegionByAttractionsChart = dc.rowChart("#attractions-rowchart");
   var RegionByVisitsBarChart = dc.barChart("#visitsbyregion-rowchart");
   var CategoryChart = dc.rowChart("#visitsbycat-rowchart");
   var numberAttractionsND = dc.numberDisplay("#number-attractions-nd");
   var totalVisitors2015ND = dc.numberDisplay("#total-2015visitors-nd");
   var totalVisitors2014ND = dc.numberDisplay("#total-2014visitors-nd");
   var totalVisitors2013ND = dc.numberDisplay("#total-2013visitors-nd");
   var totalVisitors2012ND = dc.numberDisplay("#total-2012visitors-nd");
   var totalVisitors2011ND = dc.numberDisplay("#total-2011visitors-nd");
   var ChargeChart = dc.pieChart("#fees-chart");

   selectField = dc.selectMenu("#menu-select")
       .dimension(cruDim)
       .group(totalVisitorsByCru);

   numberAttractionsND
      .formatNumber(d3.format("d"))
       .valueAccessor(function (d) {
           return d;
       })
       .group(all);

   totalVisitors2015ND
       .formatNumber(d3.format("d"))
       .valueAccessor(function (d) {
           return d;
       })
       .group(totalVisitors2015)
       .formatNumber(d3.format(",.6r"));

   totalVisitors2014ND
       .valueAccessor(function (d) {
           return d;
       })
       .group(totalVisitors2014)
       .formatNumber(d3.format(",.6r"));

    totalVisitors2013ND
       .valueAccessor(function (d) {
           return d;
       })
       .group(totalVisitors2013)
        .formatNumber(d3.format(",.6r"));

     totalVisitors2012ND
       .valueAccessor(function (d) {
           return d;
       })
       .group(totalVisitors2012)
       .formatNumber(d3.format(",.6r"));

    totalVisitors2011ND
       .valueAccessor(function (d) {
           return d;
       })
       .group(totalVisitors2011)
        .formatNumber(d3.format(",.6r"));

      //array of colors doesnt work with piechart
    var colorScale = d3.scale.ordinal().range(['#3182bd', '#6baed6', '#9ecae1',  '#dadaeb']);
    // var colorScale = d3.scale.ordinal().range(["DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue"]);
    var colorScale2 = ['#3182bd', '#6baed6', '#9ecae1',  '#dadaeb']


    RegionByVisitsBarChart
       .width(320)
       .height(320)
       .margins({top: 10, right: 50, bottom: 30, left: 70})
       .dimension(regionDim)
       .group(totalVisits2013ByRegion,"2013")
       .stack(totalVisits2014ByRegion,"2014")
       .stack(totalVisits2015ByRegion,"2015")
       .legend(dc.legend().x(200).y(10).itemHeight(13).gap(5))
       .xUnits(dc.units.ordinal) // Tell dc.js that we're using an ordinal x-axis
       .x(d3.scale.ordinal())
       .colors(d3.scale.ordinal().range(colorScale2))
        .transitionDuration(2500)
       .xAxisLabel("Region")
       .yAxis().ticks(4);

    CategoryChart
       .width(320)
       .height(320)
       .dimension(categoryDim)
       .group(totalVisits2015ByCategory)
       //.stack(totalVisits2015ByCategory)
       .ordinalColors(colorScale2)
       .xAxis().ticks(5);

    RegionByAttractionsChart
       .width(320)
       .height(320)
       .margins({top: 10, right: 50, bottom: 30, left: 10})
       .dimension(regionDim)
       .group(numAttractionsByRegion)
       .ordinalColors(colorScale2)
       .xAxis().ticks(6);

    ChargeChart
       .height(160)
       .radius(80)
       .innerRadius(20)
       .colors(colorScale)
       .transitionDuration(2500)
       .dimension(chargeDim)
       .group(numAttractionsByChargeBand)
       .label(function (d) {
          return "£" + d.key;
        });

   dc.renderAll();
}
