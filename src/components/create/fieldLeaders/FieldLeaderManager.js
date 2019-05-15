import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import FieldLeaderField from './FieldLeaderField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon'
import defaultStyles from "../../../defaultStyles";

class FieldLeaderManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: props.count,
            leaders: {},
            handleLeaders: props.handleLeaders
        };
    }

    handleLeader = (leaderKey) => (leader) => {
        const leaders = {...this.state.leaders,[leaderKey]: leader};
        this.setState({leaders}, () => {
            this.state.handleLeaders(this.state.leaders)
        });
    };

    renderFields = (count) => {
        let fields = [];
        for (let i = 0; i < count; i++) {
            fields.push(<FieldLeaderField key={i} keyId={i} handleLeader={this.handleLeader(i)}/>)
        }
        return fields;
    };

    addFieldLeader = () => {this.setState({count: (this.state.count === 4) ? 4 : this.state.count + 1})};
    removeFieldLeader = () => {this.setState({count: (this.state.count === 1) ? 1 : this.state.count - 1})};

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.formRow}>
                {this.renderFields(this.state.count)}
                <div className={classes.formRow}>
                    <Button
                        color={"primary"}
                        onClick={this.addFieldLeader}
                        className={classes.button}
                    >
                        <Icon>add</Icon>
                    </Button>
                    <Button
                        color={"secondary"}
                        onClick={this.removeFieldLeader}
                        className={classes.button}
                    >
                        <Icon>remove</Icon>
                    </Button>
                </div>

            </div>
        )
    }
}

FieldLeaderManager.propTypes = {
    classes: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    handleLeaders: PropTypes.func.isRequired
};

export default withStyles(defaultStyles)(FieldLeaderManager);
