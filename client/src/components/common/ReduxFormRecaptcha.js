import React from 'react';
import PropTypes from 'prop-types';
import Recaptcha from 'react-recaptcha';
import {Icon, Message} from "semantic-ui-react";


const ReduxFormRecaptcha = ({input, explicit, meta: {error}}, country) => {
  console.debug("rendering recaptcha");
  return (
    <div className="recaptcha-group">
      <div className="recaptcha">
        <Recaptcha
          sitekey={__RECAPTCHA_SITE_KEY__}  // eslint-disable-line no-undef
          render={explicit ? "explicit" : undefined}
          verifyCallback={response => {
            input.onChange(response);
          }}
          hl={country && "fi"}
        />
      </div>
      {error && (
        <Message visible error icon className="recaptcha-msg">
          <Icon name="android"/>
          <Message.Content>
            <Message.Header>Please make sure you are not a robot</Message.Header>
          </Message.Content>
        </Message>
      )}

    </div>

  );
};

ReduxFormRecaptcha.propTypes = {
  input: PropTypes.object.isRequired,
  explicit: PropTypes.bool,
  meta: PropTypes.shape({
    error: PropTypes.string
  })
};

export default ReduxFormRecaptcha;

