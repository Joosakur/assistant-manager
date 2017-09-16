import React from 'react';
import PropTypes from 'prop-types';
import {Button} from "semantic-ui-react";

const DayControls = ({copy, paste, copyActive, copyEnabled, pasteEnabled}) => {
    return (
        <div className="day-control-group">
          <Button icon='copy'  size="mini" basic className={"day-control-btn" + (copyActive ? " copied" : "")}
                  onClick={copy}  disabled={!copyEnabled}/>
          <Button icon='paste' size="mini" basic className="day-control-btn"
                  onClick={paste} disabled={!pasteEnabled}/>
        </div>
    );
};

DayControls.propTypes = {
    //foobar: PropTypes.string.isRequired
};

export default DayControls;

