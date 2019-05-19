const defaultStyles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    formColumn: {
        display: 'inline-flex',
        flexDirection: 'column'
    },
    formRow: {
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    formControl: {
        minWidth: 120,
    },
    textField: {
        marginLeft: theme.spacing.unit,
    },
    textFieldLabel: {
        marginLeft: theme.spacing.unit
    },
    buttonIcon: {
        paddingLeft: -2 * theme.spacing.unit
    },
    button: {
        margin: theme.spacing.unit
    },
    input: {
        display: 'none'
    },
    numberInput: {
        "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
            "-webkit-appearance": "none",
            margin: 0
        }
    }
});

export default defaultStyles;
