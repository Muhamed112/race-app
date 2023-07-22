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
import { Button } from "@mui/material";

const columns = [
  { id: "firstName", label: "Name", minWidth: 130 },
  { id: "lastName", label: "Surname", minWidth: 130 },

  {
    id: "birthDate",
    label: "Birth",
    minWidth: 100,
  },

  { id: "team", label: "Team", minWidth: 100 },
];

export default function DriversTable() {
  const { drivers, deleteDriver } = useDrivers("drivers", []);

  const handleDelete = (driverId) => {
    deleteDriver(driverId);
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 600 }}>
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
                  Qualification
                </TableCell>
                <TableCell key="final" align="left" style={{ minWidth: 100 }}>
                  Final
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {drivers.map((row, key) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    <TableCell>{key + 1}</TableCell>
                    <TableCell>
                      <img
                        loading="lazy"
                        width="40"
                        src={`https://flagcdn.com/w20/${row.country?.toLowerCase()}.png`}
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
                    <TableCell key="qual">
                      <Timer key={row.id} />
                    </TableCell>
                    <TableCell key="final">
                      <Timer key={row.id} />
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleDelete(row.id)}>
                        Delete
                      </Button>
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
