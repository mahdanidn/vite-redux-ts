import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { getProduts } from "../features/productSlice"
import { AppDispatch } from "../app/store"

const ShowProduct = () => {
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(getProduts())
  }, [dispatch])

  return <div className="box mt-5"></div>
}

export default ShowProduct
