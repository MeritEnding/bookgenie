package com.example.demo.book.service;

import com.example.demo.book.domain.Book;

import java.util.List;

public interface BookService {

    Book insertBook(Book book);
    List<Book> findBooks();
    Book findBook(Long id);
    Book updateBook(Long id, Book book);
    void deleteBook(Long id);
}