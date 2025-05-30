import { useState } from "react";
import NavBar from "../../../components/NavBar/NavBar";
import AdminSideBar from "../../../components/Admin SideBar/AdminSideBar";

const AdminDashboard = () => {
    const [toggle, setToggle] = useState(false);

    return (
        <div>
            <NavBar toggle={toggle} setToggle={setToggle} name="admin" />
            <AdminSideBar />
        </div>
    )
}

export default AdminDashboard;