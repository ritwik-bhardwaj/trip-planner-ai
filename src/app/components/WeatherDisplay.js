import { Table } from 'antd';
import React from 'react';
import styles from "./style.module.css";

const WeatherDisplay = ({ weatherData }) => {
    const columns = [
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
        },
        {
            title: 'Temperature (°C)',
            dataIndex: 'temperature',
            key: 'temperature',
        },
        {
            title: 'Weather',
            dataIndex: 'weather',
            key: 'weather',
        },
    ];

    return (
        <div className={styles.tableSize}>
            {weatherData.length > 0 && (
                <Table columns={columns} dataSource={weatherData} pagination={false} />
            )}
        </div>
    );
};

export default WeatherDisplay;