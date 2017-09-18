import {connect} from 'react-redux';
import {endAssistantEdit} from "../actions/assistantActions";
import {sendAssistantEdit} from "../thunks/assistantsThunk";
import AssistantModalForm from "../components/assistants/AssistantModalForm";
import {formValueSelector} from "redux-form";
import moment from "moment";
import { getTranslate } from 'react-localize-redux';

const mapStateToProps = state => {
  let targetId = state.assistants.target;
  let target;
  if(targetId)
    target = state.entities.assistants[targetId];

  const selector = formValueSelector("AssistantForm");

  const {firstName, lastName, nickName, backgroundColor, whiteText} = selector(state, 'firstName', 'lastName', 'nickName', 'backgroundColor', 'whiteText');
  let shortName = nickName ? nickName : firstName;
  if(!nickName && lastName)
    shortName += " " + lastName [0];

  return {
    open: state.assistants.editing,
    target: targetId,
    submitting: state.assistants.submitting,
    enableReinitialize: true,
    initialValues: {
      target: targetId,
      firstName:  target && target.firstName ? target.firstName : "",
      lastName:  target && target.lastName ? target.lastName : "",
      nickName:  target && target.nickName ? target.nickName : "",
      birthday:  target && target.birthday ? moment(target.birthday, "YYYY-MM-DD").format("DD.MM.YYYY") : undefined,
      backgroundColor: target && target.backgroundColor ? target.backgroundColor : "#808080",
      whiteText: target && target.whiteText ? target.whiteText : false,
    },
    shortName,
    backgroundColor,
    whiteText,
    msg: {...getTranslate(state.locale)([
      'assistants.edit.titleNew', 'assistants.edit.titleEdit', 'assistants.edit.firstName', 'assistants.edit.lastName',
      'assistants.edit.nickName', 'assistants.edit.birthday', 'assistants.edit.backgroundColor',
      'assistants.edit.textInvert', 'assistants.edit.cancel', 'assistants.edit.save'
    ])}
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClose: () => dispatch(endAssistantEdit()),
    onSubmit: (values) => dispatch(sendAssistantEdit(values))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AssistantModalForm);
