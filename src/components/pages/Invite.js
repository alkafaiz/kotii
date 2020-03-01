import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Paper,
  Typography,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput
} from "@material-ui/core";
import FileCopyIcon from "@material-ui/icons/FileCopy";

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
  }
});

const useStyle = makeStyles(style);

export default function Invite() {
  const classes = useStyle();

  return (
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
              value="1111"
              readOnly
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {}}
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
              value="www.kotii.io/invite?ref=unite&code=1111"
              readOnly
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {}}
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
  );
}
