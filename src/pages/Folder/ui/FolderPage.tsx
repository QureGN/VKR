import { FunctionComponent } from "react";
import { HeaderStorageUi } from "../../../widgets/HeaderStorage";
import { ButtonStartUi } from "../../../features/ButtonStart";
import { FolderCardUi } from "../../../widgets/FolderCard";
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import "./FolderPage.css"
import { IoMdSearch } from "react-icons/io";
import React, {useEffect, useState} from "react";
import { getAllFolders, getSearchFolders } from "../../../shared/api";
import { addToFolders, selectFolder, FolderTypes } from "../../../entities/Folders"; 
import { useAppDispatch, useAppSelector } from "../../../shared/lib/store";
import { FaRegFile } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaFolder } from "react-icons/fa";

const {FolderCard} = FolderCardUi;
const FOLDER = [{pk:1, plot:"Пермь"}, {pk:2, plot:"Москва"} ];

import "./FolderPage.css"
const {HeaderStorage} = HeaderStorageUi;
const {ButtonStart} = ButtonStartUi;

interface Folder {
    pk: number;
    name_folder: string;
    
  }

export const FolderPage: FunctionComponent =() => {
    const folders = useAppSelector<FolderTypes[]>(selectFolder)
    const dispatch = useAppDispatch()
    const [search, setSearch] = useState<string>('');

    const addBookToCart = () => {
        dispatch(addToFolders(allFolder))
        
    }

    const handleSearch =(event)=>{
        const searchQuery = event.target.value; // Получаем значение из инпута поиска
        
        setSearch(searchQuery); // Обновляем состояние search с новым значением
        getSearchFolders<FolderTypes[]>(search)
        .then((folder)=>{
            setAllFolder(folder.data)
            dispatch(addToFolders(folder.data))
        })
        .catch((error) => {
            console.error('Ошибка при получении списка папок:', error);
        });
    }

    const [allFolder, setAllFolder] = useState<Folder[]>([]);
    useEffect(() => {

        getAllFolders<Folder[]>()
        .then((folder) => {
            setAllFolder(folder.data);
            dispatch(addToFolders(folder.data))
         
        })
        .catch((error) => {
            console.error('Ошибка при получении списка папок:', error);
        });
    }, []);

    return (
        <div className="wrapstorage"> 
            <HeaderStorage button={false} key={1}/>
            <div className="stor">
                <div className="wrapheader1">Хранилище</div>
                <div className="wrapsearch">
                    <div className="breadwrap">
                        <Breadcrumbs
                            underline="hover"
                            classNames={{
                                list: "bg-gradient-to-br from-orange-300 to-orange-700 shadow-small",
                            }}
                            itemClasses={{
                                item: "text-white/60 data-[current=true]:text-white",
                                separator: "text-white/40",
                            }}
                            variant="solid"
                            
                            >
                            <BreadcrumbItem href="/folders">Доступные папки</BreadcrumbItem>
                            
                        </Breadcrumbs>
                    </div>
                            <div className="inputstorage">
                                <Input
                                radius="lg"
                                variant="bordered"
                                color="success"
                                placeholder="Поиск..."
                                startContent={<IoMdSearch />}
                                onChange={handleSearch}
                                />
                            </div>
                        
                </div>
                
               
                <div className="header">
                    <FaFolder color="white"/>
                    <div className="stroke">
                        <h1> Название </h1>
                    </div>
                    
                    <MdDelete color="white"/>
                    <FaPen color="white" />
                </div>
                {folders.map(item => <FolderCard folder ={item} key={item.pk}/>)}
            
            </div>
            
        </div>
    );
}