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
import { createMoment, uploadImg } from "../firebase";
import ImageRoundedIcon from "@material-ui/icons/ImageRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";

const style = theme => ({
  wrapper: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    border: "1px solid black",
    borderRadius: 6,
    padding: theme.spacing(5),
    marginBottom: theme.spacing(9)
  },
  input: {
    fontSize: 21
  },
  label: {
    fontSize: 21,
    paddingRight: 10,
    backgroundColor: "white"
  },
  button: {
    backgroundColor: "black",
    color: "white",
    borderRadius: 50,
    fontFamily: "Montserrat"
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between"
  },
  imageContainer: {
    // height: 150,
    width: "100%",
    backgroundColor: theme.palette.grey[100],
    display: "flex",
    alignItems: "center",
    flexFlow: "row wrap",
    marginBottom: theme.spacing(3)
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
  }
});

const useStyle = makeStyles(style);

function getDate() {
  const currentDate = new Date();
  const MonthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const date = currentDate.getDate();
  const month = currentDate.getMonth(); //Be careful! January is 0 not 1
  const year = currentDate.getFullYear();
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();
  const second = currentDate.getSeconds();

  const dateString = `${date} ${MonthName[month]} ${year}`;
  return dateString;
}

export default function Form(props) {
  const classes = useStyle();
  const inputImgRef = useRef();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [err, setErr] = useState(false);
  const { id, email } = props;
  const [uploadImages, setUploadImages] = useState([]);
  const [blobImgs, setBlobImgs] = useState([]);

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
    const obj = {
      id,
      data: {
        date: getDate(),
        title,
        body,
        author: email
      },
      images: blobImgs
    };
    createMoment(obj);

    clearForm();
  };

  const handleImgChange = e => {
    const file = inputImgRef.current.files[0];
    const fr = new FileReader();
    if (file) {
      const rawFile = e.target.files[0];
      const image = URL.createObjectURL(rawFile);
      console.log("imput image ref", e.target.files[0]);
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
      <Typography variant="h4">
        Hey! 👋 Neither you nor your partner have created moment today,
      </Typography>
      <Box mt={2}>
        <Typography variant="h5">
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
          value={title}
          onChange={e => setTitle(e.currentTarget.value)}
        />
      </Box>
      <Box mt={3} mb={2}>
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
          value={body}
          onChange={e => setBody(e.currentTarget.value)}
        />
      </Box>
      {console.log(uploadImages)}
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
            startIcon={<ImageRoundedIcon />}
          >
            Add Image
          </Button>
        </label>

        <Button
          className={classes.button}
          variant="contained"
          disableElevation
          disabled={err}
          startIcon={<PostAddIcon />}
          onClick={e => {
            e.preventDefault();
            handleAdd();
          }}
        >
          Post Moment
        </Button>
      </Box>
    </Box>
  );
}
