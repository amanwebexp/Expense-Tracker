"use client";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table as MuiTable,
  Paper,
  TablePagination,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";

const Income = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [currentLogin, setCurrentLogin] = useLocalStorage("currentLogin");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    const getData = localStorage.getItem("expense");
    if (getData) {
      const parsedData = JSON.parse(getData);
      const income = parsedData.filter(
        (item) => item.type === "Income" && item.user == currentLogin
      );
      setIncomeData(income);
    }
  }, []);
  return (
    <>
      <Paper
        sx={{ width: "100%", overflow: "hidden" }}
        className="shadow-lg rounded-lg border-2 border-sky-500"
      >
        <MuiTable
          sx={{
            maxHeight: 440,
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
          }}
          className=" max-w-2xl"
          stickyHeader
        >
          <TableHead className="bg-red-500">
            <TableRow>
              <TableCell className="font-bold"> Title</TableCell>
              <TableCell className="font-bold">Amount</TableCell>
              <TableCell className="font-bold">Expense Type</TableCell>
              <TableCell className="font-bold">Date</TableCell>
              <TableCell className="font-bold"> Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {incomeData?.length > 0 ? (
              incomeData
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((item, index) => (
                  <>
                    <TableRow key={index}>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.amount}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.description}</TableCell>
                    </TableRow>
                  </>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography> No data is Available</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </MuiTable>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={incomeData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="bg-gray-100"
        />
      </Paper>
    </>
  );
};

export default Income;
