import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {FieldArray} from 'redux-form';
import MarkField from './MarkField';
import defaultStyles from "../../../defaultStyles";

class MarkManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: props.count,
        };
    }

    renderFields = (count) => ({fields}) => {
        for(let i = 0; i < (count - fields.length); i++) {
            fields.push({
                number: '',
                position: '',
                isNew: false
            })
        }
        for (let i = (fields.length - count); i > 0; i--) {
            fields.remove(fields.length - 1)
        }

        return fields.map((field, index) => {
            return (<MarkField key={index} name={field}/>)
        });
    };

    addMark = () => {this.setState({count: this.state.count + 1})};
    removeMark = () => {this.setState({count: (this.state.count === 0) ? 0 : this.state.count - 1})};

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.formColumn}>
                <FieldArray name={"marks"} component={this.renderFields(this.state.count)}/>
                <div className={classes.formRow}>
                    <Button
                        color={"primary"}
                        onClick={this.addMark}
                        className={classes.button}
                    >
                        Add Mark
                    </Button>
                    <Button
                        color={"secondary"}
                        onClick={this.removeMark}
                        className={classes.button}
                    >
                        Remove Mark
                    </Button>
                </div>

            </div>
        )
    }
}

MarkManager.propTypes = {
    classes: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
};

export default withStyles(defaultStyles)(MarkManager);