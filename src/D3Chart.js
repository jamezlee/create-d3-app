import * as d3 from 'd3'

const JsonData = "https://flyinglogbook-8012b.firebaseio.com/survivor/0.json"
const MARGIN = { TOP: 10, BOTTOM: 80, LEFT: 70, RIGHT: 10 }
const WIDTH = 500 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 300 - MARGIN.TOP - MARGIN.BOTTOM;
const PADDING = {top:20,bottom:150,left:100,right:20}
class D3Chart {
	constructor(element, data) {
		let vis = this
		var x,y,gX, gY, xAxis, yAxis; 
		var idList=1
		var color = d3.scaleOrdinal(d3.schemeCategory10);
		var mainData = null;
		var line;
		var settings = {
			targets:[],
			detail:{
				type:"line"
			}
		};

		var g = d3.select(element)
			.append("svg")
			.insert("div","svg")
			.html(data[0].metric.AREA_NAME+"<BR>"+data[0].metric.IND_NAME+"<BR>"+data[0].metric.NAME);
			// .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
			// .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
			// .append("g")
			// .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)


			d3.json(JsonData,(data)=>{
				console.log(data)

			})
		
			
	}

	zoomed() {
		gX.call(xAxis.scale(d3.event.transform.rescaleX(x)));
		var new_x = d3.event.transform.rescaleX(x);
	
		if(settings.detail.type == "line"){
			line.x(function(d) { return  new_x(new Date(d.DATA_DATE)); })
			d3.select("#canvas").selectAll("path.line")
							.data(mainData)
							.attr("d",function(d){
								return line(d.data);
							}); 
		} else if(settings.detail.type == "bar"){
			barWidth = new_x(new Date("2016-01-02")) - new_x(new Date("2016-01-01"));
			d3.select("#canvas").selectAll("rect.bar")
								.data(mainData[0].data)    
								.attr("x",function(d){return new_x(new Date(d.DATA_DATE))-barWidth*0.5;})
								.attr("width",barWidth);
		}
	}
}

export default D3Chart