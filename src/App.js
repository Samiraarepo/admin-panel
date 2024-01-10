import React from "react";
import { useMode, ColorModeContext } from "./theme";

import { Box, ThemeProvider, CssBaseline } from "@mui/material";

import SidebarMenu from "./components/global/Sidebar";
import { styled } from "@mui/system";
import TopBar from "./components/global/Topbar";
import AppRouts from "./router/AppRoutes";

const StyledMainContent = styled("div")(({ isCollapsed }) => ({
  width: "100%",
  marginLeft: isCollapsed ? "80px" : "200px", // Adjust the width of the sidebar
  overflowX: "hidden",
  transition: "margin-left 0.3s ease-in-out",
}));
function App({ isCollapsed }) {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <SidebarMenu />
          <StyledMainContent isCollapsed={isCollapsed}>
            <Box className="content">
              <TopBar />
              <AppRouts />
            </Box>
          </StyledMainContent>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
