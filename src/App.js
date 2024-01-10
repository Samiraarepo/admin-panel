import React from "react";
import { useMode, ColorModeContext } from "./theme";

import { ThemeProvider, CssBaseline } from "@mui/material";
import MainContent from "./components/main/main";
import SidebarMenu from "./components/global/Sidebar";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div className="app">
          <SidebarMenu />
          <MainContent />
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
