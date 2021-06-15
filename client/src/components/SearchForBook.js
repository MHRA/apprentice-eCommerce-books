import React, { Component } from "react"

class SearchForBook extends Component {
  state = {
    name: "",
    returned: []
  };

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
            <div key = {book.id}>
              <div>
                <div>
                  <h1>{book.name}</h1>
                  <h2>{book.ratings}</h2>
                  <p></p>
                </div>
              </div>
            </div>
      )})}
      </div>
    );
  }
}

export default SearchForBook;