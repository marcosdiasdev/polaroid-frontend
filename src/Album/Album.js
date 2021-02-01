import Photo from '../Photo/Photo';
import './Album.css';
import {useState, useEffect} from 'react';

function Album() {
  
  const [photos, setPhotos] = useState([]);

  async function fetchData() {
    const response = await fetch(process.env.REACT_APP_API_PHOTOS);
    
    if(response.ok) {
      const data = await response.json();
      const photosArray = data.map(photo => {
        photo.path = `${process.env.REACT_APP_API_STORAGE}/${photo.path}`;
        return photo;
      });
      setPhotos(photosArray);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return(
    
    <div className="Album">
      {photos.map((photo, index) => {
        return <Photo path={photo.path} description={photo.description} key={index} />
      })}
    </div>
  );
}

export default Album;