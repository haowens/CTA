const monthAvgData = [
  {
    index: 1,
    month: "Jan 20",
    year: "2020",
    rides: 549707,
  },
  {
    index: 2,
    month: "Feb 20",
    year: "2020",
    rides: 559504.4,
  },
  {
    index: 3,
    month: "Mar 20",
    year: "2020",
    rides: 306601.4,
  },
  {
    index: 4,
    month: "Apr 20",
    year: "2020",
    rides: 68155.7,
  },
  {
    index: 5,
    month: "May 20",
    year: "2020",
    rides: 68377.1,
  },
  {
    index: 6,
    month: "Jun 20",
    year: "2020",
    rides: 87061.4,
  },
  {
    index: 7,
    month: "Jul 20",
    year: "2020",
    rides: 125172.5,
  },
  {
    index: 8,
    month: "Aug 20",
    year: "2020",
    rides: 125893.1,
  },
  {
    index: 9,
    month: "Sept 20",
    year: "2020",
    rides: 138459.3,
  },
  {
    index: 10,
    month: "Oct 20",
    year: "2020",
    rides: 138946.2,
  },
  {
    index: 11,
    month: "Nov 20",
    year: "2020",
    rides: 120186.2,
  },
  {
    index: 12,
    month: "Dec 20",
    year: "2020",
    rides: 110768.5,
  },
  {
    index: 13,
    month: "Jan 21",
    year: "2021",
    rides: 111195.9,
  },
  {
    index: 14,
    month: "Feb 21",
    year: "2021",
    rides: 120157.6,
  },
  {
    index: 15,
    month: "Mar 21",
    year: "2021",
    rides: 135312.4,
  },
  {
    index: 16,
    month: "Apr 21",
    year: "2021",
    rides: 148614.3,
  },
  {
    index: 17,
    month: "May 21",
    year: "2021",
    rides: 166836.1,
  },
  {
    index: 18,
    month: "Jun 21",
    year: "2021",
    rides: 199886.2,
  },
  {
    index: 19,
    month: "Jul 21",
    year: "2021",
    rides: 236309.6,
  },
  {
    index: 20,
    month: "Aug 21",
    year: "2021",
    rides: 233560.9,
  },
  {
    index: 21,
    month: "Sept 21",
    year: "2021",
    rides: 277958.4,
  },
  {
    index: 22,
    month: "Oct 21",
    year: "2021",
    rides: 272231.7,
  },
  {
    index: 23,
    month: "Nov 21",
    year: "2021",
    rides: 255359.6,
  },
  {
    index: 24,
    month: "Dec 21",
    year: "2021",
    rides: 219673.6,
  },
  {
    index: 25,
    month: "Jan 22",
    year: "2022",
    rides: 178244.7,
  },
  {
    index: 26,
    month: "Feb 22",
    year: "2022",
    rides: 224114.9,
  },
  {
    index: 27,
    month: "Mar 22",
    year: "2022",
    rides: 252723.8,
  },
  {
    index: 28,
    month: "Apr 22",
    year: "2022",
    rides: 261386.6,
  },
  {
    index: 29,
    month: "May 22",
    year: "2022",
    rides: 271458,
  },
  {
    index: 30,
    month: "Jun 22",
    year: "2022",
    rides: 282065.2,
  },
  {
    index: 31,
    month: "Jul 22",
    year: "2022",
    rides: 280862.3,
  },
  {
    index: 32,
    month: "Aug 22",
    year: "2022",
    rides: 286780.5,
  },
  {
    index: 33,
    month: "Sept 22",
    year: "2022",
    rides: 323348.2,
  },
  {
    index: 34,
    month: "Oct 22",
    year: "2022",
    rides: 315299.1,
  },
  {
    index: 35,
    month: "Nov 22",
    year: "2022",
    rides: 288369.9,
  },
  {
    index: 36,
    month: "Dec 22",
    year: "2022",
    rides: 245049.8,
  },
  {
    index: 37,
    month: "Jan 23",
    year: "2023",
    rides: 260477.7,
  },
  {
    index: 38,
    month: "Feb 23",
    year: "2023",
    rides: 270580.6,
  },
  {
    index: 39,
    month: "Mar 23",
    year: "2023",
    rides: 285183.2,
  },
  {
    index: 40,
    month: "Apr 23",
    year: "2023",
    rides: 303530.4,
  },
  {
    index: 41,
    month: "May 23",
    year: "2023",
    rides: 314377.8,
  },
  {
    index: 42,
    month: "Jun 23",
    year: "2023",
    rides: 318334.6,
  },
  {
    index: 43,
    month: "Jul 23",
    year: "2023",
    rides: 309116.9,
  },
  {
    index: 44,
    month: "Aug 23",
    year: "2023",
    rides: 328712,
  },
  {
    index: 45,
    month: "Sept 23",
    year: "2023",
    rides: 354217.8,
  },
  {
    index: 46,
    month: "Oct 23",
    year: "2023",
    rides: 352159.6,
  },
];

