import { FunctionComponent } from "react";
import { widgetHeaderUi } from "../../../widgets/Header"; 
import { ButtonStartUi } from "../../../features/ButtonStart";


import "./startPage.css"
const {Header} = widgetHeaderUi;
const {ButtonStart} = ButtonStartUi;
export const StartPage: FunctionComponent =() => {
    return (
        <div> 
            <Header/>
            <div className="text">Воспользуйтесь облачным хранилищем для Геоинформационной системы</div>
            <ButtonStart name="Начать" click="start" style="button"/>
        </div>
    );
}