import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { formatTimestamp } from "../helper/helpFuncs";

const HomePage = () => {
  const [games, setGames] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/rd-astros/hiring-resources/master/pitches.json"
      );
      const pitchData = response.data.queryResults.row;

      // Extract unique game IDs from the pitch data
      const uniqueGameIds = Array.from(
        new Set(pitchData.map((pitch) => pitch.game_pk))
      );

      // Create an array of game objects with unique game IDs
      const gameList = uniqueGameIds.map((gameId) => {
        const pitchesForGame = pitchData.filter(
          (pitch) => pitch.game_pk === gameId
        );
        return {
          game_pk: gameId,
          pitchesData: pitchesForGame,
        };
      });

      setGames(gameList);
      console.log(gameList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="homepage-container">
      <h1>Game List</h1>
      <ul>
        {games ? (
          games.map((game) => (
            <li key={game.game_pk} className="game-list-item">
              <Link to={`/game/${game.game_pk}`} className="game-link">
                <div className="date">
                  {formatTimestamp(game.pitchesData[0].game_date)}
                </div>
                <div className="teams">
                  <div className="team">
                    <div className="team-label">Away Team:</div>
                    <div className="team-name">
                      {game.pitchesData[0].away_team_name}
                    </div>
                  </div>
                  <div className="vs-container">
                    <span className="vs">vs.</span>
                  </div>
                  <div className="team">
                    <div className="team-label">Home Team:</div>
                    <div className="team-name">
                      {game.pitchesData[0].home_team_name}
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))
        ) : (
          <div>No Data.</div>
        )}
      </ul>
    </div>
  );
};

export default HomePage;
