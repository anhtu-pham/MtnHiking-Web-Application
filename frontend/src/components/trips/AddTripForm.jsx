import React, { useState } from "react";
import { useQueryClient, useMutation } from "react-query";
import addTripRequest from "../../api/tripRequests/addTripRequest";

const AddTripForm = (props) => {
  const queryClient = useQueryClient();
  const { mutate: addTripHandler } = useMutation(
    (addedTrip) => addTripRequest(addedTrip),
    {
      onSettled: () => {
        queryClient.invalidateQueries("trips");
      },
    }
  );

  const [trip, setTrip] = useState({trailID: props.trailID, startingTime: "", endingTime: ""});

  function addTrip(e) {
    e.preventDefault();
    addTripHandler(trip);
    setTrip({...trip, startingTime: "", endingTime: ""});
  }

  return (
    <form onSubmit={addTrip}>
      <input
        type="text"
        name="startingTime"
        placeholder=""
        value={trip.startingTime}
        onChange={(e) => setTrip({...trip, startingTime: e.target.value})}
      />
      <input
        type="text"
        name="endingTime"
        placeholder=""
        value={trip.endingTime}
        onChange={(e) => setTrip({...trip, endingTime: e.target.value})}
      />
      <button>Add</button>
    </form>
  );
};

export default AddTripForm;
