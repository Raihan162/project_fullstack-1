import React, { useEffect } from 'react'
import PropTypes from 'prop-types';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';

import classes from './style.module.scss';
import { connect, useDispatch } from 'react-redux';
import { getCourse } from './action';
import { selectMyCourse } from './selectors';
import { createStructuredSelector } from 'reselect';

const MyCourse = ({ data }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCourse())
    }, [dispatch])

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
                        {
                            data ?
                                data.map((value, index) => {
                                    return (
                                        <TableRow>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{value?.course?.title}</TableCell>
                                            <TableCell>{value?.course?.user?.name}</TableCell>
                                        </TableRow>

                                    )
                                })
                                :
                                <TableRow>
                                    <TableCell>Data Tidak ada</TableCell>
                                </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

MyCourse.propTypes = {
    data: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
    data: selectMyCourse
});

export default connect(mapStateToProps)(MyCourse);
