import React, { useState } from "react";
import "../styles/SinglePitchView.css";
import PitchSpeedHistogram from "./PitchSpeedDistribution";

const SinglePitchView = ({ selectedPitcher }) => {
  const [selectedPitchType, setSelectedPitchType] = useState("");

  const uniquePitchTypes = [
    ...new Set(selectedPitcher.pitches.map((pitch) => pitch.pitch_name)),
  ];

  const handlePitchTypeSelect = (event) => {
    setSelectedPitchType(event.target.value);
  };

  // Calculate pitch speed
  const averagePitchSpeed =
    selectedPitcher.pitches
      .filter((pitch) => pitch.pitch_name === selectedPitchType)
      .reduce((total, pitch) => total + parseFloat(pitch.initial_speed), 0) /
    selectedPitcher.pitches.filter(
      (pitch) => pitch.pitch_name === selectedPitchType
    ).length;

  // Calculate average plate speed
  const averagePlateSpeed =
    selectedPitcher.pitches
      .filter((pitch) => pitch.pitch_name === selectedPitchType)
      .reduce((total, pitch) => total + parseFloat(pitch.plate_speed), 0) /
    selectedPitcher.pitches.filter(
      (pitch) => pitch.pitch_name === selectedPitchType
    ).length;

  // Calculate average strike zone top and bottom (feet)
  const averageStrikeZoneTop =
    selectedPitcher.pitches
      .filter((pitch) => pitch.pitch_name === selectedPitchType)
      .reduce((total, pitch) => total + parseFloat(pitch.sz_top), 0) /
    selectedPitcher.pitches.filter(
      (pitch) => pitch.pitch_name === selectedPitchType
    ).length;

  const averageStrikeZoneBottom =
    selectedPitcher.pitches
      .filter((pitch) => pitch.pitch_name === selectedPitchType)
      .reduce((total, pitch) => total + parseFloat(pitch.sz_bottom), 0) /
    selectedPitcher.pitches.filter(
      (pitch) => pitch.pitch_name === selectedPitchType
    ).length;

  return (
    <div className="single-pitch-view">
      <h2>Pitch Information</h2>
      <div>
        <label>Select Pitch Type: </label>
        <select value={selectedPitchType} onChange={handlePitchTypeSelect}>
          <option disabled value="">
            {selectedPitchType
              ? "Selected: " + selectedPitchType
              : "Select a Pitch Type"}
          </option>
          {uniquePitchTypes.map((pitchType, index) => (
            <option key={index} value={pitchType}>
              {pitchType}
            </option>
          ))}
        </select>
      </div>

      {selectedPitchType && (
        <div>
          <div className="pitch-type-info">
            {/* <h3>{selectedPitchType}</h3> */}
            <p>Average Pitch Speed: {averagePitchSpeed.toFixed(2)} MPH</p>
            <p>Average Plate Speed: {averagePlateSpeed.toFixed(2)} MPH</p>
            <p>Average Strikezone Top: {averageStrikeZoneTop.toFixed(2)} MPH</p>
            <p>
              Average Strikezone Bottom: {averageStrikeZoneBottom.toFixed(2)}{" "}
              MPH
            </p>
          </div>
          <div className="pitch-speed-histogram">
            <PitchSpeedHistogram
              pitchData={selectedPitcher.pitches.filter(
                (pitch) => pitch.pitch_name === selectedPitchType
              )}
            />
          </div>
        </div>
      )}

      {selectedPitchType && (
        <div>
          <table className="pitch-data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Speed (MPH)</th>
                {/* <th>Initial Position X (feet)</th>
                <th>Initial Position Y (feet)</th>
                <th>Initial Position Z (feet)</th>
                <th>Initial Velocity X (feet/s)</th>
                <th>Initial Velocity Y (feet/s)</th>
                <th>Initial Velocity Z (feet/s)</th>
                <th>Initial Acceleration X (feet/s²)</th>
                <th>Initial Acceleration Y (feet/s²)</th>
                <th>Initial Acceleration Z (feet/s²)</th>
                <th>Plate Speed (MPH)</th>
                <th>Plate X (feet)</th>
                <th>Plate Y (feet)</th>
                <th>Plate Z (feet)</th>
                <th>Strike Zone Top (feet)</th>
                <th>Strike Zone Bottom (feet)</th> */}
                <th>Event Type</th>
                <th>Event Result</th>
                <th>Batter Name</th>
              </tr>
            </thead>
            <tbody>
              {selectedPitcher.pitches
                .filter((pitch) => pitch.pitch_name === selectedPitchType)
                .map((pitch, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{parseFloat(pitch.initial_speed).toFixed(2)}</td>
                    {/* <td>{parseFloat(pitch.init_pos_x).toFixed(2)}</td>
                    <td>{parseFloat(pitch.init_pos_y).toFixed(2)}</td>
                    <td>{parseFloat(pitch.init_pos_z).toFixed(2)}</td>
                    <td>{parseFloat(pitch.init_vel_x).toFixed(2)}</td>
                    <td>{parseFloat(pitch.init_vel_y).toFixed(2)}</td>
                    <td>{parseFloat(pitch.init_vel_z).toFixed(2)}</td>
                    <td>{parseFloat(pitch.init_accel_x).toFixed(2)}</td>
                    <td>{parseFloat(pitch.init_accel_y).toFixed(2)}</td>
                    <td>{parseFloat(pitch.init_accel_z).toFixed(2)}</td>
                    <td>{parseFloat(pitch.plate_speed).toFixed(2)}</td>
                    <td>{parseFloat(pitch.plate_x).toFixed(2)}</td>
                    <td>{parseFloat(pitch.plate_y).toFixed(2)}</td>
                    <td>{parseFloat(pitch.plate_z).toFixed(2)}</td>
                    <td>{parseFloat(pitch.sz_top).toFixed(2)}</td>
                    <td>{parseFloat(pitch.sz_bottom).toFixed(2)}</td> */}
                    <td>{pitch.event_type}</td>
                    <td>{pitch.event_result}</td>
                    <td>{pitch.batter_name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SinglePitchView;
