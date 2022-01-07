import './NavMenu.scss';
import {Link} from "react-router-dom";

//<Link to="/About" className="link" >About</Link>| {" "}
function DrawMenu( ) {
    return (
        <div>
            <nav>
                <Link to="/" className="link" >Home</Link>
                <Link to="/Edit" className="link"> Edit</Link>
                <Link to="/About" className="link" >About</Link>
            </nav>
        </div>
    )
}

export default DrawMenu;