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

import { Container } from "@mui/material";

const ExpenseData = () => {
  const [value, setValue] = React.useState("1");


  // Handler for tabs change :-
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
     <Container  maxWidth="xl">

      <Box
        sx={{
          marginTop : "30px !important",
          width: "full !important",
          typography: "body1",
          // bgcolor: "#eeeeeeff",
          m: 0,
          p:  "0px !important",
          

        }}
      >
        <TabContext value={value} >
          {/* Tab Header */}
          <Box
            sx={{
              display: "flex",
              width: "full",
              justifyContent: "flex-start",
              bgcolor: "#C4E2FF", 
              mx: 0,
              p: 0,
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
                  width: "full",             
                  px: 3,
                  py: 0,
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
          <Box>
            <TabPanel className="p-0" value="1">
              <Transaction />
            </TabPanel>
            <TabPanel className="p-0"  value="2">
              <Income />
            </TabPanel>
            <TabPanel className="p-0" value="3">
              <Expense />
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
      </Container>
    </>
  );
};

export default ExpenseData;
