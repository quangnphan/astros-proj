import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const PitchSpeedHistogram = ({ pitchData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Clear any previous chart content
    d3.select(chartRef.current).selectAll("*").remove();

    // Check if there's pitch data to render
    if (pitchData.length === 0) {
      return;
    }

    // Set the dimensions for the chart
    const width = 400;
    const height = 200;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    // Create a new SVG element
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Extract pitch speed values for the histogram
    const pitchSpeeds = pitchData.map((pitch) => parseFloat(pitch.initial_speed));

    // Create a histogram function
    const histogram = d3
      .histogram()
      .domain([d3.min(pitchSpeeds), d3.max(pitchSpeeds)])
      .thresholds(10) // Adjust the number of bins as needed
      .value((d) => d);

    // Generate the histogram data
    const bins = histogram(pitchSpeeds);

    // Set up scales for the x and y axes
    const x = d3
      .scaleLinear()
      .domain([d3.min(pitchSpeeds), d3.max(pitchSpeeds)])
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(bins, (d) => d.length)])
      .nice()
      .range([height, 0]);

    // Create and append the bars for the histogram
    svg
      .selectAll("rect")
      .data(bins)
      .enter()
      .append("rect")
      .attr("x", 1)
      .attr("transform", (d) => `translate(${x(d.x0)},${y(d.length)})`)
      .attr("width", (d) => x(d.x1) - x(d.x0) - 1)
      .attr("height", (d) => height - y(d.length))
      .style("fill", "#69b3a2"); // Adjust the color as needed

    // Create the x-axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    // Create the y-axis
    svg.append("g").call(d3.axisLeft(y));

    // Add labels to the axes
    svg
      .append("text")
      .attr("transform", `translate(${width / 2},${height + margin.top + 10})`)
      .style("text-anchor", "middle")
      .text("Pitch Speed (MPH)");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Frequency");

  }, [pitchData]);

  return <div ref={chartRef}></div>;
};

export default PitchSpeedHistogram;
