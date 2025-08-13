// Import necessary hooks from React
import { useEffect, useState } from "react";
// Custom hooks: useFetchProducts
// Responsible for fetching product from external API
function useFetchProducts() {
    // State to hold fetched products
    const[products, setProducts] = useState([])
    // State to hold error messages, if there are any
    const[error, setError] = useState(null)
    // UseEffect runs only once on component mount as there is an empty dependency array
    useEffect(() => {
        // Fetch data from DummyJSON API
        fetch('http://localhost:5001/api/products')
            .then((res) => {
                if(!res.ok) throw new Error('Failed to fetch products') //Manual error throw if response isn't OK 
                return res.json()
            })
            .then((data) => setProducts(data)) //Set products into state
            .catch((err) => setError(err.message)) // Handle and store fetch error
    }, [])
    // Returns both products and error so other components can use them
    return {products, error}
}
// Export the custom hook
export default useFetchProducts