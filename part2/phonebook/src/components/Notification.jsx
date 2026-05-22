const Notification = ({ notification, errorNotification }) => {
    const notificationStyle = {
        'color': 'green',
        'background': 'lightgrey',
        'fontSize': '20px',
        'borderStyle': 'solid',
        'borderRadius': '5px',
        'paddingLeft': '10px',
        'marginBottom': '10px',
    }

    const errorStyle = {
        'color': 'red',
        'background': 'lightgrey',
        'fontSize': '20px',
        'borderStyle': 'solid',
        'borderRadius': '5px',
        'paddingLeft': '10px',
        'marginBottom': '10px',
    }

    if (notification) {       
        return(
            <div style={notificationStyle}>
                <p>{notification}</p>
            </div>
    )}

    if (errorNotification) {       
        return(
            <div style={errorStyle}>
                <p>{errorNotification}</p>
            </div>
    )}


}

export default Notification