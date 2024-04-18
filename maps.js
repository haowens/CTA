let circles;

function removeBarsAndDrawMap() {
  svg2.transition().selectAll("*").remove();

  // (margin = { top: 50, right: 25, bottom: 45, left: 0 }),
  //   (width = window.innerWidth/1.1  - margin.left - margin.right),
  //   (height = window.innerHeight * (4/4) - margin.top - margin.bottom);
  (margin = { top: 0, right: 0, bottom: 0, left: 0 }),
    (width = 650 - margin.left - margin.right),
    (height = 620 * (4 / 4) - margin.top - margin.bottom);

  // append the svg object to the body of the page
  const mapWidth = width; // Define width of the map 650
  const mapHeight = height; // Define height of the map 620
  d3.csv("data.csv").then(function (data) {
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
      .scale(Math.pow(2, 18.75) / (2 * Math.PI))
      .translate([mapWidth / 1.5, mapHeight / 2]);

    // Define path generator
    const path = d3.geoPath(projection);

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
          `https://tiles.stadiamaps.com/tiles/stamen_toner/${z}/${x}/${y}${
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

    data.forEach((d) => {
      d["projectedPoint"] = projection([d["long"], d["lat"]]);
    });

    var tooltip = d3
      .select("#mainfig")
      .append("div")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "lightgray");

    circles = svg2
      .selectAll(".station-circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "station-circle")
      .attr("r", 5)
      .attr("cx", function (d) {
        return d["projectedPoint"][0];
      })
      .attr("cy", function (d) {
        return d["projectedPoint"][1];
      })
      .style("stroke", "white")
      .attr("fill", "rgba(0,0,0,0.3)")
      .on("mouseover", function (event, d) {
        console.log("hi");
      });

    var lineGenerator = d3
      .line()
      .x(function (d) {
        return d["projectedPoint"][0];
      })
      .y(function (d) {
        return d["projectedPoint"][1];
      });

    // Append a path
    // svg
    //   .append("path")
    //   .datum(data)
    //   .attr("d", lineGenerator)
    //   .style("fill", "none")
    //   .style("stroke", "blue"); // Adjust stroke color as needed
  });
}

function lockdownColors() {
  d3.csv("data.csv").then(function (data) {
    var color = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.lockdownRelativeAvg))
      .range(["#4a3510", "#d9a74c"]);

    circles.attr("fill", function (d) {
      return color(d.lockdownRelativeAvg);
    });

    drawGradient(0.02, 0.42);
  });
}

function undoColor() {
  svg2.selectAll("#legend-gradient").remove();
  circles.attr("stroke", "white").attr("fill", "rgba(0,0,0,0.3)");
}

function drawNeighborhoods() {
  d3.json("neighborhoods.geojson").then(function (data) {
    // Define width and height of the map
    const mapWidth = 650;
    const mapHeight = 620;

    // Define projection for the map
    const projection = d3
      .geoMercator()
      .center([-87.6298, 41.8781])
      .scale(Math.pow(2, 18.75) / (2 * Math.PI))
      .translate([mapWidth / 1.5, mapHeight / 2]);

    // Define path generator for the map
    const path = d3.geoPath(projection);

    const colorScale = d3
      .scaleLinear()
      .domain(d3.extent(data.features, (d) => d.properties.lockdownRelativeAvg))
      .range(["#2b2720", "#d9a74c"]);

    svg2
      .selectAll(".neighborhood-path")
      .data(data.features)
      .enter()
      .append("path")
      .attr("class", "neighborhood-path")
      .attr("d", path) 
      .attr("fill", (d) => {
        if (d.properties.lockdownRelativeAvg) {
          return colorScale(d.properties.lockdownRelativeAvg);
        } else {
          return "transparent";
        }
      })
      .attr("opacity", "0.9")
      .attr("stroke", "#d9a74c")
      .attr("stroke-width", 2)
      .on("mouseover", (d) => {
        console.log("hovering registers")
      });
    // .append("title") // Add a title element for hover text
    // .text((d) => {console.log(d.properties.pri_neigh, "hey"); return d.properties.pri_neigh}); // Display neighborhood name on hover;

    // Ensure neighborhood boundaries appear above the map tiles
    svg2.selectAll(".station-circle").raise();

    drawGradient(
      0.04,0.34
    )
  });
}

function removeNeighborhoods() {
  svg2.selectAll(".neighborhood-path").remove();
}

function postPanColors() {
  d3.csv("data.csv").then(function (data) {
    var color = d3
      .scaleLinear()
      .domain([0.1711466683, 0.9197340075])
      .range(["#2b2720", "#d9a74c"]);

    circles.attr("fill", function (d) {
      if (d.postPanRelativeAvg !== "0") {
        return color(d.postPanRelativeAvg);
      } else {
        return "transparent";
      }
    });

    drawGradient(0.17, 0.92)
  });
}

function drawGradient(min, max) {
  svg2.selectAll("#legend-gradient").remove();

  let gradient = svg2
    .append("defs")
    .append("linearGradient")
    .attr("id", "legend-gradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "0%");

  gradient.append("stop").attr("offset", "0%").attr("stop-color", "#4a3510");

  gradient.append("stop").attr("offset", "100%").attr("stop-color", "#d9a74c");

  legendX = window.innerWidth * (1 / 2.75);
  legendY = window.innerHeight * (1 / 20);
  legendWidth = window.innerWidth * (1 / 9);
  legendHeight = window.innerHeight * (1 / 55);

  svg2
    .append("rect")
    .attr("x", legendX)
    .attr("y", legendY)
    .attr("width", legendWidth)
    .attr("height", legendHeight)
    .attr("id", "legend-gradient")
    .attr("stroke", "#878787")
    .attr("stroke-width", "1px")
    .style("fill", "url(#legend-gradient)");

  svg2
    .append("text")
    .attr("x", legendX)
    .attr("y", legendY - 5) // Adjust position based on your needs
    .attr("fill", "white")
    .attr("id", "legend-gradient")
    .attr("text-anchor", "middle")
    .text(min);

  svg2
    .append("text")
    .attr("x", legendWidth + legendX)
    .attr("y", legendY - 5) // Adjust position based on your needs
    .attr("fill", "white")
    .attr("id", "legend-gradient")
    .attr("text-anchor", "middle")
    .text(max);
}

function drawPostPanNeighborhoods() {
  d3.json("neighborhoods.geojson").then(function (data) {
    (margin = { top: 0, right: 0, bottom: 0, left: 0 }),
      (width = 650 - margin.left - margin.right),
      (height = 620 * (4 / 4) - margin.top - margin.bottom);
    // Define width and height of the map
    const mapWidth = 650;
    const mapHeight = 620;

    svg2
      .attr("width", width)
      .attr("height", height)
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Define projection for the map
    const projection = d3
      .geoMercator()
      .center([-87.6298, 41.8781])
      .scale(Math.pow(2, 18.75) / (2 * Math.PI))
      .translate([mapWidth / 1.5, mapHeight / 2]);

    // Define path generator for the map
    const path = d3.geoPath(projection);

    const colorScale = d3
      .scaleLinear()
      .domain(d3.extent(data.features, (d) => d.properties.postPanRelativeAvg))
      .range(["#2b2720", "#d9a74c"]);

    // Append SVG elements for each neighborhood boundary
    svg2
      .selectAll(".neighborhood-path")
      .data(data.features)
      .enter()
      .append("path")
      .attr("class", "neighborhood-path")
      .attr("d", path) // Use the path generator
      .attr("fill", (d) => {
        if (d.properties.postPanRelativeAvg) {
          return colorScale(d.properties.postPanRelativeAvg);
        } else {
          return "transparent";
        }
      })
      .attr("opacity", "0.9")
      .attr("stroke", "#dbc09a")
      .attr("stroke-width", 2);
    // .append("title") // Add a title element for hover text
    // .text((d) => {console.log(d.properties.pri_neigh, "hey"); return d.properties.pri_neigh}); // Display neighborhood name on hover;

    // Ensure neighborhood boundaries appear above the map tiles
    svg2.selectAll(".station-circle").raise();
    drawGradient(0.45, 0.84)
  });
}
