import React from "react";

const Photo = props => (
  <div className="photo">
    <img src={props.url} alt={props.urls} />
    <button onClick={() => props.removePhoto(props.photoKey)}>&times;</button>
  </div>
);

export default Photo;
