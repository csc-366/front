import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TagField from './TagField';
import Button from '@material-ui/core/Button';
import defaultStyles from "../../../defaultStyles";

class TagManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: this.props.count,
            tags: {},
            handleTags: props.handleTags
        };
    }

    handleTag = (tagKey) => (number, color, position, isNew) => {
        const tags = {...this.state.tags, [tagKey]: {number, color, position, isNew}};
        this.setState({tags}, () => {
            this.state.handleTags(this.state.tags);
        })
    };

    renderFields = (count) => {
        let fields = [];
        for (let i = 0; i < count; i++) {
            fields.push(<TagField key={i} keyId={i} handleTag={this.handleTag(i)}/>)
        }
        return fields;
    };

    addTag = () => {this.setState({count: this.state.count + 1})};
    removeTag = () => {this.setState({count: (this.state.count === 0) ? 0 : this.state.count - 1})};

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.formColumn}>
                {this.renderFields(this.state.count)}
                <div className={classes.formRow}>
                    <Button
                        color={"primary"}
                        onClick={this.addTag}
                        className={classes.button}
                    >
                        Add Tag
                    </Button>
                    <Button
                        color={"secondary"}
                        onClick={this.removeTag}
                        className={classes.button}
                    >
                        Remove Tag
                    </Button>
                </div>

            </div>
        )
    }
}

TagManager.propTypes = {
    classes: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    handleTags: PropTypes.func.isRequired
};

export default withStyles(defaultStyles)(TagManager);
