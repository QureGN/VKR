
import { FunctionComponent, useEffect } from "react";
import React, {useCallback, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { FaFolder } from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import { FaPen } from "react-icons/fa";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, } from "@nextui-org/react";
import "./FileCard.css";
import { ModalNewFileUi } from "../../ModalNewFile";
import { sharedConfigRoutes } from "../../../shared/config";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaRegFile } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { deleteInMinio, getBiknFileByName } from "../../../shared/api";
import axios from 'axios';
import { saveAs } from 'file-saver';
import { useAppDispatch, useAppSelector } from "../../../shared/lib/store";
import { BinaryTypes, selectBinaryFiles, addToBinaryFiles, removeBinaryFiles } from "../../../entities/Files";

import { IoMdMore } from "react-icons/io";
const { RouteName } = sharedConfigRoutes;
const { BINARY } = RouteName;

interface File {
    pk: number;
    name: string;
    size: number;
    last: Date,
}

interface FileComponentProps {
    file: File;
    key: number;
    folder: string
    size: string,
}


interface TreeFiles{
    pk: number, 
    folder_pk: number,
    name_tree: string,
    breed: string,
    age: number,
    diameter: number,
    height: null, 
    coordinate_X: number, 
    coordinate_Y: number
}

interface FileTreeComponentProps {
    file: TreeFiles,
    key: number,
    
    
}

const {ModalNewFile} = ModalNewFileUi;
export const FileCard: FunctionComponent<FileComponentProps> = (props) =>{

    const {file, folder, size} = props;
    const navigate = useNavigate();
    
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [open, setOpen] = useState(false);
    const dateString = file.last;
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toLocaleDateString();
    
    const dispatch = useAppDispatch()
    const handleClick = () => {
        setOpen(true);
        onOpenChange();
        
    }
    // useEffect(() => {
    //     const suffixes = ["Б", "КБ", "МБ", "ГБ"];
    //     let i = 0;
    //     let fileSize = file.size; // Размер файла в байтах

    //     while (fileSize >= 1024 && i < suffixes.length - 1) {
    //         fileSize /= 1024.0;
    //         i += 1;
    //     }

    //     setSize(`${fileSize.toFixed(2)} ${suffixes[i]}`);
    // }, []);

    const handleClickDelete = () => {
        dispatch(removeBinaryFiles({name: file.name}))
        deleteInMinio(folder, file.name)
        .then((response) => {
            console.log('Файл успешно удален:', response.data);
        })
        .catch((error) => {
            console.error('Ошибка при удалении файла:', error);
        });
        
    }

    const downloadFileFromMinio = async () => {
        try {
            const response = await axios.get(`/download/${folder}/${file.name}/`, {
              responseType: 'blob',
            });
        
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            saveAs(blob, file.name);
          } catch (error) {
            console.error('Error downloading file:', error);
          }
}

    return (
        <div>
            
            <div className="card">
                <FaRegFile size="20px"/>
                <div className="stroke">
                    <h1>{file.name}</h1>
                </div>
                <div className="stroke">
                    <h1>{size} </h1>
                </div>
                <div  className="stroke">
                    <h1>{formattedDate}</h1>
                </div>
                
                
                {/* <MdOutlineFileDownload size="25px" onClick={downloadFileFromMinio}/>
                <FaPen onClick={handleClick}/>
                <ModalNewFile isOpen={isOpen} onClose={onOpenChange} place={file.name} folder={folder}/>
                <MdDelete onClick={handleClickDelete}/> */}
                <Dropdown>
                    <DropdownTrigger>
                        
                       {/* <FiMoreVertical /> */}
                       {/* <IoMdMore/> */}
                       <div font-size="20px">...</div>
                    </DropdownTrigger>
                    <DropdownMenu 
                        
                    >
                        <DropdownItem key="downloadFileFromMinio" onClick={downloadFileFromMinio}>Скачать файл</DropdownItem>
                        
                        <DropdownItem key="handleClickDelete" onClick={handleClickDelete} className="text-danger" color="danger">
                        Удалить
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>

            
        </div>)
}

export default FileCard;