const periodAvgs = {
  prePanAvg: 554605.7,
  lockDownAvg: 68266.4,
  postAvg: 332504.24,
};

// stores train tracks
let svg;
function initializeRoute() {
  let margin = { top: 0, right: 0, bottom: 0, left: 0 },
    width = window.innerWidth - margin.left - margin.right,
    height = 153 - margin.top - margin.bottom;

  svg = d3
    .select("#route")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .style("z-index", 10)
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const rectWidth = window.innerWidth;
  const rectHeight = 42;
  const numDots = 12;

  const dotSpacing = (rectWidth - 100) / (numDots - 1);

  svg
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", rectWidth)
    .attr("height", rectHeight)
    .style("fill", "#706f6d");
  // .style("fill", "#383838")

  for (let i = 0; i < numDots; i++) {
    const isBlackBorder = [7, 9, 10].includes(i);
    svg
      .append("circle")
      .attr("cx", i * dotSpacing + 60)
      .attr("cy", rectHeight / 2) // Y coordinate at the center of the rectangle
      .attr("r", isBlackBorder ? 22 : 15) // Radius of the dot
      .style("stroke", isBlackBorder ? "black" : "none")
      .style("stroke-width", isBlackBorder ? 8 : 0)
      .style("fill", "white");

    if (isBlackBorder) {
      svg
        .append("rect")
        .attr("x", i * dotSpacing + 25)
        .attr("y", 50)
        .attr("width", 70)
        .attr("height", 35)
        .style("fill", "#d9a74c");

      svg
        .append("rect")
        .attr("x", i * dotSpacing + 25)
        .attr("y", 92)
        .attr("width", 70)
        .attr("height", 37)
        // .style("fill", "#ff8ac0");
        .style("fill", "#4a3510");

      svg
        .append("circle")
        .attr("cx", i * dotSpacing + 60)
        .attr("cy", 66) // Y coordinate at the center of the rectangle
        .attr("r", 22) // Radius of the dot
        .style("stroke", "black")
        .style("stroke-width", 8)
        .style("fill", "white");

      svg
        .append("circle")
        .attr("cx", i * dotSpacing + 60)
        .attr("cy", 112) // Y coordinate at the center of the rectangle
        .attr("r", 22) // Radius of the dot
        .style("stroke", "black")
        .style("stroke-width", 8)
        .style("fill", "white");

      svg
        .append("rect")
        .attr("x", i * dotSpacing + 53)
        .attr("y", 37)
        .attr("width", 14)
        .attr("height", 70)
        .style("fill", "#ffffff");
    }
  }

  svg
    .append("text")
    .attr("x", 130)
    .attr("y", 110)
    .attr("font-size", "46px")
    .attr("fill", "black")
    .attr("font-family", "Helvetica")
    .attr("font-weight", "700")
    .style("stroke", "black")
    .text("Ridership Changes");

  svg
    .append("circle")
    .attr("cx", 20 + 70 / 2)
    .attr("cy", 60 + 70 / 2)
    .attr("r", 76 / 2)
    .style("fill", "black")
    //   .style("stroke", "#d1a400")   YELLOW CODE
    .style("stroke", "#3f403f")
    .style("stroke-width", 6);

  svg
    .append("image")
    .attr("x", 20)
    .attr("y", 60)
    .attr("width", 70)
    .attr("height", 70)
    .attr(
      "href",
      "https://assets.ifttt.com/images/channels/420435055/icons/monochrome_large.png"
    );
}

let svg2;

let margin = { top: 5, right: 0, bottom: 157, left: 0 },
  width = window.innerWidth - margin.left - margin.right,
  height = window.innerHeight - margin.top - margin.bottom;

var maxRides = d3.max(monthAvgData, function (d) {
  return d.rides;
});

var x = d3
  .scaleBand()
  .range([0, width - 0])
  .domain(
    monthAvgData.map(function (d) {
      return d.month;
    })
  )
  .padding(0.2);

var y = d3.scaleLinear().domain([0, maxRides]).range([height, 0]);

