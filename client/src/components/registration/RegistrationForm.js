import React from 'react';
import PropTypes from 'prop-types';
import {Form, Button, Divider} from 'semantic-ui-react';
import {reduxForm, Field} from 'redux-form';
import FormFieldWithErrorLabel from "../common/FormFieldWithErrorLabel";
import {dateBefore, email, maxLength, minLength, required} from "../../utils/validationConstraints";
import ReduxFormRecaptcha from "../common/ReduxFormRecaptcha";
import moment from "moment";
import FormCheckbox from "../common/FormCheckbox";
import FormDropdownField from "../common/FormDropdownField";

const cities = ['Helsinki','Espoo','Vantaa','Muu Suomi'];
const getCityOptions = () => {
  return cities.map(city => {return {key: city, text: city, value: city};});
};

const RegistrationForm = ({handleSubmit, error, loading, msg}) => {

  const cityOptions = getCityOptions();

  return (
    <Form error={!!error} onSubmit={handleSubmit} >
      <Field name="email" component={FormFieldWithErrorLabel} type="text" label={msg['signUp.email']}
             isRequired validate={[required, email, maxLength(64)]}/>
      <Field name="password" component={FormFieldWithErrorLabel} type="password" label={msg['signUp.password']}
             isRequired validate={[required, minLength(8), maxLength(30)]}/>
      <Field name="firstName" component={FormFieldWithErrorLabel} type="text" label={msg['signUp.firstName']}
             isRequired validate={[required, maxLength(20)]}/>
      <Field name="lastName" component={FormFieldWithErrorLabel} type="text" label={msg['signUp.lastName']}
             isRequired validate={[required, maxLength(30)]}/>
      <Field name="birthday" component={FormFieldWithErrorLabel} type="text" label={msg['signUp.birthday']}
             placeholder="31.12.1980" isRequired validate={[required, dateBefore('D.M.YYYY', moment().add(-13, 'years'))]}/>
      <Field name="city" component={FormDropdownField} label={msg['signUp.city']}
             options={cityOptions}/>
      <Field name="hetaMember" component={FormCheckbox}
             label={<span>{msg['signUp.cbox1a']+" "}<a href="http://www.heta-liitto.fi/" target="_blank">{msg['signUp.cbox1b']}</a>.</span>}
      />
      <Field name="agreement" component={FormCheckbox}
             label={<span>{msg['signUp.cbox2a']+" "}<a href="/terms-and-conditions-v1.pdf" target="_blank">{msg['signUp.cbox2b']}</a>.</span>}
             isRequired validate={required}/>

      <Field name="captcha" component={ReduxFormRecaptcha} explicit={true}/>
      <Divider hidden/>
      <Button type="submit" disabled={loading} positive size="huge" fluid>{msg['signUp.submit']}</Button>
    </Form>
  );
};

RegistrationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  msg: PropTypes.object.isRequired
};

export default reduxForm({
  form: 'RegistrationForm',
  fields: ['email','password','firstName','lastName','captcha'],
  asyncBlurFields: ['email'],
})(RegistrationForm);

