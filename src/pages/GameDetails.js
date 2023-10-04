import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SinglePitchView from "../components/SinglePitchView";
import MultiPitchView from "../components/MultiPitchView";
import { formatTimestamp } from "../helper/helpFuncs";
import "../styles/GameDetails.css";

const GameDetails = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [gameData, setGameData] = useState(null);
  const [singlePitchView, setSinglePitchView] = useState(true);
  const [pitchersData, setPitchersData] = useState([]);
  const [selectedPitcherName, setSelectedPitcherName] = useState("");
  const [selectedPitcher, setSelectedPitcher] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/rd-astros/hiring-resources/master/pitches.json"
      );
      const pitchData = response.data.queryResults.row;

      // Filter pitchData to include only the data for the selected game
      const selectedGameData = pitchData.filter(
        (pitch) => pitch.game_pk === gameId
      );

      setGameData(selectedGameData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const goBackToGameList = () => {
    navigate("/");
  };

  const toggleView = () => {
    setSinglePitchView(!singlePitchView);
  };

  const PitcherDropdown = ({
    pitchersData,
    selectedPitcherName,
    handlePitcherSelect,
  }) => {
    return (
      <select onChange={handlePitcherSelect} value={selectedPitcherName}>
        <option disabled value="">
          {selectedPitcherName
            ? "Selected: " + selectedPitcherName
            : "Select a Pitcher"}
        </option>
        {Object.values(pitchersData).map((pitcher) => (
          <option key={pitcher.pitcher_name} value={pitcher.pitcher_name}>
            {pitcher.pitcher_name}
          </option>
        ))}
      </select>
    );
  };

  const handlePitcherSelect = (event) => {
    const selectedPitcherName = event.target.value;
    setSelectedPitcherName(selectedPitcherName);

    if (selectedPitcherName) {
      // Find the selected pitcher's data by iterating through pitchersData
      let selectedPitcherData = null;

      for (const pitcherId in pitchersData) {
        if (pitchersData[pitcherId].pitcher_name === selectedPitcherName) {
          selectedPitcherData = pitchersData[pitcherId];
          break;
        }
      }

      setSelectedPitcher(selectedPitcherData);
    } else {
      setSelectedPitcher(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, [gameId]);

  useEffect(() => {
    const groupedPitcherData = {};

    gameData?.forEach((pitch) => {
      const { pitcher_id, pitcher_name } = pitch;

      if (!groupedPitcherData[pitcher_id]) {
        groupedPitcherData[pitcher_id] = {
          pitcher_name,
          pitches: [],
        };
      }

      groupedPitcherData[pitcher_id].pitches.push(pitch);
    });

    setPitchersData(groupedPitcherData);
  }, [gameData]);

  return (
    <div className="game-details-container">
      <button className="back-button" onClick={goBackToGameList}>
        {'<'} Back to Game List
      </button>
      {gameData ? (
        <div className="game-details">
          <h1 className="game-title">Game Details for Game ID: {gameId}</h1>
          <div className="team-info">
            <p className="team-names">
              {gameData[0].away_team_name} vs. {gameData[0].home_team_name}
            </p>
            <p className="game-date">
              Date: {formatTimestamp(gameData[0].game_date)}
            </p>
          </div>

          <div className="options"> 
          <button className="toggle-button" onClick={toggleView}>
            {singlePitchView
              ? "Switch to Multi Pitch View"
              : "Switch to Single Pitch View"}
          </button>

          <PitcherDropdown
            pitchersData={pitchersData}
            selectedPitcherName={selectedPitcherName}
            handlePitcherSelect={handlePitcherSelect}
          />
          </div>

          {selectedPitcherName ? (
            <h2 className="pitcher-title">
              Pitch Data for {selectedPitcherName}
            </h2>
          ) : (
            <p className="select-pitcher">Please select a Pitcher.</p>
          )}

          {selectedPitcher ? (
            <div className="pitch-view-container">
              {singlePitchView ? (
                <SinglePitchView selectedPitcher={selectedPitcher} />
              ) : (
                <MultiPitchView selectedPitcher={selectedPitcher} />
              )}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="no-data">No Data for Game ID: {gameId}</div>
      )}
    </div>
  );
};

export default GameDetails;
