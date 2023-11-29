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

export default styles;