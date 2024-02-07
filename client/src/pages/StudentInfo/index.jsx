import React from 'react'

import classes from './style.module.scss';
import { Button } from '@mui/material';
import { FormattedMessage } from 'react-intl';

export default function StudentInfo() {
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
                    <p>Fahmi</p>
                </div>
                <div className={classes.info}>
                    <p className={classes.label}>
                        <FormattedMessage id='student_info_email' />
                    </p>
                    <span>:</span>
                    <p>fahmi@gmail.com</p>
                </div>
                <div className={classes.info}>
                    <p className={classes.label}>
                        <FormattedMessage id='student_info_contact' />
                    </p>
                    <span>:</span>
                    <p>0812398123</p>
                </div>
                <div className={classes.info}>
                    <p className={classes.label}>
                        <FormattedMessage id='student_info_major' />
                    </p>
                    <span>:</span>
                    <p>S1 Teknik Komputer</p>
                </div>
            </div>
        </div>
    )
};
