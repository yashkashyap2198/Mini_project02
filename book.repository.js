
import mongoose from 'mongoose';
import { bookSchema } from './book.schema.js'

// creating model from schema.
const booksModel = mongoose.model('Book', bookSchema);

export default class BookRepository {

    //book creation
    async createBook(bookData) {
        const book = new booksModel(bookData);
        const savedBook = await book.save();
        return savedBook;
    }

    // filtering of book by id
    async getOne(id) {
        const book = await booksModel.findById(id);
        return book;
    }

    

    //filtering the books based on genre
    async listBooksByGenre(genre) { 
        try{
           const books= await booksModel.find({genre})
           return books;
        }catch(err){
            throw new Error("Error listing books by genre");
        }
    }

    //increasing the count of available books
    // async updateBookAvailability(bookId, quantity) {
    //     try{
    //     const book=await booksModel.findByIdAndUpdate(bookId,{$inc:{availableQuantity:quantity}},{new:true});
    //     if(!book){
    //         throw new Error("Book not found");
    //     }
    //     return book;
    // }catch(err){
    //     throw new Error("Error updating book availabity");
    // }
    //  }
    async updateBookAvailability(bookId, quantity) {

        console.log(bookId);
        const book = await booksModel.findById(bookId);

        // Calculate the new availableCopies value
        const newAvailableCopies = book.availableCopies + quantity;

        // Update the availableCopies field and save the book
        book.availableCopies = newAvailableCopies;

        await book.save();
        return book;
    }

    //deletion of book
    async deleteBookById(bookId) {
        try{
            const deletedBook=await booksModel.findByIdAndRemove(bookId);
            if(!deletedBook){
                throw new Error("Book not found");
            }
            return deletedBook;
        }catch(err){
            throw new Error("Error deleting book");
        }
     }
}