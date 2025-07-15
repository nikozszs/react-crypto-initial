import { useState, useRef } from 'react';
import { Select, Space, Divider, Form, DatePicker, Result, Button, InputNumber } from 'antd';
import { useCrypto } from '../context/crypto-context';
import CoinInfo from './CoinInfo';


const validateMessages = {
    required: "${label} is required",
    types: {
        number: "${label} is not valid number",
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    }
};

export default function AddAssetForm({onClose}) {
    const [form] = Form.useForm()
    const {crypto} = useCrypto()
    const [submit, setSubmit] = useState(false)
    const [coin, setCoin] = useState(null);
    const assetRef = useRef()

    if (submit) {
        return (
        <Result
            status="success"
            title="New Asset Added"
            subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
            extra={[
            <Button type="primary" key="console" onClick={onClose}>
                Close
            </Button>
            ]}
      />)
    }

    if (!coin) {
        return (
            <Select
                style={{ width: '100%' }}
                placeholder="Select coin"
                onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
                options={crypto.map((coin) => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon
                }))}
                optionRender={(option) => (
                <Space>
                    <img style={{width: 20}} src={option.data.icon} alt={option.data.label} /> {''}
                    {option.data.label}
                </Space>
                )}
            />
        )
    } 

    function onFinish(values) {
        console.log(values)
        const newAsset = {
            id: coin.id,
            amount: values.amount,
            price: values.price,
            date: values.date?.$d ?? new Date(),
        }
        assetRef.current = newAsset
        setSubmit(true)
    }

    function handleAmountChange(value) {
        const price = form.getFieldValue('price')
        form.setFieldValue({
            total: +(value * price).toFixed(2)
        })
    }

    function handlePriceChange(value) {
        const amount = form.getFieldValue('amount')
        form.setFieldValue({
            total: +(amount * value).toFixed(2)
        })
    }

    return (
        <Form
            form={form}
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 10 }}
            style={{ maxWidth: 600 }}
            initialValues={{
                price: +coin.price.toFixed(2),
            }}
            onFinish={onFinish}
            validateMessages={validateMessages}
        >
            <CoinInfo coin={coin} />
            <Divider />
                <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[{ required: true, type: 'number', min: 0 }]}
                    >
                <InputNumber placeholder='Enter coin amount' onChange={handleAmountChange} style={{width: '100%'}} />
                </Form.Item>
                <Form.Item
                    label="Price"
                    name="price"
                    >
                    <InputNumber disabled onChange={handlePriceChange} style={{width: '100%'}} />
                </Form.Item>
                <Form.Item
                    label="Total"
                    name="total"
                    >
                    <InputNumber disabled style={{width: '100%'}} />
                </Form.Item>
                <Form.Item
                    label="Date & Time"
                    name="date"
                    >
                    <DatePicker showTime/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add asset
                    </Button>
                </Form.Item>
        </Form>
    )
}