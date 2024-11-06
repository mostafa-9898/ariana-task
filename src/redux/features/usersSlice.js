import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const usersSlice = createSlice({
    name: "storedUsers",
    initialState,
    reducers: {
        addItem: (state, action) => {
            let isExist = state.find((item) => item.fullName === action.payload.fullName)
            if (isExist) {
                return alert("این شخص قبلا ثبت شده است")
            } else {
                let id = state.length + 1
                state.push({ id, ...action.payload })
            }
        },
        updateItem: (state, action) => {
            for (let i = 0; i < state.length; i++) {
                if (state[i].id == action.payload.id) {
                    state[i] = action.payload
                    return state
                }
            }
        },
        removeItem: (state, action) => {
            let newState = []
            for (let i = 0; i < state.length; i++) {
                if (state[i].id !== action.payload.id) {
                    newState.push(state[i])
                }
            }
            return state = newState
        },
    }
})

export default usersSlice.reducer;
export const { addItem, removeItem, updateItem } = usersSlice.actions