export default function FindForm({ text, onChange }) {
    return (
       <label htmlFor="countries">Find countries <input type='text' value={text} onChange={onChange} /> </label>
    )
}