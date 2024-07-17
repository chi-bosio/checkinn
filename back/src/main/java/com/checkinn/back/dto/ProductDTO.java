package com.checkinn.back.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.List;
import java.util.UUID;

public class ProductDTO {
    private UUID id;
    @NotBlank
    @Size(max = 255)
    private String name;
    @NotBlank
    @Size(max = 1000)
    private String description;
    private List<String> imageUrls;

    public ProductDTO(UUID id, String name, String description, List<String> imageUrls) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrls = imageUrls;
    }

    public UUID getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public List<String> getImageUrls() { return imageUrls; }
} 