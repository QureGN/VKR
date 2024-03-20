import React, { FunctionComponent, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    place: string;
}

export const ModalNewFolder: FunctionComponent<ModalProps> = ({ isOpen, onClose, place }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Новая папка/Переименовать</ModalHeader>
                <ModalBody>
                    <Input
                     autoFocus 
                     color="success" 
                     variant="bordered"
                     placeholder={place} />
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

export default ModalNewFolder;