import { useState, useEffect } from 'react';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';
import personsService from './services/persons';
import Notification from './components/Notification';

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState('valid');

  useEffect(()=> {
    console.log('Inside effect hook');
    personsService
      .getAll()
      .then(initialPersons => {
        console.log('axios fetch completed');
        setPersons(initialPersons);
      })
  }, []);

  function handleAddClick(e) {
    e.preventDefault();
    //Check nonempty for the name and number fields
    if(newName && newNumber){
      const personFound = persons.find(person=> person.name === newName);
      (personFound) ? handleUpdatePerson(personFound) : handleAddPerson();
    }
    else alert('None of the fields must be empty');
  }

  function handleAddPerson() {
    const newObject = { name: newName, number: newNumber };
    const newPersons = [
      ...persons,        
      newObject,
    ]
    console.log('Name and number', newName, newNumber);
    console.log('New persons array', newPersons);
    setFilteredData('')
    personsService
      .create(newObject)
      .then(returnedPerson => {
        console.log('response data from server', returnedPerson)
        setPersons([...persons, returnedPerson]);
      })
      setNotificationType('valid');
      setNotificationMessage(`Added ${newName}`);
      setTimeout(()=> {
        setNotificationMessage(null)
      }, 5000);   
    setNewName('');
    setNewNumber('');
  }

  function handleUpdatePerson(someone){
    if((window.confirm(`${newName} is already in the phonebook. Replace the old number with new one?`))) {
      console.log('Update confirmation received')
      const newObject = { name: newName, number: newNumber };
      console.log('Name and number', newName, newNumber);
      setFilteredData('')
      personsService
        .update(someone.id, newObject)
        .then(updatedPerson => console.log('Updated person on server:', updatedPerson));          
      const updateSomeone = persons.map(person=> {
        if(person.id === someone.id) {
          return {
            ...person,
            number: newNumber,
          }
        }
        else return person
      }) 
      setPersons(updateSomeone); 
      console.log('Updated person in browser/react: ', updateSomeone)

      setNewName('');
      setNewNumber('');
      setNotificationType('valid');
      setNotificationMessage(`${newName} number updated`);
      setTimeout(()=> {
        setNotificationMessage(null);
      }, 5000);
    }
  }

  function handleNameChange(e){
    setNewName(e.target.value);
  }

  function handleNumberChange(e){
    setNewNumber(e.target.value);
  }

  function handleQuery(e) {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    const filtered = persons.filter((person) =>
      person.name.toLowerCase().includes(value) || person.number.includes(value)
    );
    setFilteredData(filtered);
    console.log('Filtered Persons', filtered);
  };

  function handleDeleteClick(id) {
    console.log(`Ready to delete person id ${id}`)

    if(window.confirm("You're sure you want to delete?")) {

      console.log(`Deletion confirmed for ${id}`)
      
      persons.map(person => {
        if(person.id === id) {
          personsService
            .remove(id)
            .then(removedPerson => console.log('Person removed', removedPerson))
            .catch(error=> {
              setNotificationType('error'),
              setNotificationMessage(`Information for ${person.name} has already been removed from the server`),
              setTimeout(()=> {
                setNotificationMessage(null)
              }, 5000)
            })
        }
        else return person;
      })
      setPersons(persons.filter(person=> person.id !== id));
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType} />
      <Filter value={query} onChange={handleQuery} />

      <h3>Add a New</h3>
      <PersonForm 
      nameVal={newName} 
      numVal={newNumber} 
      nameChange={handleNameChange} 
      numChange={handleNumberChange} 
      onClick={handleAddClick} />
      
      <h3>Numbers</h3>
      {(filteredData.length > 0) ? <Persons persons={filteredData} delClick={handleDeleteClick} /> : <Persons persons={persons} delClick={handleDeleteClick} />}
    </div>  
  )
}

export default App
