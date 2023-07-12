import  { useEffect,useState } from 'react'
import { api } from '../../utils/api'

export default function Dashboard() {
  const [orders,setOrders]=useState([])
  useEffect(() =>{
    api.get("orders").then(res => console.log(res))
  },[])
  return (
    <div className='container'>
      <div className="row">
        <div className="col-md-8">
          <table className='table table striped'>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">TITLE</th>
                <th scope="col">QUANTITY</th>
                <th scope="col">ADDRESS</th>
                <th scope="col">PHONE</th>
                <th scope="col">TOTAL</th>

              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  )
}
