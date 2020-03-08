import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import { TextField, Divider } from "@material-ui/core";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import classnames from "classnames";
import {
  signInGoogle,
  signupEmailPassword,
  getCurrentUser,
  isInvCodeValid,
  mergeCouple
} from "../../firebase";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import { useHistory } from "react-router-dom";
import querystring from "query-string";
import CircularProgress from "@material-ui/core/CircularProgress";

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
    padding: theme.spacing(3)
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
    display: "flex",
    alignItems: "center"
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
  googleBtn: {
    color: theme.palette.grey[600],
    border: "1px solid",
    borderColor: theme.palette.grey[300],
    borderBottom: "4px solid",
    borderBottomColor: theme.palette.grey[300]
  },
  labelbtn: {
    textTransform: "initial"
  },
  stepper: {
    [theme.breakpoints.only("xs")]: {
      paddingLeft: 0,
      paddingRight: 0
    }
  }
});

const useStyle = makeStyles(style);

function StepInvitation(props) {
  const { error, invCode } = props;
  console.log(invCode);
  const [invCodes, setInvCodes] = invCode;
  const err = error[0] === 0 && error[1];
  console.log("object", invCodes);

  return (
    <React.Fragment>
      <Typography variant="h6">Congratulations!🎉 </Typography>
      <Typography variant="body1">
        You must be very special to be invited in here. <br /> Enter the code
        now and let's get goin!
      </Typography>
      <Box mt={2} mb={2}>
        <TextField
          size="small"
          id="outlined-basic"
          label="Invitation code"
          helperText={err ? "Invalid code" : ""}
          error={err}
          variant="outlined"
          value={invCodes.value}
          onChange={e => {
            e.persist();
            setInvCodes(prevState => ({ ...prevState, value: e.target.value }));
          }}
        />
      </Box>
    </React.Fragment>
  );
}

const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="32px"
    height="32px"
  >
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    />
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    />
  </svg>
);

function StepPersonalDetails(error, detail) {
  const history = useHistory();
  const classes = useStyle();
  const [details, setDetails] = detail;

  const [googleDone, setGoogleDone] = useState(false);
  const err = error[0] === 1 && error[1];
  const [confirmPw, setConfirmPw] = useState("");
  const [match, setMatch] = useState(false);

  useEffect(() => {
    if (confirmPw !== "") {
      setMatch(details.password === confirmPw);
    } else setMatch(true);
  }, [confirmPw]);

  useEffect(() => {
    const qs = querystring.parse(history.location.search);
    if (
      qs.new !== undefined &&
      qs.ref !== undefined &&
      qs.id !== undefined &&
      qs.name !== undefined
    ) {
      setGoogleDone(true);
      setDetails({ googleId: qs.id, name: qs.name });
    }
  }, []);

  const handleResponseGoogle = res => {
    const { success, exist, authUser, coupleInfo, id } = res;
    localStorage.setItem("authUser", JSON.stringify(authUser));
    //if user has already exist => redirect to main with all the details
    //if user has not been coupled => merge to db then store to local
    if (success && exist) {
      localStorage.setItem("coupleInfo", JSON.stringify(coupleInfo));
      history.push(`/main?ref=signup&exist=true`);
    } else {
      setDetails({
        googleId: authUser.user.uid,
        email: authUser.user.email,
        name: authUser.user.displayName,
        photoURL: authUser.user.photoURL
      });
    }

    setGoogleDone(true);
  };
  return (
    <React.Fragment>
      <Typography variant="h6">Almost there! </Typography>
      <Typography variant="body1">
        Relax, we make this easy for you. Link us with your Google account
      </Typography>
      <Box mt={2} mb={2}>
        <Box mb={2}>
          <Button
            className={classes.googleBtn}
            startIcon={<GoogleIcon />}
            endIcon={googleDone ? <CheckCircleRoundedIcon /> : null}
            disabled={googleDone}
            classes={{ label: classes.labelbtn }}
            onClick={() => signInGoogle(handleResponseGoogle)}
          >
            Connect with Google
          </Button>
        </Box>
        <Divider />
        <Box mt={2} hidden={details.name === ""}>
          <Typography variant="h6">Welcome, {details.name}</Typography>
        </Box>
      </Box>
    </React.Fragment>
  );
}

function StepForewords({ email, name }) {
  return (
    <React.Fragment>
      <Typography variant="h6">What a sweet of you </Typography>
      <Typography variant="body1" gutterBottom>
        Say thanks to {name} for inviting you to share moments together. Enjoy!
      </Typography>
      <Typography color="textSecondary" variant="caption">
        info: You've been invited here by {email}
      </Typography>
    </React.Fragment>
  );
}

