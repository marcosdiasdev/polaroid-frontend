import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

function PhotoUploader() {

  const history = useHistory();
  const [ description, setDescription ] = useState('');
  const [ fileName, setFileName ] = useState('');
  const [ selectedFile, setSelectedFile ] = useState(null);
  const photoRef = useRef(null);

  function handleFileSelection(e) {
    if(e.target.files[0]) {
      setFileName(e.target.value);
      setSelectedFile(e.target.files[0]);

      const reader = new FileReader();
      reader.onloadend = function(f) {
        photoRef.current.src = f.target.result;
      }
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  async function handleUpload(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('description', description);
    formData.append('file', selectedFile);

    const options = {
      method: 'post',
      credentials: 'include',
      body: formData
    };
    const response = await fetch(process.env.REACT_APP_API_PHOTOS, options);
    
    if(response.ok) {
      history.replace('/');
    }
  }

  return (
    <form onSubmit={handleUpload}>
      <div>
        <label htmlFor="description">Description</label>
        <input
          type="text" 
          name="description" 
          id="description" 
          required
          value={description} 
          onChange={e => setDescription(e.target.value)} 
        />
      </div>
      <div>
        <label htmlFor="file">File</label>
        <input
          type="file" 
          name="file" 
          id="file"
          required
          value={fileName}
          onChange={handleFileSelection}
        />
      </div>
      <img ref={photoRef} alt={description} />
      <div>
        <button>Upload</button>  
      </div> 
    </form>
  );
}

export default PhotoUploader;