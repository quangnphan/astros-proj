import React, { useEffect, useState } from "react";
import "../styles/SinglePitchView.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SinglePitchView = () => {
  const { pitchId } = useParams();
  const [pitchData, setPitchData] = useState(null);
  const navigate = useNavigate();

  //Only for this scenario when I want to show image for the pitch, depends on the business logic, we can remove this
  // const pitchTypeImages = {
  //   "FF": "https://upload.wikimedia.org/wikipedia/commons/c/c1/Four-seam_fastball_1.JPG",
  //   "CU": "https://upload.wikimedia.org/wikipedia/commons/b/b5/Curve_1.JPG",
  //   "SL": "https://upload.wikimedia.org/wikipedia/commons/d/dc/Sliderillustration.png",
  //   "CH": "https://upload.wikimedia.org/wikipedia/commons/5/50/Change_up_1.JPG",
  //   "FT": "https://upload.wikimedia.org/wikipedia/commons/3/3a/Two-seam_fastball_1.JPG",
  //   "FC": "https://www.wikihow.com/images/thumb/4/4b/Throw-a-Cut-Fastball-Step-1-Version-2.jpg/aid135953-v4-728px-Throw-a-Cut-Fastball-Step-1-Version-2.jpg",
  //   "SI": "https://www.wikihow.fitness/images/thumb/5/56/Grip-a-Sinker-Pitch-Step-3-Version-3.jpg/aid596432-v4-728px-Grip-a-Sinker-Pitch-Step-3-Version-3.jpg",
  //   "FS": "https://upload.wikimedia.org/wikipedia/commons/4/48/Split-finger_fastball_1.JPG"
  // };

  const fetchPitch = async () => {
    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/rd-astros/hiring-resources/master/pitches.json"
      );
      const pitchData = response.data.queryResults.row;

      // Filter pitchData to include only the data for the selected pitch, usually we will have a different api to fetch this pitch, but since we don't have one I'll filter this out using event_id
      const selectedPitch = pitchData.find(
        (pitch) => pitch.event_id === pitchId
      );

      if (selectedPitch) {
        setPitchData(selectedPitch);
      } else {
        console.error("Pitch not found for pitchId:", pitchId);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPitch();
    // eslint-disable-next-line
  }, [pitchId]);

  if (!pitchData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="single-pitch-detail">
  <div className="pitch-header">
    <button className="back-button" onClick={() => navigate(-1)}>
      Back to All Pitches
    </button>
    <h2>Pitch Detail</h2>
  </div>
  <div className="pitch-info-container">
    <div className="pitch-details">
      <table>
        <tbody>
          <tr>
            <td>Pitch Type:</td>
            <td>Four-seam FB</td>
          </tr>
          <tr>
            <td>Speed (MPH):</td>
            <td>{parseFloat(pitchData.initial_speed).toFixed(2)}</td>
          </tr>
          <tr>
            <td>Plate Speed (MPH):</td>
            <td>{parseFloat(pitchData.plate_speed).toFixed(2)}</td>
          </tr>
          <tr>
            <td>Event Type:</td>
            <td>Called Strike</td>
          </tr>
          <tr>
            <td>Event Result:</td>
            <td></td>
          </tr>
          <tr>
            <td>Batter Name:</td>
            <td>Springer, George</td>
          </tr>
          <tr>
            <td>Bat Side:</td>
            <td>R</td>
          </tr>
          <tr>
            <td>Pitcher Name:</td>
            <td>Snell, Blake</td>
          </tr>
          <tr>
            <td>Pitcher Throws:</td>
            <td>L</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="xyz-tables">
      <table>
        <tbody>
          <tr>
            <td>Initial Position:</td>
            <td>X: {parseFloat(pitchData.init_pos_x).toFixed(2)} feet</td>
            <td>Y: {parseFloat(pitchData.init_pos_y).toFixed(2)} feet</td>
            <td>Z: {parseFloat(pitchData.init_pos_z).toFixed(2)} feet</td>
          </tr>
          <tr>
            <td>Initial Velocity:</td>
            <td>X: {parseFloat(pitchData.init_vel_x).toFixed(2)} feet/s</td>
            <td>Y: {parseFloat(pitchData.init_vel_y).toFixed(2)} feet/s</td>
            <td>Z: {parseFloat(pitchData.init_vel_z).toFixed(2)} feet/s</td>
          </tr>
          <tr>
            <td>Initial Acceleration:</td>
            <td>X: {parseFloat(pitchData.init_accel_x).toFixed(2)} feet/s²</td>
            <td>Y: {parseFloat(pitchData.init_accel_y).toFixed(2)} feet/s²</td>
            <td>Z: {parseFloat(pitchData.init_accel_z).toFixed(2)} feet/s²</td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td>Plate Position:</td>
            <td>X: {parseFloat(pitchData.plate_x).toFixed(2)} feet</td>
            <td>Y: {parseFloat(pitchData.plate_y).toFixed(2)} feet</td>
            <td>Z: {parseFloat(pitchData.plate_z).toFixed(2)} feet</td>
          </tr>
          <tr>
            <td>Break:</td>
            <td>Break X: {parseFloat(pitchData.break_x).toFixed(2)} feet</td>
            <td>Break Z: {parseFloat(pitchData.break_z).toFixed(2)} feet</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

  )
};

export default SinglePitchView;
