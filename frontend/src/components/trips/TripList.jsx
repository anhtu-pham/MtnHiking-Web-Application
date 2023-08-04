import React, { useState, useEffect } from "react";
import ReactStars from "react-stars";
import { useQuery, useQueryClient, useMutation } from "react-query";
import ClipLoader from "react-spinners/ClipLoader";
import readTripsRequest from "../../api/trips/readTripsRequest";
import updateTripRequest from "../../api/trips/updateTripRequest";
import removeTripRequest from "../../api/trips/deleteTripRequest";

const Trip = (props) => {
  return (
    <div>
      <div>{props.name}</div>
      <div>
        <div>{props.startingTime}</div>
        <div>{props.endingTime}</div>
        if(props.finished) {
          <ReactStars count={5} size={30} half={false} onChange={props.updateTripHandler} />
        }
      </div>
    </div>
  );
};

const buildNextTrip = (trip) => {
  const queryClient = useQueryClient();

  const { mutate: deleteTripHandler } = useMutation(
    (deletedTrip) => removeTripRequest(deletedTrip),
    {
      onSettled: () => {
        queryClient.invalidateQueries("trips");
      },
    }
  );

  return (
    <div>
      <Trip
        key={trip["Trail_trip.trip_ID"]}
        id={trip["Trail_trip.trip_ID"]}
        name={trip["Trail.trail_name"]}
        startingTime={trip["Trail_trip.starting_time"]}
        endingTime={trip["Trail_trip.ending_time"]}
        finished={false}
      />
      <button onClick={() => deleteTripHandler(trip)}>Remove</button>
    </div>
  );
};

const buildPastTrip = (trip) => {
  const queryClient = useQueryClient();
  // const {mutate: toggleCompletion} = useMutation(() => {
  //   return addTrip(trip);
  // })

  const { mutate: deleteTripHandler } = useMutation(
    (deletedTrip) => removeTripRequest(deletedTrip),
    {
      onSettled: () => {
        queryClient.invalidateQueries("trips");
      },
    }
  );
  const { mutate: updateTripHandler } = useMutation(
    (updatedTrip, ratings) => updateTripRequest(updatedTrip, ratings),
    {
      onSettled: () => {
        queryClient.invalidateQueries("trips");
      },
    }
  );

  const [ratings, setRatings] = useState(0);

  useEffect(() => {
    updateTripHandler(trip, ratings);
  }, [ratings]);

  function rateTrip(newRatings) {
    setRatings(newRatings);
  }

  return (
    <div>
      <Trip
        key={trip["Trail_trip.trip_ID"]}
        id={trip["Trail_trip.trip_ID"]}
        name={trip["Trail.trail_name"]}
        startingTime={trip["Trail_trip.starting_time"]}
        endingTime={trip["Trail_trip.ending_time"]}
        rateTrip={rateTrip}
        finished={true}
      />
      <button onClick={() => deleteTripHandler(trip)}>Remove</button>
    </div>
  );
};

const TripList = () => {
  const {
    isLoading,
    data: { pastTrips, nextTrips },
  } = useQuery("trips", readTripsRequest);

  return (
    <div>
      {isLoading ? (
        <ClipLoader size={100} />
      ) : (
        <div>
          {nextTrips.map(buildNextTrip)}
          {pastTrips.map(buildPastTrip)}
        </div>
      )}
      {/* <AddTripForm /> */}
      {/* {2 > 0 ? <TripSchedule /> : null} */}
      {/* {2 > 0 && <TripSchedule />} */}
    </div>
  );
};

export default TripList;