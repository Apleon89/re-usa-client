

function OneElement(props) {
  return (
    <div>
        <img src={props.img} alt='ad img' width='200px' />
        <h3>{props.title}</h3>
        <p>{props.username}</p>
    </div>
  )
}

export default OneElement