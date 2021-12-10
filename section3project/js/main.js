/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

const MARGIN = {LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 120}
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM

let flag = true

// {month, revenue, profit}

const g = d3.select("#chart-area").append("svg")
.attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
.attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
.append("g")
.attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

const x = d3.scaleBand()
  .range([0, WIDTH])
  .paddingInner(0.2)
  .paddingOuter(0.2)

  const y = d3.scaleLinear()
  .range([HEIGHT, 0])

  yLabel = g.append("text")
  .attr("x", -(HEIGHT / 2))
  .attr("y", -60)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  
  
  g.append("text")
  .attr("x", WIDTH / 2)
  .attr("y", HEIGHT + 50)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .text("Month")

  const xAxisGroup = g.append("g")
  .attr("transform", `translate(0, ${HEIGHT})`)

  const yAxisGroup = g.append("g")

d3.csv("data/revenues.csv").then(data => {
  data.forEach(d => {
    d.revenue= Number(d.revenue)
    d.profit= Number(d.profit)
  })

  d3.interval(() => {
    flag = !flag
    const newData = flag ? data : data.slice(1)
    update(newData)
  }, 1000)

  update(data)
})

function update (data) {
  const value = flag ? "profit" : "revenue"
  const t = d3.transition().duration(750)

  x.domain(data.map(d => d.month))
  y.domain([0, d3.max(data, d => d[value])])

  const xAxisCall = d3.axisBottom(x)
  xAxisGroup.transition(t).call(xAxisCall)
  .selectAll("text")
  .attr("y", "10")
  .attr("x", "-20")
  .attr("transform", "rotate(-40)")

  
  const yAxisCall = d3.axisLeft(y)
  .ticks(4)
  .tickFormat(d=>"£"+d)
  
  yAxisGroup.transition(t).call(yAxisCall)
  
  
  // JOIN new data with old elements
  const circles = g.selectAll("circle").data(data, d => d.month)

  // EXIT old elements not present in new data
  circles.exit()
  .attr("fill", "red")
  .transition(t)
  .attr("height", 0)
  .attr("cy", y(0))
  .remove()

  // ENTER new elemenets present in new data
  circles.enter().append("circle")
  .attr("fill", "grey")
  .attr("cy", y(0))
  .attr("r", 5)
  // AND UPDATE
  .merge(circles)
  .transition(t)
    .attr("fill-opacity", 1)
    .attr("cx", d => x(d.month) + x.bandwidth() / 2)
    .attr("cy", d=> y(d[value]))
  
    //.attr("fill-opacity", 0)

  const text = flag ? "Profit ($)" : "Revenue($)"
  yLabel.text(text)
}
