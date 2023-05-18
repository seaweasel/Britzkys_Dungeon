import React from 'react'
import { Table, TableBody, TableCell, TableRow } from '@mui/material'
import { ResponsiveTypography } from './ResponsiveTypography'

export const BackgroundsTable = ({background}) => {
  return (
    <Table>
      <TableBody>
        <TableRow >
          <TableCell component="th" scope="row" align="center">
          <ResponsiveTypography type='title'>Description:</ResponsiveTypography>
          <ResponsiveTypography>{background.description}</ResponsiveTypography>
          </TableCell>
        </TableRow>
        <TableRow >
          <TableCell component="th" scope="row" align="center">
          <ResponsiveTypography type='title'>Skill Proficiencies: </ResponsiveTypography>
          <ResponsiveTypography>{background.skillProf}</ResponsiveTypography>
          </TableCell>
        </TableRow>
        <TableRow >
          <TableCell component="th" scope="row" align="center">
          <ResponsiveTypography type='title'>Languages:</ResponsiveTypography>
          <ResponsiveTypography>{background.languages}</ResponsiveTypography>
          </TableCell>
        </TableRow>
        <TableRow >
          <TableCell component="th" scope="row" align="center">
          <ResponsiveTypography type='title'>Features:</ResponsiveTypography>
          <ResponsiveTypography>{background.feature}</ResponsiveTypography>
          </TableCell>
        </TableRow>
        <TableRow >
          <TableCell component="th" scope="row" align="center">
          <ResponsiveTypography type='title'>Feature Description:</ResponsiveTypography>
          <ResponsiveTypography>{background.featureDescription}</ResponsiveTypography>
          </TableCell>
        </TableRow>
    </TableBody>
  </Table>
  )
}
