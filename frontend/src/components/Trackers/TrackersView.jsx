import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IoIosArrowForward } from 'react-icons/io';
import { cleanDate } from '../../utils/generalHelpers';
import {
    white,
    black,
    darkGrey,
    grey,
    lightGrey
} from '../../utils/colors/main';

const TrackersContainer = styled.div`
    background: ${lightGrey};
    height: 100vh;
`;

const StyledLink = styled(Link)`
    align-items: center;
    background: ${white};
    border-bottom: 1px solid lightgray;
    display: flex;
    height: 50px;
    justify-content: space-around;
    text-decoration: none;
`;

const ListItem = styled.li`
    align-items: center;
    color: ${black};
    display: flex;
    height: 40px;
`;

const ForwardIcon = styled.div`
    align-items: center;
    color: ${darkGrey};
    display: flex;
    height: 40px;
`;

const TrackersView = props => {
    const { trackers } = props;
    return (
        <TrackersContainer className="trackersView">
            <ul className="allTrackers">
                {trackers ? trackers.map((tracker, i) => {
                    const { created_at, id } = tracker;
                    return (
                        <StyledLink key={i} to={`/trackers/${id}`}>
                            <ListItem key={i} className="trackerInfo">
                                {cleanDate(created_at)}
                            </ListItem>
                            <ForwardIcon className="forwardIcon">
                                <IoIosArrowForward />
                            </ForwardIcon>
                        </StyledLink>
                    );
                })
                    :
                    null
                }
            </ul>
        </TrackersContainer>
    );
};

export default TrackersView;