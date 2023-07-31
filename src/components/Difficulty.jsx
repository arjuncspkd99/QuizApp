/* eslint-disable no-unused-vars */
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space } from 'antd';
import '../App.css';


const handleButtonClick = (e) => {
    message.info('Click on left button.');
    console.log('click left button', e);
};
const handleMenuClick = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
};
const items = [
    {
        label: 'Easy',
        key: '1',
    },
    {
        label: 'Medium',
        key: '2',
    },
    {
        label: 'Hard',
        key: '3',
        danger: true,
    },
];
const menuProps = {
    items,
    onClick: handleMenuClick,
};

const Difficulty = () => {
    return (
        <div className='diff-drop-down' >
            <Dropdown menu={menuProps}
                trigger={['click']}
            >
                <Button style={{ width: '400px', height: '52px', backgroundColor: 'rgb(209, 209, 3)', color: '#ffffff', fontFamily: 'Poppins', fontSize: '24px', textAlign: 'left' }}>
                    <Space size={160}>
                        Difficulty Level
                        <DownOutlined />
                    </Space>
                </Button>
            </Dropdown>
        </div>
    )
}

export default Difficulty
