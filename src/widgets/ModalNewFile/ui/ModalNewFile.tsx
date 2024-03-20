import React, { FunctionComponent, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react';
import {Select, SelectItem} from "@nextui-org/react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    place: string;
}

export const formats = [
    {label: "obj", value: "obj"},
    {label: "las", value: "las"},
    {label: "csv", value: "csv"},
]

export const ModalNewFile: FunctionComponent<ModalProps> = ({ isOpen, onClose, place }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Загрузить файл</ModalHeader>
                <ModalBody>
                    <Input
                     autoFocus 
                     color="success" 
                     variant="bordered"
                     placeholder="Новый файл" />
                </ModalBody>
                <ModalBody>
                <Select 
                        label="Выберете формат" 
                        className="max-w-xs" 
                        variant="bordered"
                        color='success'
                    >
                        {formats.map((format) => (
                        <SelectItem key={format.value} value={format.value}>
                            {format.label}
                        </SelectItem>
                        ))}
                    </Select>
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

export default ModalNewFile;