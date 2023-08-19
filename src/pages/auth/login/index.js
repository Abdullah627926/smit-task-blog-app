import { useAuth } from '@/hooks'
import { MailOutlined } from '@ant-design/icons'
import { Card, Form, Button, Input, Typography, message, Layout } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const LoginPage = () => {
    const { asPath, push } = useRouter()
    const [loading, setloading] = useState(false)
    const { login } = useAuth()
    const onFinish = async (props) => {

        try {
            setloading(true)
            await login(props)
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }
    }
    const { Header } = Layout

    return (
        <div>
            <div>
                <Header>
                    <Typography.Title className='flex justify-center mb-10 !text-white'>Login Account</Typography.Title>
                </Header>
            </div>
            <div className='flex justify-center items-center h-[70vh]'>
                <Card className='flex flex-col items-center justify-center  w-[500px] h-[300px]' bordered={false}>
                    <Form
                        labelCol={{ span: 6 }}
                        onFinish={onFinish}
                        disabled={loading}
                        className='w-[500px] h-[600px] flex justify-center flex-col'
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: 'please enter a email adress!' }
                            ]}>
                            <Input type='email' placeholder='enter a email address...' prefix={<MailOutlined />} />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: "please enter a password" }
                            ]}>
                            <Input.Password type='' placeholder='enter a password...' />
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' htmlType='submit' block>Login</Button>
                        </Form.Item>
                        <Form.Item className='flex justify-center'>
                            <Link href="/auth/signup" >Create a new Account?<Button type='link' className='p-0 m-0'>Signup</Button></Link>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    )
}

export default LoginPage;