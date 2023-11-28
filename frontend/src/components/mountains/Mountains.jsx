import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import axios from 'axios';
// import { useLocation } from "react-router-dom";
import { API_URL } from '../../config';
import video from "../../assets/videos/mountain_3.mp4";


const Mountain = (props) => {

  return (
    <Card variant="outlined" sx={{maxWidth: 200, margin: 5}}>
      <CardContent>
        <Typography variant="h6" component="div">
          {props.name}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Elevation: {props.elevation}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Difficulty: {props.difficulty}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              Summit rating: {props.summitRating}/5
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const MountainsDisplay = (props) => {
  if (props.mountains) {
    return (
      props.mountains.map((mtn, index) => (
        <Grid item key={mtn.mountain_ID}>
          <Mountain
            id={mtn.mountain_ID}
            name={mtn.mountain_name}
            elevation={mtn.elevation}
            difficulty={mtn.difficulty}
            summitRating={mtn.summit_rating}
          />
        </Grid>
      ))
    );
  } else {
    console.log("No mountains available");
    return (<h1>No mountains available</h1>);
  }
}

const Mountains = () => {
  const [mountains, setMountains] = useState([]);

  const getMountains = () => {
    console.log("GET MOUNTAINS ENTERED");
    axios.get(API_URL + "/mountains")
      .then((response) => {
        setMountains(response.data.mountains);
      })
      .catch((error) => {
        console.log("Cannot receive mountains "+ error);
      });
  }

  useEffect(() => {
    console.log("useEffect triggered");
    getMountains();
  }, []);

  return (
      <>
      <Vid />
      <Grid container spacing={2} justifyContent="center">
        <MountainsDisplay mountains={mountains} />
      </Grid>
      </>
  );
};

const Vid = () => (
  <div className="video-background-holder" style={styles.videoHolder}>
    <div className="video-background-overlay" style={styles.videoOverlay}></div>
    <video
      playsInline="playsinline"
      autoPlay="autoplay"
      muted="muted"
      loop="loop"
      style={styles.video}
    >
      <source src={video} type="video/mp4" />
    </video>
    <div className="video-background-content container h-100" style={styles.videoContent}>
      {/* <div className="w-100 text-white">
        <h1 className="display-4">Hello</h1>
        <p className="lead mb-0">HAVE GREAT EXPERIENCE</p>
      </div> */}
    </div>
  </div>
);

const styles = {
  videoHolder: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: "-1"
  },
  video: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "100%",
    minHeight: "100%",
    width: "auto",
    height: "auto",
    zIndex: 0
  },
  videoContent: {
    position: "relative",
    zIndex: 2
  },
  videoOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "black",
    opacity: 0.5,
    zIndex: 1,
  }
}

export default Mountains;