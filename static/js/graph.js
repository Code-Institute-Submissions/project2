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
   var totalVisitors2015Dim = ndx.dimension(function (d) {
       return d["2015_visitors"];
   });
    var totalVisitors2014Dim = ndx.dimension(function (d) {
       return d["2014_visitors"];
   });
      var totalVisitors2013Dim = ndx.dimension(function (d) {
       return d["2013_visitors"];
   });
    var chargeDim = ndx.dimension(function (d) {
       return d["charge_band"];
   });


   //Calculate metrics
   var numVisitsByRegion = regionDim.group().reduceSum(function(d) {return d["2015_visitors"]});
   var numAttractionsByRegion = regionDim.group();
   var numAttractionsByCategory = categoryDim.group();
   var numAttractionsByChargeBand = chargeDim.group();
   var totalVisitorsByCru = cruDim.group().reduceSum(function (d) {return d["2015_visitors"]});

   totalVisitorsByCru =(totalVisitorsByCru / 1000,000).toFixed(3) * 1000,000;
   var grp2015 = categoryDim.group().reduceSum(function(d) {return d["2015_visitors"]});
   var grp2014 = categoryDim.group().reduceSum(function(d) {return d["2014_visitors"]});
   var max_visitors = grp2015.top(1)[0].value;

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
   var RegionByAttractionsChart = dc.rowChart("#regionbyattractions-row-chart");
   var RegionByVisitsBarChart = dc.barChart("#region-visits-row-chart");
   var CategoryChart = dc.rowChart("#category-row-chart");
   var numberAttractionsND = dc.numberDisplay("#number-attractions-nd");
   var totalVisitors2015ND = dc.numberDisplay("#total-2015visitors-nd");
   var totalVisitors2014ND = dc.numberDisplay("#total-2014visitors-nd");
   var totalVisitors2013ND = dc.numberDisplay("#total-2013visitors-nd");
   var ChargeChart = dc.pieChart("#charges-chart");
   var compositeVisits = dc.compositeChart("#compositeVisits-chart");

   selectField = dc.selectMenu('#menu-select')
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

    RegionByAttractionsChart
       .width(400)
       .height(200)
       .margins({top: 10, right: 50, bottom: 30, left: 50})
       .dimension(regionDim)
       .group(numAttractionsByRegion)
       .xAxis().ticks(4);

    RegionByVisitsBarChart
       .width(400)
       .height(200)
       .margins({top: 10, right: 50, bottom: 30, left: 80})
       .dimension(regionDim)
       .group(numVisitsByRegion)
        .xUnits(dc.units.ordinal) // Tell dc.js that we're using an ordinal x-axis
        .x(d3.scale.ordinal())
        .colors(d3.scale.ordinal().range(["blue","red"]))
        .transitionDuration(2500)
       .xAxisLabel("Region")
       .yAxis().ticks(4);


   ChargeChart
       .height(220)
       .radius(110)
       .innerRadius(20)
       .transitionDuration(2500)
       .dimension(chargeDim)
       .group(numAttractionsByChargeBand);

   CategoryChart
       .width(300)
       .height(350)
       .dimension(categoryDim)
       .group(numAttractionsByCategory)
       .xAxis().ticks(4);

  // compositeVisits
  //      .width(500)
  //      .height(220)
  //     .margins({top: 10, right: 50, bottom: 30, left: 70})
   //     .x(d3.scale.linear().domain([0,max_visitors]))
  //      .yAxisLabel("Categories")
        //legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
  //      .renderHorizontalGridLines(true)
  //      .compose([
  //          dc.lineChart(compositeVisits)
  //              .dimension(grp2015)
  //              .colors('red')
  //              .group(categoryDim, "Top Line")
   //             .dashStyle([2,2]),
  //          dc.lineChart(compositeVisits)
  //              .dimension(grp2014)
  //              .colors('blue')
  //              .group(categoryDim, "Bottom Line")
  //              .dashStyle([5,5])
  //          ])
  //      .brushOn(false);

   dc.renderAll();
}
