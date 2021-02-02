import './Photo.css';

function Photo(props, ref) {

  return (
    <figure>
      <img src={props.path} className="Photo-img" alt="" />
      <figcaption>{props.description}</figcaption>
    </figure>
  );
}

export default Photo;
