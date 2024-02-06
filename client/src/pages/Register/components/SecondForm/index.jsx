import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@pages/Register/actions';
import { FormattedMessage } from 'react-intl';
import CryptoJS from 'crypto-js';

export default function SecondForm({ onChangeMajor }) {

    const dispatch = useDispatch();

    return (
        <Container component="main" maxWidth="xs">
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                    <FormattedMessage id='register_major' />
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={userStudent.major_id}
                    label={<FormattedMessage id='register_major' />}
                    onChange={onChangeMajor}
                >
                    <MenuItem value={1}>S1 Sistem Informasi</MenuItem>
                    <MenuItem value={2}>S1 Teknik Industri</MenuItem>
                    <MenuItem value={3}>S1 Teknik Komputer</MenuItem>
                </Select>
            </FormControl>
        </Container>
    );
};