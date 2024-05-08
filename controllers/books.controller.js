import bookModel from "../models/books.model.js";
import { notFoundError, badRequestError } from '../errors/index.js';
import { validationResult } from "express-validator";
import asyncWrapper from "../middlewares/async.js";

export const test = (req, res, next) => {
    res.send('Hello World!');
}

   export const addNewBook = asyncWrapper(async (req, res, next) => {
       const errors = validationResult(req)
       
        if(!errors.isEmpty()){
            next(new badRequestError(errors.array()[0].msg));
        }
            const newBook = await bookModel.create(req.body)
           return  res.status(201).json(newBook); 
        
        
    });

    export const getAllBooks =  async (req, res, next) => {
        try{
            const getBooks = await bookModel.find();
            if(getBooks){
                return res.status(200).json({
                    size: getBooks.length,
                    getBooks
                })
            }
            
        }catch (error){
            next(error);  
        }
    }

    export const getBookById = async (req, res, next) => {
        try{
            const foundBook = await bookModel.findById(req.params.id)
            if (!foundBook) {
                return next(new notFoundError(`Book not found`))
            }
            
              return  res.status(200).json(foundBook)
            }
        catch (error) {
            next(error);
            
          }
    }

    export const findBookByCategory = async (req, res, next) => {
        const bookCategory = req.params.category;
        
        try {
            const foundBooks = await bookModel.find({category: bookCategory});
            return res.status(200).json({
                size: foundBooks.length,
                foundBooks
            });
        } catch (error) {
            next(error);
        }
    }
      export const updateBook = async(req, res, next) => {
        try {
            const updatedBook = await bookModel.findByIdAndUpdate(req.params.id, req.body,{set:true});
               if(!updatedBook) {
                return next(new notFoundError(`Book not found`));
               }
               return  res.status(200).json(updatedBook)
            }
        catch (error) {
            next(error);
        }

    }
    export const deleteBook = async(req, res, next) => {
        const id =req.params.id;
           
        try {
            const deletedBook = await bookModel.findByIdAndDelete(id);
              return  res.status(200).json({ message : 'Book is deleted'})
            }
            
         catch (error) {
            next(error)
        }

    }
