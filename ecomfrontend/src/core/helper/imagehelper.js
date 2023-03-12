import React from "react";

const imagehelper= ({product}) => {

    const imageURL = product ? product.image : `https://www.pexels.com/photo/assorted-t-shirts-2294342/`
  return (
    <div className="rounded border border-success p-2">
      <img src={imageURL} alt=""
      style={{maxHeight:"100%", maxWidth:"100%"}}
      className="mb-3 rounded"
      />
    </div>
  )
}


export default  imagehelper;