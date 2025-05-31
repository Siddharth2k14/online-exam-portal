import { useState } from "react";
import NavBar from "../../../components/NavBar/NavBar";
import AdminSideBar from "../../../components/Admin SideBar/AdminSideBar";
import AdminPage from "../../../components/AdminPage/AdminPage";

const AdminDashboard = () => {
    const [toggle, setToggle] = useState(false);

    return (
        <div>
            <NavBar toggle={toggle} setToggle={setToggle} name="admin" />
            <AdminSideBar />
            <AdminPage />
        </div>
    )
}

export default AdminDashboard;