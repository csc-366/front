import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import defaultStyles from '../../../defaultStyles';
import {connect} from 'react-redux';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import {deleteValue} from "../../../actions/formOptions";

const styles = theme => ({
    ...defaultStyles(theme),
    list: {
        alignSelf: 'flex-start',
        overflow: 'auto',
        maxHeight: 300,
        width: '100%'
    },
    listItem: {
        backgroundColor: theme.palette.background.paper
    }
});

class ExistingOptionsList extends React.Component {
    handleDelete = (value) => () => {
        const {valueKey, deleteValue, optionsGroup} = this.props;
        deleteValue(optionsGroup, valueKey, value);
    };

    render() {
        const {classes, values, valueText, valueKey} = this.props;
        return (
            <List className={classes.list}>
                {values.map((value, index) => {
                    return (
                        <ListItem key={index} className={classes.listItem} button onClick={event => event.preventDefault()}>
                            <ListItemText>
                                {value[valueText]}
                            </ListItemText>
                            <ListItemSecondaryAction>
                                <IconButton onClick={this.handleDelete(value[valueKey])}>
                                    <Icon>delete</Icon>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )
                })}
            </List>
        )
    }
}

const mapStateToProps = state => {
    return {
        formOptions: state.formOptions
    };
};

export default connect(mapStateToProps, {deleteValue})(withStyles(styles)(ExistingOptionsList));
