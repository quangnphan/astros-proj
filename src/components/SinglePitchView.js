import React, { useEffect } from "react";

const SinglePitchView = ({ selectedPitcher }) => {
  useEffect(() => {
    console.log(selectedPitcher);
  }, [selectedPitcher]);
  return (
    <div className="single-pitch-view">
      <h2>Pitch Details</h2>
    </div>
  );
};

export default SinglePitchView;
