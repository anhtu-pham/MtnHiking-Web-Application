import React, { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { Card, CardMedia, CardContent, CardActions, Grid, Button } from "@mui/material";
import axios from 'axios';
import styles from "../styles/VideoStyles";
import { API_URL } from '../../config';
import video from "../../assets/videos/mountain_3.mp4";
import MountainImage from "../../assets/images/mountain_1.jpg";
import { useNavigate } from "react-router-dom";


const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: "100%",
  [theme.breakpoints.down('sm')]: {
    width: '100% !important',
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));


const Mountain = (props) => {
  const {name, elevation, difficulty, summitRating} = props;

  const navigate = useNavigate();

  const handleOnClick = () => {
    const encodedName = encodeURIComponent(name)
    navigate("/mountains/" + encodedName);
  }

  const ClickableImage = () => (
    <ImageButton onClick={handleOnClick} focusRipple key={name} style={{width: "100%"}}>
      <ImageSrc style={{backgroundImage: `url(${MountainImage})`}} />
      <ImageBackdrop className="MuiImageBackdrop-root" />
      <Image>
        <Typography component="span" variant="subtitle1" color="inherit" sx={{position: 'relative', p: 4, pt: 2, pb: (theme) => `calc(${theme.spacing(1)} + 6px)`}}>
          {name} - {elevation}m
          <br/>
          Summit Rating {summitRating}/5
          <ImageMarked className="MuiImageMarked-root" />
        </Typography>
      </Image>
    </ImageButton>
  );

  return (
    <Card sx={{margin: 0, height: "50vh"}}>
      <CardMedia 
        component={ClickableImage}
        image={MountainImage}
        alt={name}
      />
      {/* <CardContent> */}

        {/* <Grid container>
          <Grid item xs={12} sm={6}>
            <Typography variant="body4" color="text.secondary">
              Elevation: {elevation}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body4" color="text.secondary">
              Difficulty: {difficulty}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body4" color="text.secondary">
              Summit Rating: {summitRating}/5
            </Typography>
          </Grid>
        </Grid>
      </CardContent> */}
      {/* <CardActions>
        <Button size="small" onClick={handleOnClick}>FIND TRAIL</Button>
      </CardActions> */}
    </Card>
  );
};

const MountainsDisplay = (props) => {
  if (props.mountains) {
    return (
      props.mountains.map((mtn, index) => (
        <Grid item key={mtn.mountain_ID} xs={6}>
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
      <div style={{height: "100vh"}}>
      {/* <BackgroundVideo /> */}
      <Grid container spacing={0} justifyContent="center">
        <MountainsDisplay mountains={mountains} />
      </Grid>
      </div>
  );
};

const BackgroundVideo = () => (
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

export default Mountains;