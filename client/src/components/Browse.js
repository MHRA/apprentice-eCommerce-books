import React, {useState, useEffect} from 'react';
import ListItem from './ListItem';
import '../App.css';


export default function MainPage (){
  
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("");
  const [searchState, setSearch] = useState("")


  function handleLink(nav) {
      window.location.href = nav;
      console.log('The link was clicked')
  }

  function searchBook(){
    console.log(searchState)
    let searchJson = {search : searchState};
    // console.log(JSON.stringify(category))
    fetch('http://localhost:4000/search', {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(searchJson)
    })
    .then(response => response.json())
    .then(response => {
      setItems(response.data); 
      // console.log(response)
       })
    .catch(err => console.error(err))
  }

  function handleInput(event){
    setSearch(event.target.value);
  };

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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
      <div class="searchWrap">
        <div class="search">
          <input type="text" class="searchTerm" onChange={handleInput} placeholder="Enter the name of the book" />
          <button type="submit" class="searchButton" onClick={searchBook}><i class="fa fa-search"></i></button>
        </div>
       </div>
        <div class="book-category-btn">
          <button type="button"  onClick={()=>{handleCategory("animals")}}>animals</button>
          <button type="button" onClick={()=>{handleCategory("comics")}}>comics</button>
          <button type="button" onClick={()=>{handleCategory("all")}}>all</button>
       </div>
      

      {items.map((book)=>{
        return(
          <ListItem
          key={book.details_id}
          book={book}
          handleLink={handleLink}/>
      )})}
    </div>
    </React.Fragment>
  )
};