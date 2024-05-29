
import { FunctionComponent } from "react";
import React, {useCallback, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { FaFolder } from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import { FaPen } from "react-icons/fa";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,} from "@nextui-org/react";
import { sharedConfigRoutes } from "../../../shared/config";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaRegFile } from "react-icons/fa6";
import { ModalEditTreeUi } from "../../ModalEditTree";
import { ModalNewBinaryFileUi } from "../../ModalNewBinaryFile";
import { MdDelete } from "react-icons/md";
import { deleteTree } from "../../../shared/api";
import { useAppDispatch, useAppSelector } from "../../../shared/lib/store";
import { TreeTypes, selectTree, removeTreeFiles } from "../../../entities/Tree"; 
import { FiMoreVertical } from "react-icons/fi";
import { IoMdMore } from "react-icons/io";
import { getTokenFromCookie } from "../../../entities/User";

const {ModalNewBinaryFile} = ModalNewBinaryFileUi
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


interface TreeFiles{
    pk: number, 
    folder_pk: number,
    name_tree: string,
    breed: string,
    age: number,
    diameter: number,
    height: number, 
    coordinate_X: number, 
    coordinate_Y: number
}

interface FileTreeComponentProps {
    file: TreeTypes;
    key: number;
}

const {ModalEditTree} = ModalEditTreeUi;
export const TreeCard: FunctionComponent<FileTreeComponentProps> = (props) =>{

    const {file,} = props;
    const navigate = useNavigate();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch()

    const handleClick = () => {
        setOpen(true);
        onOpenChange();
        
    }

    const handleClickDelete = () => {
        const token = getTokenFromCookie()
        deleteTree(file.pk, token)
        .then((response) => {
            dispatch(removeTreeFiles({pk: file.pk}))
            console.log('Файл успешно удален:', response.data);
        })
        .catch((error) => {
            console.error('Ошибка при удалении файла:', error);
        });
        
    }

    return (
        <div>
            <div className="card">
                <FaRegFile size="20px"/>
                <div className="strokeTree">
                    <h1>{file.name_tree}</h1>
                </div>
                <div className="strokeTree">
                    <h1>{file.breed}</h1>
                </div>
                <div className="strokeTree">
                    <h1>{file.age}</h1>
                </div>
                <div className="strokeTree">
                    <h1>{file.diameter}</h1>
                </div>
                <div className="strokeTree">
                    <h1>{file.height}</h1>
                </div>
                <div className="strokeTree">
                    <h1>{file.coordinate_X}</h1>
                </div>
                <div className="strokeTree">
                    <h1>{file.coordinate_Y}</h1>
                </div>
                

                <ModalEditTree isOpen={isOpen} onClose={onOpenChange} tree={file}/>
                {/* <FaPen onClick={handleClick}/>
                
                <MdDelete onClick={handleClickDelete}/> */}
                <Dropdown>
                    <DropdownTrigger>
                        
                       {/* <FiMoreVertical /> */}
                        {/* <IoMdMore/> */}
                        <h1>...</h1>
                    </DropdownTrigger>
                    <DropdownMenu 
                        
                    >
                        <DropdownItem key="downloadFileFromMinio" onClick={handleClick}>Изменить</DropdownItem>
                        
                        <DropdownItem key="handleClickDelete" onClick={handleClickDelete} className="text-danger" color="danger">
                        Удалить
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>

            
        </div>)
}

export default TreeCard;