
import React, { FunctionComponent, useState } from 'react';
import { widgetHeaderUi } from "../../../widgets/Header"; 
import { ButtonStartUi } from "../../../features/ButtonStart";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react';
import "./LoginPage.css"
import { PiEyeSlashFill } from "react-icons/pi";
import { BsEyeSlashFill } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
const {Header} = widgetHeaderUi;
const {ButtonStart} = ButtonStartUi;
export const LoginPage: FunctionComponent =() => {
    
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const data = {email: login, password: password}
    
    return (
        <div> 
            <Header/>
            <div className="cardLogin" style={{ height: '400px' }}>

                <div className='center'>
                <div className="Vhod"> Вход </div>
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

                        <ButtonStart name={"Войти"} click="login" style="buttonAuth" data ={data}/>
                    </div>
                    
            </div>
                </div>
                
                
            
        </div>
    );
}