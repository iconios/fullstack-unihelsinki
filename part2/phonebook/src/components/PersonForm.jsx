export default function PersonForm( {nameVal, nameChange, numVal, numChange, onClick} ) {
    
    return (
        <form>
            <label htmlFor='name'>Name: <input type='text' value={nameVal} name='name' onChange={nameChange} /></label>
            <br />
            <label htmlFor='number'>Number: <input type='text' value={numVal} name='number' onChange={numChange} /></label>
            <br />
            <button type='submit' onClick={onClick}>Add</button>
        </form>
    )
}