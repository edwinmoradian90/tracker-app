import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { IoIosArrowForward } from 'react-icons/io';
import { cleanDate } from '../../utils/helpers/generalHelpers';
import {
    white,
    black,
    medGrey,
    lightGrey,
    line,
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
    height: calc(812px - 118px);
`;

const StyledLink = styled(Link)`
    animation: ${dropdown} .7s 1; 
    align-items: center;
    background: ${white};
    border-bottom: 1px solid ${line};
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

const NoTrackers = styled.div`
    color: ${medGrey};
    display: flex;
    justify-content: center;
    margin-top: 20px;
    opacity: .7;
`;

const TrackersView = props => {
    const { trackers } = props;

    return (
        <TrackersContainer className="trackersView">
            {
                trackers.length > 0
                    ?
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
                    :
                    <NoTrackers className="noTrackers">You have no trackers yet.</NoTrackers>
            }
        </TrackersContainer>
    );
};

TrackersView.propTypes = {
    trackers: PropTypes.array,
};

export default TrackersView;