"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import useDrivers from "@/hooks/useDrivers";
import TableSortLabel from "@mui/material/TableSortLabel";
import { formatTime } from "@/util/helpers";

const columns = [
  { id: "firstName", label: "Ime", minWidth: 130 },
  { id: "lastName", label: "Prezime", minWidth: 130 },
  {
    id: "driverNumber",
    label: "Broj vozača",
    minWidth: 50,
  },
  { id: "motor", label: "Motor", minWidth: 100 },
  { id: "team", label: "Tim", minWidth: 100 },
];

export default function DriversTableFinal() {
  const { drivers, setDrivers } = useDrivers("drivers", []);
  const [orderBy, setOrderBy] = React.useState(""); // Initialize with the column ID you want to sort initially
  const [order, setOrder] = React.useState("asc"); // Initial sorting direction
  console.log(orderBy, order);
  // Handler function for changing sorting
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  // A helper function for stable sorting
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  // A helper function to get a comparator function based on property and order
  function getComparator(order, orderBy) {
    return (a, b) => {
      console.log("Comparing:", a[orderBy], b[orderBy]);

      if (a[orderBy] < b[orderBy]) {
        return order === "asc" ? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    };
  }

  React.useEffect(() => {
    setDrivers((prevDrivers) => {
      return prevDrivers.map((driver) => {
        return {
          ...driver,
          totalTime: driver.qualTime + driver.finalTime,
        };
      });
    });
  }, []);

  const sortedDrivers = stableSort(drivers, getComparator(order, orderBy)); // You need to implement the 'stableSort' and 'getComparator' functions

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 700 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell key="spot" align="left" style={{ minWidth: 20 }}>
                  Mjesto
                </TableCell>
                <TableCell key="country" align="left" style={{ minWidth: 50 }}>
                  Drzava
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell key="qual" align="left" style={{ minWidth: 100 }}>
                  <TableSortLabel
                    active={orderBy === "qualTime"}
                    direction={orderBy === "qualTime" ? order : "asc"}
                    onClick={() => handleRequestSort("qualTime")}
                  >
                    Kvalifikacije
                  </TableSortLabel>
                </TableCell>
                <TableCell key="final" align="left" style={{ minWidth: 100 }}>
                  <TableSortLabel
                    active={orderBy === "finalTime"}
                    direction={orderBy === "finalTime" ? order : "asc"}
                    onClick={() => handleRequestSort("finalTime")}
                  >
                    Finale
                  </TableSortLabel>
                </TableCell>
                <TableCell key="total" align="left" style={{ minWidth: 100 }}>
                  <TableSortLabel
                    active={orderBy === "totalTime"}
                    direction={orderBy === "totalTime" ? order : "asc"}
                    onClick={() => handleRequestSort("totalTime")}
                  >
                    Ukupno
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedDrivers.map((row, key) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell>{key + 1}</TableCell>
                    <TableCell>
                      <img
                        loading="lazy"
                        width="40"
                        src={`https://flagcdn.com/w40/${row.country?.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${row.country?.toLowerCase()}.png 2x`}
                        alt=""
                      />
                    </TableCell>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <TableCell key="qual">{formatTime(row.qualTime)}</TableCell>
                    <TableCell key="final">
                      {formatTime(row.finalTime)}
                    </TableCell>
                    <TableCell key="total">
                      {formatTime(row.totalTime)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
