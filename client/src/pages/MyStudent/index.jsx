import React, { useEffect } from 'react'
import PropTypes from 'prop-types';

import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';

import classes from './style.module.scss';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { selectMyStudent } from './selectors';
import { deleteMyStudent, getStudent } from './action';
import { selectToken } from '@containers/Client/selectors';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const MyStudent = ({ data, token }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const decryptToken= jwtDecode(token)

    const onDelete = (users_id, courses_id) => {
        dispatch(deleteMyStudent({ users_id, courses_id }, () => {
            dispatch(getStudent());
        }))
    }

    useEffect(() => {
        dispatch(getStudent())
        if(decryptToken.is_student){
            navigate('/info');
        }
    }, [])

    return (
        <div className={classes.container}>
            {
                data?.map((value, index) => {
                    return (
                        <TableContainer component={Paper} className={classes.tableContainer}>
                            <h2>{value?.title}</h2>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ width: 60 }}>No</TableCell>
                                        <TableCell><FormattedMessage id='table_name' /></TableCell>
                                        <TableCell><FormattedMessage id='table_action' /></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        value?.registrations.length !== 0 ?
                                            value?.registrations.map((val, idx) => {
                                                return (
                                                    <TableRow>
                                                        <TableCell>{idx + 1}</TableCell>
                                                        <TableCell>{val?.user?.name}</TableCell>
                                                        <TableCell>
                                                            <IconButton onClick={() => onDelete(val?.users_id, val?.courses_id)}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>

                                                )
                                            })
                                            :
                                            <TableRow>
                                                <TableCell colSpan={3} align='center'><FormattedMessage id='table_empty' /></TableCell>
                                            </TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )
                })
            }

        </div>
    )
}

MyStudent.propTypes = {
    data: PropTypes.array,
    token:PropTypes.string
};

const mapStateToProps = createStructuredSelector({
    data: selectMyStudent,
    token: selectToken
});

export default connect(mapStateToProps)(MyStudent);
