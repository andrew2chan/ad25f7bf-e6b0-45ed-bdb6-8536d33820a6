import Activity from "./Activity.jsx";
import Navbar from "./Navbar.jsx";
import '../css/main.css';

const Main = () => {
    return(
        <main className="container-view">
            <Activity />
            <Navbar />
        </main>
    )
}

export default Main;