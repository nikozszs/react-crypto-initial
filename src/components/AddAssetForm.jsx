import { useState } from 'react';
import { Select, Space } from 'antd';
import { useCrypto } from '../context/crypto-context';

export default function AddAssetForm() {
    const {crypto} = useCrypto()
    const [coin, setCoin] = useState(null);
    if (!coin) {
        return (
            <Select
                style={{ width: '100%' }}
                placeholder="Select coin"
                onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
                onClick={() => setSelect((prev) => !prev)}
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
    return (
        <form>
           FORM ASSET 
        </form>
    )
}