import React from 'react'

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';

import classes from './style.module.scss';

export default function MyCourse() {
    return (
        <div className={classes.container}>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: 60 }}>No</TableCell>
                            <TableCell>Course</TableCell>
                            <TableCell>Lecture</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>Database</TableCell>
                            <TableCell>Anton</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>2</TableCell>
                            <TableCell>Database</TableCell>
                            <TableCell>Anton</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
