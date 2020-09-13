import React from 'react';
import HeaderView from './HeaderView';

const Header = props => {
    const { pageName } = props;
    return (
        <HeaderView pageName={pageName} />
    );
};

export default Header;