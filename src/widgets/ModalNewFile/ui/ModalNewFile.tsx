import React, { FunctionComponent, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react';
import {Select, SelectItem} from "@nextui-org/react";
import { uploadInMinio, createTree } from '../../../shared/api';
import * as Papa from 'papaparse';
import { useParams } from 'react-router-dom';
import { BinaryTypes, selectBinaryFiles, newBinaryFiles } from "../../../entities/Files";
import { useAppDispatch, useAppSelector } from "../../../shared/lib/store";
import { TreeTypes, selectTree, newTreeFiles } from "../../../entities/Tree"; 
import { getTokenFromCookie } from "../../../entities/User";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    place: string;
    folder: string
}

export const formats = [
    {label: "obj", value: "obj"},
    {label: "las", value: "las"},
    {label: "csv", value: "csv"},
]

export const ModalNewFile: FunctionComponent<ModalProps> = ({ isOpen, onClose, place, folder }) => {

    const [selectedFormat, setselectedFormat] = useState<string>('')
    const [selectedFile, setSelectedFile] = useState(null);
    const { folderId } = useParams<{ folderId: string }>();
    const dispatch = useAppDispatch()

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = async (event) => {
        const token =  getTokenFromCookie()
        if (selectedFormat == "csv"){
            if (selectedFile.type !== 'text/csv') {
                alert('Неверный формат файла');
                return;
            }
            
            const file = selectedFile;
            // if (file.type !== selectedFormat) {
            //     alert('Неверный формат файла');
            //     return;
            //     }
            const reader = new FileReader();
           
            reader.onload = function(e) {
                const csv = e.target.result;
                const jsonData = Papa.parse(csv, { header: true }).data;
                console.log(jsonData);
                jsonData.map(tree => {
                    tree.folder_pk = folderId
                    createTree(token, tree).then((response)=>{
                        dispatch(newTreeFiles(response.data))
                    })
                })
            };

            reader.readAsText(file);
            onClose()

        }else{
            //  для двличных файлов
            if (selectedFile.name.split(".")[1] !== 'obj' && selectedFile.name.split(".")[1] !== 'las') {
                alert('Неверный формат файла');
                
                return;
            }
            const file = selectedFile
             // Проверка типа файла
            
            
            const formData = new FormData();
            formData.append('file', file);
            try {
                const response = await uploadInMinio(folder, token, formData);
                console.log(response.data)
                dispatch(newBinaryFiles(response.data.files))
                onClose()
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        };
    }
        
        
    

    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Загрузить файл</ModalHeader>
                    
                    <ModalBody>
                        {/* <Input
                            type = "file"
                            
                            color="success" 
                            variant="bordered"
                            placeholder="Новый файл"
                            onChange={handleFileChange}
                            
                        /> */}
                         <input type="file" onChange={handleFileChange}/>

                    </ModalBody>
                    <ModalBody>
                    <Select 
                            label="Выберете формат" 
                            className="max-w-xs" 
                            variant="bordered"
                            color='success'
                            
                        >
                            {formats.map((format) => (
                            <SelectItem key={format.value} value={format.value} onClick={() => setselectedFormat(format.value)}>
                                {format.label}
                            </SelectItem>
                            ))}
                        </Select>
                    </ModalBody>
                        
                    <ModalFooter>
                        <Button color="primary" variant="flat" onClick={onClose} >
                            Отмена
                        </Button>
                        <Button color="success" onClick={(event) => handleFileUpload(event)}>
                            ОК
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
        
    );
};

export default ModalNewFile;