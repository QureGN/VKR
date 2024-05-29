
import { FunctionComponent } from "react";
import React, {useCallback, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { FaFolder } from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import { FaPen } from "react-icons/fa";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input} from "@nextui-org/react";
import "./FolderCard.css";
import { ModalRenameFolderUi } from "../../ModalRenameFolder";
import { sharedConfigRoutes } from "../../../shared/config";
import { MdDelete } from "react-icons/md";
import { deleteFolder } from "../../../shared/api";
import { BinLib } from "../../../entities/Files";
import { useAppDispatch, useAppSelector } from "../../../shared/lib/store";
import { removeFolder, changeFolder, selectFolder, FolderTypes } from "../../../entities/Folders"; 
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, } from "@nextui-org/react";
import { getTokenFromCookie } from "../../../entities/User";



const { RouteName } = sharedConfigRoutes;

// import { StartPage } from "./pages/StartPage/ui"

const { BINARY } = RouteName;

interface Folder {
    pk: number;
    name_folder: string;
}

interface FolderComponentProps {
    folder: Folder;
    key: number;
}

const {ModalRenameFolder} = ModalRenameFolderUi;
export const FolderCard: FunctionComponent<FolderComponentProps> = (props) =>{

    const dispatch = useAppDispatch()
    const {folder} = props;
    const navigate = useNavigate();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [open, setOpen] = useState(false);
    const [act, setAct] = useState("")
    
    const handleClick = (click:string) => {
        setOpen(true);
        onOpenChange();
        setAct(click)
    }

    const handleClickDelete = () => {
        const token = getTokenFromCookie()
        deleteFolder<FolderTypes>(folder.pk, folder.name_folder, token)
        .then((response) => {
            dispatch(removeFolder({ pk: folder.pk }));
            console.log('Папка успешно удалена:', response.data);
        })
        .catch((error) => {
            console.error('Ошибка при удалении папки:', error);
        });
        
    }

    const GoToPageWithFiled = (event) => {
      
        const folderId = folder.pk
        navigate({ pathname: BinLib.getBinPageUrl({ folderId }) });
    };
    

    return (
        <div>
            <div className="card" > 
                <div onClick={GoToPageWithFiled}>
                    <FaFolder/>
                    
                </div>
                <div onClick={GoToPageWithFiled} className="stroke">
                    <h1>{folder.name_folder}</h1>
                    
                    
                </div>
                {/* <MdDelete onClick={handleClickDelete}/>
                <FaPen onClick={() => handleClick("edit")}/> */}
                <ModalRenameFolder isOpen={isOpen} onClose={onOpenChange} folder={folder} act={act}/>

                <Dropdown>
                    <DropdownTrigger>
                        
                       {/* <FiMoreVertical /> */}
                       {/* <IoMdMore/> */}
                       <div font-size="20px">...</div>
                    </DropdownTrigger>
                    <DropdownMenu 
                        
                    >
                        <DropdownItem key="downloadFileFromMinio" onClick={() => handleClick("edit")}>Изменить название</DropdownItem>
                        <DropdownItem key="downloadFileFromMinio" onClick={() => handleClick("share")}>Поделиться доступом</DropdownItem>
                        
                        <DropdownItem key="handleClickDelete" onClick={handleClickDelete} className="text-danger" color="danger">
                         Удалить
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>

            
        </div>)
}

export default FolderCard;