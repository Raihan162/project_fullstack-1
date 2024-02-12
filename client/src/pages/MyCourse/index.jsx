import React, { useEffect } from 'react'
import PropTypes from 'prop-types';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';

import classes from './style.module.scss';
import { connect, useDispatch } from 'react-redux';
import { getCourse } from './action';
import { selectMyCourse } from './selectors';
import { createStructuredSelector } from 'reselect';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { selectToken } from '@containers/Client/selectors';

const MyCourse = ({ data, token }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const decryptToken = jwtDecode(token);

    useEffect(() => {
        dispatch(getCourse())
        if (!decryptToken.is_student) {
            navigate('/info');
        }
    }, [])

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
                                        <TableRow key={index}>
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
    data: PropTypes.array,
    token: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
    data: selectMyCourse,
    token: selectToken
});

export default connect(mapStateToProps)(MyCourse);
