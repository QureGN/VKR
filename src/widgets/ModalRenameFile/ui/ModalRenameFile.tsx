import React, { FunctionComponent, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react';
import { updateFileInMinio } from '../../../shared/api';
import { useAppDispatch, useAppSelector } from "../../../shared/lib/store";
import { changeFolder, selectFolder, FolderTypes } from "../../../entities/Folders"; 
import { renameFiles } from '../../../entities/Files';
import { getTokenFromCookie } from "../../../entities/User";

interface Folder {
    pk: number;
    name_folder: string;
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    folder: string;
    file: string
}


interface newFile {
    
    name: string;
    
  }
export const ModalRenameFile: FunctionComponent<ModalProps> = ({ isOpen, onClose, folder, file }) => {

    const [plot, setPlot] = useState<string>('ver1')

    const newFolderData = { name_folder: plot };
    const dispatch = useAppDispatch()


    const handleClickOk = () => {
        const newName = plot + "." + file.split(".")[1]
        const newFileData = { file_name: newName }
        console.log(newName)
        const token = getTokenFromCookie()
        updateFileInMinio<newFile>(folder, file,token, newFileData)
        .then((response) => {
            dispatch(renameFiles({old_name: file , new_name: newName, }));
            onClose()
            console.log('Файл успешно изменен:', response.data);
        })
        .catch((error) => {
            console.error('Ошибка при изменении файла:', error);
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
                    defaultValue={file.split(".")[0]}
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

export default ModalRenameFile;