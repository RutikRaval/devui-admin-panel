import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar/Sidebar'

const MasterLayout = () => {
    return (
        <div className='d-flex'>
            <Sidebar />
            <main style={{ marginLeft: 220, padding: "1rem", width: "100%" }}>
                <Outlet />
            </main>
        </div>
       
    )
}

export default MasterLayout