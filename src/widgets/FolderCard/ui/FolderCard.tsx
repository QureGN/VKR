
import { FunctionComponent } from "react";
import React, {useCallback, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { FaFolder } from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import { FaPen } from "react-icons/fa";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input} from "@nextui-org/react";
import "./FolderCard.css";
import { ModalNewFolderUi } from "../../ModalNewFolder";
import { sharedConfigRoutes } from "../../../shared/config";

const { RouteName } = sharedConfigRoutes;

// import { StartPage } from "./pages/StartPage/ui"

const { BINARY } = RouteName;

interface Folder {
    pk: number;
    plot: string;
}

interface FolderComponentProps {
    folder: Folder;
    key: number;
}

const {ModalNewFolder} = ModalNewFolderUi;
export const FolderCard: FunctionComponent<FolderComponentProps> = (props) =>{

    const {folder} = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [open, setOpen] = useState(false);
    
    const handleClick = () => {
        setOpen(true);
        onOpenChange();
        
    }

    const GoToPageWithFiled = useCallback(() => {
        navigate(BINARY);
    }, [navigate]);

    return (
        <div>
            <div className="card" onClick={GoToPageWithFiled}>
                <FaFolder/>
                <h1>{folder.plot}</h1>
                <FaPen onClick={handleClick}/>
                <ModalNewFolder isOpen={isOpen} onClose={onOpenChange} place={folder.plot}/>
                
            </div>

            
        </div>)
}

export default FolderCard;