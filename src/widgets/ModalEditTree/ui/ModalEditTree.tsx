import React, { FunctionComponent, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react';
import { createFolder, updateTree } from '../../../shared/api';
import "./ModalEditTree.css"
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../../shared/lib/store";
import { TreeTypes, selectTree, changeTree } from "../../../entities/Tree"; 

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
    tree: TreeTypes;
}


interface newFolder {
    
    name: string;
    
  }
export const ModalEditTree: FunctionComponent<ModalProps> = ({ isOpen, onClose, tree }) => {

    const [treeNew, setTree] = useState<TreeTypes>(tree)
    const { folderId } = useParams<{ folderId: string }>();
    // const newFolderData = { name_folder: plot };
    const dispatch = useAppDispatch()

    const handleInputChange = (field: keyof TreeFiles, value: any) => {
        setTree((prevData) => ({
          ...prevData,
          [field]: value,
        }));
      };

      const handleClickOk = () => {
            
        updateTree<newFolder>(folderId, treeNew)
        .then((response) => {
            dispatch(changeTree({id: Number(folderId), edit: treeNew}))
            onClose()
            console.log('Дерево успешно изменено:', response.data);
        })
        .catch((error) => {
            console.error('Ошибка при изменении дерева:', error);
        });
      };
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
                
                    <div className='cardTree'>
                        <div className='inscription'>
                            <h1>Название</h1>
                        </div>
                        <div className='input'>
                    
                            <Input
                                autoFocus
                                color="success"
                                variant="bordered"
                                defaultValue={tree.name_tree}
                                onChange={(e) => handleInputChange('name_tree', e.target.value)}  
                            />


                        </div>
                        
                    </div>
                    
                    <div className='cardTree'>
                        <div className='inscription'>
                            <h1>Порода</h1>
                        </div>
                        <div className='input'>
                            <Input
                                autoFocus
                                color="success"
                                variant="bordered"
                                defaultValue={tree.breed}
                                onChange={(e) => handleInputChange('breed', e.target.value)}
                            />
                        </div>
                        
                    </div>
                
                    <div className='cardTree'>
                        <div className='inscription'>
                            <h1>Возраст</h1>
                        </div>
                       
                        <div className='input'>
                            <Input
                            autoFocus
                            color="success"
                            variant="bordered"
                            defaultValue={tree.age.toString()}
                            onChange={(e) => handleInputChange('age', e.target.value)}
                            
                        />
                        </div>
                       
                        <div className='units'>
                            <h1>лет</h1>
                        </div>
                    </div>
                
                    <div className='cardTree'>
                        <div className='inscription'>
                            <h1>Диаметр</h1>
                        </div>
                        <div className='input'>
                            <Input
                            autoFocus
                            color="success"
                            variant="bordered"
                            defaultValue={tree.diameter.toString()}
                            onChange={(e) => handleInputChange('diameter', e.target.value)}
                            />

                        </div>
                       
                        <div className='units'>
                            <h1>м</h1>
                        </div>
                    </div>

                    <div className='cardTree'>
                        <div className='inscription'>
                            <h1>Высота</h1>
                        </div>
                        <div className='input'>
                            <Input
                            autoFocus
                            color="success"
                            variant="bordered"
                            defaultValue={tree.height.toString()}
                            onChange={(e) => handleInputChange('height', e.target.value)}
                        />
                        </div>
                        <div className='units'>
                            <h1>м</h1>
                        </div>
                   
                    </div>
             
                
                    <div className='cardTree'>
                        <div className='inscription'>
                            <h1>Координата X</h1>
                        </div>
                        <div className='input'>
                            <Input
                                autoFocus
                                color="success"
                                variant="bordered"
                                defaultValue={tree.coordinate_X.toString()}
                                onChange={(e) => handleInputChange('coordinate_X', e.target.value)}
                            />
                        </div>
                       
                    </div>
             
                    <div className='cardTree'>
                        <div className='inscription'>
                            <h1>Координата Y</h1>
                        </div>
                        <div className='input'>
                            <Input
                                autoFocus
                                color="success"
                                variant="bordered"
                                defaultValue={tree.coordinate_Y.toString()}
                                onChange={(e) => handleInputChange('coordinate_Y', e.target.value)}
                            />
                        </div>
                       
                    </div>

                
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

export default ModalEditTree;