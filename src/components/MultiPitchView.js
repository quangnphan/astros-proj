import React, { useState } from "react";
import "../styles/MultiPitchView.css";

const MultiPitchView = ({ selectedPitcher }) => {
  const [selectedPitchTypes, setSelectedPitchTypes] = useState([]);

  // Extract unique pitch types
  const uniquePitchTypes = [
    ...new Set(selectedPitcher.pitches.map((pitch) => pitch.pitch_name)),
  ];

  // Handle checkbox changes
  const handleCheckboxChange = (event) => {
    const pitchType = event.target.value;
    if (event.target.checked) {
      setSelectedPitchTypes([...selectedPitchTypes, pitchType]);
    } else {
      setSelectedPitchTypes(
        selectedPitchTypes.filter((type) => type !== pitchType)
      );
    }
  };

  return (
    <div className="multi-pitch-view">
      <h2>Pitch Information</h2>
      <div className="pitch-type-filters">
        {uniquePitchTypes.map((pitchType, index) => (
          <label key={index}>
            <input
              type="checkbox"
              value={pitchType}
              checked={selectedPitchTypes.includes(pitchType)}
              onChange={handleCheckboxChange}
            />
            {pitchType}
          </label>
        ))}
      </div>
      <div className="pitch-data-table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Pitch Type</th>
              <th>Speed (MPH)</th>
              <th>Event Type</th>
              <th>Event Result</th>
              <th>Batter Name</th>
            </tr>
          </thead>
          <tbody>
            {selectedPitcher.pitches.map((pitch, index) =>
              // Check if the pitch type is selected
              selectedPitchTypes.length === 0 ||
              selectedPitchTypes.includes(pitch.pitch_name) ? (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{pitch.pitch_type}</td>
                  <td>{parseFloat(pitch.initial_speed).toFixed(2)}</td>
                  <td>{pitch.event_type}</td>
                  <td>{pitch.event_result}</td>
                  <td>{pitch.batter_name}</td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MultiPitchView;
