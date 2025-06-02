package com.example.demo.review.service;

import com.example.demo.review.dto.ReviewDto;
import com.example.demo.review.dto.ReviewQueryResponseDto;
import com.example.demo.review.dto.ReviewResponseDto;

import java.util.List;

public interface ReviewService {
    ReviewResponseDto createReview(ReviewDto dto);
    List<ReviewQueryResponseDto> getReviewsByBookId(Long bookId);
}
