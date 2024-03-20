import "./ButtonHeader.css"
import { Link } from "react-router-dom";
import { sharedConfigRoutes } from "../../../shared/config";
const { RouteName } = sharedConfigRoutes;

const { STORAGE, START_PAGE, AUTH, REGISTRATION, FOLDER, TREES, BINARY } = RouteName;

export const ButtonHeader = () => {
    return <div>
        <div className="wrap">
            <Link to={AUTH} className="border">Войти</Link>
            <Link to={REGISTRATION} className="border">Регистрация</Link>
       
            
        </div>
        
    </div>;
}