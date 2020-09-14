import React from 'react';
import HeaderView from './HeaderView';

const Header = props => {
    const { pageName } = props;
    return (
        <HeaderView {...props} pageName={pageName} />
    );
};

export default Header;