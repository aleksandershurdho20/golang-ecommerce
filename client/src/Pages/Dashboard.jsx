import  { useEffect,useState } from 'react'
import { api } from '../../utils/api'

export default function Dashboard() {
  const [orders,setOrders]=useState([])
  
  useEffect(() =>{
    const user = JSON.parse(localStorage.getItem("user"));
    if(user?.role == "admin"){
      api.get("orders").then(res => setOrders(res.data.orders))

    }
    else{
      api.get(`orders/client/${user._id}`).then(res => setOrders(res.data.orders))


    }
  },[])
  return (
    <div className='container'>
      <div className="row">
        <h2 className='mt-5 mb-5'>Orders</h2>
        <div className="col-md-8">
          <table className='table table striped'>
            <thead>
              <tr>
                <th scope="col">TITLE</th>
                <th scope="col">QUANTITY</th>
                <th scope="col">ADDRESS</th>
                <th scope="col">PHONE</th>
                <th scope="col">CREATED AT</th>

              </tr>
            </thead>
            <tbody>
              {orders?.length >0 && orders?.map(data => data.products.map(product => <tr key={product._id}>
                <td>{product.title}</td>
                <td>{product.quantity}</td>
                <td>{data.address}</td>
                <td>{data.phone}</td>
                <td>{new Date(data.created_at).toLocaleString()}</td>

              </tr>))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
