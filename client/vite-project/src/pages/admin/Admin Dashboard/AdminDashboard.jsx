import { useState } from "react";
import NavBar from "../../../components/NavBar/NavBar";
import SideBar from "../../../components/SideBar/SideBar";

const AdminDashboard = () => {
    const [toggle, setToggle] = useState(false);

    return (
        <div>
            <NavBar toggle={toggle} setToggle={setToggle} name="admin" />
            <SideBar />
        </div>
    )
}

export default AdminDashboard;