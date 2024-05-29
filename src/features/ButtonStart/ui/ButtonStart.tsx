import "./ButtonStart.css"
import React, { FunctionComponent, useState } from 'react';
import { Link } from "react-router-dom";
import { sharedConfigRoutes } from "../../../shared/config";
const { RouteName } = sharedConfigRoutes;
import { useNavigate } from 'react-router-dom';
const {  FOLDER } = RouteName;
import { Login, Registration } from "../../../shared/api";
import { useAppDispatch, useAppSelector } from "../../../shared/lib/store";
import { addToUser } from "../../../entities/User"; 
import { Email } from "@mui/icons-material";


interface ButtonProps{
    name: string
    click: string,
    style: string,
    data: object
}

interface LoginProps{
    user_id: number,
    email: string,
    username: string,
    access_token: string
}


export const ButtonStart: FunctionComponent<ButtonProps> = ({name, click, style, data}) => {
    
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const functions = {
        start: () => {
            navigate("/folders")
            // Дополнительная логика для функции start
        },
        login: () => {
            Login<LoginProps>(data)
            .then((user)=>{
                    // Установка токена в cookies с флагом HttpOnly
                document.cookie = `jwt_token=${user.data.access_token};`;
                const userStore = {pk: user.data.user_id, email: user.data.email, username: user.data.username }
                dispatch(addToUser(userStore))
                navigate("/folders")
            })
            .catch(error => {
                alert("Неправильный логин или пароль");
                console.error('Ошибка:', error);
            });
        },
        register: () => {
            if (data.password == data.password1){
                Registration<LoginProps>(data)
                .then((user)=>{
                    // Установка токена в cookies с флагом HttpOnly
                    document.cookie = `jwt_token=${user.data.access_token};`;
                    const userStore = {pk: user.data.user_id, email: user.data.email, username: user.data.username }
                    dispatch(addToUser(userStore))
                    navigate("/folders")
                })
                .catch(error => {
                    alert("Такой пользователь уже существует");
                    console.error('Ошибка:', error);
                });
            }
            else{
                alert("Пароли не совпадают")
            }
            }
            
        // Другие функции по необходимости
    };

    const handleClick = () => {
        if (functions[click] && typeof functions[click] === 'function') {
            functions[click]();
        } else {
            console.error(`Функция ${click} не найдена или не является функцией`);
        }
    }
    return <div>
        <div className={style} onClick={handleClick} >
            <div className="text-button">{name}</div>
        
        </div>
        
    </div>;
}