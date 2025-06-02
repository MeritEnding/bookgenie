package com.example.demo.Author.service;

import com.example.demo.Author.domain.Author;
import com.example.demo.Author.dto.AuthorDto;
import com.example.demo.Author.repository.AuthorRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthorService {

    private final AuthorRepository authorRepository;

    public AuthorService(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    public Author saveAuthor(AuthorDto authorDto) {
        Author author = new Author();
        author.setName(authorDto.getName());
        author.setDescription(authorDto.getDescription());

        return authorRepository.save(author);
    }

    public Author findByName(String name) {
        return authorRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException("해당 작가가 존재하지 않습니다: " + name));
    }
}
