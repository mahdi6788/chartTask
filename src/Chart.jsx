import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function Chart({ chart }) {
  const svgRef = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const isMulti = Array.isArray(chart.data[0][1]);

    const timestamps = chart.data.map((d) => d[0]);
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(timestamps))
      .range([0, width]);
    const xAxis = d3.axisBottom(xScale);

    svg.append("g").attr("transform", `translate(0, ${height})`).call(xAxis);

    if (!isMulti) {
      const validData = chart.data.filter((d) => d[1] !== null);
      const yScale = d3
        .scaleLinear()
        .domain(d3.extent(validData, (d) => d[1]))
        .range([height, 0]);

      const yAxis = d3.axisLeft(yScale);
      svg.append("g").call(yAxis);

      const line = d3
        .line()
        .defined((d) => d[1] !== null)
        .x((d) => xScale(d[0]))
        .y((d) => yScale(d[1]));

      svg
        .append("path")
        .datum(chart.data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", line);
    } else {
      const seriesCount = chart.data[0][1].length;
      const colors = ["blue", "green", "red"];

      for (let i = 0; i < seriesCount; i++) {
        const seriesData = chart.data.map(([t, v]) => [t, v ? v[i] : null]);
        const validSeries = seriesData.filter((d) => d[1] !== null);

        const yScale = d3
          .scaleLinear()
          .domain(d3.extent(validSeries, (d) => d[1]))
          .range([height, 0]);

        if (i === 0) {
          const yAxis = d3.axisLeft(yScale);
          svg.append("g").call(yAxis);
        }

        const line = d3
          .line()
          .defined((d) => d[1] !== null)
          .x((d) => xScale(d[0]))
          .y((d) => yScale(d[1]));

        svg
          .append("path")
          .datum(seriesData)
          .attr("fill", "none")
          .attr("stroke", colors[i])
          .attr("stroke-width", 1.5)
          .attr("d", line);
      }
    }
  }, [chart]);

  return (
    <div style={{ marginBottom: "40px" }}>
      <h3>{chart.title}</h3>
      <svg ref={svgRef}></svg>
    </div>
  );
}
