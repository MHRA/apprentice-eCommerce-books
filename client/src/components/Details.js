import React, {useState, useEffect} from 'react';
import '../App.css'
import './Browse'
export default function MainPage ({match}){
  
  // Returns a stateful value, and a function to update it.
  const [items, setItems] = useState([]);


  // navigation link function
  // function handleLink(nav) {
  //     window.location.href = nav;
  //     console.log('The link was clicked.')
  // }



  function getBooks(){
    fetch(`http://localhost:4000/book-details/${match.params.id}`)
    .then(response => response.json())
    .then(response => {
      setItems(response.data); 
      console.log(response)
       })
    .catch(err => console.error(err))
  }

  // remembers the function passed
  useEffect(() => { 
    getBooks()
  })

 

// maps the items
// returns the mapped items
  return (
    <React.Fragment>
    <div className="App" >

      {items.map((book)=>{
        return(
          <div className = "wrapper" key = {book.details_id}>
            <div class = "product-img">
              <img src={book.image} alt="" height="420" width= "327"/>
            </div>
            <div class="product-info">
              <div class="product-text">
                <h1>{book.name}</h1>
                <h2>{book.total_rating}</h2>
                <p>Publisher: {book.publisher}, ISBN 10: {book.isbn_10}, ISBN 13:{book.isbn_13}</p>
                <p>{book.reviews}</p>

              </div>
              <div class="product-price-btn">
             
             <button type="button">add to basket</button>
           </div>
              <div class="product-price-btn">
              <p>£<span>{book.price}</span></p>
              </div>
            </div>      
        </div>
      )})}
    </div>
    </React.Fragment>
  )
};