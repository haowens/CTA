let circles;

function removeBars() {
  svg2.transition().selectAll("*").remove();
}

var tooltip = d3
  .select("#mainfig")
  .append("div")
  .style("position", "absolute")
  .style("visibility", "hidden")
  .style("font-size", "20px")
  .style("border", "2px solid gray")
  .style("background-color", "rgba(211, 211, 211, 0.85)");

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

    circles = svg2
      .selectAll(".station-circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "station-circle")
      .attr("r", 5.5)
      .attr("cx", function (d) {
        return d["projectedPoint"][0];
      })
      .attr("cy", function (d) {
        return d["projectedPoint"][1];
      })
      .style("stroke", "white")
      .attr("fill", "rgba(0,0,0,0.3)")
      .on("mouseover", function (e, d) {
        d3.select(this).style("stroke", "black");
        d3.select(this).style("stroke-width", "3px");
        let colors = d["routes served"].split(",");

        let tooltipHTML = `<div style="height:70px; width:250px"><p style="margin:0px 10px;margin-top:10px">${d["station name"]}</p><svg>`;

        colors.forEach((color, index) => {

          if (color === "red") {
            color = "#ff1100";
          } 
          if (color === "blue") {
            color = "#00b3ff"
          }
          if ((color === "green") || (color === " green")) {
            color = "#27b03b"
          }
          if ((color === "pink") || (color === " pink")) {
            color = "#ff8fe5"
          }
          if ((color === "brown") || (color === " brown")) {
            color = "#52341d"
          }
          tooltipHTML+=`<circle cx=${(index + 0.75) * 35} cy=19 r=15 fill="${color}"/>`
        });
        tooltipHTML+="</svg></div>"
        return tooltip
        .style("visibility", "visible")
        .style("top", d3.select(this).attr("cy") + "px")
        .style("left", d3.select(this).attr("cx") + "px")
        .html(tooltipHTML);})
      .on("mouseout", function () {
        d3.select(this).style("stroke", "white");
        d3.select(this).style("stroke-width", "1px");
        return tooltip.style("visibility", "hidden");
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

    // Append SVG elements for each neighborhood boundary
    svg2
      .selectAll(".neighborhood-path")
      .data(data.features)
      .enter()
      .append("path")
      .attr("class", "neighborhood-path")
      .attr("d", path) // Use the path generator
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
      .on("mouseover", function (e, d) {
        console.log(d);
        console.log(e);
        return tooltip
          .style("visibility", "visible")
          .style("top", e.clientY - 150 + "px")
          .style("left", e.clientX + "px")
          .html(d.properties.pri_neigh);
      })
      .on("mouseout", function () {
        return tooltip.style("visibility", "hidden");
      });

    // Ensure neighborhood boundaries appear above the map tiles
    svg2.selectAll(".station-circle").raise();

    drawGradient(0.04, 0.34);
  });
}

function drawIncome() {
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

    let range = [1, 1.75, 2.5, 3.25, 4, 4.75, 5.5, 6.25, 7, 7.75 ]
    let patterns = {};

    range.forEach((item) => {
      let name = "pattern" + item;

      patterns[name] = svg2
        .append("defs")
        .append("pattern")
        .attr("id", `circles-pattern-${item}`)
        .attr("patternUnits", "userSpaceOnUse")
        .attr("width", 15)
        .attr("height", 15);

      // Append circles to the pattern, scaled by income
      patterns[name]
        .selectAll("circle")
        .data(data.features)
        .enter()
        .append("circle")
        .attr("cx", 7.5)
        .attr("cy", 7.5)
        .attr("r", item)
        .attr("opacity", "1")
        .attr("fill", "black")
        .attr("stroke", "#241b13")
        .attr("stroke-width", 1);
    });

    svg2
      .selectAll(".neighborhood-path2")
      .data(data.features)
      .enter()
      .append("path")
      .attr("class", "neighborhood-path2")
      .attr("d", path) // Use the path generator
      .attr("fill", (d) => {
        if (!d.properties.income) {
          return "transparent";
        } else if (d.properties.income < 15000) {
          return `url(#circles-pattern-1)`;
        } else if (d.properties.income < 25000) {
          return `url(#circles-pattern-1.75)`;
        } else if (d.properties.income < 35000) {
          return `url(#circles-pattern-2.5)`;
        } else if (d.properties.income < 45000){
          return `url(#circles-pattern-3.25)`;
        } else if (d.properties.income < 55000){
          return `url(#circles-pattern-4)`;
        } else if (d.properties.income < 65000){
          return `url(#circles-pattern-4.75)`;
        } else if (d.properties.income < 75000){
          return `url(#circles-pattern-5.5)`;
        } else if (d.properties.income < 85000){
          return `url(#circles-pattern-6.25)`;
        } else if (d.properties.income < 95000){
          return `url(#circles-pattern-7)`;
        } else if (d.properties.income < 200000){
          return `url(#circles-pattern-7.75)`;
        }
      })
      .attr("stroke", "#d9a74c")
      .attr("stroke-width", 2)
      .on("mouseover", function (e, d) {
        return tooltip
          .style("visibility", "visible")
          .style("top", e.clientY - 150 + "px")
          .style("left", e.clientX + "px")
          .html(`<p style="margin: 0px 10px">${d.properties.pri_neigh}</p>`);
      })
      .on("mouseout", function () {
        return tooltip.style("visibility", "hidden");
      });

    svg2.selectAll(".station-circle").raise();
  });
}

