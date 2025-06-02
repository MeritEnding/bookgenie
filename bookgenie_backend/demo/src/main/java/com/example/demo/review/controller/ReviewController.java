package com.example.demo.review.controller;

import com.example.demo.review.dto.ReviewDto;
import com.example.demo.review.dto.ReviewQueryResponseDto;
import com.example.demo.review.dto.ReviewResponseDto;
import com.example.demo.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity<?> createReview(@RequestBody ReviewDto dto) {
        try {
            ReviewResponseDto response = reviewService.createReview(dto);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(
                    new ReviewResponseDto(400, "입력 오류", null)
            );
        }
    }

    @GetMapping("/book/{bookId}")
    public ResponseEntity<?> getReviewsByBook(@PathVariable Long bookId) {
        List<ReviewQueryResponseDto> reviews = reviewService.getReviewsByBookId(bookId);
        if (reviews.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new ReviewResponseDto(404, "리뷰 없음", null)
            );
        }
        return ResponseEntity.ok().body(reviews);
    }
}
