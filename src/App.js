import React from "react";
import { useMode, ColorModeContext } from "./theme";
import { Box, ThemeProvider, CssBaseline } from "@mui/material";
import { styled } from "@mui/system";
import SidebarMenu from "./components/global/Sidebar";
import TopBar from "./components/global/Topbar";
import AppRouts from "./router/AppRoutes";

const StyledMainContent = styled("div")({
  width: "100%",
  overflowX: "hidden",
  transition: "margin-left 0.3s ease-in-out",
});
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
