import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import defaultStyles from '../../../defaultStyles';

const styles = theme => {return {...defaultStyles(theme)}};

class FieldLeaderField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: props.keyId,
            leader: '',
            handleLeader: props.handleLeader
        }
    }

    handleChange = (event) => {
        this.setState({leader: event.target.value}, () => {
            this.state.handleLeader(this.state.leader)
        });
    };

    render() {
        const {classes} = this.props;
        return (
            <div key={this.state.key} className={classes.formRow}>
                <TextField
                    id={"fieldLeader"}
                    label={"Field Leader"}
                    className={classes.textField}
                    value={this.state.leader}
                    onChange={this.handleChange}
                />
            </div>
        )
    }
}

FieldLeaderField.propTypes = {
    classes: PropTypes.object.isRequired,
    keyId: PropTypes.number.isRequired,
    handleLeader: PropTypes.func.isRequired
};

export default withStyles(styles)(FieldLeaderField);
