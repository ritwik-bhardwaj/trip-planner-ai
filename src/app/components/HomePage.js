'use client'

import React, { useState } from 'react';
import InputForm from '../components/InputForm';
import axios from 'axios';
import WeatherDisplay from './WeatherDisplay';
import Image from 'next/image';
import styles from "./style.module.css";
import Recommendation from './Recommendation';

const API_KEY = '535565f66c63f45de75d7508b8169a4d';

const IndexPage = () => {
    const [weatherData, setWeatherData] = useState([]);

    const fetchWeatherData = async (locations) => {
        try {
            const promises = locations.map(location =>
                axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`)
            );
            const responses = await Promise.all(promises);
            const data = responses.map(response => ({
                key: response.data.id, // Use a unique key for each row
                city: response.data.name,
                temperature: response.data.main.temp,
                weather: response.data.weather[0].description,
            }));
            setWeatherData(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    return (
        <div className='container-fluid'>
            <header>
                <nav className="navbar mb-5">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">
                            <Image src="logo.svg" alt="Trip Planner AI logo" width={207} height={29} sizes="100vw" style={{ maxWidth: '100%', height: 'auto', }} />
                        </a>
                    </div>
                </nav>
            </header>
            <div className='container'>
                <h1 className={`${styles.heading} text-center mb-3 fw-semibold`}>Select Destinations</h1>
                <InputForm onSubmit={fetchWeatherData} />
                <Recommendation weatherData={weatherData} />
                <WeatherDisplay weatherData={weatherData} />
            </div>
            <footer className={`${styles.footer} py-3`} style={{ textAlign: 'center', position: 'fixed', bottom: 0, width: '100%' }}>
                © 2024 Trip Planner AI. All rights reserved.
            </footer>
        </div>
    );
};

export default IndexPage;
