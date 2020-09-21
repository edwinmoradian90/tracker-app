import React from 'react';
import styled from 'styled-components';
import { capitalizeFirstLetter } from '../../utils/helpers/generalHelpers';
import {
    white,
    blue,
    black,
    lightGrey,
    line,
    warningRed,
} from '../../utils/colors/main';
import { dropdown } from '../../utils/styles/generalStyles';
import { BiHelpCircle, BiEdit } from 'react-icons/bi';
import { GrPowerReset, GrLogout } from 'react-icons/gr';
import { TiDelete } from 'react-icons/ti';
import { IoIosPerson } from 'react-icons/io';

const ProfilePictureContainer = styled.section`
    align-items: center;
    background: ${white};
    border-bottom: 3px solid ${line};
    display: flex;
    height: 100px;
    opacity: .8;
    width: 100%;
    z-index: 10;
`;

const ProfilePicture = styled.div`
    align-items: center;
    background: ${lightGrey};
    border-radius: 50%;
    color: ${blue};
    display: flex;
    font-size: 25px;
    height: 50px;
    justify-content:center;
    margin-left: 20px;
    opacity: .7;
    width: 50px;
`;

const UserNameText = styled.div`
    color: ${black};
    font-size: 15px;
    margin-left: 20px;
    opacity: .7;
`;

const OptionsList = styled.ul`
    list-style: none;
`;

const OptionItem = styled.li`
    animation: ${dropdown} 1s 1;
    align-items: center;
    background: ${white};
    border-bottom: 1px solid ${line};
    color: ${props => props.deleteAccount ? 'lightcoral' : black};
    display: flex;
    font-size: 12px;
    font-weight: 300;
    height: 60px;
    padding: 0 20px;
    opacity: .7;
    &:hover {
        cursor: pointer;
    };
`;

const Icon = styled.span`
    align-items: center;
    color: ${props => props.deleteAccount ? warningRed : black};
    display: flex;
    font-size: 15px;
    font-weight: 300;
    margin-right: 15px;
    opacity: .7;
`;

const icons = [
    <BiHelpCircle />,
    <GrPowerReset />,
    <GrLogout />,
    <BiEdit />,
    <TiDelete />,
];

const MoreView = props => {
    const {
        moreOptions,
        confirmationToggle,
        selectConfirmation,
        user,
    } = props;
    const { firstName, lastName } = user;
    return (
        <div className="moreView">
            <ProfilePictureContainer className="profilePictureContainer">
                <ProfilePicture className="profilePicture">
                    <IoIosPerson />
                </ProfilePicture>
                <UserNameText className="userNameText">
                    {capitalizeFirstLetter(firstName)}{" "}
                    {capitalizeFirstLetter(lastName)}
                </UserNameText>
            </ProfilePictureContainer>
            <section className="moreOptionsContainer">
                <OptionsList className="moreOptionsList">
                    {
                        moreOptions.map((option, i) => {
                            return (
                                <OptionItem
                                    id={i}
                                    onClick={i === 2 || i === 4
                                        ?
                                        () => {
                                            confirmationToggle(true);
                                            selectConfirmation(i);
                                        }
                                        :
                                        null
                                    }
                                    deleteAccount={i === 4}
                                    key={option}
                                    className="optionItem"
                                >
                                    <Icon deleteAccount={i === 4}>
                                        {icons[i]}
                                    </Icon>
                                    {option}
                                </OptionItem>
                            );
                        })
                    }
                </OptionsList>
            </section>
        </div >
    );
};

export default MoreView;