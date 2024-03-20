import { FunctionComponent } from "react";
import { HeaderStorageUi } from "../../../widgets/HeaderStorage";
import { ButtonStartUi } from "../../../features/ButtonStart";
import { FileCardUi } from "../../../widgets/FileCard";
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import "./BinaryPage.css"
import { IoMdSearch } from "react-icons/io";
import {Tabs, Tab} from "@nextui-org/react";


const {FileCard} = FileCardUi;
const FILE = [{pk:1, name:"tree1.las", size:"500"}, {pk:2, name:"tree2.las", size:"555"} ];
const {HeaderStorage} = HeaderStorageUi;

export const BinaryPage: FunctionComponent =() => {
    return (
        <div className="wrapstorage"> 
            <HeaderStorage button={true} key={2}/>
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
                            <BreadcrumbItem href="/binary">Город</BreadcrumbItem>
                            
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
                <Tabs key="primary" color="danger" aria-label="Tabs" variant="bordered">
                    <Tab key="lasOne" title="las одного дерева"/>
                    <Tab key="obj" title="файл obj"/>
                    <Tab key="lasAll" title="общий las"/>
                    <Tab key="listTree" title="Список деревьев"/>
                </Tabs>
               

                {FILE.map(item => <FileCard file ={item} key={item.pk}/>)}
            
            </div>
            
        </div>
    );
}