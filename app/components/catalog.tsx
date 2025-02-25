import React, { useEffect, useRef, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import Webcam from "react-webcam";
import Card from "~/custom/Card";
import dataURLtoFile from "~/utils/functions";
import {
  loader,
  postProduct,
  getProductsFromServer,
} from "~/utils/fetchDB";
import type { Product } from "~/utils/Product";
import ProductCard from "./productCard";
import { useProductContext } from "~/contexts/productContext";

export default function Catalog() {
  const [animate, setAnimate] = useState(false);
  const { products, setProducts } = useProductContext();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [webcamActive, setWebcamActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState("");
  const webcamRef: any = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedTag, setSelectedTag] = useState("");
  const [maxPrice, setMaxPrice] = useState(0);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    console.log("Captured image:", capturedImage);
  }, [webcamRef]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      setAnimate(true);
      await fetchProducts();
      setMaxPrice(Math.max(...products.map((product) => product.price)));
      console.log(maxPrice);
    };
    fetchData();
  }, []);

  const fetchProducts = async () => {
    try {
      const imageUrls = await getProductsFromServer();
      console.log("Fetched images:", imageUrls);
      setProducts(imageUrls);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    console.log("Open card");
    setIsOpen(true);
    console.log(loader());
  };

  const handleClose = () => {
    if (selectedProduct) {
      setSelectedProduct(null);
      return;
    }
    console.log("Close card");
    setIsOpen(false);
    setCapturedImage("");
    setWebcamActive(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data: Product = {
      id: Date.now(),
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      image: formData.get("image") as string,
    };

    if (webcamActive) {
      const file = dataURLtoFile(capturedImage, "image.jpg");
      data.image = file;
    }

    const newProduct = await postProduct(data);
    console.log("New product:", newProduct);
    setProducts([...products, newProduct]);
    handleClose();
  };

  useEffect(() => {
    console.log("Products updated:", products);
  }, [products]);

  const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTag(event.target.value);
  };

  const filteredProducts = selectedTag
    ? products.filter((product) => product.tags[0].toLowerCase().includes(selectedTag))
    : products;

  return (
    <div
      className={`${
        animate ? "swipe-down" : ""
      } flex flex-row items-center justify-center w-full h-full bg-gallery`}
    >
      {isOpen && (
        <Card
          centered={true}
          onClose={handleClose}
          className="z-40 max-w-full max-h-full overflow-y-scroll gallery-card-bg"
        >
          <form
            className="flex flex-col items-center justify-center w-full h-full"
            onSubmit={handleSubmit}
          >
            <span className="text-white text-xl">Name</span>
            <input
              name="name"
              type="text"
              className="border-2 border-black bg-white rounded-md p-2 w-full text-black"
            />
            <span className="text-white text-xl">Description</span>
            <textarea
              name="description"
              className="border-2 bg-white border-black rounded-md p-2 h-24 w-full text-black"
            />
            <span className="text-white text-xl">Price</span>
            <input
              name="price"
              type="number"
              className="border-2 border-black bg-white rounded-md p-2 w-full text-black"
            />
            <span className="text-white text-xl">Image</span>
            <input
              name="image"
              type="file"
              className={`border-2 bg-white border-black rounded-md p-2 w-full text-black ${
                webcamActive && capturedImage ? "hidden" : "visible"
              }`}
            />
            <button
              type="button"
              className={`bg-inputs text-white p-2 rounded-md mt-5 ${
                capturedImage ? "hidden" : "visible"
              }`}
              onClick={() => setWebcamActive(!webcamActive)}
            >
              Open Webcam
            </button>
            {capturedImage && (
              <img
                src={capturedImage}
                alt="captured"
                className="w-64 h-64 mt-5"
              />
            )}
            {webcamActive && !capturedImage && (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="mt-5"
              />
            )}
            <button
              type="button"
              className="bg-inputs text-white p-2 rounded-md mt-5"
              onClick={capture}
            >
              Capture
            </button>
            <button
              type="submit"
              className="bg-inputs text-white p-2 rounded-md mt-5"
            >
              Add
            </button>
          </form>
        </Card>
      )}
      {selectedProduct && (
        <ProductCard product={selectedProduct} onClose={() => handleClose()} />
      )}
      <div className="w-1/6 bg-sidebar overflow-scroll flex flex-col items-center justify-start h-full shadow-lg shadow-black">
        <div className="w-full flex flex-col items-center justify-items-normal mt-5">
          <span className="text-white text-4xl nunito-bold">Filters</span>
        </div>
        <div className="w-full flex flex-col items-center justify-items-normal">
          <span className="text-white text-3xl mt-3">Tags</span>
          <select className="bg-inputs text-white shadow-md text-2xl px-5 py-2 rounded-lg mt-5" onChange={handleTagChange}>
            <option value="">All</option>
            <option value="cars">Cars</option>
            <option value="toys">Toys</option>
            <option value="gpu">GPU</option>
            <option value="cpu">CPU</option>
            <option value="phones">Phones</option>
          </select>
        </div>
        {/*<div className="w-full flex flex-col items-center justify-items-normal">
          <span className="text-white text-3xl mt-3">Price</span>
          <input
            type="range"
            className="bg-inputs  text-white text-2xl px-5 rounded-lg mt-5"
          />
        </div>
        <button className="bg-inputs shadow-md text-white text-2xl bottom-5 px-5 py-2 rounded-lg mt-5 hover:cursor-pointer hover:scale-105 transition-all">
          Apply
        </button>*/
        }
      </div>
      <div className="w-5/6 flex flex-col items-center justify-start h-full">
        <button
          onClick={handleOpen}
          className="top-0 right-5 bg-inputs text-white text-2xl px-5 py-2 rounded-lg mt-5 hover:cursor-pointer hover:scale-105 transition-all"
        >
          Add product
        </button>
        <div className=" overflow-y-scroll w-5/6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 max-h-full">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, i) => (
              <div key={i} className="hover:cursor-pointer shadow-xl hover:scale-105 hover:shadow-lg hover:transition-all" onClick={() => setSelectedProduct(product)}>
                <img
                  src={product.image}
                  className="w-full h-64 object-cover rounded-t-lg"
                  alt="product"
                />
                <div className="bg-gray-300 shadow-lg p-4 rounded-b-lg flex flex-col items-center justify-center">
                  <span className="text-black text-2xl">{product.name}</span>
                  <span className="text-black text-lg">
                    {product.description}
                  </span>
                  <span className="text-black text-xl">${product.price}</span>
                  <span className="text-white bg-inputs px-5 text-sm p-1 rounded-lg">
                    {product.tags[0]}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <span className="text-white text-3xl">No products available</span>
          )}
        </div>
      </div>
    </div>
  );
}
