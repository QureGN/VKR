import React, { FunctionComponent, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react';
import { createFolder, updateTree } from '../../../shared/api';

import { useParams } from 'react-router-dom';

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


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
   
}


interface newFolder {
    
    name: string;
    
  }
export const ModalNewBinaryFile: FunctionComponent<ModalProps> = ({ isOpen, onClose }) => {

    
    const { folderId } = useParams<{ folderId: string }>();
    // const newFolderData = { name_folder: plot };

    // const handleInputChange = (field: keyof TreeFiles, value: any) => {
    //     setTree((prevData) => ({
    //       ...prevData,
    //       [field]: value,
    //     }));
    //   };

    //   const handleClickOk = () => {
    //     updateTree<newFolder>(folderId, treeNew)
    //     .then((response) => {
    //         onClose()
    //         console.log('Дерево успешно изменено:', response.data);
    //     })
    //     .catch((error) => {
    //         console.error('Ошибка при изменении дерева:', error);
    //     });
    //   };
    // const handleClickOk = () => {
    //     createFolder<newFolder>(newFolderData)
    //     .then((response) => {
    //         console.log('Папка успешно создана:', response.data);
    //     })
    //     .catch((error) => {
    //         console.error('Ошибка при создании папки:', error);
    //     });
    //   };

    return (
        <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Редактировать дерево</ModalHeader>
                <ModalBody>
                
                  <input type="file"/>
                    
                    
                
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" variant="flat" onClick={onClose}>
                        Отмена
                    </Button>
                    <Button color="success" onClick={onClose}>
                        ОК
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ModalNewBinaryFile;