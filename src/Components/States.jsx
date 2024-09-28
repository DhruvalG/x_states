import React, { useState, useEffect } from 'react';

const States = () => {
  const [selectCountry, setSelectCountry] = useState('');
  const [selectState, setSelectState] = useState('');
  const [selectCity, setSelectCity] = useState('');

  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const fetchCountries = async () => {
    try {
      const response = await fetch('https://crio-location-selector.onrender.com/countries');
      const data = await response.json();
      setCountry(data);
    } catch (error) {
      alert('Error fetching countries:', error);
    }
  };

  const fetchStates = async (country) => {
    try {
      const response = await fetch(`https://crio-location-selector.onrender.com/country=${country}/states`);
      console.log('resopnse',response)
      const data = await response.json();
      setState(data.map(state => state));
    } catch (error) {
      alert('Error fetching states:', error);
    }
  };

  const fetchCities = async (country, state) => {
    try {
      const response = await fetch(`https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`);
      const data = await response.json();
      setCity(data.map(city => city));
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleCountryChange = (e) => {
    setSelectCountry(e.target.value);
    setSelectState('');
    setSelectCity('');
    fetchStates(e.target.value);
  };

  const handleStateChange = (e) => {
    setSelectState(e.target.value);
    setSelectCity('');
    fetchCities(selectCountry, e.target.value);
  };

  const handleCityChange = (e) => {
    setSelectCity(e.target.value);
  };

  return (
    <div>
      <h1>Select Location</h1>
        <select id="country" value={selectCountry} onChange={handleCountryChange} style={{padding:"0.625rem", marginRight:"1.3rem", fontSize:"1rem"}}>
          <option value=""> Select Country </option>
          {country.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>          
        <select id="state" value={selectState} onChange={handleStateChange} style={{padding:"0.625rem", marginRight:"1.3rem", fontSize:"1rem"}}>
          <option value=""> Select State </option>
          {state.map((state, index) => (
            <option key={index} value={state}>
              {state}
            </option>
          ))}
        </select>      
        <select id="city" value={selectCity} onChange={handleCityChange} style={{padding:"0.625rem", fontSize:"1rem"}}>
          <option value=""> Select City </option>
          {city.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>      
      {selectCountry && selectState && selectCity && (
        <p><span style={{fontWeight:"600"}} >You selected <span style={{fontWeight:"700"}}>{selectCity}</span>, </span><span style={{fontWeight:"600", color:"grey"}}>{selectState}, {selectCountry}</span></p>
      )}
    </div>
  );
};

export default States;
