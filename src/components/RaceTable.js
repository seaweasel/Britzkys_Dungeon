import { Box, Table, TableBody, TableCell, TableRow } from "@mui/material";
import React from "react";
import { ResponsiveTypography } from "./ResponsiveTypography";

export const RaceTable = ({ raceInfoItems }) => {
  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Table>
          <TableBody>
            {raceInfoItems.map((item) => (
              <TableRow key={item.key}>
                <TableCell component="th" scope="row" align="center">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <ResponsiveTypography type="title">
                      {item.key}:
                    </ResponsiveTypography>
                    {Array.isArray(item.value) ? (
                      <ul style={{ textDecoration: "none" }}>
                        {item.value.map((subitem, index) => {
                          if (subitem.name && subitem.bonus) {
                            return (
                              <li key={index} style={{ listStyleType: "none" }}>
                                <ResponsiveTypography>
                                  {subitem.name} increases by {subitem.bonus}
                                </ResponsiveTypography>
                              </li>
                            );
                          } else {
                            return (
                              <li key={index} style={{ listStyleType: "none" }}>
                                <ResponsiveTypography>
                                  {subitem}
                                </ResponsiveTypography>
                              </li>
                            );
                          }
                        })}
                      </ul>
                    ) : (
                      <ResponsiveTypography>{item.value}</ResponsiveTypography>
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
};
