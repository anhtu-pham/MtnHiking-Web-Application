import React from "react";
import { useQuery } from "react-query";
import ClipLoader from 'react-spinners/ClipLoader';
import readMtnsRequest from "../../api/mtnRequests/readMtnsRequest";

const Mountain = (props) => {

  return (
    <div>
      <div>{props.name}</div>
      <div>
        <div>{props.elevation}</div>
        <div>{props.difficulty}</div>
        <div>{props.summitRating}</div>
      </div>
    </div>
  );
};

const buildMtn = (mtn) => (
  <Mountain
    key={mtn["mountain_ID"]}
    id={mtn["mountain_ID"]}
    name={mtn["mountain_name"]}
    elevation={mtn["elevation"]}
    difficulty={mtn["difficulty"]}
    summitRating={mtn["summit_rating"]}
  />
);

const MountainList = () => {
  const {isLoading, data: mountains} = useQuery('mountains', readMtnsRequest);

  return (
    <div>
      {isLoading ? 
        <ClipLoader size={100} />
        : (
        mountains.map(buildMtn)
        )
      }
    </div>
  );
};

export default MountainList;