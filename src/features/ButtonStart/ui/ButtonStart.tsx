import "./ButtonStart.css"
import { Link } from "react-router-dom";
import { sharedConfigRoutes } from "../../../shared/config";
const { RouteName } = sharedConfigRoutes;

const {  FOLDER } = RouteName;

export const ButtonStart = () => {
    return <div>
        <div className="button">
            <Link to={FOLDER} className="textButton">Начать</Link>
        </div>
        
    </div>;
}