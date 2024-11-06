import { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";

// Router
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Redux
import { useDispatch } from "react-redux";
import { addItem, updateItem } from "../redux/features/usersSlice";

// select options
const options = [
    { label: "html", value: "Html" },
    { label: "css", value: "Css" },
    { label: "javascript", value: "JavaScript" },
];

function UserInfo() {

    // Hooks
    const state = useLocation()
    const navigate = useNavigate();
    const dispatch = useDispatch()

    // States
    const [addUser, setAddUser] = useState({
        fullName: state.state ? state.state.fullName : "",
        birthDate: state.state ? state.state.birthDate : "",
    })
    const [addSkills, setAddSkills] = useState([]);

    // Life Cycles
    useEffect(() => {
        if (state.state) {
            let replaceSkills = state.state.skills.map(item => { return { label: item, value: item } })
            setAddSkills(replaceSkills)
        }
    }, [])

    // Functions
    const submitHander = (e) => {
        e.preventDefault()

        // Validate
        if (addSkills.length < 1 || !addUser.fullName || !addUser.birthDate) {
            return alert("اطلاعات فرم را به درستی تکمیل کنید")
        }

        let skills = addSkills.map(item => item.value)
        if (state.state) {
            dispatch(updateItem({ id: state.state.id, ...addUser, skills: [...skills] }))
            navigate("/")
        } else {
            dispatch(addItem({ ...addUser, skills: [...skills] }))
            navigate("/")
        }
    }

    return (

        <div className=" w-[400px] py-10 border rounded-lg border-gray-500 mx-auto bg-sky-800 mt-6">
            <div className="flex justify-center">
                <h1 className="text-3xl font-bold">افزودن کاربر</h1>
            </div>

            <form className="flex items-center justify-center flex-col gap-6 mt-20" onSubmit={submitHander}>
                <input autoFocus placeholder="نام و نام خانوادگی" value={addUser.fullName}
                    className="outline-none"
                    onChange={(e) => setAddUser({ ...addUser, fullName: e.target.value })} />
                <input type="date" value={addUser.birthDate} className="outline-none"
                    onChange={(e) => setAddUser({ ...addUser, birthDate: e.target.value })} />
                <MultiSelect
                    className="w-[325px] px-[10px] py-[5px] text-black"
                    hasSelectAll={false}
                    disableSearch={true}
                    options={options}
                    value={addSkills}
                    onChange={setAddSkills}
                    labelledBy="مهارت ها"
                />
                <button type="submit" className="w-[100px] bg-green-700 text-lg">
                    ثبت
                </button>
            </form>
        </div>

    );
}

export default UserInfo;