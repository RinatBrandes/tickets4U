import React from 'react'
import { Routes, Route } from 'react-router'
import routes from './routes'
import AppFooter from './cmps/app_footer'
import AppHeader from './cmps/app_header'

const RootCmp = () => {

    {
        return (
            <div className="main-layout">
                <AppHeader />
                <main>
                    <Routes>
                        {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                        {/* <Route path="user/:id" element={<UserDetails />} /> */}
                    </Routes>
                </main>
                <AppFooter />
            </div>
        )
    }
}

export default RootCmp;
