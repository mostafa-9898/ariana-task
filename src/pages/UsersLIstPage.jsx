import { useEffect, useState } from "react";

// Router
import { useNavigate } from "react-router-dom";

// Utils
import useDebouncedValue from "../utils/Debounce";
import { getAge } from "../utils/getAge";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../redux/features/usersSlice";

function UsersLIstPage() {

    // Hooks
    const reduxState = useSelector(state => state.favorites)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    // States
    const [allUsers, setAllUsers] = useState(reduxState)
    const [searchInput, setSearchInput] = useState("")

    const debouncedSearchTerm = useDebouncedValue(searchInput, 500);

    // Life Cycles
    useEffect(() => {
        if (searchInput) {
            const searchedUsers = reduxState.filter(item => item.fullName.includes(debouncedSearchTerm))
            setAllUsers(searchedUsers)
        } else {
            setAllUsers(reduxState)
        }
    }, [debouncedSearchTerm])
    useEffect(() => {
        setAllUsers(reduxState)
    }, [reduxState])

    return (
        <div className="text-center w-[1200px] mx-auto">

            <div className="flex items-center justify-between mb-6 mt-16 pb-4 border-b border-gray-500">
                <h1 className="text-3xl font-bold ">لیست کاربران</h1>
                <input
                    autoFocus
                    placeholder="جستجو ..."
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                    className="border-none outline-none"
                />
            </div>

            <div className="text-center w-[1200px] mx-auto" dir="ltr">

                {
                    allUsers.length > 0 ?
                        allUsers.map(item => (
                            (
                                <div className="flex items-center justify-between py-2 px-4 bg-gray-600 rounded-md mb-5" key={item.fullName}>
                                    <h3 className="min-w-28">{item.fullName ? item.fullName : "-"}</h3>
                                    <h3 className="min-w-28">{item.birthDate ? getAge(item.birthDate) : "-"}</h3>
                                    <div className="flex items-center gap-6 min-w-[300px]">
                                        {item.skills.length > 0 ? item.skills.map((skill, index) => (
                                            <p key={index} className="bg-sky-600 py-2 px-3 rounded-lg">{skill}</p>
                                        )) : "-"}
                                    </div>
                                    <div className="w-[250px] flex items-center justify-between">
                                        <button className="bg-red-700" onClick={() => dispatch(removeItem(item))}>پاک کردن</button>
                                        <button className="bg-sky-700" onClick={() => navigate("/user-info", { state: item })}>ویرایش</button>
                                    </div>
                                </div>
                            )
                        ))
                        : (
                            <div className="py-2 px-4 bg-gray-600 rounded-md">
                                <h1>کاربری وجود ندارد</h1>
                            </div>
                        )
                }

            </div>

        </div>
    );
}

export default UsersLIstPage;