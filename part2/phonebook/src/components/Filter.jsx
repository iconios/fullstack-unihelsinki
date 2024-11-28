export default function Filter({ value, onChange }){
    return (
        <label htmlFor="filter">Filter Shown With <input type='text' name='filter' value={value} onChange={onChange} /></label>
    )
}