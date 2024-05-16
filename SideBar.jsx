import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";


import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";



import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ChecklistIcon from '@mui/icons-material/Checklist';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import { Link } from "react-router-dom";
const drawerWidth = 220;

const SideBar = () => {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
    console.log(open);
  };

  return (
    <Box sx={{ display: "flex", width: { xs: "20px" } }}>
      <CssBaseline />

      <Drawer
        variant="permanent"
        sx={{
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "rgb(15, 80, 155)",
            color: "White",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <Link to="/employees" style={{ color: "white", textDecoration: "none" }}>
              <ListItemButton>
                <ListItemIcon style={{ color: "white" }}>
                  <PeopleIcon/>
                </ListItemIcon>
                <ListItemText
                  primary="View Employees"
                  sx={{
                    display: { xs: "none", md: "flex" },
                  }}
                />
              </ListItemButton>
            </Link>

            <Link
              to="/companies"
              style={{ color: "white", textDecoration: "none" }}
            >
              <ListItemButton>
                <ListItemIcon style={{ color: "white" }}>
                <ApartmentOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="View companies"
                  sx={{
                    display: { xs: "none", md: "flex" },
                  }}
                />
              </ListItemButton>
            </Link>
            <Link
              to="/Jobs"
              style={{ color: "white", textDecoration: "none" }}
            >
              <ListItemButton>
                <ListItemIcon style={{ color: "white" }}>
                  <WorkIcon/>
                </ListItemIcon>
                <ListItemText
                  primary="View jobs"
                  sx={{
                    display: { xs: "none", md: "flex" },
                  }}
                />
              </ListItemButton>
            </Link>
            <Link
              to="/Shortlisted"
              style={{ color: "white", textDecoration: "none" }}
            >
              <ListItemButton>
                <ListItemIcon style={{ color: "white" }}>
                  <PersonAddAltIcon />
                </ListItemIcon>
                <ListItemText
                  primary="View Shortlisted"
                  sx={{
                    display: { xs: "none", md: "flex" },
                  }}
                />
              </ListItemButton>
            </Link>
            <Link
              to="/Selected"
              style={{ color: "white", textDecoration: "none" }}
            >
              <ListItemButton>
                <ListItemIcon style={{ color: "white" }}>
                  <ChecklistIcon />
                </ListItemIcon>
                <ListItemText
                  primary="View Selected"
                  sx={{
                    display: { xs: "none", md: "flex" },
                  }}
                />
              </ListItemButton>
            </Link>
            <Link
              to="/Contacts"
              style={{ color: "white", textDecoration: "none" }}
            >
              <ListItemButton>
                <ListItemIcon style={{ color: "white" }}>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText
                  primary="View Contacts"
                  sx={{
                    display: { xs: "none", md: "flex" },
                  }}
                />
              </ListItemButton>
            </Link>
          </List>
          <Divider style={{ backgroundColor: "white", color: "white" }} />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
};

export default SideBar;
