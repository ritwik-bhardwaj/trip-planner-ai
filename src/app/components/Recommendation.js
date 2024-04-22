import React, { useState, useEffect } from 'react';

const Recommendation = ({ weatherData }) => {
    const [recommendedValue, setRecommendedValue] = useState(null);

    useEffect(() => {
        if (weatherData.length > 0) {
            let minTempCity = null;
            for (let i = 0; i < weatherData.length; i++) {
                const city = weatherData[i];
                if (city.temperature >= 10 && (!minTempCity || city.temperature < minTempCity.temperature)) {
                    minTempCity = city;
                }
            }
            setRecommendedValue(minTempCity);
        } else {
            setRecommendedValue(null);
        }
    }, [weatherData]);

    return (
        <div>
            {(recommendedValue && weatherData.length > 0) ? (
                <>
                    <h2>Recommendation: {recommendedValue.city}</h2>
                </>
            ) : ``}
        </div>
    );
};

export default Recommendation;
