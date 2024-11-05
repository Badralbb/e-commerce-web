"use client";
import { ChangeEvent, useState } from "react";

export default function page() {
    const [files, setFiles] = useState<FileList | null>(null); 
    const imageUrls: string[] = []; // imageUrls gedeg sav beldsen bn

  Array.from(files ?? []).forEach((file) => {   // 
    const imageUrl = URL.createObjectURL(file); // imageUrl gedeg Url link uusgej bn
    console.log(imageUrl)
    imageUrls.push(imageUrl); // imageUrl ruu image nemj baina
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files
    console.log(files)
    setFiles(files)
  }

  
  const addProduct = () => {
    // 1. upload to cloudinary --> API
  }

    return (
    <div className="container mx-auto">
        <div>
            <p>Products</p>
            <input placeholder="Name" className="border-2"/>
        </div>
        <div>
             <p>Product details</p>
            <input placeholder="Product details" className="border-2"/>
        </div>
        <div>
            <p>Products ID</p>
            <input placeholder="Product ID" className="border-2"/>
        </div>
        <div className="pb-4">
            <p>Products images</p>
            
        </div>
        <form>
            <label htmlFor="images">Upload image</label>
            <input multiple onChange={handleFileChange} type="file" id="images"></input>
        </form>
        <button onClick={addProduct} className="bg-green-400 rounded-lg border-2 p-2">add +</button>
        <div className="">
            <div className="w-[100%] h-[200px] border-2 grid grid-cols-3 min-w-screen items-center justify-items-center">
                {imageUrls.map((imageUrl)=>(
                        <img className="w-48 h-48" src={imageUrl}></img>
                ))}
            </div>    
        </div>

    </div>

)}            
    