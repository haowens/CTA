const data = [
    {
        index: 1,
        month: 'Jan',
        rides: 549707,
        magnitude: 5,  
    },
    {
        index: 2,
        month: 'Feb',
        rides: 559504.4,
        magnitude: 2.9,  
    },
    {
        index: 3,
        month: 'Mar',
        rides: 306601.4,
        magnitude: 5.6,  
    },
    {
        index: 4,
        month: 'Apr',
        rides: 68155.7,
        magnitude: 2.7,  
    },
    {
        index: 5,
        month: 'May',
        rides: 68377.1,
        magnitude: 4.1,  
    },
    {
        index: 6,
        month: 'Jun',
        rides: 87061.4,
        magnitude: 3.9,  
    },
    {
        index: 7,
        month: 'Jul',
        rides: 125172.5,
        magnitude: 3.3,  
    },
    {
        index: 8,
        month: 'Aug',
        rides: 125893.1,
        magnitude: 4.9,  
    },
]

const dotData = [
    {
        "station": "Howard",
        "lines": [],
        "duringPanVal": 0,
        "postPanVal": 0
    }
]

// stores train tracks
let svg;
let svg2;

// train route functions
function initializeRoute() {
    let margin = { top: 0, right: 0, bottom: 0, left: 0 },
      width = 100% - margin.left - margin.right,
      height = 153 - margin.top - margin.bottom;

    svg = d3
      .select("#route")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .style("z-index", 10)
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const rectWidth = 1500;
    const rectHeight = 42;
    const numDots = 12;

    const dotSpacing = (rectWidth - 200) / (numDots - 1);

    svg.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", rectWidth)
      .attr("height", rectHeight)
      .style("fill", "#383838")
    
    for (let i = 0; i < numDots; i++) {
        const isBlackBorder = [7, 9, 10].includes(i);
        svg.append("circle")
            .attr("cx", (i * dotSpacing) + 60)
            .attr("cy", rectHeight / 2) // Y coordinate at the center of the rectangle
            .attr("r", isBlackBorder ? 22 : 15) // Radius of the dot
            .style("stroke", isBlackBorder ? "black" : "none")
            .style("stroke-width", isBlackBorder ? 8 : 0)
            .style("fill", "white");

        if (isBlackBorder) {
            svg.append("rect")
                .attr("x", (i * dotSpacing) + 25)
                .attr("y", 50)
                .attr("width", 70)
                .attr("height", 35)
                .style("fill", "#755c42");
         
            svg.append("rect")
                .attr("x", (i * dotSpacing) + 25)
                .attr("y", 92)
                .attr("width", 70)
                .attr("height", 37)
                .style("fill", "#ff8ac0");

            svg.append("circle")
                .attr("cx", (i * dotSpacing) + 60)
                .attr("cy", 66) // Y coordinate at the center of the rectangle
                .attr("r", 22) // Radius of the dot
                .style("stroke", "black")
                .style("stroke-width", 8)
                .style("fill", "white");

            svg.append("circle")
                .attr("cx", (i * dotSpacing) + 60)
                .attr("cy", 112) // Y coordinate at the center of the rectangle
                .attr("r", 22) // Radius of the dot
                .style("stroke", "black")
                .style("stroke-width", 8)
                .style("fill", "white");
                
            svg.append("rect")
                .attr("x", (i * dotSpacing) + 53)
                .attr("y", 37)
                .attr("width", 14)
                .attr("height", 70)
                .style("fill", "#ffffff");
        }
    }

    svg.append("text")
      .attr("x", 130)
      .attr("y", 110)
      .attr("font-size", "46px") 
      .attr("fill", "black") 
      .attr("font-family", "Helvetica")
      .attr("font-weight", "700")
      .style("stroke", "black")
      .text("Ridership Changes");

    svg.append("circle")
      .attr("cx", 20 + 70 / 2) 
      .attr("cy", 60 + 70 / 2)
      .attr("r", (76) / 2) 
      .style("fill", "black")
      //   .style("stroke", "#d1a400")   YELLOW CODE
      .style("stroke", "#3f403f")
      .style("stroke-width", 6);

    svg.append("image")
      .attr("x", 20) 
      .attr("y", 60) 
      .attr("width", 70)
      .attr("height", 70) 
      .attr("href", "https://assets.ifttt.com/images/channels/420435055/icons/monochrome_large.png");

}

