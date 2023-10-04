import React from "react";
import Plot from "react-plotly.js";

const PitchSpeedHistogram = ({ pitchData }) => {
  const speeds = pitchData.map((pitch) => parseFloat(pitch.initial_speed));

  const data = [
    {
      x: speeds,
      type: "histogram",
      marker: {
        color: "blue",
      },
    },
  ];

  const layout = {
    title: "Pitch Speed Histogram",
    xaxis: {
      title: "Speed (MPH)",
    },
    yaxis: {
      title: "Frequency",
    },
    width: 450,
  };

  return (
    <div>
      <Plot data={data} layout={layout} />
    </div>
  );
};

export default PitchSpeedHistogram;
