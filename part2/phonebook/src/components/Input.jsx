export default function Input({ text, onChange, value }) {
    return (
        <label htmlFor={text}>{text}: 
            <input type='text' value={value} name={text} onChange={onChange} />
        </label>        
    )
}