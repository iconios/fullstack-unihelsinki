import Toastify from "toastify-js";
import "toastify-js/src/toastify.css"

function showNotification( message, type ) {
    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        borderColor: 'red',
    }

    const validStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        borderColor: 'green',
    }

    const toastStyle = (type === 'error') ? errorStyle : validStyle
    console.log('Toastify message', message)

    Toastify({
        text: message,
        duration: 5000,
        newWindow: false,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: false,
        style: toastStyle,
    }).showToast()
}

export default showNotification