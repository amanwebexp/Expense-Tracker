"use client";

import { Box, Container, Typography } from "@mui/material";
import React from "react";

const Home = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #d6ebff, #ffffff)",
        width: "100% !important",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      
      }}
    >
      {/* Logo */}
      <Box sx={{ mb: 3 }}>
        <img
          src="logoexpense.png"
          alt="Expense Tracker Logo"
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            objectFit: "contain",
          }}
        />
      </Box>

      {/* Main Text */}
      <Container >
        <Typography
          variant="h3"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#1976d2" }}
        >
          Welcome to the Expense Tracker
        </Typography>

        <Typography variant="body1" sx={{ color: "#333", lineHeight: 1.6 }}>
          This is the starting point of our amazing app. Here you can find
          information about our features and how to get started.
        </Typography>
      </Container>
    </Box>
  );
};

export default Home;
