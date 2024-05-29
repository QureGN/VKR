
import { FunctionComponent, useEffect } from "react";
import React, {useCallback, useState} from "react";
import { sharedConfigRoutes } from "../../../shared/config";

import { getFolderByIdBinary, getFolderByIdTree, getFolderById } from "../../../shared/api";
import { TreeCardUi } from "../../../widgets/treeCard";
import { FaPen } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaRegFile } from "react-icons/fa6";
import {Button} from "@nextui-org/react";
import * as Papa from "papaparse";
import { FiMoreVertical } from "react-icons/fi";
import "./FileTree.css"
import { getTokenFromCookie } from "../../../entities/User";

const { RouteName } = sharedConfigRoutes;
const { BINARY } = RouteName;
const {TreeCard} = TreeCardUi;

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

interface FileBinaryComponentProps {
    allTreeFiles: TreeFiles[],
}

export const FileTree: FunctionComponent<FileBinaryComponentProps> = (props) =>{

    const {allTreeFiles} = props

    const handleClickdownload =()=>{
        
        const csvData = Papa.unparse(allTreeFiles, { encoding: 'utf-8' }); // Используем библиотеку PapaParse для преобразования

        // Создание и загрузка файла CSV
        const blob = new Blob([csvData], { type: 'text/csv; charset=utf-8' });
        const url = URL.createObjectURL(blob);
      
        // Создание ссылки для скачивания файла
        const a = document.createElement('a');
        a.href = url;
        a.download = 'tree.csv';
        document.body.appendChild(a);
        
        // Инициирование загрузки файла
        a.click();
      
        // Очистка ссылки и URL
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }

    return (
        <div>
            <div className="buttonDownload">
                <Button color="primary" variant="bordered" onClick={handleClickdownload}>
                    Скачать csv
                </Button> 
            </div>
            
            <div className="header">
                    <FaRegFile size="20px" color="white"/>
                    <div className="strokeTree">
                    <h1> Название </h1>
                    </div>
                    <div className="strokeTree">
                    <h1> Порода </h1>
                    </div>
                    <div  className="strokeTree">
                    <h1> Возраст </h1>
                    </div>
                    <div  className="strokeTree">
                    <h1> Диаметр </h1>
                    </div>
                    <div  className="strokeTree">
                    <h1> Высота </h1>
                    </div>
                    <div  className="strokeTree">
                    <h1> Координата X </h1>
                    </div>
                    <div  className="strokeTree">
                    <h1> Координата Y </h1>
                    </div>
                    <FiMoreVertical color="white"/>
                    
                    {/* <MdOutlineFileDownload size="25px" color="white"/> */}
                    {/* <FaPen color="white"/> */}
                    
                    
                </div>
              {allTreeFiles.map(item => 
                
                <TreeCard file ={item} key={item.pk}/>)}
        </div>)
}

export default FileTree;