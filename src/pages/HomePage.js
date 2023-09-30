import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { formatTimestamp } from "../helper/formattedDate";

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
    <div>
      <h1>Game List</h1>
      <ul>
        {games ? (
          games.map((game) => (
            <li key={game.game_pk} className="game-list-item">
              <Link to={`/game/${game.game_pk}`} className="game-link">
                <div className="date">{formatTimestamp(game.pitchesData[0].game_date)}</div>
                <div className="teams">
                  <span className="team-name">
                    {game.pitchesData[0].away_team_name}
                  </span>
                  <span className="vs">vs.</span>
                  <span className="team-name">
                    {game.pitchesData[0].home_team_name}
                  </span>
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
