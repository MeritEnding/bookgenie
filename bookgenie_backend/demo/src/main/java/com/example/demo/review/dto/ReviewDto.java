package com.example.demo.review.dto;

import lombok.Data;

@Data
public class ReviewDto {
    private Long userId;
    private Long bookId;
    private int rating;
    private String content;
}
