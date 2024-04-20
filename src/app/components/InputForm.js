import React, { useState, useEffect } from 'react';
import { Select, Button } from 'antd';
import axios from 'axios';
import styles from "./style.module.css";

const { Option } = Select;

const InputForm = ({ onSubmit }) => {
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [options, setOptions] = useState([]);

    const handleSearch = async (value) => {
        if (value) {
            try {
                const response = await axios.get(
                    `http://api.geonames.org/searchJSON?q=${value}&maxRows=5&username=ritwikbhardwaj`
                );
                const options = response.data.geonames.map(place => ({
                    value: place.name,
                }));
                setOptions(options);
            } catch (error) {
                console.error('Error fetching autocomplete suggestions:', error);
            }
        } else {
            setOptions([]);
        }
    };

    const handleChange = (value) => {
        setSelectedLocations(value);
    };

    const handleSubmit = () => {
        onSubmit(selectedLocations);
    };

    const handleReset = () => {
        setSelectedLocations([]);
    };

    useEffect(() => {
        const fetchData = async () => {
            // Fetch weather data and generate recommendations
            onSubmit(selectedLocations);
        };

        // Call fetchData whenever selectedLocations changes
        fetchData();
    }, [selectedLocations]);

    return (
        <div className='my-3'>
            <Select
                mode="multiple"
                style={{ width: '100%' }}
                size='large'
                placeholder="Select destinations"
                value={selectedLocations}
                onSearch={handleSearch}
                onChange={handleChange}
                allowClear
            >
                {options.map((option, index) => (
                    <Option key={index} value={option.value}>
                        {option.value}
                    </Option>
                ))}
            </Select>
            <div className='my-3'>
                <Button type="primary" className={styles.submitBtn} onClick={handleSubmit} size='large'>Get Weather</Button>
                <Button onClick={handleReset} size='large'>Reset</Button>
            </div>
        </div>
    );
};

export default InputForm;