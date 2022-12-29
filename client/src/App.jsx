import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [listOfBlogs, setListOfBlogs] = useState([]);
  //create state for each input that will be created for be/db
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const[imageData,setImageData] = useState(null);
  const[imageId,setImageId] = useState(null)

  //for rendering when page reloading
  useEffect(() => {
    //make api request to backend return a promise
    Axios.get("http://localhost:3001/getBlogs").then((response) => {
      //accesing the data from backend
      setListOfBlogs(response.data);
    });
  }, []);
  const fileChange = (e) =>{
      setImageData(e.target.files[0])
      
      }

   function arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };
  //create blog // send back to backend/db
  const createBlog = (e) => {
    e.preventDefault();
      console.log(imageId)
       const data = new FormData()
      
      data.append('file',imageData)
    //add an obj with post req in order to be create it in db
     Axios.post("http://localhost:3001/upload", data).then (response => {
      
      setImageId(response.data.Image._id)
      console.log(response)
      }
      
      )
    
    imageId && Axios.post("http://localhost:3001/createBlog", {
      location,
      description,
    image:imageId,
    }).then((response) => {
       setImageId(null)
         console.log(response)
      alert("blog created successfully");
    });
  };
  return (
    <div className="App">
      <div className="blogDisplay">
        {listOfBlogs.map((blog, key) => {
           let array = blog.image?.img?.data?.data
          let binaryString = `data:image/jpeg;base64,${arrayBufferToBase64(array)}`
 
          return (
            <div key={key} className="wrapper">
              <h1>{blog.location}</h1>
              <p>{blog.description}</p>
               <img
              
                src={binaryString}
                alt=""
              />
              <div>{blog.image}</div>
            </div>
          );
        })}
      </div>

      <form encType="multipart/form-data">
        {/* add on Change to detect when a change is made to the state of each input in order to set the new state  to be detected and send to be/db */}
        <input
          type="text"
          placeholder="location"
          onChange={(event) => {
            setLocation(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="description"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <input
          type="file"
          name="file"
          onChange={fileChange}
        />
         <input
          type="submit"
        value="create blog"
        onClick={createBlog}
        />

       
      </form>
    </div>
  );
}

export default App;
