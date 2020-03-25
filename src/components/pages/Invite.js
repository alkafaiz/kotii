import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Paper,
  Typography,
  FormControl,
  Slide,
  InputAdornment,
  IconButton,
  OutlinedInput,
  Snackbar
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import CheckRoundedIcon from "@material-ui/icons/CheckCircleRounded";

const style = theme => ({
  wrapper: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  paper: {
    width: 600,
    padding: theme.spacing(6)
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  },
  resetContainer: {
    padding: theme.spacing(3)
  },
  hide: {
    display: "none"
  },
  gridField: {
    display: "grid",
    gridTemplateRows: "1fr 1fr",
    gridTemplateColumns: "1fr 1fr",
    gridRowGap: 13,
    gridColumnGap: 10
  },

  labelbtn: {
    textTransform: "initial"
  },
  invCodeContainer: {
    display: "flex",
    justifyContent: "center",
    flexFlow: "column nowrap"
  },
  mt2: {
    marginTop: theme.spacing(2)
  },
  Snackbar: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    color: theme.palette.common.white,
    backgroundColor: theme.palette.success.main,
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 6,
    fontWeight: "bold",
    minWidth: 350
  }
});

const useStyle = makeStyles(style);

function SlideTransition(props) {
  return <Slide {...props} direction="right" />;
}

export default function Invite() {
  const [open, setOpen] = useState(false);
  const classes = useStyle();

  const handleCopyClipboard = type => {
    var textArea = document.createElement("textarea");

    switch (type) {
      case "id":
        textArea.value = localStorage.getItem("id");
        break;
      case "url":
        textArea.value = `kotii.alkafaiz.com/signup?invitationCode=${localStorage.getItem(
          "id"
        )}`;
        break;
      default:
        break;
    }

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      var successful = document.execCommand("copy");
      var msg = successful ? "successful" : "unsuccessful";
      console.log("Fallback: Copying text command was " + msg);
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err);
    }

    document.body.removeChild(textArea);

    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  return (
    <React.Fragment>
      <Box className={classes.wrapper}>
        <Paper className={classes.paper} variant="outlined" elevation={0}>
          <Typography variant="h4" gutterBottom>
            Great! You're ready to share moments together 👫
          </Typography>
          <Box className={classes.invCodeContainer} mt={2} mb={1}>
            <Typography gutterBottom variant="caption">
              Paste this invitation code at registration form to validate
            </Typography>
            <FormControl>
              <OutlinedInput
                id="standard-adornment-password"
                type="text"
                value={localStorage.getItem("id")}
                readOnly
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => handleCopyClipboard("id")}
                      onMouseDown={e => e.preventDefault()}
                    >
                      <FileCopyIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <Typography className={classes.mt2} gutterBottom variant="caption">
              Or share this special invitation Url to her/him
            </Typography>
            <FormControl>
              <OutlinedInput
                id="standard-adornment-password"
                type="text"
                value={`kotii.alkafaiz.com/signup?invitationCode=${localStorage.getItem(
                  "id"
                )}`}
                readOnly
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => handleCopyClipboard("url")}
                      onMouseDown={e => e.preventDefault()}
                    >
                      <FileCopyIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
        </Paper>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        TransitionComponent={SlideTransition}
      >
        <Box className={classes.Snackbar} color="white">
          <CheckRoundedIcon fontSize="small" />
          <Typography variant="body2">&ensp; Copied to clipboard</Typography>
        </Box>
      </Snackbar>
    </React.Fragment>
  );
}
