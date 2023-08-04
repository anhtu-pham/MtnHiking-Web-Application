import React from "react";
import { useQuery } from "react-query";
import ClipLoader from "react-spinners/ClipLoader";
import readTrailsRequest from "../../api/trails/readTrailsRequest";
import AddTripForm from "../trips/AddTripForm";

const Trail = (props) => {
  function addTrip() {
    return (<AddTripForm trailID={props.id}/>);
  }
  
  return (
    <div onClick={addTrip}>
      <div>{props.name}</div>
      <div>
        <div>{props.elevation}</div>
        <div>{props.difficulty}</div>
        <div>{props.trailLength}</div>
        <div>{props.location}</div>
        <div>{props.waterStation}</div>
        <div>{props.summitRating}</div>
      </div>
      <div>{props.description}</div>
    </div>
  )
};

const buildTrail = (trail) => {
  return (
    <Trail
      key={trail["trail_ID"]}
      id={trail["trail_ID"]}
      name={trail["trail_name"]}
      elevation={trail["elevation_gain"]}
      difficulty={trail["difficulty"]}
      trailLength={trail["trail_length"]}
      location={trail["trail_location"]}
      waterStation={trail["water_station"]}
      description={trail["trail_description"]}
    />
  );
};

const TrailList = () => {
  const { isLoading, data: trails } = useQuery("trails", readTrailsRequest);

  return (
    <div>{isLoading ? <ClipLoader size={100} /> : trails.map(buildTrail)}</div>
  );
};

export default TrailList;
