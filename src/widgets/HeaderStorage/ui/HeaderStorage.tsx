
import React, { FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sharedConfigRoutes } from '../../../shared/config';
import mainLogo from "./Group.png";
import "./HeaderStorage.css"
import {Avatar} from "@nextui-org/react";
import { ButtonHeaderUi } from '../../../features/ButtonHeader';
import {Button} from "@nextui-org/react";
import {Link} from "@nextui-org/react";
import { LuLogOut } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { GrStorage } from "react-icons/gr";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Input} from "@nextui-org/react";
import { ModalNewFolderUi } from '../../ModalNewFolder';
import { ModalNewFileUi } from '../../ModalNewFile';
import { ButtonHeaderStorageUi } from '../../../features/ButtonHeaderStorage';

const {ButtonHeaderStorage} = ButtonHeaderStorageUi;
const {ModalNewFile} = ModalNewFileUi;
const {ModalNewFolder} = ModalNewFolderUi;
const { ButtonHeader } = ButtonHeaderUi;
const {RouteName} = sharedConfigRoutes;
interface ButtonComponent {
    
    button: boolean;
    key: number;
    folderName: string
}


export const HeaderStorage: FunctionComponent<ButtonComponent> = (props) => {
   
    const {button, folderName} = props;
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [close, setClose] = useState(true);
    const [open, setOpen] = useState(false);
    
    const handleClick = () => {
        setOpen(true);
        onOpenChange();
        
    }

    return (
        <div className="wrapheader">
            <div className="navbarStorage">
                
            </div>
            <img src={mainLogo} />
            {/* <div className='avat'>
                <Avatar color="primary" name="ЮР" />
                <div className='log'>Выйти</div>
                <LuLogOut color="#D76445" size="20px" className='sv'/>
            </div> */}
           <ButtonHeaderStorage button ={button} key={1} folderName={folderName}/>
            <div className='storage'>
                <Link href="#" color="warning"> Хранилище <GrStorage color="#D76445" size="20px" className='plus'/>
                </Link>
            </div>
            
               
        </div>
    );
};