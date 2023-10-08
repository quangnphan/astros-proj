import React, { useState, useEffect } from "react";
import "../styles/MultiPitchView.css";
import PitchSpeedLineChart from "./PitchSpeedLineChart";
import PitchTypePieChart from "./PitchTypePieChart";
import { Link } from "react-router-dom";

const MultiPitchView = ({ selectedPitcher }) => {
  const [selectedPitchTypes, setSelectedPitchTypes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  // Filter the pitch data based on selected types
  const filteredPitchData = selectedPitcher.pitches
    .filter(
      (pitch) =>
        selectedPitchTypes.length === 0 ||
        selectedPitchTypes.includes(pitch.pitch_name)
    )
    .filter((pitch) =>
      pitch.event_result.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Calculate average pitch speed
  const averagePitchSpeed =
    filteredPitchData.reduce(
      (total, pitch) => total + parseFloat(pitch.initial_speed),
      0
    ) / filteredPitchData.length;

  const maxSpeed = filteredPitchData.reduce((maxSpeed, pitch) => {
    const speed = parseFloat(pitch.initial_speed);
    return speed > maxSpeed ? speed : maxSpeed;
  }, -Infinity);

  const minSpeed = filteredPitchData.reduce((minSpeed, pitch) => {
    const speed = parseFloat(pitch.initial_speed);
    return speed < minSpeed ? speed : minSpeed;
  }, Infinity);

  // Calculate average plate speed
  const averagePlateSpeed =
    filteredPitchData.reduce(
      (total, pitch) => total + parseFloat(pitch.plate_speed),
      0
    ) / filteredPitchData.length;

  // Calculate average strike zone top and bottom (feet)
  const averageStrikeZoneTop =
    filteredPitchData.reduce(
      (total, pitch) => total + parseFloat(pitch.sz_top),
      0
    ) / filteredPitchData.length;

  const averageStrikeZoneBottom =
    filteredPitchData.reduce(
      (total, pitch) => total + parseFloat(pitch.sz_bottom),
      0
    ) / filteredPitchData.length;

  const totalPitches = () => filteredPitchData.length;

  useEffect(() => {
    // Initialize selectedPitchTypes with all unique pitch types
    setSelectedPitchTypes(uniquePitchTypes);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="multi-pitch-view">
      <h2>Pitch Information for {selectedPitcher.pitcher_name}</h2>
      <div className="filters">
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
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by event result"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredPitchData.length > 0 && (
        <div>
          <div>
            <div className="pitch-type-info">
              {/* <h3>{selectedPitchType}</h3> */}
              <p>
                <strong>Total Pitch Count:</strong>{" "}
                {totalPitches()} pitches
              </p>
              <p>
                <strong>Average Pitch Speed:</strong>{" "}
                {averagePitchSpeed.toFixed(2)} MPH
              </p>
              <p>
                <strong>Max Pitch Speed:</strong> {maxSpeed.toFixed(2)} MPH
              </p>
              <p>
                <strong>Min Pitch Speed:</strong> {minSpeed.toFixed(2)} MPH
              </p>
              <p>
                <strong>Average Plate Speed:</strong>{" "}
                {averagePlateSpeed.toFixed(2)} MPH
              </p>
              <p>
                <strong>Average Strikezone Top:</strong>{" "}
                {averageStrikeZoneTop.toFixed(2)} MPH
              </p>
              <p>
                <strong>Average Strikezone Bottom:</strong>{" "}
                {averageStrikeZoneBottom.toFixed(2)} MPH
              </p>
            </div>
          </div>
          <div className="chart-container">
            <PitchSpeedLineChart pitchData={filteredPitchData} />
            <PitchTypePieChart pitchData={filteredPitchData} />
          </div>
        </div>
      )}

      <div className="pitch-data-table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Pitch Type</th>
              <th>Inning</th>
              <th>Speed (MPH)</th>
              <th>Outs</th>
              <th>Strikes</th>
              <th>Event Type</th>
              <th>Event Result</th>
              <th>Batter Name</th>
              <th>More Info</th>
            </tr>
          </thead>
          <tbody>
            {filteredPitchData.map((pitch, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{pitch.pitch_type}</td>
                <td>{pitch.inning}</td>
                <td>{parseFloat(pitch.initial_speed).toFixed(2)}</td>
                <td>{pitch.outs}</td>
                <td>{pitch.strikes}</td>
                <td>{pitch.event_type}</td>
                <td>{pitch.event_result}</td>
                <td>{pitch.batter_name}</td>
                <td>
                  <Link
                    to={`/pitch/${pitch.event_id}`} //I used event id for this because I couldn't find the pitch id
                    className="pitch-details-link"
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MultiPitchView;
