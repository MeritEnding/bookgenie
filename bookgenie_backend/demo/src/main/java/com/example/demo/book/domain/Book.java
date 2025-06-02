package com.example.demo.book.domain;

import com.example.demo.Author.domain.Author;
import com.example.demo.review.domain.Review;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false, length = 64)
    private String title;

    @ManyToOne(fetch =  FetchType.LAZY)
    @JoinColumn(name = "author_id")
    private Author author;

    @Column(length = 45)
    private String publisher;

    private LocalDate publishedDate;

    private Double price;

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews = new ArrayList<>();
}