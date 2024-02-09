import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import classes from './style.module.scss';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOtherCourse } from './selector';
import { getOtherCourse } from './actions';
import { selectMyCourse } from '@pages/MyCourse/selectors';
import { getCourse } from '@pages/MyCourse/action';

const Registration = ({ data, dataMyCourse }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOtherCourse());
        dispatch(getCourse());
    }, [])

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
                            {
                                data ?
                                    data.map((value, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{value?.title}</TableCell>
                                                <TableCell>{value?.user?.name}</TableCell>
                                                <TableCell>
                                                    <IconButton>
                                                        <AddIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>

                                        )
                                    })
                                    :
                                    <TableRow>
                                        <TableCell>Data tidak ada</TableCell>
                                    </TableRow>
                            }
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
                            {
                                dataMyCourse ?
                                    dataMyCourse.map((value, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{
                                                    value?.course?.title}</TableCell>
                                                <TableCell>{value?.course?.user?.name}</TableCell>
                                                <TableCell>
                                                    <IconButton>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                    :
                                    <TableRow>
                                        <TableCell>
                                            Data tidak ada.
                                        </TableCell>
                                    </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </div>
    )
};

Registration.prototype = {
    data: PropTypes.array,
    dataMyCourse: PropTypes.array
}

const mapStateToProps = createStructuredSelector({
    data: selectOtherCourse,
    dataMyCourse: selectMyCourse
})

export default connect(mapStateToProps)(Registration);
