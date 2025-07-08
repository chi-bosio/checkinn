package com.checkinn.back.model;

import java.util.List;

public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private List<String> imageUrls;

    public ProductDTO(Long id, String name, String description, List<String> imageUrls) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrls = imageUrls;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public List<String> getImageUrls() { return imageUrls; }
} 