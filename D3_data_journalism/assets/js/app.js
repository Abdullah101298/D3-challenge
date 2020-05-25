// @TODO: YOUR CODE HERE!

var svgWidth = 960;
var svgHeight = 600;

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
    .select("#scatter")
    .append("svg")
    .classed("svg_scatter",true)
    .attr("height", svgHeight)
    .attr("width", svgWidth);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

d3.csv("./assets/data/data.csv").then(function(Data) {

    console.log(Data);

    var x = d3.scaleLinear()
        .domain([28, d3.max(Data, data => data.age) ])
        .range([ 0, chartWidth ]);
        
    svg.append("g")
        .attr("transform", "translate(0," + chartHeight + ")")
        .call(d3.axisBottom(x));


    var y = d3.scaleLinear()
        .domain([9,25])
        .range([ chartHeight, 0 ]);
        
    svg.append("g")
        .attr("transform", "translate(30,0)")
        .call(d3.axisLeft(y));


    Data.forEach(function(data) { 
        data.smokes = +data.smokes;
        data.age = +data.age;
    })


    var chart = svg.append('g')
        .selectAll("dot")
        .data(Data)
        .enter()
        .append("circle")
            .attr("cx", function (data) { return x(data.age); } )
            .attr("cy", function (data) { return y(data.smokes); } )
            .attr("r", 7)
            .style("fill", "#7cb9e8") 
            .attr("stroke-width", "1")
            .attr("stroke", "black");
    
    var toolTip = d3.select("#scatter")
            .append("svg")
            .classed("tooltip", true);

    chart.on("mouseover", function(d) {
                toolTip.style("display", "block")
                    .html(
                      `<strong>${d.state}`)
              })

    .on("mouseout", function() {
                toolTip.style("display", "none");
              });
        
        
});
  