// bar graph functions
function drawBarGraphBackground() {
  svg2 = d3
    .select("#mainfig")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  svg2
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width * (12 / 46))
    .attr("height", height)
    .style("fill", "#3f3f3f90");

  svg2
    .append("rect")
    .attr("x", width * (12 / 46))
    .attr("y", 0)
    .attr("width", width * (12 / 46))
    .attr("height", height)
    .style("fill", "#38383890");

  svg2
    .append("rect")
    .attr("x", width * (24 / 46))
    .attr("y", 0)
    .attr("width", width * (12 / 46))
    .attr("height", height)
    .style("fill", "#32313190");

  svg2
    .append("rect")
    .attr("x", width * (36 / 46))
    .attr("y", 0)
    .attr("width", width * (12 / 46))
    .attr("height", height)
    .style("fill", "#2b2b2b90");

  drawYearLabels();
}

function drawYearLabels() {
  svg2
    .append("text")
    .attr("x", width * (12 / 46) - 50)
    .attr("y", height / 12)
    .attr("fill", "#878787")
    .attr("class", "year-label")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .style("font-size", "xx-large")
    .attr("font-family", "Helvetica")
    .attr("font-weight", "700")
    .text("2020");

  svg2
    .append("text")
    .attr("x", width * (24 / 46) - 50)
    .attr("y", height / 12)
    .attr("fill", "#878787")
    .attr("class", "year-label")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .style("font-size", "xx-large")
    .attr("font-family", "Helvetica")
    .attr("font-weight", "700")
    .text("2021");

  svg2
    .append("text")
    .attr("x", width * (36 / 46) - 50)
    .attr("y", height / 12)
    .attr("fill", "#878787")
    .attr("class", "year-label")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .style("font-size", "xx-large")
    .attr("font-family", "Helvetica")
    .attr("font-weight", "700")
    .text("2022");

  svg2
    .append("text")
    .attr("x", width * (46 / 46) - 50)
    .attr("y", height / 12)
    .attr("fill", "#878787")
    .attr("class", "year-label")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .style("font-size", "xx-large")
    .attr("font-family", "Helvetica")
    .attr("font-weight", "700")
    .text("2023");
}

function addBarChart() {
  labels = svg2
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .style("text-anchor", "center")
    .style("font-size", "14px")
    .style("font-weight", "bold")
    .attr("fill", "white");

  // Add Y axis (hidden b/c black)
  svg2.append("g").call(d3.axisLeft(y)).selectAll("text").attr("fill", "white");

  // add bar chart
  const barChart = svg2
    .selectAll("mybar")
    .data(monthAvgData)
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
    .attr("class", "bar-annotations")
    .attr("fill", "#574f44DF")
    .attr("stroke", "#2e2a25")
    .attr("stroke-width", "1");
}

function lockdownLines() {
  var maxRides = d3.max(monthAvgData, function (d) {
    return d.rides;
  });

  var x = d3
    .scaleBand()
    .range([0, width - 0])
    .domain(
      monthAvgData.map(function (d) {
        return d.month;
      })
    )
    .padding(0.2);

  let march = monthAvgData.find((item) => item.month === "Mar 20");
  let april = monthAvgData.find((item) => item.month === "Apr 20");
  let may = monthAvgData.find((item) => item.month === "May 20");
  let june = monthAvgData.find((item) => item.month === "Jun 20");

  var y = d3.scaleLinear().domain([0, maxRides]).range([height, 0]);

  rect1 = svg2
    .append("rect")
    .attr("x", x("Mar 20") + (x.bandwidth() * 26) / 31)
    .attr("y", y(march.rides))
    .attr("width", (x.bandwidth() * 5) / 31)
    .attr("height", height - y(march.rides))
    .attr("class", "bar-annotations")
    .attr("class", "bar-over")
    .attr("fill", "#d9a74c");

  rect2 = svg2
    .append("rect")
    .attr("x", x("Apr 20"))
    .attr("y", y(april.rides))
    .attr("width", x.bandwidth())
    .attr("height", height - y(april.rides))
    .attr("class", "bar-annotations")
    .attr("class", "bar-over")
    .attr("fill", "#d9a74c");

  rect3 = svg2
    .append("rect")
    .attr("x", x("May 20"))
    .attr("y", y(may.rides))
    .attr("width", x.bandwidth())
    .attr("height", height - y(may.rides))
    .attr("class", "bar-annotations")
    .attr("class", "bar-over")
    .attr("fill", "#d9a74c");

  rect4 = svg2
    .append("rect")
    .attr("x", x("Jun 20"))
    .attr("y", y(june.rides))
    .attr("width", (x.bandwidth() * 3) / 31)
    .attr("height", height - y(june.rides))
    .attr("class", "bar-annotations")
    .attr("class", "bar-over")
    .attr("fill", "#d9a74c");
}

