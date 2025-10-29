"use client";
import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Expense from "@/component/Expense";
import Income from "@/component/Income";
import Transaction from "@/component/Transaction";
import ExpenseDesign from "@/component/ExpenseDesign/ExpenseDesign";

const ExpenseData = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        sx={{
          marginTop : "30px !important",
          width: "100vw",
          typography: "body1",
          // bgcolor: "#eeeeeeff",
          m: 0,
          p: 0,
        }}
      >
        <TabContext value={value}>
          {/* Tab Header */}
          <Box
            sx={{
              // borderBottom: 1,
              // borderColor: "divider",
              display: "flex",
              justifyContent: "center",
              // bgcolor: "#ffffffff",
              width: "100%",
              m: 0,
              pt: 1,
            }}
          >
            <TabList
              onChange={handleChange}
              aria-label="tabs example"
              textColor="primary"
              indicatorColor="none"
              sx={{
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: "600",
                  px: 3,
                  py: 1,
                  borderRadius: "6px 6px 0 0",
                  color: "#000",
                  transition: "0.3s",
                },
                "& .Mui-selected": {
                  bgcolor: "#1976d2", // blue background
                  color: "#fff !important", // white text
                },
              }}
            >
              <Tab label="Transactions" value="1" />
              <Tab label="Income" value="2" />
              <Tab label="Expense" value="3" />
            </TabList>
          </Box>

        

          {/* Tab Panels */}
          <Box sx={{ px: 3 }}>
            <TabPanel value="1">
              <Transaction />
            </TabPanel>
            <TabPanel value="2">
              <Income />
            </TabPanel>
            <TabPanel value="3">
              <Expense />
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </>
  );
};

export default ExpenseData;
