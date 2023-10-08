import React from "react";
import Plot from "react-plotly.js";

const PitchSpeedLineChart = ({ pitchData }) => {
  const pitchTypes = [...new Set(pitchData.map((pitch) => pitch.pitch_type))];

  const data = pitchTypes.map((pitchType) => {
    const pitchesOfType = pitchData.filter((pitch) => pitch.pitch_type === pitchType);
    const speeds = pitchesOfType.map((pitch) => parseFloat(pitch.initial_speed));
    const speedChange = speeds.length > 0 ? speeds[0] - speeds[speeds.length - 1] : 0;

    return {
      x: pitchesOfType.map((_, index) => index + 1),
      y: speeds,
      mode: "lines+markers",
      type: "scatter",
      name: `${pitchType} (ΔSpeed: ${speedChange.toFixed(2)} MPH)`,
    };
  });

  const layout = {
    title: "Pitch Speed Change Line Chart",
    xaxis: {
      title: "Pitch Number",
    },
    yaxis: {
      title: "Speed (MPH)",
    },
  };

  return (
    <div>
      <Plot data={data} layout={layout} />
    </div>
  );
};

export default PitchSpeedLineChart;
