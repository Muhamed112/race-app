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

export default function DriversTable() {
  const { drivers, deleteDriver, setDrivers } = useDrivers("drivers", []);
  const [areQualsFinished, setAreQualsFinished] = React.useState(false);

  React.useEffect(() => {
    const allFinished = drivers.every((driver) => driver.isQualFinished);
    setAreQualsFinished(allFinished);
  }, [JSON.stringify(drivers), areQualsFinished]);

  const handleDelete = (driverId) => {
    deleteDriver(driverId);
  };

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
                <TableCell></TableCell>
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
                    <TableCell key="qual">
                      <Timer
                        key={row.id}
                        driverId={row.id}
                        isFinished={row.isQualFinished}
                        finishedTime={row.qualTime}
                        setDrivers={setDrivers}
                        onFinish={() => {
                          setDrivers((prevDrivers) => {
                            return prevDrivers.map((driver) => {
                              if (row.id === driver.id) {
                                return {
                                  ...driver,
                                  isQualFinished: true,
                                };
                              }

                              return driver;
                            });
                          });
                        }}
                      />
                    </TableCell>
                    <TableCell key="final">
                      <Timer
                        key={row.id}
                        driverId={row.id}
                        isFinished={row.isFinalFinished}
                        finishedTime={row.finalTime}
                        setDrivers={setDrivers}
                        areQualsFinished={areQualsFinished}
                        onFinish={() => {
                          setDrivers((prevDrivers) => {
                            return prevDrivers.map((driver) => {
                              if (row.id === driver.id) {
                                return {
                                  ...driver,
                                  isFinalFinished: true,
                                };
                              }
                              return driver;
                            });
                          });
                        }}
                      />
                    </TableCell>
                    <TableCell key="button">
                      <div
                        onClick={() => handleDelete(row.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <DeleteIcon color="error" fontSize="large" />
                      </div>
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
