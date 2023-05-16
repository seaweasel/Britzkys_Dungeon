import React from 'react'
import { Box, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { ResponsiveTypography } from "./ResponsiveTypography";
import { LevelDropdown } from './LevelDropdown';

export const ClassesTable = ({ selectedClass }) => {
  return (
    <>
    <Table>
        <TableBody>
        <TableRow >
            <TableCell component="th" scope="row" align="center">
            <Box
            sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            }}
            >
            <ResponsiveTypography type="title">Hit Die: </ResponsiveTypography>
            <ResponsiveTypography>Constant: {selectedClass.hit_dice}</ResponsiveTypography>
            <ResponsiveTypography>First level: {selectedClass.hp_at_1st_level}</ResponsiveTypography>
            <ResponsiveTypography>Higher levels: {selectedClass.hp_at_higher_levels}</ResponsiveTypography>                  
            </Box>
            </TableCell>
        </TableRow>
        <TableRow >
            <TableCell component="th" scope="row" align="center">
            <Box
            sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            }}
            >
            <ResponsiveTypography type="title">Armor Proficiencies: </ResponsiveTypography>
            <ResponsiveTypography>{selectedClass.prof_armor}</ResponsiveTypography>
            </Box>
            </TableCell>
        </TableRow>
        <TableRow >
            <TableCell component="th" scope="row" align="center">
            <Box
            sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            }}
            >
            <ResponsiveTypography type="title">Weapon Proficiencies:</ResponsiveTypography>
            <ResponsiveTypography>{selectedClass.prof_weapons}</ResponsiveTypography>
            </Box>
            </TableCell>
        </TableRow>
        <TableRow >
            <TableCell component="th" scope="row" align="center">
            <Box
            sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            }}
            >
            <ResponsiveTypography type="title">Equipment:</ResponsiveTypography>
            <ResponsiveTypography>{selectedClass.equipment}</ResponsiveTypography>
            </Box>
            </TableCell>
        </TableRow>
        <TableRow >
            <TableCell component="th" scope="row" align="center">
            <Box
            sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            }}
            >
            <ResponsiveTypography type="title">Level Info: </ResponsiveTypography>
            <LevelDropdown classLevels={selectedClass.levels} />
            </Box>
            </TableCell>
        </TableRow>           
    </TableBody>
    </Table>
    </>
  )
}
