const Book = require("../models/book.model");


const getBookByIdService = async (id) => {
    try {
      const book = await Book.findOne({ _id: id }).exec();
      return book;
    } catch (error) {
      console.log(error);
    }
};
  


const getAllBooksService = async () => {
    try {
      return await Book.find().limit(6);
    } catch (error) {
      console.log(error);
    }
};



const createBook = async ({ title, author, genre, price }) => {
    try {
      return await Book.create({ title, author, genre, price });
    } catch (error) {
      console.log(error);
    }
};



const updateBookService = async (id,updateData) => {
    try {
      await Book.updateOne({ _id: id },updateData);
      return await Book.findById(id);
    } catch (error) {
      console.log(error);
    }
};



const deleteBookService = async (id) => {
    try {
       return await Course.deleteOne({ _id: id });
    } catch (error) {
      console.log(error);
    }
};

  
  module.exports = {
      getBookByIdService,
      getAllBooksService,
      createBook,
      updateBookService,
      deleteBookService
  }