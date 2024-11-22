export default function Button({ text, onClick }) {
    return (
        <span>
            <button type="button" onClick={onClick}>{text}</button>
        </span>
    )
}