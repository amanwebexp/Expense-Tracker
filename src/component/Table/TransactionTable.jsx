import React, { useEffect } from "react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table as MuiTable,
  Paper,
  TablePagination,
  Typography,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import { useState } from "react";
import useLocalStorage from "use-local-storage";

const TransactionTable = ({ data, handleDelete, handleEdit }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [transactionData, setTransactionData] = useState([]);
  const [currentLogin, setCurrentLogin] = useLocalStorage("currentLogin");

  // filter the data only for current user:-
  useEffect(() => {
    const newData = data.filter((item) => item.user == currentLogin);
    setTransactionData(newData);
  }, [data]);

  // handler for tab change:-
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const requiredLength = page * 10;
    if (transactionData.length === requiredLength) {
      setPage(0);
    }
  }, [page, transactionData.length]);

  //  handler for per page change :-
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const displayedData = transactionData || [];

  return (
    <div>
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
          className="max-w-2xl"
          stickyHeader
        >
          <TableHead className="bg-red-500">
            <TableRow>
              <TableCell className="font-bold">Title</TableCell>
              <TableCell className="font-bold">Amount</TableCell>
              <TableCell className="font-bold">Expense Type</TableCell>
              <TableCell className="font-bold">Date</TableCell>
              <TableCell className="font-bold">Description</TableCell>
              <TableCell className="font-bold">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData?.length > 0 ? (
              displayedData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Tooltip
                        arrow
                        placement="top-start"
                        title={<span>{item.title}</span>}
                      >
                        <span>{`${item.title.slice(0, 30)}`}</span>
                      </Tooltip>
                    </TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>
                      {dayjs(item.date).format("YYYY-MM-DD")}
                    </TableCell>
                    <TableCell>
                      <Tooltip
                        arrow
                        placement="top-start"
                        title={<span>{item.description}</span>}
                      >
                        <span>{`${item.description.slice(0, 30)}`}</span>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip
                        title="Delete transaction"
                        className="cursor-pointer"
                      >
                        <DeleteIcon
                          className="deleteicontable"
                          onClick={() => handleDelete(item.id)}
                          sx={{ cursor: "pointer", mr: 1 }}
                        />
                      </Tooltip>
                      <Tooltip
                        title="Edit transaction"
                        className="cursor-pointer"
                      >
                        <EditIcon
                          className="editicontable"
                          onClick={() => handleEdit(item.id)}
                          sx={{ cursor: "pointer", mr: 1 }}
                        />
                      </Tooltip>
                    </TableCell>
                  </TableRow>
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
          count={displayedData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="bg-gray-100"
        />
      </Paper>
    </div>
  );
};

export default TransactionTable;
