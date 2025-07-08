package com.checkinn.back.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Collections;
import java.util.stream.Collectors;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final String uploadDir = "uploads/";

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs();
        }
    }

    public boolean existsByName(String name) {
        return productRepository.findByName(name).isPresent();
    }

    public Product saveProduct(String name, String description, List<MultipartFile> images) throws IOException {
        if (existsByName(name)) {
            throw new IllegalArgumentException("El producto ya existe");
        }
        List<String> imageUrls = new ArrayList<>();
        if (images != null) {
            for (MultipartFile image : images) {
                String filename = System.currentTimeMillis() + "_" + image.getOriginalFilename();
                Path filePath = Paths.get(uploadDir, filename);
                Files.write(filePath, image.getBytes());
                imageUrls.add("/uploads/" + filename);
            }
        }
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setImageUrls(imageUrls);
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<ProductDTO> getRandomProducts(int max) {
        List<Product> allProducts = productRepository.findAll();
        Collections.shuffle(allProducts);
        return allProducts.stream()
                .limit(max)
                .map(p -> new ProductDTO(p.getId(), p.getName(), p.getDescription(), p.getImageUrls()))
                .collect(Collectors.toList());
    }
} 