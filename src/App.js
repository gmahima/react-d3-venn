import React, { Component } from "react";
import "./App.css";
import * as d3 from "d3";
import * as venn from "venn.js";

var sets = [
  {
    size: 2,
    sets: ["A", "B", "C"]
  },
  {
    size: 5,
    sets: ["B", "C"]
  },
  {
    size: 15,
    sets: ["B", "A"]
  },
  {
    size: 20,
    sets: ["C", "A"]
  },
  {
    size: 20,
    sets: ["B"]
  },
  {
    size: 30,
    sets: ["C"]
  },
  {
    size: 50,
    sets: ["A"]
  }
];

class App extends Component {
  chart = venn.VennDiagram();
  componentDidMount() {
    let div = d3.select(this.refs.chart);
    div.datum(sets).call(this.chart);
    var tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "venntooltip")
      .style("display", "none");
    //   d3.selectAll(".venn-circle path")
    //     .style("fill-opacity", .5);

    // d3.selectAll("text").style("fill", "white");
    // d3.selectAll(" .venn-circle")
    //     .on("mouseover", function(d, i) {
    //         var node = d3.select(this).transition();
    //         node.select("path").style("fill-opacity", 1);
    //         node.select("text").style("font-weight", "100")
    //                            .style("font-size", "36px");
    //     })
    //     .on("mouseout", function(d, i) {
    //         var node = d3.select(this).transition();
    //         node.select("path").style("fill-opacity", .5);
    //         node.select("text").style("font-weight", "100")
    //                            .style("font-size", "24px");
    //     });
    //     console.log(this.refs.chart.children[0].children)
    //console.log(div.selectAll("g")._groups[0])

    div
      .selectAll("g")
      .on("mouseover", function(d, i) {
        //console.log(this)

        // sort all the areas relative to the current item

        //console.log(d)

        venn.sortAreas(div, d);
        // Display a tooltip with the current size
        tooltip
          .transition()
          .duration(400)
          .style("opacity", 1)
          .style("display", "inline");
        tooltip.text(`${d.size}`);

        // highlight the current path
        var selection = d3
          .select(this)
          .transition("tooltip")
          .duration(400);
        selection
          .select("path")
          .style("stroke-width", 3)
          .style("fill-opacity", d.sets.length === 1 ? 0.4 : 0.1)
          .style("stroke-opacity", 1);
      })

      .on("mousemove", function() {
        //console.log(d3.event)
        console.log(tooltip);
        tooltip
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY - 28 + "px");
      })

      .on("mouseout", function(d, i) {
        tooltip
          .transition()
          .duration(400)
          .style("opacity", 0);
        var selection = d3
          .select(this)
          .transition("tooltip")
          .duration(400);
        selection
          .select("path")
          .style("stroke-width", 0)
          .style("fill-opacity", d.sets.length === 1 ? 0.25 : 0.0)
          .style("stroke-opacity", 0);
      });
  }
  render() {
    return (
      <div className="App" ref="chart">
        {/* <div className="venntooltip" ref="tooltip"></div> */}
      </div>
    );
  }
}

export default App;
