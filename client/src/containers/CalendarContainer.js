import {connect} from 'react-redux';
import {ownPropsToArray} from "../utils/jsUtils";
import AssistantCardGroup from "../components/assistants/AssistantCardGroup";

const mapStateToProps = state => {
  let assistants = ownPropsToArray(state.entities.assistants);

  return {
    loading: state.login.loading,
    assistants: assistants
  };
};

const mapDispatchToProps = () => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AssistantCardGroup);
