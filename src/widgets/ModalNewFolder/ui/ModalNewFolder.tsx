import React, { FunctionComponent, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react';
import { createFolder } from '../../../shared/api';
import { useAppDispatch, useAppSelector } from "../../../shared/lib/store";
import { newFolder, selectFolder, FolderTypes } from "../../../entities/Folders"; 
import {  selectUser, UserTypes } from "../../../entities/User"; 
import axios from 'axios'
import translate from "translate";
import { getTokenFromCookie } from "../../../entities/User";
import { useNavigate } from 'react-router-dom';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    place: string;
}


interface newFolder {
    pk: number;
    name_folder: string;
    owner: number;
    shared: Array<number>
    
  }
export const ModalNewFolder: FunctionComponent<ModalProps> = ({ isOpen, onClose, place }) => {

    const [plot, setPlot] = useState<string>('ver1')
    const dispatch = useAppDispatch()
    const user = useAppSelector<UserTypes>(selectUser)
    const newFolderData = { name_folder: plot, owner: user.pk, shared:[] };
    const navigate = useNavigate()
    

    const handleClickOk = () => {
        
 

        // const requestData = {
        //     text: 'Hello',
        //     targetLanguage: 'ru'
        //   };
        
        // axios.post('https://functions.yandexcloud.net/d4ejfq1gcsmldu61omsl', requestData, {
        //     headers: {
        //       'Content-Type': 'application/json'
        //     }
        //   })
        //   .then(response => {
        //     console.log(response.data);
        //   })
        //   .catch(error => {
        //     console.error(error);
        //   });

    // fetch("https://translate.api.cloud.yandex.net/translate/v2/translate", {
    //     method: 'POST',
    //     headers: {
    //         'Authorization': `Api-Key ${API_KEY}`,
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         folderId: "folderId",
    //         "targetLanguageCode": "en",
    //         texts: [plot]
    //     })
    // })
    // .then(response => response.json())
    // .then(data => {
    //     const translatedText = data.translations[0].text;
    //     console.log(`Перевод текста: ${translatedText}`);
    //     // Дальнейшая обработка переведенного текста
    // })
    // .catch(error => {
    //     console.error('Ошибка при переводе:', error);
    // });

        const token = getTokenFromCookie()

        createFolder<newFolder>(token, newFolderData)
        .then((response) => {
            dispatch(newFolder(response.data))
            onClose()
            console.log('Папка успешно создана:', response.data);
        })
        .catch((error) => {
            console.log(token)
        });
      };

    return (
        <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Новая папка</ModalHeader>
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