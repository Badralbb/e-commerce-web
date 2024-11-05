import { Request, Response } from "express";
import { Payment } from "../model/paymentModel";
import { User } from "../model/UserModel";






export const createPayment = async (req: Request, res: Response) => {
  const data = req.body;
  data.createAt = new Date()
    console.log({data})
  try {
    const payments = await Payment.create(data);


    
    res.send(payments);
  } catch (error) {
    console.error(error);
    res.send("find error");
  }
};

export const updatePayment = async (req: Request, res: Response) => {
  const { paymentType } = req.body;
  const { id } = req.params;
  console.log(req.body);
  try {
    const payment = await Payment.updateOne({_id:id,
      paymentType,
    });
    res.send(payment);
  } catch (error) {
    console.error(error);
    res.send("find error");
  }
};
export const getPayment= async (req: Request, res: Response) => {
  try {
    const payment = await Payment.find();
    console.log(payment);
    res.send(payment);
  } catch (error) {
    console.error(error);
    res.send("find error");
  }
};
