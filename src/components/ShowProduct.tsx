import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getProduts, productSelectors } from "../features/productSlice"
import { AppDispatch } from "../app/store"
import { Link } from "react-router-dom"

const ShowProduct = () => {
  const dispatch: AppDispatch = useDispatch()
  const products = useSelector(productSelectors.selectAll)

  useEffect(() => {
    dispatch(getProduts())
  }, [dispatch])

  return (
    <div className="box mt-5">
      <Link to="add" className="button is-success">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, idx) => (
            <tr key={product.id}>
              <td>{idx + 1}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>
                <button className="button is-info is-small">Edit</button>
                <button className="button is-danger is-small">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ShowProduct
