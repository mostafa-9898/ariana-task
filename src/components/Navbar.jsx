import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate()

    return (
        <div>

            <div className="flex items-center gap-4 py-4 px-10">
                <h4 className="cursor-pointer bg-sky-800 px-4 py-2 rounded-md" onClick={() => navigate("/")}>لیست کاربران</h4>
                <h4 className="cursor-pointer bg-sky-800 px-4 py-2 rounded-md" onClick={() => navigate("/user-info")}>کاربر جدید</h4>
            </div>

        </div>
    );
}

export default Navbar;