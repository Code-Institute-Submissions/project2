queue()
   .defer(d3.json, "/visitBritainKK/attractions")
   .await(makeGraphs);

function makeGraphs(error, attractionsJson) {

   //Clean attractionsJson data
   var visitorAttractionsData = attractionsJson;
   visitorAttractionsData.forEach(function (d) {
       d["2011_visitors"] = +d["2011_visitors"];
       d["2012_visitors"] = +d["2012_visitors"];
       d["2013_visitors"] = +d["2013_visitors"];
       d["2014_visitors"] = +d["2014_visitors"];
       d["2015_visitors"] = +d["2015_visitors"];
   });

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
   var totalVisitors2015Dim = ndx.dimension(function (d) {
       return d["2015_visitors"];
   });
    var totalVisitors2014Dim = ndx.dimension(function (d) {
       return d["2014_visitors"];
   });
      var totalVisitors2013Dim = ndx.dimension(function (d) {
       return d["2013_visitors"];
   });
   var paidforDim = ndx.dimension(function (d) {
       return d["charge"];
   });
    var chargeDim = ndx.dimension(function (d) {
       return d["charge_band"];
   });


   //Calculate metrics
   var numAttractionsByRegion = regionDim.group();
   var numAttractionsByCategory = categoryDim.group();
   var numAttractionsByPaid = paidforDim.group();
   var numAttractionsByChargeBand = chargeDim.group();
   var totalVisitorsByCru = cruDim.group().reduceSum(function (d) {
       return d["2015_visitors"];
   });
   var cruGroup = cruDim.group();


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

   //Charts - define the chart types objects using DC.js library.
    // We also bind the charts to the div ID’s in index.html.
  // var timeChart = dc.barChart("#time-chart");
   var RegionChart = dc.rowChart("#region-row-chart");
   var CategoryChart = dc.rowChart("#category-row-chart");
   var numberAttractionsND = dc.numberDisplay("#number-attractions-nd");
   var totalVisitors2015ND = dc.numberDisplay("#total-2015visitors-nd");
   var totalVisitors2014ND = dc.numberDisplay("#total-2014visitors-nd");
   var totalVisitors2013ND = dc.numberDisplay("#total-2013visitors-nd");
   var PaidChart = dc.pieChart("#paid-chart");
   var ChargeChart = dc.pieChart("#charges-chart");


   selectField = dc.selectMenu('#menu-select')
       .dimension(cruDim)
       .group(cruGroup);


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
       .formatNumber(d3.format(".3s"));

   totalVisitors2014ND

       .valueAccessor(function (d) {
           return d;
       })
       .group(totalVisitors2014)
       .formatNumber(d3.format(".3s"));

    totalVisitors2013ND

       .valueAccessor(function (d) {
           return d;
       })
       .group(totalVisitors2013)


 RegionChart
       .width(800)
       .height(200)
       .margins({top: 10, right: 50, bottom: 30, left: 50})
       .dimension(regionDim)
       .group(numAttractionsByRegion)
       .xAxis().ticks(4);

   ChargeChart
       .height(220)
       .radius(90)
       .innerRadius(40)
       .transitionDuration(1500)
       .dimension(chargeDim)
       .group(numAttractionsByChargeBand);

   CategoryChart
       .width(300)
       .height(250)
       .dimension(categoryDim)
       .group(numAttractionsByCategory)
       .xAxis().ticks(4);

   PaidChart
       .height(220)
       .radius(90)
       .innerRadius(40)
       .transitionDuration(1500)
       .dimension(paidforDim)
       .group(numAttractionsByPaid);


   dc.renderAll();
}
