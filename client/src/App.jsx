import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [listOfBlogs, setListOfBlogs] = useState([]);
  //create state for each input that will be created for be/db
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  //for rendering when page reloading
  useEffect(() => {
    //make api request to backend return a promise
    Axios.get("http://localhost:3001/getBlogs").then((response) => {
      //accesing the data from backend
      setListOfBlogs(response.data);
    });
  }, []);

  //create blog // send back to backend/db
  const createBlog = () => {
    //add an obj with post req in order to be create it in db
    Axios.post("http://localhost:3001/createBlog", {
      location,
      description,
      image,
    }).then((response) => {
      alert("blog created successfully");
    });
  };
  return (
    <div className="App">
      <div className="blogDisplay">
        {listOfBlogs.map((blog, key) => {
          return (
            <div className="wrapper">
              <h1>{blog.location}</h1>
              <p>{blog.description}</p>
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
          name="image"
          id=""
          onChange={(event) => {
            setImage(event.target.value);
          }}
        />

        <button onClick={createBlog}>create blog</button>
      </form>
    </div>
  );
}

export default App;
