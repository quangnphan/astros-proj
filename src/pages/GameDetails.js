import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SinglePitchView from "../components/SinglePitchView";
import MultiPitchView from "../components/MultiPitchView";
import { formatTimestamp } from "../helper/formattedDate";
import '../styles/GameDetails.css';

const GameDetails = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [gameData, setGameData] = useState(null);
  const [singlePitchView, setSinglePitchView] = useState(true);

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
      console.log(selectedGameData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [gameId]);

  // Function to handle navigation back to the game list page
  const goBackToGameList = () => {
    navigate("/");
  };

  // Function to toggle between single pitch view and multi pitches view
  const toggleView = () => {
    setSinglePitchView(!singlePitchView);
  };

  return (
    <div className="game-details-container">
      <button className="back-button" onClick={goBackToGameList}>
        Back to Game List
      </button>
      {gameData ? (
        <div className="game-details">
          <h1>Game Details for Game ID: {gameId}</h1>
          <div className="game-info">
            <p>
              {gameData[0].away_team_name} vs. {gameData[0].home_team_name}
            </p>
            <p>Date: {formatTimestamp(gameData[0].game_date)}</p>
          </div>

          <button className="toggle-button" onClick={toggleView}>
            {singlePitchView
              ? "Switch to Multi Pitch View"
              : "Switch to Single Pitch View"}
          </button>

          {singlePitchView ? <SinglePitchView /> : <MultiPitchView />}
        </div>
      ) : (
        <div className="no-data">No Data for Game ID: {gameId}</div>
      )}
    </div>
  );
};

export default GameDetails;
