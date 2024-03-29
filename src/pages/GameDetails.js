import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MultiPitchView from "../components/MultiPitchView";
import { formatTimestamp } from "../helper/helpFuncs";
import "../styles/GameDetails.css";

const GameDetails = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [gameData, setGameData] = useState(null);
  const [pitchersData, setPitchersData] = useState([]);
  const [selectedPitcherName, setSelectedPitcherName] = useState("");
  const [selectedPitcher, setSelectedPitcher] = useState(()=>{
    // Retrieve the selectedPitcher from local storage when the component initializes
    const storedSelectedPitcher = localStorage.getItem("selectedPitcher");
    return storedSelectedPitcher ? JSON.parse(storedSelectedPitcher) : null;
  });

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
     // Remove selectedPitcher from local storage
     localStorage.removeItem("selectedPitcher");
  };

  const PitcherDropdown = ({
    pitchersData,
    selectedPitcherName,
    handlePitcherSelect,
  }) => {
    return (
      <select onChange={handlePitcherSelect} value={selectedPitcherName}>
        <option disabled value="">
          {selectedPitcherName ? "Selected: " + selectedPitcherName : "Select"}
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
      // Save selectedPitcher to local storage
      localStorage.setItem(
        "selectedPitcher",
        JSON.stringify(selectedPitcherData)
      );
    } else {
      setSelectedPitcher(null);
      // Remove selectedPitcher from local storage
      localStorage.removeItem("selectedPitcher");
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
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
        {"<"} Back to Game List
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
            <h4>Select a pitcher:</h4>
            <PitcherDropdown
              pitchersData={pitchersData}
              selectedPitcherName={selectedPitcherName}
              handlePitcherSelect={handlePitcherSelect}
            />
          </div>

          {selectedPitcherName ? (
            null
          ) : (
            <p className="select-pitcher">Please select a Pitcher.</p>
          )}

          {selectedPitcher ? (
            <MultiPitchView selectedPitcher={selectedPitcher} />
          ) : null}
        </div>
      ) : (
        <div className="no-data">No Data for Game ID: {gameId}</div>
      )}
    </div>
  );
};

export default GameDetails;
