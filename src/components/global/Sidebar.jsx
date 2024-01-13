import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { styled } from "@mui/system";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import BackupTableIcon from "@mui/icons-material/BackupTable";

const Item = ({ to, title, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[200] }}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<Link to={to}></Link>}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};
const StyledSidebarMenu = styled("div")({
  "& .pro-icon-wrapper": {
    backgroundColor: "transparent !important",
  },
  "& .pro-inner-item": {
    padding: "5px 35px 5px 20px !important",
  },
  "& .pro-inner-item:hover": {
    color: "#868dfb !important",
  },
  "& .ps-menu-button:hover": {
    backgroundColor: "rgba(17, 205, 239, 0.1) !important",
  },
  "& .pro-menu-item.active": {
    color: "#6870fa !important",
  },
  "& .css-1wvake5": {
    border: "0",
  },
});
const SidebarMenu = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <StyledSidebarMenu>
      <Sidebar
        collapsed={isCollapsed}
        backgroundColor={colors.primary[400]}
        lock={true}
        style={{
          position: "fixed",
          height: "100vh",
          zIndex: 99999,
        }}
      >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h4" color={colors.grey[100]}>
                  My Admin Panel
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
            ></Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<DashboardIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Table"
              to="/table"
              icon={<BackupTableIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Doctors"
              to="/create"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Profile"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Sign In"
              to="/"
              icon={<ExitToAppOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Sign Up"
              to="/"
              icon={<LockOpenOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </StyledSidebarMenu>
  );
};

export default SidebarMenu;
