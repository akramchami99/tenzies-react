

export default function Die (props){

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return(
        <div className="die--main" style={styles} onClick={(id)=> props.toggleDice(props.id)}>
            {props.value}
        </div>
    )
}   