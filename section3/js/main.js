d3.json("data/buildings.json").then(data => {

  data.forEach(d => {

    d.height = Number(d.height)
  })

  const x = d3.scaleBand()
    .domain(data.map(d => d.name))
    .range([0, 400])
    .paddingInner(0.2)
    .paddingOuter(0.2)

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.height)])
    .range([0, 400])

  const svg = d3.select("#chart-area").append("svg")
    .attr("width", 500)
    .attr("height", 500)


  const circles = svg.selectAll("rect").data(data)

  circles.enter().append("rect")
    .attr("height", (d, i) => (y(d.height)))
    .attr("width", x.bandwidth)
    .attr("x", (d) => x(d.name))
    .attr("fill", (d) => {
      if (d.name == "Burj Khalifa") {
        return "darkgray"
      }
      else {
        return "gray"
      }
    })


  // svg.append("line")
  // .attr("x1", 100)
  // .attr("y1", 250)
  // .attr("x2", 350)
  // .attr("y2", 100)
  // .attr("stroke", "gray")

}).catch(error => {
  console.log(error)
})
