import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import { Box, Typography, TextField, Button } from "@material-ui/core";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { createMoment } from "../firebase";

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

export default function Form() {
  const classes = useStyle();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [err, setErr] = useState(false);

  function clearForm() {
    setTitle("");
    setBody("");
  }

  useEffect(() => {
    if (title !== "" && body !== "") {
      setErr(false);
    } else setErr(true);
  }, [title, body]);

  const handleAdd = () => {
    const obj = {
      id: "1111",
      data: {
        date: getDate(),
        title,
        body,
        author: "1"
      }
    };
    createMoment(obj);
    clearForm();
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
      <Box mt={3} mb={4}>
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
        Add
      </Button>
    </Box>
  );
}
