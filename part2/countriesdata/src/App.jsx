import FindForm from "./components/FindForm";
import FoundCountries from "./components/FoundCountries";
import { useState, useEffect } from "react";
import axios from "axios";
import Notification from "./components/Notification";
import CountriesList from "./components/CountriesList";


function App() {

  const [countries, setCountries] = useState([]);
  const [findText, setFindText] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState('valid');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(()=> {
    axios
      .get('http://localhost:3007/countries')
      .then(response => response.data)
      .then(receivedData => {
        setCountries(receivedData);
        console.log('Data from Axios', receivedData)
      })
      .catch(error=> {
        callNotification('Something went wrong', error)
      })
  }, [])

  function handleShowClick(id) {
    const countryFound = countries.find(country => country.id === id);
    console.log('Country found', countryFound);
    const newCountry = [countryFound];
    setSearchResult(newCountry);
    console.log('Data passed to the next component ', countryFound)
  }

  function handleFindCountries(e) {
    const value = e.target.value.toLowerCase();
    setFindText(value);
    const filtered = countries.filter((country) => country.name.common.toLowerCase().includes(value));
    setSearchResult(filtered);
    console.log('Filtered countries', filtered);
  } 
  
  function callNotification(message, type) {
    setNotificationType(type)
    setNotificationMessage(message)
    setTimeout(()=> {
      setNotificationMessage(null);
    }, 5000)
  }

  return (
    <div>
      <Notification message={notificationMessage} type={notificationType} />
      <h1>Find Countries</h1>
      <FindForm value={findText} onChange={handleFindCountries} />
      {(findText) ? <FoundCountries countries={searchResult} onClick={handleShowClick} /> : <CountriesList countries={countries} /> }
    </div>
  )
}

export default App
