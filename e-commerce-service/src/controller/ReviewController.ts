

import { Request, Response } from 'express';
import { reviewModel } from '../model/Review';


export const createReview = async (req: Request, res: Response) => {
    const { productId, userId, rating, comments } = req.body;

    try {
        const newReview = await reviewModel.create({ productId, userId, rating, comments });
        res.status(201).json(newReview);
    } catch (error) {
        console.error("Error creating review:", error);
        res.status(404).send({ message: "Error creating review.", error });
    }
};

export const getReviews = async (req: Request, res: Response) => {
    const { productId } = req.params;

    try {
        const reviews = await reviewModel.find({ productId });
        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(404).send({ message: "Error fetching reviews.", error });
    }
};


