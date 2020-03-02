import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Typography,
  IconButton,
  Container,
  Link
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Moment from "../Moment";
import MomentCreator from "../Form";
import * as firebase from "../../firebase";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import TimelineIcon from "@material-ui/icons/Timeline";

const style = theme => ({
  logo: {
    fontFamily: "Palanquin Dark"
  },
  appbarWrapper: {
    borderBottom: "1px solid",
    minHeight: 88,
    borderBottomColor: theme.palette.divider
  },
  appbar: {
    display: "flex",
    justifyContent: "space-between",
    // paddingTop: theme.spacing(3),
    // paddingBottom: theme.spacing(3),
    // paddingLeft: theme.spacing(6),
    // paddingRight: theme.spacing(6),
    alignItems: "center"
  },
  btnDashboard: {
    color: theme.palette.common.black
  },
  momentWrapper: {
    paddingTop: theme.spacing(7)
  },
  textCenter: {
    textAlign: "center"
  }
});

const useStyle = makeStyles(style);

export default function Main(props) {
  const classes = useStyle();
  const { cUser } = props;

  const moments = firebase.useMoments("1112");

  const [loading, setLoading] = useState(true);
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
    setLoading(false);
    console.log(props);
  }, []);

  useEffect(() => {
    if (didMount) {
      if (moments.length !== 0) {
      }
    }
  }, [moments]);

  const GenerateMoments = () => {
    return moments !== undefined
      ? moments.map((data, index) => {
          console.log(data.id, index);
          return <Moment key={data.id} data={data} />;
        })
      : "";
  };

  return (
    <React.Fragment>
      <Box className={classes.appbarWrapper}>
        <Container className={classes.appbar}>
          <Typography className={classes.logo} variant="h4">
            :kotii{" "}
            {loading
              ? "is loading"
              : `🖤 ${cUser.additionalUserInfo.profile.given_name}`}
          </Typography>

          <svg
            width="87"
            height="87"
            viewBox="0 0 87 87"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0)">
              <path
                d="M81.8972 41.9321C83.3319 37.9905 84.4721 32.178 81.7569 26.871C80.7251 24.8546 80.1873 22.4902 80.2016 20.0332C80.2393 13.6576 80.3363 7.01675 80.4114 2.56856C80.4291 1.52889 79.8205 0.598134 78.8612 0.197284C77.9004 -0.203766 76.8092 0.0174962 76.081 0.762218L66.0894 10.9757C64.0553 10.4607 58.1581 9.40353 51.0798 12.0621C48.2599 9.32582 42.978 4.68092 39.9508 2.04369C39.1765 1.36903 38.1207 1.22729 37.1964 1.67364C36.2846 2.11355 35.7249 3.05135 35.7704 4.06283L36.4855 19.9744C36.6494 23.6217 36.3776 27.2408 35.6778 30.7311C34.9151 34.5328 34.109 40.0938 34.4098 45.6374C31.6532 45.8713 25.5599 46.9738 19.373 51.9839C11.1758 58.6226 5.87179 69.4387 3.60883 84.1322C3.50736 84.7914 3.95955 85.4084 4.61891 85.5099C5.27947 85.6112 5.89514 85.1594 5.99681 84.4998C8.16555 70.4186 13.1777 60.1103 20.8937 53.8616C27.7911 48.2756 34.4382 47.9928 35.7007 47.9928C36.039 47.9928 36.3619 47.8508 36.5906 47.6018C36.8195 47.3525 36.9333 47.0187 36.9043 46.6817C36.4187 41.0181 37.2574 35.14 38.0466 31.2062C38.7851 27.5243 39.072 23.7089 38.8993 19.8661L38.1841 3.95452C38.1827 3.92532 38.1807 3.88143 38.2464 3.84962C38.3098 3.81902 38.3412 3.8456 38.3637 3.86553C41.584 6.67067 47.3694 11.7599 49.9366 14.3269C50.2807 14.6709 50.7973 14.775 51.2475 14.591C59.3243 11.2928 65.9976 13.4561 66.0616 13.4777C66.5013 13.627 66.9885 13.5111 67.3139 13.1787L77.8078 2.45178C77.8298 2.42903 77.8602 2.39783 77.9294 2.42662C77.9967 2.4548 77.9961 2.49527 77.9955 2.52789C77.9204 6.98233 77.8229 13.6327 77.7853 20.0193C77.7688 22.8621 78.3981 25.6121 79.6055 27.9718C81.9246 32.504 80.897 37.6156 79.6264 41.1061C78.4376 44.3732 78.2538 47.9136 79.0949 51.3445C80.8318 58.4269 82.621 72.2408 75.0866 85.1844C74.751 85.761 74.9465 86.5005 75.5229 86.8361C75.7142 86.9474 75.9232 87.0002 76.1295 87.0002C76.5455 87.0002 76.9503 86.7852 77.1746 86.3998C85.136 72.7224 83.2651 58.2053 81.4412 50.7691C80.7148 47.8041 80.8723 44.7483 81.8972 41.9321Z"
                fill="black"
              />
              <path
                d="M55.1472 30.0965C55.1472 30.7635 55.6882 31.3045 56.3552 31.3045C57.0222 31.3045 57.5632 30.7635 57.5632 30.0965C57.5632 27.3765 55.3506 25.1639 52.6306 25.1639C49.9106 25.1639 47.698 27.3765 47.698 30.0965C47.698 30.7635 48.239 31.3045 48.906 31.3045C49.573 31.3045 50.114 30.7635 50.114 30.0965C50.114 28.7087 51.2428 27.5799 52.6306 27.5799C54.0182 27.5799 55.1472 28.7087 55.1472 30.0965Z"
                fill="black"
              />
              <path
                d="M69.5429 25.1639C66.823 25.1639 64.6104 27.3765 64.6104 30.0965C64.6104 30.7635 65.1513 31.3045 65.8183 31.3045C66.4853 31.3045 67.0263 30.7635 67.0263 30.0965C67.0263 28.7087 68.1552 27.5799 69.5429 27.5799C70.9307 27.5799 72.0596 28.7087 72.0596 30.0965C72.0596 30.7635 72.6006 31.3045 73.2676 31.3045C73.9346 31.3045 74.4755 30.7635 74.4755 30.0965C74.4755 27.3765 72.2629 25.1639 69.5429 25.1639Z"
                fill="black"
              />
              <path
                d="M71.454 36.7462C70.787 36.7462 70.246 37.2872 70.246 37.9542C70.246 39.8669 68.6899 41.423 66.7773 41.423C64.8647 41.423 63.3086 39.8669 63.3086 37.9542C63.3086 37.2872 62.7676 36.7462 62.1006 36.7462C61.4336 36.7462 60.8926 37.2872 60.8926 37.9542C60.8926 39.8669 59.3365 41.423 57.4239 41.423C55.5112 41.423 53.9552 39.8669 53.9552 37.9542C53.9552 37.2872 53.4142 36.7462 52.7472 36.7462C52.0802 36.7462 51.5392 37.2872 51.5392 37.9542C51.5392 41.1989 54.179 43.8389 57.4239 43.8389C59.3283 43.8389 61.0243 42.9295 62.1006 41.5224C63.1769 42.9295 64.8731 43.8389 66.7773 43.8389C70.0219 43.8389 72.662 41.1991 72.662 37.9542C72.662 37.2872 72.121 36.7462 71.454 36.7462Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="87" height="87" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <Box>
            <IconButton
              className={classes.btnDashboard}
              onClick={() =>
                firebase.signOut(res => {
                  localStorage.removeItem("authUser");
                  localStorage.removeItem("id");
                  localStorage.removeItem("coupleInfo");
                  props.history.push("/login");
                })
              }
            >
              <TimelineIcon />
            </IconButton>
            <IconButton
              className={classes.btnDashboard}
              onClick={() =>
                firebase.signOut(res => {
                  localStorage.removeItem("authUser");
                  props.history.push("/login");
                })
              }
            >
              <ExitToAppIcon />
            </IconButton>
          </Box>
        </Container>
      </Box>
      <Container className={classes.momentWrapper}>
        <Box p={4}>
          <Typography variant="h5" className={classes.textCenter}>
            Why are you alone here?
            <br />
            <Link href="/invite" target="_blank">
              Invite your love one!
            </Link>
          </Typography>
        </Box>
        <MomentCreator id={props.cCouple.id} email={props.cUser.user.email} />
        {moments.length === 0 && (
          <Typography variant="subtitle1">
            You have not created any moments yet
          </Typography>
        )}
        {loading ? <Moment loading={loading} /> : GenerateMoments()}
      </Container>
    </React.Fragment>
  );
}
