import React, {useState, useEffect} from 'react';
import '../App.css';


export default function MainPage (){
  
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("");


  function handleLink(nav) {
      window.location.href = nav;
      console.log('The link was clicked.')
  }

  function handleCategory(cat){
    setCategory(cat);
    let categoryJson = {category : cat};
    // console.log(JSON.stringify(category))
    fetch('http://localhost:4000/category', {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(categoryJson)
    })
    .then(response => response.json())
    .then(response => {
      setItems(response.data); 
      // console.log(response)
       })
    .catch(err => console.error(err))
  }


  function getBooks(){
    fetch('http://localhost:4000/books')
    .then(response => response.json())
    .then(response => {
      setItems(response.data); 
      // console.log(response)
       })
    .catch(err => console.error(err))
  }

  useEffect(() => { 
    getBooks()
  }, [])


  return (
    <React.Fragment>
    <div>
        <div class="book-category-btn">
          <button type="button"  onClick={()=>{handleCategory("animals")}}>animals</button>
          <button type="button" onClick={()=>{handleCategory("comics")}}>comics</button>
          <button type="button" onClick={()=>{handleCategory("all")}}>all</button>
       </div>
      {items.map((book)=>{
        return(
          <div className="wrapper">
            <div key = {book.details_id}>
              <div class ="book-img">
                <img src={book.image} height="420" width="327"/>
              </div>
              <div class="book-info">
                <div class="book-text">
                  <h1>{book.name}</h1>
                  <h2>{book.total_rating}</h2>
                  <p></p>
                </div>
                <div class="book-price-btn">
                  <p>£<span>{book.price}</span></p>   
                  <button type="button" onClick={()=>{handleLink(`/details/${book.details_id}`)}}>Details</button>
                </div>
              </div>
            </div>
          </div>
      )})}
    </div>
    </React.Fragment>
  )
};