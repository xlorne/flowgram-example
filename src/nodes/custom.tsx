import { Button, Form, Input, Space } from 'antd';
import { ValidateTrigger, type FlowNodeJSON, type FormMeta, type FormRenderProps } from "@flowgram.ai/free-layout-editor";
import React from 'react';

export const renderForm = ({ form }: FormRenderProps<FlowNodeJSON>) => {

    const [formControl] = Form.useForm();

    const [number, setNumber] = React.useState(0);

    return (
        <>
            <Form
                form={formControl}
                initialValues={form.initialValues}
                onValuesChange={(values) => {
                    const keys = Object.keys(values);
                    for (const key of keys) {
                        const value = values[key];
                        form.setValueIn(key, value)
                    }
                }}
            >
                <Form.Item
                    name={"title"}
                    label={"标题" + number}
                >
                    <Input />
                </Form.Item>
            </Form>

            <Space>

                <Button onClick={() => {
                    setNumber(number + 1)
                }}>test</Button>

                <Button onClick={() => {
                    formControl.setFieldValue('title', '123');
                }}>set title</Button>

                <Button onClick={() => {
                    const title = formControl.getFieldValue('title');
                    alert(title);
                }}>get title</Button>
            </Space>
        </>
    );
};

export const custom: FormMeta<FlowNodeJSON> = {
    render: renderForm,
    validateTrigger: ValidateTrigger.onChange,
    validate: {
        title: ({ value }: { value: string }) => (value ? undefined : 'Title is required'),
    }
}