import "./Error.css"

function Error({title, message}){
    return(
        <div className="error-wrapper">
            <h1>{title}</h1>
            <p>{message}</p>
        </div>
    );
}

export default Error;