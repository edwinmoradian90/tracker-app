import React from 'react';

const HeaderView = props => {
    const { pageName } = props;
    return (
        <div className="headerView">
            {pageName}
        </div>
    );
};

export default HeaderView;