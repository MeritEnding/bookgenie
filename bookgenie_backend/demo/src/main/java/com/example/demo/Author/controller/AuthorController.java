package com.example.demo.Author.controller;

import com.example.demo.Author.domain.Author;
import com.example.demo.Author.dto.AuthorDto;
import com.example.demo.Author.service.AuthorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


public class AuthorController {

    private final AuthorService authorService;

    public AuthorController(AuthorService authorService){
        this.authorService = authorService;
    }

    @PostMapping
    public ResponseEntity<Author> createAuthor(@RequestBody AuthorDto authorDto) {
        Author savedAuthor = authorService.saveAuthor(authorDto);
        return ResponseEntity.ok(savedAuthor);
    }


}