function getStepContent(step, error, invCode, details, withRef, invitor) {
  switch (step) {
    case 0:
      return <StepInvitation error={error} invCode={invCode} />;
    case 1:
      return withRef === "login" ? (
        <StepForewords invitor={invitor} />
      ) : (
        <StepPersonalDetails error={error} details={details} />
      );
    case 2:
      return <StepForewords invitor={invitor} />;
    default:
      return "Unknown step";
  }
}

const secretIVCODE = "1111";
export default function Signup(props) {
  const classes = useStyle();
  const [activeStep, setActiveStep] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [invCode, setInvCode] = useState({ value: "", valid: false });
  const [error, setError] = useState([0, false, ""]);
  const [ref, setRef] = useState("");
  const [details, setDetails] = useState({
    googleId: "",
    name: "",
    email: "",
    password: "",
    photoURL: "",
    coupleInfo: {}
  });
  const [invitor, setInvitor] = useState({});

  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    const qs = querystring.parse(props.history.location.search);
    if (
      qs.new !== undefined &&
      qs.ref !== undefined &&
      qs.id !== undefined &&
      qs.name !== undefined
    ) {
      setRef(qs.ref);
      setDetails({ googleId: qs.id, name: qs.name });
    }
    setDidMount(true);
  }, []);

  useEffect(() => {
    const code = invCode.value;
    if (didMount && code !== "") {
      setLoading(true);
      function doCheck() {
        return new Promise(function(resolve, reject) {
          if (code !== "") {
            isInvCodeValid(code, res => {
              console.log("signup isValid code", res);
              const { valid, onlyEmail, onlyName } = res;
              if (valid) {
                setInvitor({ name: onlyName, email: onlyEmail });
              }
              resolve(valid);
            });
          }
        });
      }

      async function doWork() {
        const valid = await doCheck();

        setInvCode(ps => ({ ...ps, valid }));
        setLoading(false);
      }

      doWork();
    }
  }, [invCode.value]);

  useEffect(() => {
    validate();
  }, [details]);

  function steps() {
    if (!ref === "login" || ref === "") {
      return ["Enter invitation code", "Worry not", "Welcome to the clubs!"];
    } else {
      return ["Enter invitation code", "Welcome to the clubs!"];
    }
  }

  const validate = () => {
    switch (activeStep) {
      case 0:
        //continue here: make this case return the valid value

        return true;
      //return invCode === secretIVCODE;
      case 1:
        return true;
      case 2:
        return true;
      default:
        break;
    }
  };

  const handleResSignup = res => {
    console.log(res);
  };

  const handleNext = () => {
    if (validate()) {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
      setError([activeStep, false]);

      if (activeStep === 0) {
        localStorage.setItem("id", invCode);
      } else if (activeStep === 1) {
        mergeCouple(
          { code: invCode.value, email: details.email, name: details.name },
          res => {
            if (res.success) {
              console.log("merged couple successfully");
            } else console.log("merging failed");
          }
        );
      } else if (activeStep === 2) {
        setTimeout(() => {
          props.history.push("/main?ref=initial");
        }, 3000);
      }
    } else setError([activeStep, true]);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box className={classes.wrapper}>
      <Paper className={classes.paper} variant="outlined" elevation={0}>
        <Typography variant="h5">Welcome to kotii 😺</Typography>
        <Typography variant="subtitle1">
          Lets start your history by signing up heree
        </Typography>

        <Stepper
          className={classes.stepper}
          activeStep={activeStep}
          orientation="vertical"
        >
          {steps().map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Box>
                  {getStepContent(
                    index,
                    error,
                    [invCode, setInvCode],
                    [details, setDetails],
                    ref,
                    invitor
                  )}
                </Box>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                      disabled={
                        (activeStep === 1 && details.googleId === "") ||
                        (activeStep === 0 && invCode.value === "") ||
                        !invCode.valid
                      }
                    >
                      {activeStep === steps().length - 1 ? "Finish" : "Next"}
                    </Button>
                  </div>
                  <CircularProgress
                    className={!loading ? classes.hide : ""}
                    size={25}
                  />
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps().length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>
              All steps completed - you&apos;re being redirected to login page..
            </Typography>
            <Button
              onClick={() => props.history.push("/main?ref=initial")}
              className={classes.button}
              variant="text"
            >
              Not being redirected? Click here
            </Button>
          </Paper>
        )}
      </Paper>
    </Box>
  );
}
