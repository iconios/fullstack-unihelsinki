import { v4 as uuidv4 } from 'uuid';

export default function CountriesList({ countries }) {
    console.log('Length of countries list received', countries.length)
    return (
        <ul>
            {countries.map(country=> (
                <li key={uuidv4()}>{country.name.common}</li>
            ))}
        </ul>
    )
}