import React, { FunctionComponent, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react';
import { updateFolder, shareFolder } from '../../../shared/api';
import { useAppDispatch, useAppSelector } from "../../../shared/lib/store";
import { changeFolder, changeShare, selectFolder, FolderTypes } from "../../../entities/Folders"; 
import { getTokenFromCookie } from "../../../entities/User";


interface Folder {
    pk: number;
    name_folder: string;
    owner: number;
    share: Array<number>;
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    folder: Folder;
    act: string
}


interface newFolder {
    
    name: string;
    
  }
  
interface shareFolder {
    
    name: string;
    
  }
export const ModalRenameFolder: FunctionComponent<ModalProps> = ({ isOpen, onClose, folder, act }) => {

    const [plot, setPlot] = useState<string>('ver1')
    const [email, setEmail] = useState<string>('')
    const newFolderData = { name_folder: plot.toLowerCase() };
    const dispatch = useAppDispatch()
    const emailRequest = {email: email}
    const handleClickShare = () => {

        const token = getTokenFromCookie()
        shareFolder<Folder>(folder.pk, token, emailRequest)
        .then((response) => {
            dispatch(changeShare({ id: folder.pk, shared: response.data.share }));
            onClose()
            console.log('Деление с доступом прошло успешно:', response.data);
        })
        .catch((error) => {
            console.error('Ошибка при создании доступа папки:', error);
        });
      };

    const handleClickOk = () => {

        const token = getTokenFromCookie()
        updateFolder<newFolder>(folder.pk, folder.name_folder.toLowerCase(), token,  newFolderData, )
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
                { (act == "edit") ? 
                    (
                        <>
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
                        </>
                      ) : (
                        <>
                          <ModalHeader className="flex flex-col gap-1">Добавить пользователей</ModalHeader>
                          <ModalBody>
                            <Input
                                label="Email"
                                autoFocus
                                color="success"
                                variant="bordered"
                                placeholder="Введете почту"
                                onChange={(e) => setEmail(e.target.value)}  
                            />
                          </ModalBody>
                          <ModalFooter>
                            <Button color="primary" variant="flat" onClick={onClose}>
                              Отмена
                            </Button>
                            <Button color="success" onClick={handleClickShare}>
                              ОК
                            </Button>
                          </ModalFooter>
                        </>
                    )
                } 
            </ModalContent>
        </Modal>
    );
};

export default ModalRenameFolder;