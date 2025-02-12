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

    async function fetchProducts(){
        try {
            setLoading(true)
            //? Fetches 20 products, skipping previous ones based on count
            const response = await fetch(`https://dummyjson.com/products?limit=20&skip=${count === 0 ? 0 : count * 20}`)
            //? Converts the response into JSON format
            const result = await response.json()

            if(result && result.products && result.products.length) {
                setProductsData(result.products)
                setLoading(false)
            }

            console.log(result)

        } catch(e) {
            console.log(e)
            setLoading(false)
        }
    }

    //? Runs fetchProducts when the component first mounts
    useEffect(() => {
        fetchProducts()
    },[])

    if(loading) {
        return <div>Loading data...</div>
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
        </div>
    )
}