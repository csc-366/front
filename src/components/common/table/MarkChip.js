import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

import defaultStyles from '../../../defaultStyles';

const MarkChip = ({number, position}) => {
    return (
        <Chip label={`${number}@${position}`}/>
    );
};

MarkChip.propTypes = {
    number: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
};

export default withStyles(defaultStyles)(MarkChip);
