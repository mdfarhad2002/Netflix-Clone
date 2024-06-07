 import React from 'react'
 import Card from './Card'
 import './Row.scss'

const imageUrl1="https://image.tmdb.org/t/p/original"


function Row(props){
  const arr1=[{}]
  return (
    <div className='rows'>

        <h2>{props.title}</h2>
        <div>
            {
              arr1.map((items,index)=>(
              <Card key={index} image1={`${imageUrl1}${items.poster_path}`}/>
            ))
            }
        </div>
    
    </div>
   
  )
}

export default Row
