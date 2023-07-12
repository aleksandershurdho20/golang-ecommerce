export default function ListProducts({
  data,
  handleDeleteProduct,
  handleViewProduct,
}) {
  return (
    <>
      <table className="table table striped">
        <thead>
          <tr>
            <th scope="col">TITLE</th>
            <th scope="col">QUANTITY</th>
            <th scope="col">PRICE</th>
            <th scope="col">DESCRIPTION</th>
            <th scope="col">CATEGORY</th>
            <th scope="col">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((product) => (
              <tr key={product._id}>
                <td>{product.title}</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td>
                  <>
                    <button
                      className="btn btn-light"
                      onClick={() => handleViewProduct(product._id)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-light mx-2"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
