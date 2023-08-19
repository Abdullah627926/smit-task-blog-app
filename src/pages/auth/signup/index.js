import React, { useState } from 'react'
import { Card, Form, Input, Button, Typography, Layout } from "antd";
import { useRouter } from 'next/router'
import Link from 'next/link'
import { MailOutlined, UserOutlined } from '@ant-design/icons'
import { useAuth } from '@/hooks';

const SignUpPage = () => {
    const [loading, setloading] = useState(false)
    const { asPath, push } = useRouter()
    const { signup } = useAuth()
    const onFinish = async (props) => {
        console.log(props)
        try {
            setloading(true)
            await signup(props)
            push("/dashboard")
            message.success("your account is sucessfully created!")
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
                    <Typography.Title className='flex justify-center mb-10 !text-white'>Signup</Typography.Title>
                </Header>
            </div>
            <div className='flex justify-center items-center h-[70vh]'>
                <Card className='flex flex-col item-center  bg-gray-100'>
                    <Form
                        onFinish={onFinish}
                        className='w-[600px] h-[400px] flex flex-col py-0 mx-0'>
                        <Form.Item
                            name="username"
                            rules={[
                                { required: true, message: "please enter a First name" }
                            ]}>
                            <Input
                                placeholder='enter a first Name'
                            />
                        </Form.Item>
                        <Form.Item
                            name="lastname"
                            rules={[
                                { required: true, message: "please enter a last Name" }
                            ]}>
                            <Input
                                placeholder='enter a lastname...' />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[
                                { required: true, message: "please enter a emailn" }
                            ]}>
                            <Input
                                placeholder='enter a email...' />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: "please enter a password!" }
                            ]}>
                            <Input.Password
                                placeholder='enter a email pasword...'
                            />
                        </Form.Item>
                        <Form.Item
                            name="repeatpassword"
                            rules={[
                                { required: true, message: "please enter a repeatpassword!" },
                                { min: 6, message: "must be a six character!" }
                            ]}>
                            <Input.Password
                                placeholder='enter a repeatpassword...' />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType='submit' block>Register</Button>
                        </Form.Item>
                        <Form.Item className='flex justify-center'>
                            <Link href="/auth/login" >Already have a  account?<Button type='link' className='m-0 p-0'>Login</Button></Link>
                        </Form.Item>
                    </Form>
                </Card>
            </div >
        </div>
    )
}

export default SignUpPage;
// this is signup page