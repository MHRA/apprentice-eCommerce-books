import React, {useState, useEffect} from 'react';
import './Details'
import '../App.css';


function Basket({match}){
  
  const [items, setItems] = useState([]);
//   function handleLink(nav) {
//       window.location.href = nav;
//       console.log('The link was clicked.')
//   }

const [count, setCount] = useState(1);
  if (count === -1){
    alert('The Basket is empty')
    setCount(count + 1);
  }else if(count === 21){
    alert('This seller has a limit of 20 per customer.')
    setCount(count -1);
  }
  // function handleLink(nav) {
  //   window.location.href = nav;
  //   console.log('The link was clicked.')
  // }
  let totalAmount =(0.00).toFixed(2);
  console.log(totalAmount)

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
  }, [])


  return (
    <React.Fragment>
    <header>
    </header>
    <div className="App" >
      {items.map((book)=>{
        return(
          <div className = "wrapper1" key = {book.details_id}>
            <div class = "product-img1">
              <img src={book.image} alt="" height="420" width= "327"/>
            </div>
            <div class="product-info1">
              <div class="product-text2">
                <h1>{book.name}     £{book.price}</h1>
                {/* <p>£<span>{book.price}</span></p> */}
                <p>Publisher: {book.publisher} ISBN 10: {book.isbn_10} ISBN 13: {book.isb_13}</p>
                {/* <p>{book.reviews}</p> */}
              </div>
              <div>
                <button class="funtional-buttons">
                  Delete
                </button>
                <button class="funtional-buttons">
                  Save for later
                </button>
                <button class="funtional-buttons">
                  see more like this
                </button>
              </div>
              <div class="total-cart">
              Subtotal ({count} items):£{totalAmount =(count*book.price).toFixed(2)}
              </div>
                <div>
                  
                 
                  <button class="plus-button" onClick={() => setCount(count -1)}>
                  -
                  </button>
                  <button class="plus-button" >{count}</button>
                  <button class="plus-button" onClick={() => setCount(count + 1)}>
                  +
                  </button>
                </div>
                <div class="product-price-btn1">
                <button type="button">Proceed to Checkout</button>
              </div>
            </div>      
        </div>
      )})}
    </div>
    </React.Fragment>
  )
};

export default Basket