package com.example.demo.Author.repository;

import com.example.demo.Author.domain.Author;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthorRepository extends JpaRepository<Author, Long>{
    Optional<Author> findByName(String name); // 작가 이름으로 검색
}