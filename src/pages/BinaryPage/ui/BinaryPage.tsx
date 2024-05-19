import { FunctionComponent, useState, useEffect, } from "react";
import { HeaderStorageUi } from "../../../widgets/HeaderStorage";
import { ButtonStartUi } from "../../../features/ButtonStart";
import { FileCardUi } from "../../../widgets/FileCard";
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import "./BinaryPage.css"
import { IoMdSearch } from "react-icons/io";
import {Tabs, Tab} from "@nextui-org/react";
import { getFolderByIdBinary, getFolderByIdTree, getFolderById, searchBinFiles, searchTreeFiles } from "../../../shared/api";
import { useParams } from 'react-router-dom';
import { FaPen } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaRegFile } from "react-icons/fa6";
import { TreeCardUi } from "../../../widgets/treeCard";
import { FileBinaryUi } from "../../../widgets/FileBinary";
import { FileTreeUi } from "../../../widgets/FileTree";
import { useAppDispatch, useAppSelector } from "../../../shared/lib/store";
import { BinaryTypes, selectBinaryFiles, addToBinaryFiles } from "../../../entities/Files";
import { TreeTypes, selectTree, addToTreeFiles } from "../../../entities/Tree"; 

const {FileTree} = FileTreeUi
const {FileBinary} = FileBinaryUi
const {TreeCard} = TreeCardUi
const {FileCard} = FileCardUi;
const FILE = [{pk:1, name:"tree1.las", size:"500"}, {pk:2, name:"tree2.las", size:"555"} ];
const {HeaderStorage} = HeaderStorageUi;

interface BinFiles {
    pk: number;
    name: string;
    size: number,
    last: Date,
    
  }

interface Folder {
    pk: number;
    name_folder: string;
    
}
interface TreeFiles{
    pk: number, 
    folder_pk: number,
    name_tree: string,
    breed: string,
    age: number,
    diameter: number,
    height: null, 
    coordinate_X: number, 
    coordinate_Y: number
}
export const BinaryPage: FunctionComponent =() => {

    const { folderId } = useParams<{ folderId: string }>();
    const [allTreeFiles, setAllTreeFiles] = useState<BinaryTypes[]>([]);
    const [allBinFiles, setAllBinFiles] = useState<BinaryTypes[]>([]);
    const [allBinFiles1, setAllBinFiles1] = useState<BinaryTypes[]>([]);
    const [click, setClick] = useState<Boolean>(true)
    const [folderName, setFolderName] = useState<string>('');
    const [search, setSearch] = useState<string>('');
    const [selected, setSelected] = useState("AllBin");
    const [las, setLas] = useState<BinaryTypes[]>([]);
    const binaryFiles = useAppSelector<BinaryTypes[]>(selectBinaryFiles)
    const treeFiles = useAppSelector<TreeTypes[]>(selectTree)
    const dispatch = useAppDispatch()

    useEffect(() => {
        getFolderById<Folder>(Number(folderId))
        .then((folder)=> {
            const folderName = folder.data.name_folder.toLowerCase()
            setFolderName(folderName)
            getFolderByIdBinary<BinFiles[]>(folderName)
            .then((files)=>{
                setAllBinFiles(files.data)
                setAllBinFiles1(files.data)
                
                dispatch(addToBinaryFiles(files.data))
            })
        })
        getFolderByIdTree<TreeFiles[]>(Number(folderId))
        .then((folder) => {
            setAllTreeFiles(folder.data); 
            dispatch(addToTreeFiles(folder.data))
        })
        .catch((error) => {
            console.error('Ошибка при получении списка папок:', error);
        });
    }, []);

    const handleSearch =(event)=>{
        const searchQuery = event.target.value; // Получаем значение из инпута поиска
        console.log(search)
        setSearch(searchQuery); // Обновляем состояние search с новым значением
        searchBinFiles<BinFiles[]>(folderName, search)
        .then((files)=>{
            setAllBinFiles(files.data)
            setAllTreeFiles(files.data)
            console.log(allTreeFiles)
            dispatch(addToBinaryFiles(files.data))
        })
      
        searchTreeFiles<TreeFiles[]>(Number(folderId), search)
        .then((folder) => {
            // setAllTreeFiles(folder.data); 
            dispatch(addToTreeFiles(folder.data))
        })
        .catch((error) => {
            console.error('Ошибка при получении списка папок:', error);
        });
    }

  
    return (
        <div className="wrapstorage"> 
            <HeaderStorage button={true} key={2} folderName={folderName}/>
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
                            <BreadcrumbItem href="/binary">{folderName}</BreadcrumbItem>
                            
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
                <Tabs key="primary" color="danger" aria-label="Tabs" variant="bordered" selectedKey={selected} onSelectionChange={setSelected}>
                    <Tab key="AllBin" title="Список бинарных файлов" />
                    <Tab key="obj" title="файл obj" />
                    <Tab key="las" title="общий las" />
                    <Tab key="listTree" title="Список деревьев"  />
                </Tabs>       
                            
                
                {(selected == 'AllBin') ? 
                    <FileBinary  allbinFiles={binaryFiles} folder={folderName} tabs={selected}/>
                :
                (selected == "listTree") ?
                    <FileTree allTreeFiles={treeFiles}/> 
                :
                // (selected == 'obj') ?
                    <FileBinary  allbinFiles={binaryFiles} folder={folderName} tabs={selected}/>
                       
                
                // :
                    
                    // allBinFiles1.filter(file => file.name.split('.').pop().toLowerCase() === selected).map(filteredFile => (
                    //     <FileCard file ={filteredFile} key={filteredFile.pk} folder={folderName}/>
                    // ))
                    
            }
            
            </div>
            
        </div>
    );
}