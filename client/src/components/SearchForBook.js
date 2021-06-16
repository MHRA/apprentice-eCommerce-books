import React, { Component } from "react"
import ListItem
 from "./ListItem";
class SearchForBook extends Component {
  state = {
    name: "",
    returned: []
  };

   handleLink = (nav) => {
    window.location.href = nav;
    console.log('The link was clicked')
}

  setStateToBook = (book) => {
    return new Promise((resolve, reject) => {
        resolve(this.setState({ name: book }))
      }
    )}

    setSearchedBook = (body) => {     
      (this.setState({ 
        returned: body.data,
    }))
  }
      
  sendBook = () => {
    let book = JSON.stringify(this.state)
    const requestOptions = {
      method: "POST",
      body: book,
      headers: {"Content-Type": "application/json"}
    };
    fetch("http://localhost:4000/search", requestOptions)
    .then((response) => {
      return response.json()
    }).then((body)=> {
      this.setSearchedBook(body)
    });;
    
  };

  handleInput = (event) => {
    this.setStateToBook(event.target.value).then(this.sendBook);
  };

  render() {
    return (
      <div>
        <h1>eCommerce Book Search Service</h1>
        <input type="search" class ="searchbox" onChange={this.handleInput} placeholder="Enter the name of the book" />
        <div>
       </div>
       {this.state.returned.map((book)=>{
        return(
          <ListItem
          key={book.details_id}
          book={book}
          handleLink={this.handleLink}/>
      )})}
      </div>
    );
  }
}

export default SearchForBook;