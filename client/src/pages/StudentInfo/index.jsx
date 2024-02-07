import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';

import { Button } from '@mui/material';
import { getData } from './actions';

import classes from './style.module.scss';
import { selectData } from './selector';

const StudentInfo = ({ data }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getData())
    }, [dispatch])

    return (
        <div className={classes.container}>
            <div className={classes.photoContainer}>
                <img src="https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png" alt="Photo Profile" className={classes.photo} />
                <Button variant="contained">
                    <FormattedMessage id='student_info_change_photo' />
                </Button>
            </div>
            <div className={classes.infoContainer}>
                <div className={classes.info}>
                    <p className={classes.label}>
                        <FormattedMessage id='student_info_name' />
                    </p>
                    <span>:</span>
                    <p>{data?.name}</p>
                </div>
                <div className={classes.info}>
                    <p className={classes.label}>
                        <FormattedMessage id='student_info_email' />
                    </p>
                    <span>:</span>
                    <p>{data?.email}</p>
                </div>
                <div className={classes.info}>
                    <p className={classes.label}>
                        <FormattedMessage id='student_info_contact' />
                    </p>
                    <span>:</span>
                    <p>{data?.contact}</p>
                </div>
                <div className={classes.info}>
                    <p className={classes.label}>
                        <FormattedMessage id='student_info_major' />
                    </p>
                    <span>:</span>
                    <p>{data?.major?.name}</p>
                </div>
            </div>
        </div>
    )
};

StudentInfo.propTypes = {
    data: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
    data: selectData
});

export default connect(mapStateToProps)(StudentInfo);