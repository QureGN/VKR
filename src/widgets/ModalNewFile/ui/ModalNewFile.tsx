import React, { FunctionComponent, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react';
import {Select, SelectItem} from "@nextui-org/react";
import { uploadInMinio, createTree } from '../../../shared/api';
import * as Papa from 'papaparse';
import { useParams } from 'react-router-dom';
import { BinaryTypes, selectBinaryFiles, newBinaryFiles } from "../../../entities/Files";
import { useAppDispatch, useAppSelector } from "../../../shared/lib/store";
import { TreeTypes, selectTree, newTreeFiles } from "../../../entities/Tree"; 

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
        
        if (selectedFormat == "csv"){
            const file = selectedFile;
            const reader = new FileReader();

            reader.onload = function(e) {
                const csv = e.target.result;
                const jsonData = Papa.parse(csv, { header: true }).data;
                console.log(jsonData);
                jsonData.map(tree => {
                    dispatch(newTreeFiles(tree))
                    createTree(tree)
                })
            };

            reader.readAsText(file);
            onClose()

        }else{
            //  для двличных файлов
            const file = selectedFile
            const formData = new FormData();
            formData.append('file', file);
            try {
                const response = await uploadInMinio(folder, formData);
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