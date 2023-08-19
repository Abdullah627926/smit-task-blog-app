import { Modal, Form, Input, Button } from 'antd';

const EditModal = ({ post, visible, onCancel, onSave }) => {
    const [form] = Form.useForm();

    const handleSave = () => {
        form.validateFields().then(values => {
            onSave(post.id, values); // Call the onSave function from the parent component
        });
    };

    return (
        <Modal
            visible={visible}
            title="Edit Blog Post"
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button key="save" type="primary" onClick={handleSave}>
                    Save
                </Button>,
            ]}
        >
            <Form form={form} initialValues={post}>
                <Form.Item name="title" rules={[{ required: true, message: 'Title is required' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="description" rules={[{ required: true, message: 'Description is required' }]}>
                    <Input.TextArea rows={4} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditModal;
