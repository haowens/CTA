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

      svg
      .append("circle")
      .attr("cx", i * dotSpacing + 60)
      .attr("cy", rectHeight / 2) // Y coordinate at the center of the rectangle
      .attr("r", isBlackBorder ? 13 : 11) // Radius of the dot
      .attr("id","stop" + i)
      .attr("visibility", "hidden")
      .attr("class","route-stop")
      .attr("fill", "black");

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

    svg.select("#stop0").attr("visibility", "show")
}

function showStop(i) {
    svg.selectAll(".route-stop").attr("visibility", "hidden")
    svg.select("#stop" + i).attr("visibility", "show")
}

