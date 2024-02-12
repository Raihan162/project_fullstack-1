import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { connect, useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { selectMajor } from '@pages/Register/selectors';
import { getMajor } from '@pages/Register/actions';
import { Button, Input } from '@mui/material';
import { useEffect } from 'react';
import { CloudUpload } from '@mui/icons-material';
import styled from '@emotion/styled';

const SecondForm = ({ onChangeMajor, data, onChangeHandler }) => {

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getMajor())
    }, []);

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

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
                    {
                        data?.map((value, index) => {
                            return (
                                <MenuItem value={value?.id}>
                                    {value?.name}
                                </MenuItem>
                            )
                        })
                    }
                </Select>
                <Button onChange={onChangeHandler} sx={{ marginTop: '30px' }} component="label" variant="contained" startIcon={<CloudUpload />}>
                    Upload file
                    <VisuallyHiddenInput type="file" accept="image/png, image/jpeg" />
                </Button>
            </FormControl>
        </Container>
    );
};

SecondForm.propTypes = {
    data: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
    data: selectMajor,
});

export default connect(mapStateToProps)(SecondForm);