function removeCirclePattern() {
  svg2.selectAll(".neighborhood-path2").remove();
}

function drawLockdownOnPostPan() {
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

    let range = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5 ]
    let patterns = {};

    range.forEach((item) => {
      let name = "pattern" + item;

      patterns[name] = svg2
        .append("defs")
        .append("pattern")
        .attr("id", `circles-pattern-${item}`)
        .attr("patternUnits", "userSpaceOnUse")
        .attr("width", 15)
        .attr("height", 15);

      // Append circles to the pattern, scaled by income
      patterns[name]
        .selectAll("circle")
        .data(data.features)
        .enter()
        .append("circle")
        .attr("cx", 7.5)
        .attr("cy", 7.5)
        .attr("r", item)
        .attr("opacity", "1")
        .attr("fill", "black")
        .attr("stroke", "#241b13")
        .attr("stroke-width", 1);
    });

    svg2
      .selectAll(".neighborhood-path2")
      .data(data.features)
      .enter()
      .append("path")
      .attr("class", "neighborhood-path2")
      .attr("d", path) // Use the path generator
      .attr("fill", (d) => {
        if (!d.properties.lockdownRelativeAvg) {
          return "transparent";
        } else if (d.properties.lockdownRelativeAvg < 0.05) {
          return `url(#circles-pattern-1)`;
        } else if (d.properties.lockdownRelativeAvg < 0.08) {
          return `url(#circles-pattern-1.5)`;
        } else if (d.properties.lockdownRelativeAvg < 0.11) {
          return `url(#circles-pattern-2)`;
        } else if (d.properties.lockdownRelativeAvg < 0.14){
          return `url(#circles-pattern-2.5)`;
        } else if (d.properties.lockdownRelativeAvg < 0.17){
          return `url(#circles-pattern-3)`;
        } else if (d.properties.lockdownRelativeAvg < 0.2){
          return `url(#circles-pattern-3.5)`;
        } else if (d.properties.lockdownRelativeAvg < 0.23){
          return `url(#circles-pattern-4)`;
        } else if (d.properties.lockdownRelativeAvg < 0.26){
          return `url(#circles-pattern-4.5)`;
        } else if (d.properties.lockdownRelativeAvg < 0.29){
          return `url(#circles-pattern-5)`;
        } else if (d.properties.lockdownRelativeAvg < 0.34){
          return `url(#circles-pattern-5.5)`;
        }
      })
      .attr("stroke", "#d9a74c")
      .attr("stroke-width", 2)
      .on("mouseover", function (e, d) {
        return tooltip
          .style("visibility", "visible")
          .style("top", e.clientY - 150 + "px")
          .style("left", e.clientX + "px")
          .html(`<p style="margin: 0px 10px">${d.properties.pri_neigh}</p>`);
      })
      .on("mouseout", function () {
        return tooltip.style("visibility", "hidden");
      });

    svg2.selectAll(".station-circle").raise();
  });
}

function removeNeighborhoods() {
  svg2.selectAll(".neighborhood-path").remove();
  svg2.selectAll(".neighborhood-path2").remove();
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

    drawGradient(0.17, 0.92);
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
      .attr("stroke-width", 2)
      .on("mouseover", function (e, d) {
        console.log(d);
        console.log(e);
        return tooltip
          .style("visibility", "visible")
          .style("top", e.clientY - 150 + "px")
          .style("left", e.clientX + "px")
          .html(d.properties.pri_neigh);
      })
      .on("mouseout", function () {
        return tooltip.style("visibility", "hidden");
      });

    // Ensure neighborhood boundaries appear above the map tiles
    svg2.selectAll(".station-circle").raise();
    drawGradient(0.45, 0.84);
  });
}
