import React, { FunctionComponent, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react';
import { createFolder } from '../../../shared/api';
import { useAppDispatch, useAppSelector } from "../../../shared/lib/store";
import { newFolder, selectFolder, FolderTypes } from "../../../entities/Folders"; 


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    place: string;
}


interface newFolder {
    pk: number;
    name: string;
    
  }
export const ModalNewFolder: FunctionComponent<ModalProps> = ({ isOpen, onClose, place }) => {

    const [plot, setPlot] = useState<string>('ver1')
    const dispatch = useAppDispatch()
    const newFolderData = { name_folder: plot };



    const handleClickOk = () => {
        
        createFolder<newFolder>(newFolderData)
        .then((response) => {
            dispatch(newFolder(response.data))
            onClose()
            console.log('Папка успешно создана:', response.data);
        })
        .catch((error) => {
            console.error('Ошибка при создании папки:', error);
        });
      };

    return (
        <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Новая папка/Переименовать</ModalHeader>
                <ModalBody>
                <Input
                    autoFocus
                    color="success"
                    variant="bordered"
                    placeholder={place}
                    onChange={(event) => setPlot(event.target.value)}
                />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" variant="flat" onClick={onClose}>
                        Отмена
                    </Button>
                    <Button color="success" onClick={handleClickOk}>
                        ОК
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ModalNewFolder;