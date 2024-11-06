import { Route, Routes } from "react-router-dom"

// Components
import UsersLIstPage from "./pages/UsersLIstPage"
import UserInfo from "./pages/UserInfo"
import Navbar from "./components/Navbar"

// redux
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"
import { Provider } from "react-redux"
import store from './redux/store'

function App() {

  let persistor = persistStore(store)

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Navbar />
        <Routes>
          <Route path="/" element={<UsersLIstPage />} />
          <Route path="/user-info" element={<UserInfo />} />
        </Routes>
      </PersistGate>
    </Provider>
  )
}

export default App
