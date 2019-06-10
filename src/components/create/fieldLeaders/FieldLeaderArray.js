import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import FieldLeaderField from './FieldLeaderField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon'
import defaultStyles from "../../../defaultStyles";
import {FieldArray} from 'redux-form';

class FieldLeaderArray extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: (props.currentValue) ? props.currentValue.split(',').length : 1,
        };
    }

    componentDidUpdate(prevProps) {
        const pc = prevProps.currentValue;
        const cc = this.props.currentValue;

        if (pc !== cc) {
            this.setState({
                count: cc.split(',').length
            })
        }

    }

    addFieldLeader = () => {
        this.setState({count: (this.state.count === 4) ? 4 : this.state.count + 1})
    };
    removeFieldLeader = () => {
        this.setState({count: (this.state.count === 0) ? 0 : this.state.count - 1})
    };

    renderFields = (count) => ({fields}) => {
        for (let i = 0; i < (count - fields.length); i++) {
            fields.push('')
        }

        return fields.map((field, index) => {
            return (
                <FieldLeaderField key={index} name={field}/>
            )
        });
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.formRow}>
                <FieldArray name={"fieldLeaders"} component={this.renderFields(this.state.count)}/>
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

FieldLeaderArray.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(defaultStyles)(FieldLeaderArray);
