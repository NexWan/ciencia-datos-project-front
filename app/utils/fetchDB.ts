import type { Route } from "../+types/root";
import type { Product } from "./Product";

export function loader() {
    return Response.json({ message: "Hello, world!" });
}

export async function postProduct(product: Product) {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price.toString());
    formData.append('image', product.image);
    const result = await fetch('http://localhost:8000/products', {
        method: 'POST',
        body: formData
    });
    return await result.json() as Product;
}

export async function getImagesFromServer() {
    const response = await fetch("http://localhost:8000/allImages")
    const data = await response.json()
    return data
}

export async function getProductsFromServer() {
    const response = await fetch("http://localhost:8000/products")
    const data = await response.json()
    return data
} 

export async function updateProduct(product: Product) {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price.toString());
    formData.append('image', product.image);
    formData.append('tag', product.tags[0]);
    const result = await fetch(`http://localhost:8000/products/${product.id}`, {
        method: 'PUT',
        body: formData
    });
    return await result.json() as Product;
}

export async function deleteProduct(id: number) {
    const result = await fetch(`http://localhost:8000/products/${id}`, {
        method: 'DELETE'
    });
    return await result.json();
}