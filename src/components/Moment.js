import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import { Box, Typography, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

const style = theme => ({
  wrapper: {
    display: "grid",
    gridTemplateColumns: "100px 1fr"
  },
  timeliner: {
    display: "flex",
    flexFlow: "column nowrap",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  ring: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: "2px solid black"
  },
  line: {
    width: 3,

    backgroundColor: theme.palette.common.black
  },
  content: {
    display: "flex",
    flexFlow: "column wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingBottom: theme.spacing(15),
    paddingLeft: theme.spacing(2)
  },
  momentHeader: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "flex-start",
    minHeight: 49
  },
  momentInfo: { fontFamily: "Montserrat", marginBottom: 3 },
  moment: { marginTop: theme.spacing(3) },
  title: { marginBottom: theme.spacing(2) },
  body: {
    fontSize: 21,
    lineHeight: 1.7
  },
  bold: {
    fontWeight: 600
  }
});

const useStyle = makeStyles(style);

export default function Moment(props) {
  const classes = useStyle();
  const refWrapper = useRef(null);
  const [lineHeight, setLineHeight] = useState(0);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    const wrapperHeight = refWrapper.current.clientHeight;
    const height = wrapperHeight - 43;
    setLineHeight(height);
    console.log(refWrapper.current.clientHeight);
  }, []);
  return (
    <Box
      className={classes.wrapper}
      ref={refWrapper}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Box className={classes.timeliner}>
        <Box className={classes.ring}></Box>
        <Box className={classes.line} style={{ height: lineHeight }}></Box>
      </Box>
      <Box className={classes.content}>
        <Box className={classes.momentHeader}>
          <Box mr={1}>
            <Typography className={classes.momentInfo} variant="body2">
              20 February 2020
            </Typography>
            <Typography
              className={classnames(classes.momentInfo, classes.bold)}
              variant="body2"
            >
              Moment by Me
            </Typography>
          </Box>
          <Box hidden={!hover}>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Box>
        </Box>
        <Box className={classes.moment}>
          <Typography
            variant="h4"
            className={classnames(classes.title, classes.bold)}
          >
            Ndud suka makan jagung pake mentega bikin Ndud
          </Typography>
          <Typography variant="body1" className={classes.body}>
            {props.desc}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
