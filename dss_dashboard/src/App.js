import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
// import { AppBar } from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
// import Divider from "@material-ui/core/Divider";
// import IconButton from "@material-ui/core/IconButton";
// import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import { server_addr } from "./config.js";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
// import MenuIcon from "@material-ui/icons/Menu";
// import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
// import NotificationsIcon from "@material-ui/icons/Notifications";
import Spw from "./spw";
import Hpw from "./hpw";
import Gmap from "./maps";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        TheGreyCode
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  root2: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [publiclat, setpublicLat] = React.useState(22.286132);
  const [publiclong, setpublicLong] = React.useState(73.165082);
  const [privatelat, setprivateLat] = React.useState(22.291454);
  const [privatelong, setprivateLong] = React.useState(73.170662);
  const [policelat, setpoliceLat] = React.useState(22.300969);
  const [policelong, setpoliceLong] = React.useState(73.171123);
  const [signallat, setsignalLat] = React.useState(23.0);
  const [signallong, setsignalLong] = React.useState(73, 17);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  function callback(lat, long) {
    setsignalLat(lat);
    setsignalLong(long);
    const apiUrl = `http://${server_addr}/adss/coords`;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ coords: { x: long, y: lat } }),
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data[0].location.coordinates[1]);
        setpublicLat(data[0].location.coordinates[1]);
        setpublicLong(data[0].location.coordinates[0]);
        setprivateLat(data[1].location.coordinates[1]);
        setprivateLong(data[1].location.coordinates[0]);
        setpoliceLat(data[2].location.coordinates[1]);
        setpoliceLong(data[2].location.coordinates[0]);
      });
  }
  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <div className={classes.root2}>
          <AppBar position="static">
            <Toolbar variant="dense">
              <Typography variant="h5" align="'center'" color="inherit">
                Advanced Distributed Surveillance System
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Gmap
                  publiclat={publiclat}
                  publiclong={publiclong}
                  privatelat={privatelat}
                  privatelong={privatelong}
                  policelat={policelat}
                  policelong={policelong}
                  signallat={signallat}
                  signallong={signallong}
                />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Spw callbackfn={callback} />
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={fixedHeightPaper}>
                <Hpw callbackfn={callback} />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
