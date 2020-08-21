import { Form, Input, Modal } from 'antd';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import chatApi from 'api/chatApi';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

ModalCreateRoom.propTypes = {
    visible: PropTypes.bool,
    toggle: PropTypes.func,
}

ModalCreateRoom.defautProps = {
    visible: false,
    toggle: null,
}

function ModalCreateRoom({ visible, toggle }) {
    const [form] = Form.useForm();
    const [ confirmLoading, setConfirmLoading ] = useState(false);
    const history = useHistory();

    const onCreateRoom = (values) => {
        setConfirmLoading(true);
        chatApi.createRoom(values).then(res => {
            if (res.success) {
                form.resetFields();
                toast.success(res.message);
                setConfirmLoading(false);
                toggle();
                history.push(`/chatroom/${res.chatroom._id}`);
            } else {
                setConfirmLoading(false);
                toast.error(res.message);
            }
        }).catch(err => {
            setConfirmLoading(false);
            toast.error('Error.');
            console.log(err.message)
        })
    };

    const handleCancel = () => {
        if (toggle) {
            toggle();
        }
    };

    return (
        <>
        <Modal
            title="Create room"
            visible={visible}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            onOk={() => {
                form
                  .validateFields()
                  .then(values => {
                    onCreateRoom(values);
                  })
                  .catch(info => {
                    console.log('Validate Failed:', info);
                  });
            }}
        >
            <Form
                form={form}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your chatroom\'s name!' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
        </>
    );
}

export default ModalCreateRoom;