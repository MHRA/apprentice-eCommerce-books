import React from 'react';

export default function ListItem (props){
  return(
    <div className="wrapper">
                <div key = {props.book.details_id}>
                  <div class ="book-img">
                    <img src={props.book.image} height="420" width="327"/>
                  </div>
                  <div class="book-info">
                    <div class="book-text">
                      <h1>{props.book.name}</h1>
                      <h2>{props.book.total_rating}</h2>
                      <p></p>
                    </div>
                    <div class="book-price-btn">
                      <p>£<span>{props.book.price}</span></p>   
                      <button type="button" onClick={()=>{props.handleLink(`/details/${props.book.details_id}`)}}>Details</button>
                    </div>
                  </div>
                </div>
              </div>
  )
}