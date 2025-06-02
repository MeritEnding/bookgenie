package com.example.demo.review.service;

import com.example.demo.book.domain.Book;
import com.example.demo.book.repository.BookRepository;
import com.example.demo.review.domain.Review;
import com.example.demo.review.dto.ReviewDto;
import com.example.demo.review.dto.ReviewQueryResponseDto;
import com.example.demo.review.dto.ReviewResponseDto;
import com.example.demo.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final BookRepository bookRepository;

    @Override
    public ReviewResponseDto createReview(ReviewDto dto) {
        Book book = bookRepository.findById(dto.getBookId())
                .orElseThrow(() -> new IllegalArgumentException("책 없음"));

        Review review = Review.builder()
                .userId(dto.getUserId())
                .content(dto.getContent())
                .rating(dto.getRating())
                .book(book)
                .build();

        Review saved = reviewRepository.save(review);
        return new ReviewResponseDto(200, "리뷰 작성 완료", saved.getId());
    }

    @Override
    public List<ReviewQueryResponseDto> getReviewsByBookId(Long bookId) {
        List<Review> reviews = reviewRepository.findByBook_Id(bookId);
        return reviews.stream()
                .map(r -> new ReviewQueryResponseDto(r.getId(), r.getRating(), r.getContent(), "user" + r.getUserId() + "@example.com"))
                .collect(Collectors.toList());
    }
}
