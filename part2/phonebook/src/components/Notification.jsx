export default function Notification({ message, type }){
    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderColor: 'red',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    const validStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderColor: 'green',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }


    if(message === null) {
        return null;
    }

    return (
        <div style={(type === 'error') ? errorStyle : validStyle}>
            {message}
        </div>
    )
}