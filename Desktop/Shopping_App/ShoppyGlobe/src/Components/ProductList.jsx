// Import necessary modules
import React, { useState } from 'react'
import useFetchProducts from '../hooks/useFetchProduct' //Custom hook to fetch products from API
import ProductItem from './ProductItem' //Component to render individual product cards
// ProductList component - displays a searchable list of products
function ProductList() {
  // Get product data and any potential fetch error
  const {products, error} = useFetchProducts()
  const[search, setSearch] = useState('')

  //If there's an error in fetching products, displays it  
  if(error) return <p>Error: {error}</p>

  // If products haven't loaded yet, show loading text
  if(!products) {
    return <p>Loading Products..</p>
  }
  
  //State to manage search input value
  // Filter products based on the search input (case-insensitive match)
  const filtered = products.filter(product => product.name?.toLowerCase().includes(search.toLowerCase())) 
  
  if(filtered.length === 0) return <p>No products found</p>
  // Render search bar and filtered product grid
  return (
    <div>
      <div id='search-bar'>
      <input type="text" placeholder='Search Products 🔍' value={search} onChange={(e) => setSearch(e.target.value)}/>
      </div>
      <div className='product-grid'>
      {filtered.map((product) => (
        <ProductItem key={product.id} product={product}/>
      ))}
      </div>
    </div>
  )
}
// Export the component
export default ProductList