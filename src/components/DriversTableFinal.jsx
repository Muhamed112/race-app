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
import Timer from "./Timer";
import DeleteIcon from "@mui/icons-material/Delete";
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
  const { drivers } = useDrivers("drivers", []);
  const [areQualsFinished, setAreQualsFinished] = React.useState(false);

  React.useEffect(() => {
    const allFinished = drivers.every((driver) => driver.isQualFinished);
    setAreQualsFinished(allFinished);
  }, [JSON.stringify(drivers), areQualsFinished]);

  // Helper function to get the sorting key based on areQualsFinished
  const getSortingKey = (driver) => {
    return areQualsFinished ? driver.finalTime : driver.qualTime;
  };

  // Update drivers.map() to sort the drivers based on the sorting key
  const sortedDrivers = drivers.sort((a, b) => {
    const keyA = getSortingKey(a);
    const keyB = getSortingKey(b);
    return keyA - keyB;
  });

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
                  Kvalifikacije
                </TableCell>
                <TableCell key="final" align="left" style={{ minWidth: 100 }}>
                  Finale
                </TableCell>
                <TableCell key="ukupno" align="left" style={{ minWidth: 100 }}>
                  Ukupno
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
                    <TableCell key="ukupno">
                      {formatTime(row.qualTime + row.finalTime)}
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
