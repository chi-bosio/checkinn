package com.checkinn.back.service;

import com.checkinn.back.repository.ProductRepository;
import com.checkinn.back.model.Product;
import com.checkinn.back.dto.ProductDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Collections;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.UUID;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final FileStorageService fileStorageService;

    @Autowired
    public ProductService(ProductRepository productRepository, FileStorageService fileStorageService) {
        this.productRepository = productRepository;
        this.fileStorageService = fileStorageService;
    }

    public boolean existsByName(String name) {
        return productRepository.findByName(name).isPresent();
    }

    public Product saveProduct(String name, String description, List<MultipartFile> images) throws IOException {
        if (existsByName(name)) {
            throw new IllegalArgumentException("El producto ya existe");
        }
        if (images == null || images.size() < 5) {
            throw new IllegalArgumentException("Debes subir al menos 5 imágenes para el producto.");
        }
        List<String> imageUrls = fileStorageService.saveFiles(images);
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setImageUrls(imageUrls);
        return productRepository.save(product);
    }

    public Page<Product> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    public Page<Product> getAllProductsRandom(Pageable pageable, long seed) {
        List<Product> allProducts = productRepository.findAll();
        java.util.Collections.shuffle(allProducts, new java.util.Random(seed));
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), allProducts.size());
        List<Product> pageContent = (start < end) ? allProducts.subList(start, end) : java.util.Collections.emptyList();
        return new org.springframework.data.domain.PageImpl<>(pageContent, pageable, allProducts.size());
    }

    public List<ProductDTO> getRandomProducts(int max) {
        List<Product> allProducts = productRepository.findAll();
        Collections.shuffle(allProducts);
        return allProducts.stream()
                .limit(max)
                .map(p -> new ProductDTO(p.getId(), p.getName(), p.getDescription(), p.getImageUrls()))
                .collect(Collectors.toList());
    }

    public Optional<Product> getProductById(UUID id) {
        return productRepository.findById(id);
    }
} 