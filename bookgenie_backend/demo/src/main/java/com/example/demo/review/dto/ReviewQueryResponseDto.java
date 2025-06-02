package com.example.demo.review.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ReviewQueryResponseDto {
    private Long reviewId;
    private int rating;
    private String content;
    private String user;  // 예: "user1@example.com"
}
