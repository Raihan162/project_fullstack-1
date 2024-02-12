import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import classes from './style.module.scss';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOtherCourse } from './selector';
import { addToMyCourse, deleteMyCourse, getOtherCourse } from './actions';
import { selectMyCourse } from '@pages/MyCourse/selectors';
import { getCourse } from '@pages/MyCourse/action';
import { selectData } from '@pages/StudentInfo/selector';
import { selectToken } from '@containers/Client/selectors';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Registration = ({ data, dataMyCourse, dataUser, token }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const decryptToken = jwtDecode(token);

    const onSubmit = (id) => {
        dispatch(
            addToMyCourse({
                courses_id: id
            }, () => {
                dispatch(getOtherCourse());
                dispatch(getCourse());
            })
        )
    };

    useEffect(() => {
        dispatch(getOtherCourse());
        dispatch(getCourse());
        if (!decryptToken.is_student) {
            navigate('/info')
        }
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
                                data?.length !== 0 ?
                                    data?.map((value, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{value?.title}</TableCell>
                                                <TableCell>{value?.user?.name}</TableCell>
                                                <TableCell>
                                                    <IconButton onClick={() => onSubmit(value?.id)}>
                                                        <AddIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>

                                        )
                                    })
                                    :
                                    <TableRow>
                                        <TableCell colSpan={4} align='center'>Data tidak ada</TableCell>
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                dataMyCourse?.length !== 0 ?
                                    dataMyCourse?.map((value, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{
                                                    value?.course?.title}</TableCell>
                                                <TableCell>{value?.course?.user?.name}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                    :
                                    <TableRow>
                                        <TableCell colSpan={4} align='center'>
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
    dataMyCourse: PropTypes.array,
    dataUser: PropTypes.object,
    token: PropTypes.string
}

const mapStateToProps = createStructuredSelector({
    data: selectOtherCourse,
    dataMyCourse: selectMyCourse,
    dataUser: selectData,
    token: selectToken
})

export default connect(mapStateToProps)(Registration);
