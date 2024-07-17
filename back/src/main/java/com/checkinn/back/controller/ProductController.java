package com.checkinn.back.controller;

import com.checkinn.back.service.ProductService;
import com.checkinn.back.dto.ProductDTO;
import com.checkinn.back.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import java.util.Map;
import java.util.UUID;

@RestController
public class ProductController {
    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @Operation(summary = "Obtener hasta 10 productos aleatorios", description = "Devuelve una lista de hasta 10 productos seleccionados aleatoriamente, sin repeticiones.")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista de productos aleatorios")
    })
    @GetMapping("/api/products/random")
    public List<ProductDTO> getRandomProducts() {
        return productService.getRandomProducts(10);
    }

    @GetMapping("/api/products")
    public ResponseEntity<?> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) Long seed
    ) {
        if (size > 10) size = 10;
        // Si no hay seed, generamos uno aleatorio
        long usedSeed = (seed != null) ? seed : new java.util.Random().nextLong();
        Page<Product> productPage = productService.getAllProductsRandom(PageRequest.of(page, size), usedSeed);
        Map<String, Object> response = Map.of(
                "content", productPage.getContent(),
                "totalElements", productPage.getTotalElements(),
                "totalPages", productPage.getTotalPages(),
                "currentPage", productPage.getNumber(),
                "seed", usedSeed
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/api/products/{id}")
    public ResponseEntity<?> getProductById(@PathVariable UUID id) {
        Optional<Product> productOpt = productService.getProductById(id);
        if (productOpt.isPresent()) {
            Product product = productOpt.get();
            ProductDTO dto = new ProductDTO(product.getId(), product.getName(), product.getDescription(), product.getImageUrls());
            return ResponseEntity.ok(dto);
        } else {
            throw new com.checkinn.back.exception.ResourceNotFoundException("Producto no encontrado");
        }
    }

    @PostMapping(value = "/api/products", consumes = {"multipart/form-data"})
    public ResponseEntity<?> registerProduct(
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam(required = false) List<MultipartFile> images) {
        try {
            Product product = productService.saveProduct(name, description, images);
            return ResponseEntity.status(HttpStatus.CREATED).body(product);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException(e.getMessage());
        } catch (IOException e) {
            throw new RuntimeException("Error al guardar imágenes");
        }
    }
} 