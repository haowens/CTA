function parallelScatter() {
  svg2.selectAll("*").remove();
  margin = { top: 40, right: 100, bottom: 150, left: 70 };
  width = window.innerWidth * (9 / 10);
  height = 570;

  svg2
    .attr("width", width)
    .attr("height", height)
    .attr("transform", `translate(${margin.left},${margin.top})`);

//   svg2
//     .append("rect")
//     .attr("width", width)
//     .attr("height", height)
//     .attr("x", 0)
//     .attr("y", 0)
//     .attr("fill", "white");

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

    foreground = svg2
      .append("g")
      .attr("fill", "none")
      .selectAll("path")
      .data(data)
      .enter()
      .append("path")
      .attr("d", line)
      // .attr("stroke", "purple")
      .attr("stroke", (d) => {
        if (!colorScale(d.income)) {
          console.log(d);
        }
        return colorScale(d.income);
      });

    var g = svg2
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
          .attr("font-color", "white");
      })
      .append("text")
      .style("text-anchor", "middle")
      .attr("font-size", "12")
      .attr("fill", "white")
      .attr("y", -16)
      .text(function (d) {
        if (d === "prePanAvgRidership") {
            return "pre-pan avg (2017-2019)"
        } else if (d === "JanFeb20AvgRidership") {
            return "Jan-Feb 2020 avg"
        } else if (d === "lockdownRelativeAvg") {
            return "lockdown relative avg"
        } else if (d === "postPanRelativeAvg") {
            return "post-pan relative avg"
        } else if (d === "postPanAvgRidership") {
            return "post-pan avg"
        } else {
            return
        }
      })
      .style("font-family", "Helvetica");
  });
}
