import React, { FunctionComponent, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react';
import { updateFolder } from '../../../shared/api';
import { useAppDispatch, useAppSelector } from "../../../shared/lib/store";
import { changeFolder, selectFolder, FolderTypes } from "../../../entities/Folders"; 


interface Folder {
    pk: number;
    name_folder: string;
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    folder: Folder;
}


interface newFolder {
    
    name: string;
    
  }
export const ModalRenameFolder: FunctionComponent<ModalProps> = ({ isOpen, onClose, folder }) => {

    const [plot, setPlot] = useState<string>('ver1')

    const newFolderData = { name_folder: plot };
    const dispatch = useAppDispatch()


    const handleClickOk = () => {

        
        updateFolder<newFolder>(folder.pk, folder.name_folder, newFolderData)
        .then((response) => {
            dispatch(changeFolder({ id: folder.pk, name: plot }));
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
                <ModalHeader className="flex flex-col gap-1">Переименовать</ModalHeader>
                <ModalBody>
                <Input
                    autoFocus
                    color="success"
                    variant="bordered"
                    defaultValue={folder.name_folder}
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

export default ModalRenameFolder;