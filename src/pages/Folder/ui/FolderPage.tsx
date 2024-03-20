import { FunctionComponent } from "react";
import { HeaderStorageUi } from "../../../widgets/HeaderStorage";
import { ButtonStartUi } from "../../../features/ButtonStart";
import { FolderCardUi } from "../../../widgets/FolderCard";
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import "./FolderPage.css"
import { IoMdSearch } from "react-icons/io";

const {FolderCard} = FolderCardUi;
const FOLDER = [{pk:1, plot:"Пермь"}, {pk:2, plot:"Москва"} ];

import "./FolderPage.css"
const {HeaderStorage} = HeaderStorageUi;
const {ButtonStart} = ButtonStartUi;
export const FolderPage: FunctionComponent =() => {
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
                                placeholder="Type to search..."
                                startContent={<IoMdSearch />}
                                />
                            </div>
                        
                </div>
                
               

                {FOLDER.map(item => <FolderCard folder ={item} key={item.pk}/>)}
            
            </div>
            
        </div>
    );
}