import React from 'react'

import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import classes from './style.module.scss';

export default function Registration() {
    return (
        <div className={classes.container}>

            <div className={classes.otherCourseContainer}>
                <h2>
                    Courses
                </h2>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>No</TableCell>
                                <TableCell>Course</TableCell>
                                <TableCell>Lecture</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell>Algorithm</TableCell>
                                <TableCell>Budi</TableCell>
                                <TableCell>
                                    <IconButton>
                                        <AddIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell>Algorithm</TableCell>
                                <TableCell>Budi</TableCell>
                                <TableCell>
                                    <IconButton>
                                        <AddIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell>Algorithm</TableCell>
                                <TableCell>Budi</TableCell>
                                <TableCell>
                                    <IconButton>
                                        <AddIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <div className={classes.myCourseContainer}>
                <h2>
                    My Course
                </h2>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>No</TableCell>
                                <TableCell>Course</TableCell>
                                <TableCell>Lecture</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell>Algorithm</TableCell>
                                <TableCell>Budi</TableCell>
                                <TableCell>
                                    <IconButton>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </div>
    )
}
