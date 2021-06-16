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
          <div className = "wrapper1" key = {book.details_id}>
            <div class = "product-img1">
              <img src={book.image} alt="" height="420" width= "327"/>
            </div>
            <div class="product-info1">
              <div class="product-text1">
                <h1>{book.name}</h1>
                <h2>{book.total_rating}</h2>
                <p> <strong>Publisher: </strong> {book.publisher}</p> 
                <p> <strong>ISBN 10: </strong> {book.isbn_10}</p> 
                <p> <strong>ISBN 13: </strong> {book.isbn_13}</p>
                <p> <strong>Review:</strong> {book.reviews}</p>

              </div>
              <div class="product-price-btn1">
             
             <button type="button1">add to basket</button>
           </div>
              <div class="product-price-btn1">
              <p>£<span>{book.price}</span></p>
              </div>
            </div>      
        </div>
      )})}
    </div>
    </React.Fragment>
  )
};