import { useEffect } from "react"
import { useState } from "react"
import "../css/Loadmore.css"

export default function LoadMore() {

    //? State to track if data is currently being fetched
    const [loading, setLoading] = useState(false)
    //? State to store the fetched products
    const [productsData, setProductsData] = useState([])
    //? State to track how many times "Load More" is triggered
    const [count, setCount] = useState(0)
    //? State to disable button when item count reaches a certain number set in a useEffect below
    const [disableButton, setDisableButton] = useState(false)

    async function fetchProducts(){
        try {
            setLoading(true)
            //? Fetches 20 products, skipping previous ones based on count value
            const response = await fetch(`https://dummyjson.com/products?limit=20&skip=${count === 0 ? 0 : count * 20}`)
            //? Converts the response into JSON format
            const result = await response.json()

            //? If the result contains products, add them to the existing state
            if(result && result.products && result.products.length) {
                setProductsData((prevData)=> [...prevData, ...result.products])
                setLoading(false)
            }

            console.log(result)

        } catch(e) {
            console.log(e)
            setLoading(false)
        }
    }

    //? Runs fetchProducts when the component first mounts or when count changes
    useEffect(() => {
        fetchProducts()
    },[count])

    //? Disables the "Load More" button once 100 products are loaded
    useEffect(() => {
        if (productsData && productsData.length === 100) {
            setDisableButton(true)
        }
    },[productsData])

    //? Display a loading message while fetching data
    if(loading) {
        return <div>Loading data...</div>
    }

    //? Function to increase count when "Load More" button is clicked
    function handleLoadMore() {
        setCount(count+1)
    }

    return (
        <div className="loadmore-wrapper">
            <div className="products-container">
                {
                    productsData && productsData.length ?
                    productsData.map(item => 
                        <div key={item.id} className="item-container">
                            <img src={item.images} alt={item.title} />
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    )
                    :
                    null
                }
            </div>
            <div className="button-container">
                    <button disabled={disableButton} onClick={() => handleLoadMore()}>LOAD MORE</button>
            </div>
        </div>
    )
}