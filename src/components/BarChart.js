import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);

    svg.selectAll('*').remove(); // Clear previous content

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.pitch_name))
      .range([0, width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => parseFloat(d.initial_speed))])
      .nice()
      .range([height, 0]);

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(${margin.left},${height + margin.top})`)
      .call(d3.axisBottom(x));

    svg
      .append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .call(d3.axisLeft(y).ticks(5));

    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d) => x(d.pitch_name) + margin.left)
      .attr('y', (d) => y(parseFloat(d.initial_speed)) + margin.top)
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(parseFloat(d.initial_speed)))
      .attr('fill', 'steelblue');
  }, [data]);

  return (
    <svg ref={svgRef} width={400} height={300}></svg>
  );
};

export default BarChart;
