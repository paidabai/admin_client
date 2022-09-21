import React from 'react';
import {Form, Input} from "antd";

function DeleteForm(props) {
    const { categoryName } = props
    return (
        <Form>
            <Form.Item initialValue={categoryName}
                       name='categoryName'
                       >
                <Input disabled={true}/>
            </Form.Item>
        </Form>
    );
}

export default DeleteForm;