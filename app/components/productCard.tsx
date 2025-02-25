import React, { useState } from 'react'
import Card from '~/custom/Card'
import type { Product } from '~/utils/Product'
import { FaPencil, FaRegTrashCan } from "react-icons/fa6";
import { updateProduct, deleteProduct } from '~/utils/fetchDB';
import { useProductContext } from '~/contexts/productContext';
import { useConfirmation } from '~/contexts/confirmationContext';
import Popup from '~/custom/Popup';

function ProductCard({product, onClose}: {product: Product, onClose: () => void}) {
  const { products, setProducts } = useProductContext()
  const [isEditing, setIsEditing] = useState(false)
  const {confirmation, setConfirmation} = useConfirmation()
  const [isDeleting, setIsDeleting] = useState(false)
  React.useEffect(() => {
    console.log('Confirmation:', confirmation)
    setConfirmation(false)
  }, []);

  React.useEffect(() => {
    console.log("Confirmation updated:", confirmation)
    if (confirmation) {
      handleDelete()
      setIsDeleting(false)
    }
  }
  , [confirmation]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const updatedProduct = {
      id: product.id,
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: Number(formData.get('price')),
      image: product.image,
      tags: [formData.get('tag') as string]
    }
    console.log(await updateProduct(updatedProduct));
    setIsEditing(false)
    setProducts(products.map(p => p.id === product.id ? updatedProduct : p))
    product = updatedProduct
  }

  const closePopup = () => {
    setIsDeleting(false)
  }

  React.useEffect(() => {
    console.log('Products updated:', products)
  }, [products]);

  const handleDelete = async () => {
    console.log('Delete product')
    const id = product.id
    console.log(await deleteProduct(id))
    setProducts(products.filter(p => p.id !== id))
    setConfirmation(false)
    onClose()
  }

  const openPopup = () => {
    setIsDeleting(true)
  }
  return (
    <Card className="w-64 h-max gallery-card-bg" onClose={onClose}>
      {isDeleting && (
        <Popup onClose={closePopup}>
          <h2 className="text-xl text-white">Are you sure you want to delete this product?</h2>
          </Popup>
      )}
        <div className="flex flex-col items-center justify-center">
          <img src={product.image} alt={product.name} className="w-16 h-16 rounded-full" />
          {!isEditing && (
            <>
              <h2 className="text-xl text-white text-shadow font-semibold">{product.name}</h2>
              <p className="text-sm text-white">{product.description}</p>
              <p className="text-sm text-white font-semibold">{'$' + product.price}</p>
              <p className='text-sm text-white bg-inputs rounded-full px-2 py-1 font-semibold'>{product.tags[0]}</p>
            </>
          )}
            {isEditing && (
                <form className="flex flex-col items-center justify-center" onSubmit={handleSubmit}>
                    <span className="text-white text-xl">Name</span>
                    <input
                        name="name"
                        type="text"
                        defaultValue={product.name}
                        className="border-2 bg-white border-black rounded-md p-2 w-full text-black"
                      />
                      <span className="text-white text-xl">Description</span>
                      <input
                        name="description"
                        type="text"
                        defaultValue={product.description}
                        className="border-2 bg-white border-black rounded-md p-2 w-full text-black"
                      />
                      <span className="text-white text-xl">Price</span>
                      <input
                        name="price"
                        type="number"
                        defaultValue={product.price}
                        className="border-2 border-black bg-white rounded-md p-2 w-full text-black"
                      />
                      <span className="text-white text-xl">Tag</span>
                      <select name="tag" className="border-2 bg-white border-black rounded-md p-2 w-full text-black">
                        <option value="1">Cars</option>
                        <option value="0">Toys</option>
                        <option value="3">GPU</option>
                        <option value="2">CPU</option>
                        <option value="6">Phones</option>
                      </select>
                      <button
                        type="submit"
                        className="bg-inputs text-white p-2 rounded-md mt-5"
                      >
                        Save
                      </button>
              </form>
              )}
         <div className="flex justify-center items-center space-x-2">
          <button onClick={() => setIsEditing(!isEditing)} className="text-white bg-inputs hover:bg-blue-700 p-2 rounded-full">
                <FaPencil />
            </button>
            <button className="text-white bg-inputs  p-2 rounded-full" onClick={() => openPopup()}>
                <FaRegTrashCan />
            </button>
          </div>
        </div>
    </Card>
  )
}

export default ProductCard