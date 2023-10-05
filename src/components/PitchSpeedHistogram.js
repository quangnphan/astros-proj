import React from "react";
import Plot from "react-plotly.js";

const PitchSpeedHistogram = ({ pitchData }) => {
  const speeds = pitchData.map((pitch) => parseFloat(pitch.initial_speed));

  const data = [
    {
      y: speeds,
      type: "box",
      marker: {
        color: "blue",
      },
    },
  ];

  const layout = {
    title: "Pitch Speed Box Plot",
    yaxis: {
      title: "Speed (MPH)",
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
