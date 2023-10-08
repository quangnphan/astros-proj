import React from 'react';
import Plot from 'react-plotly.js';

const PitchTypePieChart = ({ pitchData }) => {
  const pitchTypes = pitchData.map((pitch) => pitch.pitch_name);
  const pitchTypeCounts = pitchTypes.reduce((counts, pitchType) => {
    counts[pitchType] = (counts[pitchType] || 0) + 1;
    return counts;
  }, {});

  const labels = Object.keys(pitchTypeCounts);
  const values = Object.values(pitchTypeCounts);

  const layout = {
    title: 'Pitch Types Distribution',
  };

  return (
    <div>
      <Plot
        data={[
          {
            labels,
            values,
            type: 'pie',
          },
        ]}
        layout={layout}
      />
    </div>
  );
};

export default PitchTypePieChart;
