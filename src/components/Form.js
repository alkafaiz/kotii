import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import {
  Box,
  Typography,
  TextField,
  Button,
  Collapse,
  Paper,
  IconButton
} from "@material-ui/core";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { createMoment, uploadImg, getImagesByMoment } from "../firebase";
import ImageRoundedIcon from "@material-ui/icons/ImageRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { getDate } from "../assets/js/utils";
import CircularProgress from "@material-ui/core/CircularProgress";
import { encrypt } from "../assets/js/encryption";

const style = theme => ({
  wrapper: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    border: "1px solid black",
    borderRadius: 6,
    padding: theme.spacing(5),
    marginBottom: theme.spacing(9),
    [theme.breakpoints.only("xs")]: {
      margin: 0,
      marginBottom: theme.spacing(7),
      padding: theme.spacing(1)
    }
  },
  input: {
    fontSize: 21,
    [theme.breakpoints.only("xs")]: {
      fontSize: "1em"
    }
  },
  label: {
    fontSize: 21,
    paddingRight: 10,
    backgroundColor: "white",
    [theme.breakpoints.only("xs")]: {
      fontSize: "1em"
    }
  },
  button: {
    backgroundColor: "black",
    color: "white",
    borderRadius: 50,
    fontFamily: "Montserrat",
    [theme.breakpoints.only("xs")]: {
      fontSize: ".7em",
      "&:not(last-child)": {
        marginBottom: theme.spacing(1)
      }
    }
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.only("xs")]: {
      justifyContent: "center",
      flexFlow: "column wrap",
      alignItems: "flex-start"
    }
  },
  imageContainer: {
    // height: 150,
    width: "100%",
    backgroundColor: theme.palette.grey[100],
    display: "flex",
    alignItems: "center",
    flexFlow: "row wrap",
    marginBottom: theme.spacing(3),
    [theme.breakpoints.only("xs")]: {
      backgroundColor: theme.palette.common.white
    }
  },
  imageItem: {
    height: 130,
    width: 130,
    backgroundColor: theme.palette.grey[300],
    marginLeft: 10,
    marginTop: 10,
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
      marginLeft: 0
    }
  },
  imageClose: {
    position: "absolute",
    top: 0,
    right: 0,
    transition: "all ease-in-out .3s",
    color: theme.palette.grey[700],
    "&:hover": {
      color: theme.palette.grey[500]
    }
  },
  imageUpload: {},
  inputImage: {
    display: "none"
  },
  responsiveH4: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "1em"
    }
  },
  responsiveH5: {
    [theme.breakpoints.only("xs")]: {
      fontSize: "1em"
    }
  }
});

const useStyle = makeStyles(style);

export default function Form(props) {
  const classes = useStyle();
  const inputImgRef = useRef();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [err, setErr] = useState(false);
  const { id, email } = props;
  const [uploadImages, setUploadImages] = useState([]);
  const [blobImgs, setBlobImgs] = useState([]);
  const [loading, setLoading] = useState(false);

  function clearForm() {
    setTitle("");
    setBody("");
    setBlobImgs([]);
    setUploadImages([]);
  }

  useEffect(() => {
    if (title !== "" && body !== "") {
      setErr(false);
    } else setErr(true);
  }, [title, body]);

  const handleAdd = () => {
    setLoading(true);
    const obj = {
      id,
      data: {
        date: getDate(),
        title,
        body: encrypt(body),
        author: email
      },
      images: blobImgs
    };

    function handleRes(res) {
      const { success, error } = res;
      if (success) {
        clearForm();
        setLoading(false);
      } else {
        console.log("error occured during moment creation", error);
      }
    }
    createMoment(obj, handleRes);
  };

  const handleImgChange = e => {
    //edit here to handle multiple selection images
    const file = inputImgRef.current.files[0];
    const fr = new FileReader();
    if (file) {
      const rawFile = e.target.files[0];
      const image = URL.createObjectURL(rawFile);
      setUploadImages(ps => [...ps, image]);
      setBlobImgs(ps => [...ps, rawFile]);
    }
  };

  const ImageItemUpload = props => {
    const { img, raw } = props;
    function removeImg() {
      setUploadImages(prev => prev.filter(data => data !== img));
      setBlobImgs(prev => prev.filter(data => data !== raw));
    }
    return (
      <Box className={classes.imageItem}>
        <IconButton
          className={classes.imageClose}
          size="small"
          onClick={removeImg}
        >
          <CancelRoundedIcon />
        </IconButton>
        <img className={classes.imageUpload} src={img} alt="" />
      </Box>
    );
  };

  return (
    <Box className={classes.wrapper}>
      <Typography variant="h4" className={classes.responsiveH4}>
        Hey! 👋 Neither you nor your partner have created moment today,
      </Typography>
      <Box mt={2}>
        <Typography variant="h5" className={classes.responsiveH5}>
          Let's create one before you forgeet! 😄
        </Typography>
      </Box>
      <Box mt={3}>
        <TextField
          InputProps={{
            classes: {
              input: classes.input
            }
          }}
          InputLabelProps={{ classes: { root: classes.label } }}
          variant="outlined"
          label="Title"
          fullWidth
          disabled={loading}
          value={title}
          onChange={e => setTitle(e.currentTarget.value)}
        />
      </Box>
      <Box mt={{ xs: 2, sm: 3 }} mb={2}>
        <TextField
          InputProps={{
            classes: {
              input: classes.input
            }
          }}
          InputLabelProps={{ classes: { root: classes.label } }}
          id="outlined-multiline-static"
          label="Body"
          multiline
          rows="6"
          variant="outlined"
          fullWidth
          disabled={loading}
          value={body}
          onChange={e => setBody(e.currentTarget.value)}
        />
      </Box>

      <Collapse in={uploadImages.length !== 0}>
        <Box className={classes.imageContainer}>
          {uploadImages.length !== 0
            ? uploadImages.map((data, index) => {
                return (
                  <ImageItemUpload
                    key={index}
                    img={data}
                    raw={blobImgs[index]}
                  />
                );
              })
            : ""}
        </Box>
      </Collapse>
      <Box className={classes.buttonContainer}>
        <input
          accept="image/*"
          className={classes.inputImage}
          id="contained-button-file"
          multiple
          type="file"
          ref={inputImgRef}
          onChange={handleImgChange}
        />
        <label htmlFor="contained-button-file">
          <Button
            component="span"
            className={classes.button}
            variant="contained"
            disableElevation
            disabled={loading}
            startIcon={<ImageRoundedIcon />}
          >
            Add Image
          </Button>
        </label>

        <Button
          className={classes.button}
          variant="contained"
          disableElevation
          disabled={err || loading}
          startIcon={<PostAddIcon />}
          onClick={e => {
            e.preventDefault();
            handleAdd();
          }}
        >
          {loading ? <CircularProgress size={15} /> : "Post Moment"}
        </Button>
      </Box>
    </Box>
  );
}
