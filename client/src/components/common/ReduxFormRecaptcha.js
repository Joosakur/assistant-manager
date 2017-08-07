import React from 'react';
import PropTypes from 'prop-types';
import Recaptcha from 'react-recaptcha';


const ReduxFormRecaptcha = ({input, sitekey, explicit}) => {
  return (
    <Recaptcha
      sitekey={sitekey}
      render={explicit ? "explicit" : undefined}
      verifyCallback={response => input.onChange(response)}
    />
  );
};

ReduxFormRecaptcha.propTypes = {
  input: PropTypes.object.isRequired,
  sitekey: PropTypes.object.isRequired,
  explicit: PropTypes.bool
};

export default ReduxFormRecaptcha;

