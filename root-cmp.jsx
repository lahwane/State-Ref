const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM
const { Provider } = ReactRedux


import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'

import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { CarIndex } from './pages/CarIndex.jsx'
import { CarEdit } from './pages/CarEdit.jsx'
import { CarDetails } from './pages/CarDetails.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { store } from './store/store.js'


export function App() {

    return (
        <Provider store={store}>
            <Router>
                <section className="app">
                    <AppHeader />
                    <main className='main-layout'>
                        <Routes>
                            <Route element={<HomePage />} path="/" />
                            <Route element={<AboutUs />} path="/about" />
                            <Route element={<CarIndex />} path="/car" />
                            <Route element={<CarEdit />} path="/car/edit" />
                            <Route element={<CarEdit />} path="/car/edit/:carId" />
                            <Route element={<CarDetails />} path="/car/:carId" />
                        </Routes>
                    </main>
                    <AppFooter />
                </section>
                <UserMsg />

            </Router>
        </Provider>


    )
}


