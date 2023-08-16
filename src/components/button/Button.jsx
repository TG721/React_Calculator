import "./Button.css"

function Button(props){

    return <div  onClick={props.onClick} className={props.className} >{props.value}</div>
}  

export default Button