
import { FunctionComponent } from "react";
import React, {useCallback, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { FaFolder } from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import { FaPen } from "react-icons/fa";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input} from "@nextui-org/react";
import "./FileCard.css";
import { ModalNewFileUi } from "../../ModalNewFile";
import { sharedConfigRoutes } from "../../../shared/config";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaRegFile } from "react-icons/fa6";

const { RouteName } = sharedConfigRoutes;
const { BINARY } = RouteName;

interface File {
    pk: number;
    name: string;
    size: string;
}

interface FileComponentProps {
    file: File;
    key: number;
}

const {ModalNewFile} = ModalNewFileUi;
export const FileCard: FunctionComponent<FileComponentProps> = (props) =>{

    const {file} = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [open, setOpen] = useState(false);
    
    const handleClick = () => {
        setOpen(true);
        onOpenChange();
        
    }

    return (
        <div>
            <div className="card">
                <FaRegFile size="20px"/>
                <h1>{file.name}</h1>
                <h1>{file.size}</h1>
                <MdOutlineFileDownload size="25px"/>
                <FaPen onClick={handleClick}/>
                <ModalNewFile isOpen={isOpen} onClose={onOpenChange} place={file.name}/>
                
            </div>

            
        </div>)
}

export default FileCard;