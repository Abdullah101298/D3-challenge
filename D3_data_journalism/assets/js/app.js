// @TODO: YOUR CODE HERE!


// Define the height and width of the svg in the html code 
var svgWidth = 960;
var svgHeight = 600;

// Define the chart margins from each side
var chartMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
  };

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Create the svg wrapper in the html code and create the chart. 
var svg = d3
    .select("#scatter")
    .append("svg")
    .classed("svg_scatter",true)
    .attr("height", svgHeight)
    .attr("width", svgWidth);

//     
var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

d3.csv("./assets/data/data.csv").then(function(Data) {

    console.log(Data);

    var x = d3.scaleLinear()
        .domain([28, d3.max(Data, data => data.age) ])
        .range([ 0, chartWidth ]);
        
    chartGroup.append("g")
        .attr("transform", "translate(0," + chartHeight + ")")
        .call(d3.axisBottom(x));


    var y = d3.scaleLinear()
        .domain([9,25])
        .range([ chartHeight, 0 ]);
        
    chartGroup.append("g")
        .attr("transform", "translate(30,0)")
        .call(d3.axisLeft(y));

    Data.forEach(function(data) { 
        data.smokes = +data.smokes;
        data.age = +data.age;
    })


    chartGroup.append('g')
        .selectAll("Circle")
        .data(Data)
        .enter()
        .append("circle")
            .attr("cx", function (data) { return x(data.age); } )
            .attr("cy", function (data) { return y(data.smokes); } )
            .attr("r", 7)
            .style("fill", "#7cb9e8") 
            .attr("stroke-width", "1")
            .attr("stroke", "black")

    chartGroup.selectAll(null)
            .data(Data)
            .enter()
            .append("text")
            .text(function (d) { 
                return d.state})  
            .attr("font-family", "sans-serif")
            .attr("font-size", "1px")
            .attr("fill", "red");       
            
            chartGroup.append("text")
            .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top + 20})`)
              .text("Dow Index");
            
            chartGroup.append("text")
              .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top + 37})`)
                .text("Smurf Sightings");

});


  

