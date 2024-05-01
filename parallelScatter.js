var tooltip = d3
  .select("#mainfig")
  .append("div")
  .style("position", "absolute")
  .style("visibility", "hidden")
  .style("font-size", "20px")
  .attr("class", "tool")
  .style("border", "2px solid gray")
  .style("background-color", "rgba(211, 211, 211, 0.85)");

function parallelScatter() {
  let margin = { top: 90, right: 70, bottom: 150, left: 70 },
    width = window.innerWidth * (7 / 10),
    height = 520;

  let svg3 = d3
    .select("#parallelScatter")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  svg3
    .append("rect")
    .attr("width", width)
    .attr("height", "2px")
    .attr("x", 0)
    .attr("y", -24)
    .attr("fill", "white");

  d3.csv("data.csv").then(function (data) {
    var x,
      y = {},
      dimensions;

    const keys = [
      "prePanAvgRidership",
      "JanFeb20AvgRidership",
      "lockdownRelativeAvg",
      "postPanRelativeAvg",
      "postPanAvgRidership",
      "panAverageRidership"
    ];

    dimensions = data.columns.filter((key) => {
      if (keys.find((title) => title === key)) {
        y[key] = d3
          .scaleLinear()
          .domain(
            d3.extent(data, function (d) {
              return +d[key];
            })
          )
          .range([height, 0]);
        return key;
      }
    });

    console.log(dimensions);

    var filteredData = data.map(function (d) {
      var filteredObject = {};
      keys.forEach(function (column) {
        filteredObject[column] = d[column];
      });
      return filteredObject;
    });

    console.log(filteredData);

    function line(d) {
      return d3.line()(
        dimensions.map(function (key) {
          return [x(key), y[key](d[key])];
        })
      );
    }

    x = d3.scalePoint().domain(dimensions).range([0, width]);

    console.log(d3.extent(data, (d) => d.income));

    const colorScale = d3
      .scaleLinear()
      .domain([13982, 104139])
      .range(["#2b2720", "#d9a74c"]);

    foreground = svg3
      .append("g")
      .attr("fill", "none")
      .selectAll("path")
      .data(data)
      .enter()
      .append("path")
      .attr("id", (d) => d["station name"])
      .attr("d", line)
      .attr("stroke-width", "1.5px")
      .style("z-index", 0)
      // .attr("stroke", "purple")
      .attr("stroke", (d) => {
        if (!colorScale(d.income)) {
          console.log(d);
        }
        return colorScale(d.income);
      })
      .each(function (d) {
        // Store the reference to the current element in the data
        d.element = this;
      })
      .on("mouseover", function (e, d) {
        console.log(this);
        svg3.selectAll("path").attr("opacity", 0.2);
        // d3.select(this).attr("stroke", "white");
        d3.select(this).attr("stroke-width", "4px");
        d3.select(this).attr("opacity", "1");
        d3.select(this).raise()
        let colors = d["routes served"].split(",");

        let tooltipHTML = `<div style="height:100px; width:250px"><p style="margin:0px 10px;margin-top:10px;margin-bottom: 0px"><b>${d["station name"]}<b></p><p style="margin:0px;margin-left:10px;color:gray">${d["Districts/Neighborhoods"]}</p><svg>`;

        colors.forEach((color, index) => {
          if (color === "red") {
            color = "#ff1100";
          }
          if (color === "blue") {
            color = "#00b3ff";
          }
          if (color === "green" || color === " green") {
            color = "#27b03b";
          }
          if (color === "pink" || color === " pink") {
            color = "#ff8fe5";
          }
          if (color === "brown" || color === " brown") {
            color = "#52341d";
          }
          tooltipHTML += `<circle cx=${
            (index + 0.75) * 35
          } cy=19 r=15 fill="${color}"/>`;
        });
        tooltipHTML += "</svg></div>";
        let dAttribute = this.getAttribute("d");

        // Extract the starting coordinate pair
        let startCoordinates = dAttribute.split(" ")[0]; // Split by space to get the first coordinate pair
        let startYCoordinate = parseFloat(startCoordinates.split(",")[1]);
        console.log(startYCoordinate); // Extract the y-coordinate from the coordinate pair

        return tooltip
          .style("visibility", "visible")
          .style(
            "top",
            startYCoordinate < 100
              ? startYCoordinate + 170 + "px"
              : startYCoordinate - 0 + "px"
          )
          .style("left", "40px")
          .html(tooltipHTML);
      })
      .on("mouseout", function () {
        // d3.select(this).attr("stroke", (d) => {
        //   if (!colorScale(d.income)) {
        //     console.log(d);
        //   }
        //   return colorScale(d.income);
        // });
        d3.select(this).attr("stroke-width", "1.5px")
        svg3.selectAll("path").attr("opacity", 1);
        return tooltip.style("visibility", "hidden");
      });

      svg3
      .append("rect")
      .attr("fill", "black")
      .attr("x", x("postPanAvgRidership"))
      .attr("y", 0)
      .attr("width", width / 5)
      .attr("height", height);

    var g = svg3
      .selectAll(".dimension")
      .data(dimensions)
      .enter()
      .append("g")
      .attr("class", "dimension")
      .attr("fill", "white")
      .attr("transform", function (d) {
        return "translate(" + x(d) + ")";
      });

    // Add an axis and title.
    g.append("g")
      .each(function (d) {
        d3.select(this)
          .call(d3.axisLeft().scale(y[d]))
          //   .selectAll("label")
          //   .attr("fill", "black")
          .selectAll("text")
          .style("font-family", '"Times New Roman", Times, serif')
          .style("fill", "white")
          .attr("font-size", "12")
          .style("font-weight", 100)
          .attr("font-color", "white");
      })
      .append("text")
      .style("text-anchor", "middle")
      .attr("font-size", "12")
      .attr("fill", "white")
      .style("font-weight", "bold")
      .attr("y", -30)
      .text(function (d) {
        if (d === "prePanAvgRidership") {
          return "pre-pan avg (2017-2019)";
        } else if (d === "JanFeb20AvgRidership") {
          return "Jan-Feb 2020 avg";
        } else if (d === "lockdownRelativeAvg") {
          return "lockdown relative avg";
        } else if (d === "postPanRelativeAvg") {
          return "post-pan relative avg";
        } else if (d === "postPanAvgRidership") {
          return "post-pan avg";
        } else {
          return;
        }
      })
      .style("font-family", "Helvetica");

    //   svg2.selectAll("#legend-gradient").remove();

    let gradient = svg3
      .append("defs")
      .append("linearGradient")
      .attr("id", "legend-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");

    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#4a3510");

    gradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#d9a74c");

    lX = 0;
    lY = -70;
    legendWidth = window.innerWidth * (1 / 9);
    legendHeight = window.innerHeight * (1 / 55);

    svg3
      .append("rect")
      .attr("x", lX)
      .attr("y", lY)
      .attr("width", legendWidth)
      .attr("height", legendHeight)
      .attr("id", "legend-gradient")
      .attr("stroke", "#878787")
      .attr("stroke-width", "1px")
      .style("fill", "url(#legend-gradient)");

    svg3
      .append("text")
      .attr("x", lX)
      .attr("y", lY - 5) // Adjust position based on your needs
      .attr("fill", "white")
      .attr("id", "legend-gradient")
      .attr("text-anchor", "middle")
      .attr("font-size", "12")
      .text("$13,982");

    svg3
      .append("text")
      .attr("x", legendWidth + lX)
      .attr("y", lY - 5) // Adjust position based on your needs
      .attr("fill", "white")
      .attr("id", "legend-gradient")
      .attr("text-anchor", "middle")
      .attr("font-size", "12")
      .text("$104,139");

   // Append axis labels after the black rectangle
g.append("g")
.each(function (d) {
  d3.select(this)
    .call(d3.axisLeft().scale(y[d]))
    .selectAll("text")
    .style("font-family", '"Times New Roman", Times, serif')
    .style("fill", "white")
    .attr("font-size", "12")
    .style("font-weight", 100)
    .attr("font-color", "white");
});
  });
}

function clearAll() {
  svg2.selectAll("*").remove();
}
