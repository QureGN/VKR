import "./ButtonHeaderStorage.css"
import React, { FunctionComponent, useState } from 'react';
import { Link } from "react-router-dom";
import { sharedConfigRoutes } from "../../../shared/config";
import {Button} from "@nextui-org/react";
import { ModalNewFolderUi } from "../../../widgets/ModalNewFolder";
import { ModalNewFileUi } from '../../../widgets/ModalNewFile';
import { ModalNewBinaryFileUi } from "../../../widgets/ModalNewBinaryFile";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Input} from "@nextui-org/react";
import { FaPlus } from "react-icons/fa6";

const {ModalNewBinaryFile} = ModalNewBinaryFileUi
const {ModalNewFile} = ModalNewFileUi;
const {ModalNewFolder} = ModalNewFolderUi;
const { RouteName } = sharedConfigRoutes;

const { STORAGE, START_PAGE, AUTH, REGISTRATION, FOLDER, TREES, BINARY } = RouteName;
interface ButtonComponent {
    
    button: boolean;
    key: number;
    folderName: string
}
export const ButtonHeaderStorage: FunctionComponent<ButtonComponent> = (props) => {
    const {button, key, folderName} = props;
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [close, setClose] = useState(true);
    const [open, setOpen] = useState(false);
    
    const handleClick = () => {
        setOpen(true);
        onOpenChange();
        
    }

    return <div>
        <div className="wrap">
            {button ? 
                <div className='but'>
                    <Button color="primary" variant="bordered" onClick={handleClick}>
                        <div className="lalal">
                            Загрузить файл
                            
                        </div>
                        
                        <FaPlus/>
                        
                        {/* <ModalNewFile isOpen={isOpen} onClose={onOpenChange} place={"hh"} /> */}
                        {/* <ModalNewBinaryFile isOpen={isOpen} onClose={onOpenChange}/> */}
                    </Button>
                    <ModalNewFile isOpen={isOpen} onClose={onOpenChange} place={"hh"} folder={folderName}/>
                </div> 
                :
                <div className='but'>
                    <Button color="primary" variant="bordered" onClick={handleClick}>
                        <div className="lalal">
                            Создать папку
                            
                        </div>
                        
                        <FaPlus/>
                        
                    </Button>
                    <ModalNewFolder isOpen={isOpen} onClose={onOpenChange} place={"Введите название участка"}/>
          
                </div>
            }
        </div>
        
    </div>;
}