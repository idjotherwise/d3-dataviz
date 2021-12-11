/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 2 - Gapminder clone
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

const legend = g.append("g").attr("width", 20).attr("height", 20)

const x = d3.scaleLog()
.base(10)
  .range([0, WIDTH])
  .domain([100, 150000])

const y = d3.scaleLinear()
.range([HEIGHT, 0])
.domain([0, 90])

const area = d3.scaleSqrt()
.domain([2000, 1400000000])
.range([3, 30])


yLabel = g.append("text")
.attr("x", -(HEIGHT / 2))
.attr("y", -60)
.attr("font-size", "20px")
.attr("text-anchor", "middle")
.attr("transform", "rotate(-90)")
.text("Life Expectency (Years)")

timeLabel = g.append("text")
.attr("x", WIDTH / 4)
.attr("y", 0 + 25)
.attr("opacity", "0.4")

g.append("text")
.attr("x", WIDTH / 2)
.attr("y", HEIGHT + 50)
.attr("font-size", "20px")
.attr("text-anchor", "middle")
.text("GDP Per Capita ($)")


const continentColor = d3.scaleOrdinal(d3.schemePastel1)

const xAxisGroup = g.append("g")
.attr("transform", `translate(0, ${HEIGHT})`)

const yAxisGroup = g.append("g")

let year = 0

d3.json("data/data.json").then(data => {
  const formattedData = data.map(year => {
    return year["countries"].filter(country => {
      const dataExists = (country.income && country.life_exp)
      return dataExists
    }).map(country => {
      country.income = Number(country.income)
      country.life_exp = Number(country.life_exp)
      return country
    })
  })

  // d3.interval(() => {
  //   //flag = !flag
  //   year = (year < 214) ? year + 1 : 0
  //   // console.log(year)
  //   const newData = formattedData[year]
  //   update(newData)
  // }, 120)
  update(formattedData[0])
  
})



function update (data) {
  const t = d3.transition().duration(90)

  const xAxisCall = d3.axisBottom(x).tickValues([400, 4000, 40000]).tickFormat(d3.format("$"));
  xAxisGroup.call(xAxisCall)
  // xAxisGroup.transition(t).call(xAxisCall)
  // .selectAll("text")
  // .attr("y", "10")
  // .attr("x", "-20")
  // .attr("transform", "rotate(-40)")

  
  const yAxisCall = d3.axisLeft(y)
  .ticks(4)
  
  yAxisGroup.transition(t).call(yAxisCall)
  
  // JOIN new data with old elements
  const circles = g.selectAll("circle").data(data, d => d.country)
  
  // EXIT old elements not present in new data
  circles.exit().remove()

  // ENTER new elemenets present in new data
  circles.enter().append("circle")
  .attr("fill", d => continentColor(d.continent))
  // .attr("cy", y(0))
  .attr("r", d => area(d.population))
  // AND UPDATE
  .merge(circles)
  .transition(t)
    .attr("fill-opacity", 1)
    .attr("cx", d => x(d.income))
    .attr("cy", d => y(d.life_exp))
  
  timeLabel.text(`Year: ${1800 + year}`)
}
