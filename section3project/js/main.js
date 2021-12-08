/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

const MARGIN = {LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 100}
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM

// {month, revenue, profit}

const g = d3.select("#chart-area").append("svg")
.attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
.attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
.append("g")
.attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)




d3.csv("data/revenues.csv").then(data => {
  data.forEach(d => {

    d.revenue= Number(d.revenue)
    d.profit= Number(d.profit)
  })

  const x = d3.scaleBand()
  .domain(data.map(d => d.month))
  .range([0, WIDTH])
  .paddingInner(0.2)
  .paddingOuter(0.2)

  const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.profit)])
  .range([HEIGHT, 0])

  const xAxisCall = d3.axisBottom(x)
  g.append("g")
  .attr("transform", `translate(0, ${HEIGHT})`)
  .call(xAxisCall)

  
  const yAxisCall = d3.axisLeft(y)
  .ticks(4)
  .tickFormat(d=>"£"+d)
  
  g.append("g")
  .call(yAxisCall)
  
  g.append("text")
  .attr("x", -(HEIGHT / 2))
  .attr("y", -60)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .text("Revenue (£)")
  
  g.append("text")
  .attr("x", WIDTH / 2)
  .attr("y", HEIGHT + 50)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .text("Month")

  const rects = g.selectAll("rect").data(data)



  rects.enter().append("rect")
  .attr("height", (d, i) => (HEIGHT - y(d.profit)))
  .attr("width", x.bandwidth)
  .attr("x", d => x(d.month))
  .attr("y", d => y(d.profit))
})
