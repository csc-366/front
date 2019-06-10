import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

import defaultStyles from '../../../defaultStyles';

const MarkChip = ({number, position}) => {
    return (
        <Chip label={`${number ? number : '?'}@${position ? position : '?'}`}/>
    );
};

MarkChip.propTypes = {
    number: PropTypes.string,
    position: PropTypes.string,
};

export default withStyles(defaultStyles)(MarkChip);
