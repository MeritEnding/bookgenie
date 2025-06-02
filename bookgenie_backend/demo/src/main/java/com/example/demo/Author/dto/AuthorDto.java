package com.example.demo.Author.dto;

public class AuthorDto {
    private String name;
    private String description;

    public AuthorDto() {}

    public String getName() {
        return name;
    }

    public void setName(){
        this.name = name;
    }

    public String getDescription(){
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
