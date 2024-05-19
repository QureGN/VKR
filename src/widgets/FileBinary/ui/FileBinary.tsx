
import { FunctionComponent, useEffect } from "react";
import React, {useCallback, useState} from "react";
import { sharedConfigRoutes } from "../../../shared/config";

import { getFolderByIdBinary, getFolderByIdTree, getFolderById } from "../../../shared/api";
import { FileCardUi } from "../../../widgets/FileCard";
import { FaPen } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaRegFile } from "react-icons/fa6";
import { BinaryTypes } from "../../../entities/Files";
import { FiMoreVertical } from "react-icons/fi";

const { RouteName } = sharedConfigRoutes;
const { BINARY } = RouteName;
const {FileCard} = FileCardUi;

interface BinFiles {
    pk: number;
    name: string;
    size: number,
    last: Date,
    
  }

interface FileBinaryComponentProps {
    allbinFiles: BinaryTypes[],
    folder: string,
    tabs: string,
}

export const FileBinary: FunctionComponent<FileBinaryComponentProps> = (props) =>{

    const {allbinFiles, folder, tabs} = props
    
    const [allLasFiles, setLas] = useState<BinaryTypes[]>(allbinFiles);

    useEffect(() => {
        setLas(allbinFiles);
    }, [allbinFiles]);

    const filteredFiles = tabs === 'AllBin' ? allbinFiles : allLasFiles.filter(file => file.name.split('.').pop().toLowerCase() === tabs);

    return (
        <div>
            <div className="header">
                <FaRegFile size="20px" color="white"/>
                <div className="stroke">
                    <h1> Название </h1>
                </div>
                <div className="stroke">
                    <h1> Размер </h1>
                </div>
                <div  className="stroke">
                    <h1> Последнее изменение </h1>
                </div>
                <FiMoreVertical color="white"/>
            </div>
            {filteredFiles.map(file => (
    <div key={file.pk}>
        {(() => {
            const suffixes = ["Б", "КБ", "МБ", "ГБ"];
            let i = 0;
            let fileSize = file.size; // Размер файла в байтах

            while (fileSize >= 1024 && i < suffixes.length - 1) {
                fileSize /= 1024.0;
                i += 1;
            }

            return (
                <FileCard
                    file={file}
                    size={`${fileSize.toFixed(2)} ${suffixes[i]}`}
                    folder={folder}
                    key={file.pk}
                />
            );
        })()}
    </div>
))}
        </div>
    );
}

export default FileBinary;