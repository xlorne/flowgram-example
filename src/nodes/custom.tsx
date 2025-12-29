import { Button, Input, Space } from 'antd';
import { Field,  ValidateTrigger, type FieldRenderProps, type FlowNodeJSON, type FormMeta, type FormRenderProps } from "@flowgram.ai/free-layout-editor";
import { type IJsonSchema } from '@flowgram.ai/form-materials';
import { SubCanvasRender } from '@flowgram.ai/free-container-plugin';

export const renderForm = ({ form }: FormRenderProps<FlowNodeJSON>) => {

    const formHeight = 0;

    return (
        <div>
            <Field
                name='title'
                render={(field: FieldRenderProps<IJsonSchema>) => {
                    const value = field.field.value;
                    const errors = field.fieldState.errors;
                    return (
                        <>
                            {errors && errors.map(item => {
                                return item.message;
                            })}
                            标题: <Input value={value as string} onChange={field.field.onChange} />
                        </>
                    )
                }}
            >
            </Field>
            <SubCanvasRender offsetY={-formHeight} />
            <Space
                style={{
                    marginTop: 5
                }}
            >
                <Button onClick={() => {
                    form.setValueIn('title', '123');
                }}>set title</Button>

                <Button onClick={() => {
                    const title = form.getValueIn('title');
                    alert(title);
                }}>get title</Button>
            </Space>
        </div>
    );
};

export const custom: FormMeta<FlowNodeJSON> = {
    render: renderForm,
    validateTrigger: ValidateTrigger.onChange,
    validate: {
        title: ({ value }: { value: string }) => {
            return value ? undefined : 'Title is required';
        },
    }
}