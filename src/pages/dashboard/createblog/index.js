import { collection, addDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { db } from "@/service/firebase";
const CreateBlog = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (value) => {
        setLoading(true);
        console.log(value)
        const { title, description } = value
        try {
            const docRef = await addDoc(collection(db, "blogs"), {
                title: title,
                description: description,
            });
            setLoading(false);
            message.success("blog sucessfully created")
            form.resetFields()
        } catch (e) {
            setLoading(false)
            message.error(e)
        }
    }

    return (
        <div className="flex justify-center items-center flex-col">
            <Typography.Title>Create Blog</Typography.Title>
            <Card className="fle justify-center items-center">
                <Form onFinish={onFinish}
                    disabled={loading}
                    form={form}
                    className="w-[600px] bg-slate-400 p-10 ">
                    <Form.Item name="title" rules={[{ required: true, message: "Please input the title" }]}>
                        <Input placeholder="Enter the title" />
                    </Form.Item>
                    <Form.Item name="description" rules={[{ required: true, message: "Please input the description" }]}>
                        <Input.TextArea placeholder="Enter the description" rows={4} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit"
                            loading={loading}>
                            Publish
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default CreateBlog;