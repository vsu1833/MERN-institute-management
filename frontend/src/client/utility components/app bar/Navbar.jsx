import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useTheme, useMediaQuery } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { AuthContext } from "../../../context/AuthContext";

import "./Navbar.css";

function Navbar() {
  const { authenticated, user } = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Navigation items based on authentication status
  const navItems = !authenticated
    ? [
        { label: "Login", path: "/login", icon: <LoginIcon sx={{ mr: 1 }} /> },
        { label: "Register", path: "/register" },
      ]
    : [
        { label: "Dashboard", path: `/${user.role.toLowerCase()}` },
        { label: "Logout", path: "/logout" },
      ];

  // Toggle the mobile drawer
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  // Render the mobile drawer content
  const renderDrawer = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <Button
              component={Link}
              to={item.path}
              sx={{
                width: "100%",
                justifyContent: "flex-start",
                textTransform: "none",
              }}
              startIcon={item.icon || null}
            >
              <ListItemText primary={item.label} />
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        boxShadow: 3,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Branding Section */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src="/images/static/school_management_system.png"
              alt="SMS Logo"
              sx={{ height: 50, width: 50, mr: 1 }}
            />
            <Typography
              variant="h6"
              sx={{
                fontFamily: "monospace",
                fontWeight: "bold",
                letterSpacing: ".1rem",
              }}
            >
              MULTIPLE SCHOOL MANAGEMENT SYSTEM
            </Typography>
          </Link>
        </Box>

        {/* Navigation Section */}
        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              edge="end"
              onClick={toggleDrawer(true)}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              {renderDrawer()}
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: "flex", gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                color="inherit"
                sx={{
                  textTransform: "none",
                  fontWeight: "medium",
                }}
                startIcon={item.icon || null}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
