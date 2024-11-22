export default function Button ({ name, onClick }) {
    return (
        <span>
            <button type="button" onClick={onClick} >{ name }</button>
        </span>
    )
}