// bar graph functions
function drawPandemicBars() {
    console.log("yo")
    let margin = { top: 50, right: 25, bottom: 45, left: 0 },
      width = 1200 - margin.left - margin.right,
      height = 620 - margin.top - margin.bottom;

    console.log(data)
    svg2 = d3
      .select("#mainfig")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .style("z-index", -1)
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .style("border", "1px solid green");

    var x = d3
      .scaleBand()
      .range([0, width])
      .domain(
      data.map(function (d) {
        return d.month;
      })
    )
    .padding(0.2);

    var y = d3.scaleLinear().domain([0, 559504.4]).range([height, 0]);

    labels = svg2
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .style("color", "black")
      .selectAll("text")
      .style("text-anchor", "center")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .style("color", "#A8A8A8");

    // Add Y axis (hidden b/c black)
    svg2.append("g").call(d3.axisLeft(y)).style("color", "black");

    // add bar chart
    const barChart = svg2
      .selectAll("mybar")
      .attr("class", "bar-annotations")
      .data(data)
      .enter()
      .append("rect")
        .attr("x", function (d) {
            return x(d.month);
        })
        .attr("y", function (d) {
            return y(d.rides);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
            return height - y(d.rides);
        })
        .attr("fill", "#A8A8A8");

    line1 = svg2
      .append("line")
      .attr("x1", x("Jun") + x.bandwidth() * 0.1)
      .attr("y1", 0)
      .attr("x2", x("Jun") + x.bandwidth() * 0.1)
      .attr("y2", height)
      .style("stroke-width", "2")
      .attr("stroke", "#e32061");

    line2 = svg2
      .append("line")
      .attr("x1", x("Mar") + x.bandwidth() * 0.9)
      .attr("y1", 0)
      .attr("x2", x("Mar") + x.bandwidth() * 0.9)
      .attr("y2", height)
      .style("stroke-width", "2")
      .attr("stroke", "#e32061");

    label1 = svg2
      .append("text")
      .attr("x", x("Mar") + x.bandwidth() * 0.9)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .attr("fill", "#f71b65")
      .style("font-size", "10px")
      .text("Lockdown starts");

    label2 = svg2
      .append("text")
      .attr("x", x("Jun") + x.bandwidth() * 0.1)
      .attr("y", -10)
      .attr("text-anchor", "middle")
      .attr("fill", "#f71b65")
      .style("font-size", "10px")
      .text("Lockdown lifted");

    rect1 = svg2.append("rect");
    rect2 = svg2.append("rect");
}

// function zoomBackIn() {

// }

// function zoomOutAllBars() {

// }

// function backToAllBars() {

// }

// function proportionOverlay() {

// }

// dot lines functions

// map functions

// dots on graph functions

function removeBarsAndDrawMap() {
    console.log("here")
    d3.select('#svg2').selectAll('*').remove();      
    svg2.transition().duration(1000).selectAll("*").remove();
    
    margin = { top: 50, right: 25, bottom: 45, left: 0 },
        width = 650 - margin.left - margin.right,
        height = 620 - margin.top - margin.bottom;
    
      // append the svg object to the body of the page
      const mapWidth = 650; // Define width of the map
      const mapHeight = 620; // Define height of the map
    
      svg2
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .style("border", "2px solid black")
        .append("g");
    
      // Define projection
      const projection = d3
        .geoMercator()
        .center([-87.6298, 41.8781])
        .scale(Math.pow(2, 19) / (2 * Math.PI))
        .translate([mapWidth / 1.5, mapHeight / 2]);
    
      // Define path generator
      const path = d3.geoPath(projection);
    
      console.log(path);
    
      // Define tile function
      const tile = d3
        .tile()
        .size([mapWidth, mapHeight])
        .scale(projection.scale() * 2 * Math.PI)
        .translate(projection([0, 0]));
    
      // Generate tiles
      const tiles = tile();
    
      // Render tiles
      const map = svg2
        .selectAll("image")
        .data(tiles)
        .enter()
        .append("image")
        .attr(
          "xlink:href",
          ([x, y, z]) =>
            `https://tiles.stadiamaps.com/tiles/stamen_toner_lite/${z}/${x}/${y}${
              devicePixelRatio > 1 ? "@2x" : ""
            }.png`
        )
        .attr("x", ([x, y, z]) =>
          Math.round((x + tiles.translate[0]) * tiles.scale)
        )
        .attr("y", ([x, y, z]) =>
          Math.round((y + tiles.translate[1]) * tiles.scale)
        )
        .attr("width", tiles.scale)
        .attr("height", tiles.scale)
        .style("border", "2px solid black");
      }
    