
import React, { FunctionComponent, useState } from 'react';
import { widgetHeaderUi } from "../../../widgets/Header"; 
import { ButtonStartUi } from "../../../features/ButtonStart";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react';

import { PiEyeSlashFill } from "react-icons/pi";
import { BsEyeSlashFill } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
const {Header} = widgetHeaderUi;
const {ButtonStart} = ButtonStartUi;
export const RegistrationPage: FunctionComponent =() => {
    
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");

    const data = {email: login, username: username, password: password, password1: password1}
    return (
        <div> 
            <Header/>
            <div className="cardLogin">

                <div className="Vhod"> Создание аккаунта</div>
                <div className='auth'>
                        
                    <Input
                        label="Имя"
                        autoFocus
                        color="success"
                        variant="bordered"
                        placeholder="Введете свое имя"
                        onChange={(e) => setUsername(e.target.value)}  
                    />
                </div>

                <div className='auth'>
                        
                    <Input
                        label="Email"
                        autoFocus
                        color="success"
                        variant="bordered"
                        placeholder="Введете почту"
                        onChange={(e) => setLogin(e.target.value)}  
                    />
                </div>
                <div className='auth'>
                        
                        
                    <Input
                        label="Пароль"
                        color="success"
                        variant="bordered"
                        placeholder="Введите пароль"
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                            {isVisible ? (
                                <BsEye className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <BsEyeSlashFill className="text-2xl text-default-400 pointer-events-none" />
                            )}
                            </button>
                        }
                        type={isVisible ? "text" : "password"}
                        className="max-w-xs"
                        onChange={(e) => setPassword(e.target.value)} 
                    />

                </div>

                <div className='auth'>
                        
                        
                    <Input
                            label="Пароль"
                            color="success"
                            variant="bordered"
                            placeholder="Введите пароль"
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                {isVisible ? (
                                    <BsEye className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <BsEyeSlashFill className="text-2xl text-default-400 pointer-events-none" />
                                )}
                                </button>
                            }
                            type={isVisible ? "text" : "password"}
                            className="max-w-xs"
                            onChange={(e) => setPassword1(e.target.value)} 
                        />

                        
                </div>
                <ButtonStart name={"Зарегистрироваться"} click="register" style="buttonAuth" data = {data}/>
        </div>
                
            
    </div>
    );
}