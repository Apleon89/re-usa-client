import "./OneElement.css";

function OneElement(props) {
  return (
    <div className="one-element-div">
      <div className="img-container">
        <img src={props.img} alt="ad img" width="200px" />
      </div>
      <div className="text-container">
        <h3>{props.title.length > 22 ?
        props.title[0].toUpperCase() + props.title.slice(1,22) + '...' :
        props.title[0].toUpperCase() + props.title.slice(1)
        }</h3>
        <p>{props.username}</p>
      </div>
    </div>
  );
}

export default OneElement;


// props.title[0].toUpperCase() + props.title.slice(1)