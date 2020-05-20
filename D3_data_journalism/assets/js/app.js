// @TODO: YOUR CODE HERE!

var svgWidth = 960;
var svgHeight = 660;

var chartMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
  };

  // Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

var svg = d3
    .select(".scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);
  

d3.csv("./assets/data/data.csv").then(function(Data) {

    console.log(Data);

    // var smokes = Data.map(data => data.smokes);
    // var age = Data.map(data => data.age);
    // var state = Data.map(data =>data.state);

    // console.log(state);
    // console.log(smokes);
    // console.log(age);

    Data.forEach(function(data) { 
        data.smokes = +data.smokes;
        data.age = +data.age;
    })

});
  

