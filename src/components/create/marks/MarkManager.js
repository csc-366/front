import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import MarkField from './MarkField';
import Button from '@material-ui/core/Button';
import defaultStyles from "../../../defaultStyles";

class MarkManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: props.count,
            marks: {},
            handleMarks: props.handleMarks
        };
    }

    handleMark = (markKey) => (number, position, isNew) => {
        const marks = {...this.state.marks,[markKey]: {number, position, isNew}};
        this.setState({marks}, () => {
            this.state.handleMarks(this.state.marks)
        });
    };

    renderFields = (count) => {
        let fields = [];
        for (let i = 0; i < count; i++) {
            fields.push(<MarkField key={i} keyId={i} handleMark={this.handleMark(i)}/>)
        }
        return fields;
    };

    addMark = () => {this.setState({count: this.state.count + 1})};
    removeMark = () => {this.setState({count: (this.state.count === 0) ? 0 : this.state.count - 1})};

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.formColumn}>
                {this.renderFields(this.state.count)}
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
    handleMarks: PropTypes.func.isRequired
};

export default withStyles(defaultStyles)(MarkManager);