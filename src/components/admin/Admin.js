import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import defaultStyles from "../../defaultStyles";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import NewLocation from "./formOptions/NewLocation";
import NewPosition from "./formOptions/NewPosition";
import NewColor from "./formOptions/NewColor";
import NewRookery from "./formOptions/NewRookery";
import NewAgeClass from "./formOptions/NewAgeClass";
import NewAffiliation from "./formOptions/NewAffiliation";
import Header from "../common/Header";

const styles = theme => ({
    ...defaultStyles(theme),
    root: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',

        height: '100vh',

        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        padding: theme.spacing.unit * 3,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        display: 'flex',
        flexDirection: 'column',
        width: '60%'
    },
    formContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    formRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    textField: {
        flexGrow: 1
    },
    button: {
        margin: theme.spacing.unit,
        alignSelf: 'center'
    },
    options: {
        width: '100%',
        alignSelf: 'center'
    }
});

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: 'locations',
        }
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    renderForm = () => {
        switch (this.state.selectedOption) {
            case 'locations':
                return (<NewLocation/>);
            case 'positions':
                return (<NewPosition/>);
            case 'colors':
                return (<NewColor/>);
            case 'rookeries':
                return (<NewRookery/>);
            case 'ageClasses':
                return (<NewAgeClass/>);
            case 'affiliations':
                return (<NewAffiliation/>);
            default:
                return null
        }
    };

    render() {
        const {classes} = this.props;
        return (
            <>
                <Header/>
                <div className={classes.root}>
                    <Paper className={classes.paper}>
                        <Typography variant={"h2"}>Administration</Typography>
                        <Select
                            value={this.state.selectedOption}
                            onChange={(e) => this.setState({selectedOption: e.target.value})}
                            className={classes.options}
                        >
                            <MenuItem value={"locations"}>Locations</MenuItem>
                            <MenuItem value={"positions"}>Positions</MenuItem>
                            <MenuItem value={"colors"}>Colors</MenuItem>
                            <MenuItem value={"rookeries"}>Rookeries</MenuItem>
                            <MenuItem value={"ageClasses"}>Age Classes</MenuItem>
                            <MenuItem value={"affiliations"}>Affiliations</MenuItem>
                        </Select>
                        {this.renderForm()}
                    </Paper>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        ...state.formOptions
    }
};

export default connect(mapStateToProps)(withStyles(styles)(Admin));