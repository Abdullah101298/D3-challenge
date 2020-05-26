// @TODO: YOUR CODE HERE!


// Define the height and width of the svg in the html code 
var svgWidth = 960;
var svgHeight = 600;

// Define the chart margins from each side
var chartMargin = {
    top: 30,
    right: 30,
    bottom: 60,
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

   
var chartGroup = svg.append("g")
    .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Import the data from the external csv file 
// Chart will be created in this internal function
d3.csv("./assets/data/data.csv").then(function(Data) {

    console.log(Data);

    // Formatting the Data
    Data.forEach(function(data) { 
        data.smokes = +data.smokes;
        data.age = +data.age;
    });

    // Adding x acis 
    var x = d3.scaleLinear()
        .domain([28, d3.max(Data, data => data.age) ])
        .range([ 0, chartWidth ]);
        
    chartGroup.append("g")
        .attr("transform", "translate(0," + chartHeight + ")")
        .call(d3.axisBottom(x));

    // Adding y axis 
    var y = d3.scaleLinear()
        .domain([9, d3.max(Data, data => data.smokes)])
        .range([ chartHeight, 0 ]);
        
    chartGroup.append("g")
        .attr("transform", "translate(30,0)")
        .call(d3.axisLeft(y));

    // Generating scatter plots 
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

    // Adding state abbreviations into the plot 
    chartGroup.selectAll(null)
            .data(Data)
            .enter()
            .append("text")
            .text(function (d) { 
                return d.abbr})  
            .attr("x", function (data) { return x(data.age); } )
            .attr("y", function (data) { return y(data.smokes); } )
            .attr("font-family", "sans-serif")
            .attr("font-size", "7px")
            .attr("fill", "white")
            .attr("transform",'translate(-4,1)');       
            
    
    // Adding x label 
    chartGroup.append("text")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top + 20})`)
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .text("Age (Years)");
            
    // Adding y label 
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - chartMargin.left)
        .attr("x",0 - (chartHeight / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Smokes");



}).catch(function(error) {
    console.log(error);
  });
  


  

