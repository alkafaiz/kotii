import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import { Box, Typography, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import Skeleton from "@material-ui/lab/Skeleton";

import { getImagesByMoment } from "../firebase";

const style = theme => ({
  wrapper: {
    display: "grid",
    gridTemplateColumns: "100px 1fr",
    [theme.breakpoints.only("xs")]: {
      gridTemplateColumns: "20px 1fr"
    }
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
    border: "2px solid black",
    [theme.breakpoints.only("xs")]: {
      width: 15,
      height: 15
    }
  },
  line: {
    width: 3,
    height: "100%",
    backgroundColor: theme.palette.common.black
  },
  content: {
    display: "flex",
    flexFlow: "column wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingBottom: theme.spacing(15),
    paddingLeft: theme.spacing(2),
    [theme.breakpoints.only("xs")]: {
      paddingBottom: theme.spacing(5),
      paddingLeft: theme.spacing(1)
    }
  },
  momentHeader: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "flex-start",
    minHeight: 49
  },
  momentInfo: {
    fontFamily: "Montserrat",
    marginBottom: 3,
    [theme.breakpoints.only("xs")]: { fontSize: ".7em" }
  },
  moment: { marginTop: theme.spacing(3) },
  title: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.only("xs")]: { fontSize: "1em" }
  },
  body: {
    fontSize: 21,
    lineHeight: 1.7,
    [theme.breakpoints.only("xs")]: { fontSize: ".8em" }
  },
  bold: {
    fontWeight: 600
  },
  ImagesContainer: {
    width: "100%",
    display: "flex",
    flexFlow: "row wrap",
    [theme.breakpoints.only("xs")]: {
      flexFlow: "column wrap"
    }
  },
  imgWrapper: {
    height: 450,
    width: 450,
    backgroundColor: theme.palette.grey[300],
    marginRight: 10,
    marginBottom: 10,
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    "& img": {
      minHeight: "100%",
      maxWidth: "100%",
      flexShrink: 0,
      objectFit: "cover"
    },
    [theme.breakpoints.only("xs")]: {
      height: "auto",
      width: "100%",
      marginRight: 0
    }
  }
});

const useStyle = makeStyles(style);

export default function Moment(props) {
  const classes = useStyle();
  const { couple, cUserEmail, data } = props;
  const refWrapper = useRef(null);
  const refRing = useRef(null);
  const [lineHeight, setLineHeight] = useState(0);
  const [hover, setHover] = useState(false);
  const { loading } = props;
  const [images, setImages] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [details, setDetails] = useState({
    id: "",
    title: "",
    body: "",
    date: "",
    author: ""
  });

  //create fx to load img
  function loadImg() {
    //process response
    function handleRes(res) {
      console.log(res);
      setImages(prev => [...prev, res]);
    }

    const params = {
      coupleId: localStorage.getItem("id"),
      momentId: props.id
    };

    getImagesByMoment(params, handleRes);
  }

  useEffect(() => {
    if (!loading) {
      setDetails(props.data);
      loadImg();
    }
  }, []);

  // useEffect(() => {
  //   refWrapper.current.addEventListener("clientHeight", console.log("resize"));
  //   const wrapperHeight = refWrapper.current.clientHeight;
  //   const ringHeight = refRing.current.clientHeight;
  //   const height = wrapperHeight - ringHeight - 1;

  //   setLineHeight(height);
  // }, [details, images]);

  useEffect(() => {
    const width = window.innerWidth;
    if (width < 600) {
      setIsMobile(true);
    } else setIsMobile(false);
  }, [window.innerWidth]);

  const getAuthor = () => {
    const authorEmail = details.author;
    let name = "";
    if (authorEmail === cUserEmail) {
      name += "Me";
    } else {
      const partner = couple.find(value => value.email !== cUserEmail);
      const partnerName = partner.name;
      name += partnerName;
    }

    return name;
  };

  return (
    <Box
      className={classes.wrapper}
      ref={refWrapper}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Box className={classes.timeliner}>
        <Box className={classes.ring} ref={refRing}></Box>
        <Box className={classes.line}></Box>
      </Box>
      <Box className={classes.content}>
        <Box className={classes.momentHeader}>
          <Box mr={1}>
            {!loading ? (
              <React.Fragment>
                <Typography
                  className={classes.momentInfo}
                  variant="body2"
                  children={details.date}
                />
                <Typography
                  className={classnames(classes.momentInfo, classes.bold)}
                  variant="body2"
                >
                  Moment by {getAuthor()}
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Skeleton width={200} height={23} />
                <Skeleton width={200} height={23} />
              </React.Fragment>
            )}
          </Box>
          <Box hidden={!hover} hidden>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Box>
        </Box>
        <Box className={classes.moment}>
          {!loading ? (
            <React.Fragment>
              <Typography
                variant="h4"
                className={classnames(classes.title, classes.bold)}
                children={details.title}
              />
              <Box my={2} className={classes.ImagesContainer}>
                {images.length !== 0
                  ? images.map((url, index) => (
                      <Box key={index} className={classes.imgWrapper}>
                        <img key={url} src={url} alt="" />
                      </Box>
                    ))
                  : null}
              </Box>
              <Typography
                variant="body1"
                className={classes.body}
                children={details.body}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Skeleton width={isMobile ? 150 : 350} height={45} />
              <Box mt={3}>
                <Skeleton width={isMobile ? 100 : 700} height={40} />
                <Skeleton width={isMobile ? 100 : 700} height={40} />

                <Skeleton width={isMobile ? 50 : 200} height={40} />
              </Box>
            </React.Fragment>
          )}
        </Box>
      </Box>
    </Box>
  );
}
