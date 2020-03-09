import * as d3 from 'd3'

const JsonData = "https://flyinglogbook-8012b.firebaseio.com/survivor/0.json"
const MARGIN = { TOP: 10, BOTTOM: 80, LEFT: 70, RIGHT: 10 }
const WIDTH = 500 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 300 - MARGIN.TOP - MARGIN.BOTTOM;
const PADDING = {top:20,bottom:150,left:100,right:20}
class D3Chart {
	constructor(element, data) {
		let self = this

		self.g = d3.select(element)
			.append("svg")
				.attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
				.attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
			.append("g")
				.attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)
		// x width
		self.x = d3.scaleLinear()
			.range([0, WIDTH])

		// y height
		self.y = d3.scaleLinear()
			.range([HEIGHT, 0])

		self.xAxisGroup = self.g.append("g")
			.attr("transform", `translate(0,${HEIGHT})`)
		self.yAxisGroup = self.g.append("g")

		self.g.append("text")
		.attr("x", WIDTH / 2)
		.attr("y", HEIGHT + 40)
		.attr("font-size", 20)
		.attr("text-anchor", "middle")
		.text("age")

		self.g.append("text")
		.attr("x", -(HEIGHT / 2))
		.attr("y", -50)
		.attr("transform", "rotate(-90)")
		.attr("font-size", 20)
		.attr("text-anchor", "middle")
		.text("Height in cm")

	

		self.update(data)		
	}

	update(data) {
		let self = this
		self.data = data
		// x position
		self.x.domain([0, d3.max(self.data, d=>Number(d.age))])
		// y position
		self.y.domain([0, d3.max(self.data, d=>Number(d.height))])

		const xAxisCall = d3.axisBottom(self.x)
		const yAxisCall = d3.axisLeft(self.y)

		self.xAxisGroup.transition(1000).call(xAxisCall)
		self.yAxisGroup.transition(1000).call(yAxisCall)


	


		//JOIN
		const circles = self.g.selectAll("circle")
		.data(self.data, d => d.name)

		// exit
		circles.exit()
		.transition(1000)
		.attr("cy", self.y(0))
		.remove()

		// update
		circles.transition(1000)
		.attr("cx", d => self.x(d.age))
		.attr("cy", d => self.y(d.height))

		//enter
		circles.enter().append("circle")
		.attr("cy", self.y(0))
		.attr("cx", d => self.x(d.age))
		.attr("cy", d => self.y(d.height))
		.attr("r", 5)
		.attr("fill", "grey")
		.transition(1000)
		.attr("cy", d=>self.y(d.height))

	}
}

export default D3Chart