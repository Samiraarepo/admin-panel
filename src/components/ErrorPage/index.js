import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import myImg from "../../assets/img-404.jpg";
export default function Error() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#fff",
      }}
    >
      <Box
        component="img"
        sx={{
          height: 233,
          width: 350,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
        alt="404-not-found."
        src={myImg}
      />
      {/* <Typography variant="h1" style={{ color: "white" }}>
        404
      </Typography> */}
      <Typography variant="h6" style={{ color: "white" }}>
        The page you’re looking for doesn’t exist.
      </Typography>
      <Link to="/">
        <Button sx={{ mt: 2 }} variant="contained">
          Back Home
        </Button>
      </Link>
    </Box>
  );
}
