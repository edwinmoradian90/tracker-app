import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { IoIosArrowForward } from 'react-icons/io';
import { cleanDate } from '../../utils/generalHelpers';
import {
    white,
    black,
    darkGrey,
    medGrey,
    grey,
    lightGrey
} from '../../utils/colors/main';

const dropdown = keyframes`
    from { 
        margin-bottom: 300px;
    }

    to {
        margin-bottom: 0;
    }
`;

const TrackersContainer = styled.div`
    background: ${lightGrey};
    height: calc(100vh - 70px);
`;

const StyledLink = styled(Link)`
    animation: ${dropdown} .7s 1; 
    align-items: center;
    background: ${white};
    border-bottom: 1px solid lightgray;
    display: flex;
    height: 50px;
    justify-content: space-between;
    text-decoration: none;
`;

const ListItem = styled.li`
    align-items: center;
    color: ${black};
    display: flex;
    font-size: 13px;
    height: 40px;
    margin-left: 20px;
    opacity: .7;
`;

const ForwardIcon = styled.div`
    align-items: center;
    color: ${medGrey};
    display: flex;
    height: 40px;
    opacity: .7;
    margin-right: 20px;
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