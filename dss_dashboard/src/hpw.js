import React, { useState } from "react";
import { server_addr } from "./config.js";
import { useTimeout } from "./usetimeout";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import AndroidIcon from "@material-ui/icons/Android";
import WarningIcon from "@material-ui/icons/Warning";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const Hpw = (props) => {
  const [HpwList, setHpwList] = useState([]);
  useTimeout(() => {
    const apiUrl = `http://${server_addr}/adss/serious`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("This is your High priority List", data);
        setHpwList(data);
      });
  }, 1000);
  return (
    <>
      {HpwList.map((listItems) => {
        let a, b;
        if (listItems.type === 0 || listItems.type === 1) {
          a = (
            <ListItemIcon>
              <EmojiPeopleIcon />
            </ListItemIcon>
          );
        } else if (listItems.type === 2 || listItems.type === 3) {
          a = (
            <ListItemIcon>
              <AndroidIcon />
            </ListItemIcon>
          );
        } else if (listItems.type === 4) {
          a = (
            <ListItemIcon>
              <WarningIcon />
            </ListItemIcon>
          );
          b = <ListItemText primary={listItems.details} />;
        } else {
        }

        return (
          <div>
            <List component="nav" aria-label="secondary mailbox folders">
              <ListItem
                button
                onClick={() => {
                  props.callbackfn(
                    listItems.location.coordinates[0],
                    listItems.location.coordinates[1]
                  );
                }}
              >
                {a}
                {/* <ListItemIcon>
                <WifiIcon />
              </ListItemIcon> */}
                <ListItemText primary={listItems.id} />
                {b}
              </ListItem>
            </List>
          </div>
        );
      })}
    </>
  );
};

export default Hpw;
