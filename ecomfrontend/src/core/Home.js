import React, {useState, useEffect} from 'react';
import Base from './Base';
import "../styles.css"
import {getProducts} from "./helper/coreapicalls"
import Card from './Card';

const Home = () => {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)

  const loadAllProducts = () => {
    getProducts()
      .then((data) => {
        if (data.error) {
          setError(data.error);
          console.log(error);
        } else {
          setProducts(data);
        }
      });
  };


  useEffect(() => {
    loadAllProducts();
  }, []); 




  return (
    <Base title='Home Page' description='Welcome to COC Merchandise store'>
        <h1>You are on Home Page</h1>
        <div className="row">
          {products.map( (product, index) => {
            return(
              <div key={index} className="col-4 mb-4">
                <Card product={product}/>
              </div>
            )
          })}
        </div>
    </Base>
  )
}

{/* <h1>{product.name}</h1> */}
export default Home;