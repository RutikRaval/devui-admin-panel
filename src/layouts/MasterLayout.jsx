import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar/Sidebar'
import { useStore } from '../services/store'

const MasterLayout = () => {
    const collapsed = useStore((state) => state.collapse)

    return (
        <div className='d-flex'>
            <Sidebar />
            <main className={`${collapsed ? 'master-collapsed':'master-open'}`} style={{ padding: "1rem", width: "100%", backgroundColor: '#f7f9fb', minHeight: '100vh' }}>
                <Outlet />
            </main>
        </div>

    )
}

export default MasterLayout