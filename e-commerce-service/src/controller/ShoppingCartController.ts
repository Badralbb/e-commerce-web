import { Request, Response } from "express";
import { ShoppingCart } from "../model/ShoppingCartModel";
import { Product } from "../model/productModel";




export const createShoppingCart = async (req: Request, res: Response) => {
  const Cart = req.body;
  Cart.createAt = new Date()
  console.log(req.body);
  try {
    const carts = await ShoppingCart.create(Cart);
    console.log(Cart);
    res.send(carts);
  } catch (error) {
    console.error(error);
    res.send("find error");
  }
};

export const getShoppingCart = async (req: Request, res: Response) => {
  const { id } = req.params;
  try{
    const Carts = await Product.find({_id: id});
    console.log(Carts)
    res.send(Carts)
  }catch(error){
    console.log(error)
    res.send("find error")
  }
}
export const getCart = async (req: Request, res: Response) => {
  // const { id } = req.params;
  try{
    const Carts = await ShoppingCart.find();
    console.log(Carts)
    res.send(Carts)
  }catch(error){
    console.log(error)
    res.send("find error")
  }
}

export const deleteOneCart = async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log({id})
  try{
    const Carts = await ShoppingCart.deleteOne({_id: id});
    console.log(Carts)
    res.send({ message: "deleted successfully" });
  }catch(error){
    console.log(error)
    res.send("find error")
  }
}



