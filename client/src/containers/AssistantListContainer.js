import {connect} from 'react-redux';
import {ownPropsToArray} from "../utils/jsUtils";
import AssistantCardGroup from "../components/assistants/AssistantCardGroup";
import {startAssistantEdit} from "../actions/assistantActions";
import { getTranslate } from 'react-localize-redux';

const mapStateToProps = state => {
  let assistants = ownPropsToArray(state.entities.assistants)
    .sort((a,b) => {
      let nameA = (a.firstName+" "+a.lastName).toUpperCase();
      let nameB = (b.firstName+" "+b.lastName).toUpperCase();
      if (nameA < nameB)
        return -1;
      if (nameA > nameB)
        return 1;
      return 0;
    });

  return {
    loading: state.assistants.loading,
    assistants: assistants,
    translate: getTranslate(state.locale)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openEditor: (id) => dispatch(startAssistantEdit(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AssistantCardGroup);
