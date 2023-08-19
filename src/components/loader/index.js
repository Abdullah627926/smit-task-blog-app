import React from 'react'
import { Spin } from "antd"
import { LoadingOutlined } from '@ant-design/icons'

const Loader = () => {
    return (
        <div className='flex justify-center item-center h-[100vh]'>
            <Spin size="large" />
        </div>
    )
}
export default Loader;