import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { jwtDecode } from "jwt-decode";

import { selectLogin, selectToken } from '@containers/Client/selectors';

const Client = ({ login, token, children }) => {
  const navigate = useNavigate();
  const decryptToken = jwtDecode(token)
  useEffect(() => {
    // console.log(decryptToken, '<<< DATA TOKEN')
    if (!login) {
      navigate('/login');
    } else if (!decryptToken.is_student) {
      navigate('/test')
    }
  }, [login, navigate]);

  return children;
};

Client.propTypes = {
  login: PropTypes.bool,
  token: PropTypes.string,
  children: PropTypes.element,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
  token: selectToken
});

export default connect(mapStateToProps)(Client);
