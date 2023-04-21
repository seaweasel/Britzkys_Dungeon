import { Box, Popover, Typography, Grid } from '@mui/material'
import React from 'react'
import { CustomCloseButton } from './CustomCloseButton'

export const CustomPopover = ( { anchorEl, handlePopoverClose, content }) => {
    const open = Boolean(anchorEl)

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <Box p={2}>
                <Grid container>
                    <Grid item xs={11}>
                        {content && content.map((line, lineIndex) => (
                            <Typography key={`desc-line-${lineIndex}`} variant="body2">
                                {line}
                            </Typography>
                        ))}
                    </Grid>
                </Grid>
                <CustomCloseButton onClose={handlePopoverClose} />
            </Box>
        </Popover>
      )
    }

