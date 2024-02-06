import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';

import { setUser } from '@pages/Register/actions';
import { FormattedMessage } from 'react-intl';

export default function FirstForm({ onChangeName, onChangeEmail, onChangeContact, onChangePassword, valueName, valueContact, valueEmail, valuePassword }) {

    const dispatch = useDispatch();

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
                <TextField
                    autoComplete="given-name"
                    name="full-name"
                    required
                    fullWidth
                    id="full-name"
                    label={<FormattedMessage id='register_fullname' />}
                    autoFocus
                    defaultValue={valueName}
                    onChange={onChangeName}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="email"
                    label={<FormattedMessage id='register_email' />}
                    name="email"
                    autoComplete="email"
                    defaultValue={valueEmail}
                    onChange={onChangeEmail}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="contact"
                    label={<FormattedMessage id='register_contact' />}
                    name="contact"
                    autoComplete="contact"
                    defaultValue={valueContact}
                    onChange={onChangeContact}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    name="password"
                    label={<FormattedMessage id='register_password' />}
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    defaultValue={valuePassword}
                    onChange={onChangePassword}
                />
            </Grid>
        </Grid>
    );
};