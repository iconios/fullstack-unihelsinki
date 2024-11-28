import personsService from '../services/persons';

export default function Persons({ persons, delClick }) {

  return (
    <ul>
      {persons.map(person=> (
        <li key={person.id}>{person.name} {person.number} <button type='button' onClick={()=>delClick(person.id)}>Delete</button> </li>
      ))}
    </ul>
  )
}