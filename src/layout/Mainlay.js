
import { useAuth } from '@/hooks'
import { Layout, Menu, Typography } from 'antd'
import Link from 'next/link'
import React, { useMemo } from 'react'

const { Header } = Layout

function Mainlay() {
    const { signout } = useAuth();
    const menuItems = useMemo(() => ([
        {
            label: <Link href="/dashboard">Dashboard</Link>,
            key: "dashboard"
        },
        {
            label: <Link href="/dashboard/profile">Profile</Link>,
            key: "dashboard/createblog"
        },
        { label: "Signout", onClick: signout, key: "signout" }
    ]), [signout])

    return (
        <div className='text-center '>
            <Header>
                <Menu mode="horizontal"
                    theme='dark' items={menuItems} />
            </Header>
        </div>
    )
}


export default Mainlay;