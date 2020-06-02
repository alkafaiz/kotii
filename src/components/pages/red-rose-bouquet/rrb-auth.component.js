import React from "react";
import {
  makeStyles,
  Box,
  Typography,
  TextField,
  Button
} from "@material-ui/core";

const useStyle = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    minHeight: 700
  },
  content: {
    maxWidth: "80%"
  },
  label: {
    textTransform: "none"
  }
}));

export default function RedRoseAuthComponent({
  handleSubmit,
  handleChange,
  passcode,
  error
}) {
  const classes = useStyle();

  return (
    <Box className={classes.root}>
      <Box className={classes.content}>
        <Typography variant="h6" gutterBottom>
          Hey, selamat datang di kotii. Passcode nya tanggal jadian kitaa.
          Berapa hayoo?
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            type="password"
            size="small"
            label="Passcode"
            margin="normal"
            placeholder="eg: 011219"
            error={error.value}
            helperText={error.value ? error.msg : "format date: ddMMyy"}
            fullWidth
            required
            value={passcode}
            onChange={handleChange}
          />
          <Button
            classes={{ label: classes.label }}
            variant="contained"
            color="primary"
            type="submit"
            disableElevation
            fullWidth
          >
            Jom masuk
          </Button>
        </form>
      </Box>
    </Box>
  );
}