function removeLockdownLines() {
  svg2.selectAll(".bar-over").remove();
}

function postLockdownLines() {
  console.log("hi");

  let array = monthAvgData.filter(
    (item) =>
      item.month === "Jun 23" ||
      item.month === "Jul 23" ||
      item.month === "Aug 23" ||
      item.month === "Sept 23" ||
      item.month === "Oct 23"
  );
  let may = monthAvgData.find((item) => item.month === "May 23");

  var y = d3.scaleLinear().domain([0, maxRides]).range([height, 0]);

  rect1 = svg2
    .append("rect")
    .attr("x", x("May 23") + x.bandwidth() * 0.33)
    .attr("y", y(may.rides))
    .attr("width", x.bandwidth() * 0.66)
    .attr("height", height - y(may.rides))
    .attr("class", "bar-annotations")
    .attr("class", "bar-over-post")
    .attr("fill", "#dbc09aDF");

  array.forEach((item) => {
    rect2 = svg2
      .append("rect")
      .attr("x", x(item.month))
      .attr("y", y(item.rides))
      .attr("width", x.bandwidth())
      .attr("height", height - y(item.rides))
      .attr("class", "bar-annotations")
      .attr("class", "bar-over-post")
      .attr("fill", "#dbc09aDF");
  });
}

function removePostLockdownLines() {
  svg2.selectAll(".bar-over-post").remove();
}

function removeBarChart() {
  svg2.selectAll(".bar-annotations").remove();
}

function removeLabelsCompareAvgs() {
  svg2.selectAll(".bar-annotations").remove();
  svg2.selectAll(".bar-over-post").remove();
  svg2.selectAll(".bar-over").remove();
  svg2.selectAll(".year-label").remove();

  // labels.transition().duration(1000).attr("visibility", "hidden");
  // barChart.transition().duration(1000).attr("visibility", "hidden");
  // label1.transition().duration(1000).attr("visibility", "hidden");
  // label2.transition().duration(1000).attr("visibility", "hidden");
  // line1.transition().duration(1000).attr("visibility", "hidden");
  // line2.transition().duration(1000).attr("visibility", "hidden");

  svg2
    .append("rect")
    .attr("x", width * (2 / 5))
    .attr("y", y(periodAvgs.prePanAvg))
    .attr("width", width / 5)
    .attr("height", height - y(periodAvgs.prePanAvg))
    .attr("class", "avg-box")
    .attr("fill", "#574f44DF")
    .attr("stroke", "#2e2a25")
    .attr("stroke-width", "1");

  svg2
    .append("rect")
    .attr("x", width * (2 / 5))
    .attr("y", y(periodAvgs.postAvg))
    .attr("width", width / 5)
    .attr("height", height - y(periodAvgs.postAvg) - 70)
    .attr("class", "avg-box")
    .attr("fill", "#dbc09a")
    .attr("stroke", "#2e2a25")
    .attr("stroke-width", "1");

  svg2
    .append("rect")
    .attr("x", width * (2 / 5))
    .attr("y", y(periodAvgs.lockDownAvg))
    .attr("width", width / 5)
    .attr("height", height - y(periodAvgs.lockDownAvg))
    .attr("class", "avg-box")
    .attr("fill", "#d9a74c")
    .attr("stroke", "#2e2a25")
    .attr("stroke-width", "1");

  svg2
    .append("text")
    .attr("x", width * (3/5))
    .attr("y", height / 12)
    .attr("fill", "#878787")
    .attr("class", "year-label")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .style("font-size", "xx-large")
    .attr("font-family", "Helvetica")
    .attr("font-weight", "700")
    .text("2020");

  // rect1
  //   .transition()
  //   .duration(1000)
  //   .attr("x", 410 - (x("Feb 20") - x("Jan 20") + x.bandwidth())/2)
  //   .transition()
  //   .duration(1000)
  //   .style("fill", "rgb(79, 79, 79)");

  // rect2
  //   .transition()
  //   .duration(1000)
  //   .attr("x", 410 - (x("Feb") - x("Jan") + x.bandwidth())/2)
  //   .transition()
  //   .duration(1000)
  //   .style("fill", "#ab1547");
}

function removeAvgs() {
  svg2.selectAll(".avg-box").remove();
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
  console.log("here");
  d3.select("#svg2").selectAll("*").remove();
  svg2.transition().duration(1000).selectAll("*").remove();

  (margin = { top: 50, right: 25, bottom: 45, left: 0 }),
    (width = 650 - margin.left - margin.right),
    (height = 620 - margin.top - margin.bottom);

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
}
