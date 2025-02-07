import { useEffect } from "react"
import { useState } from "react"



export default function LoadMore() {

    const [loading, setLoading] = useState(false)
    const [productsData, setProductsData] = useState([])
    const [count, setCount] = useState(0)

    async function fetchProducts(){
        try {
            
            const response = await fetch(`https://dummyjson.com/products?limit=20&skip=${count === 0 ? 0 : count * 20}`)
            const result = await response.json()

            console.log(res)

        } catch(e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchProducts()
    },[])

    return (
        <div className="loadmore-wrapper">
            
        </div>
    )
}