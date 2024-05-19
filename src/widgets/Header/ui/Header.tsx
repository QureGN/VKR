
import React, { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { sharedConfigRoutes } from '../../../shared/config'; 
import mainLogo from "./Group.png";
import "./HeaderStyle.css"
import { ButtonHeaderUi } from '../../../features/ButtonHeader'; 
const { ButtonHeader } = ButtonHeaderUi;


const {RouteName} = sharedConfigRoutes;


enum DropDownActions {
    LOGIN = 'login',
    REGISTRATION = 'registration',
    LOGOUT = 'logout'
}

export const Header: FunctionComponent = () => {
    const isUserAuth = true;
    const navigate = useNavigate();

    const handleLoginClick = () => navigate(RouteName.AUTH);
    const handleRegistrationClick = () => navigate(RouteName.REGISTRATION);

    const handleSignOutClick = async () => {
        <div>logout</div>
    };

    const actionByType = {
        [DropDownActions.LOGIN]: handleLoginClick,
        [DropDownActions.REGISTRATION]: handleRegistrationClick,
        [DropDownActions.LOGOUT]: handleSignOutClick
    };

    const handleDropDownMenuClick = (actionType: DropDownActions) => {
        actionByType[actionType]();
    };

    return (
        <div className="navbar">
            <img src={mainLogo} />
            <div>
                {/* <ButtonHeader/> */}
            </div>
        </div>
    );
};