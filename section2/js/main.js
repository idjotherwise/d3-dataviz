d3.json("data/buildings.json").then(data => {
  
  data.forEach(d => {
    
    d.height = Number(d.height)
  })
  
  const y = d3.scaleLinear()
  .domain([0, 828])
  .range([0,400])

  console.log(y.invert(48.3))

  console.log(y(100))
  
  const svg = d3.select("#chart-area").append("svg")
  .attr("width", 500)
  .attr("height", 500)
  
  
  const circles = svg.selectAll("rect").data(data)
  
  circles.enter().append("rect")
  .attr("height", (d, i) => (d.height))
  .attr("width", 30)
  .attr("x", (_, i)=> (i * 70) + 140)
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
