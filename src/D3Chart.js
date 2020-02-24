import * as d3 from 'd3'

const MARGIN = { TOP: 10, BOTTOM: 80, LEFT: 70, RIGHT: 10 }
const WIDTH = 500 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 300 - MARGIN.TOP - MARGIN.BOTTOM;

class D3Chart {
	constructor(element, data) {
		let self = this


		self.data = data

		self.g = d3.select(element)
			.append("svg")
				.attr("width"," 100%")
				.attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
			.append("g")
				.attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)
		// x width
		self.x = d3.scaleLinear()
			.range([0, WIDTH])

		// y height
		self.y = d3.scaleLinear()
			.range([HEIGHT, 0])

		self.update()		
	}

	update() {
		let self = this
		self.x.domain([0, d3.max(self.data, d=>d.age)])
		self.y.domain([0, d3.max(self.data, d=>d.height)])


		//JOIN
		const circles = self.g.selectAll("circle")
		.data(self.data, d => d.name)

		// exit
		circles.exit().remove()

		// update
		circles
		.attr("cx", d => self.x(d.age))
		.attr("cy", d => self.y(d.height))

		//enter
		circles.enter().append("circle")
		.attr("cx", d => self.x(d.age))
		.attr("cy", d => self.y(d.height))
		.attr("r", 5)
		.attr("fill", "grey")

	}
}

export default D3Chart