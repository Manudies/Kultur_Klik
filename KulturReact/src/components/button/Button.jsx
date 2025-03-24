import "./button.css"


function Button({label, clase, onClick = () => {
    
}}) {
    return(
        <button className={clase} onClick={onClick}>{label}</button>
    );
}
export default Button;