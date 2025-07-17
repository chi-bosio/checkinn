package com.checkinn.back.controller;

import com.checkinn.back.model.Product;
import com.checkinn.back.repository.ProductRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final ProductRepository productRepository;

    public AdminController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateAdmin() {
        // En el futuro, aquí se validará si el usuario tiene el rol ADMIN
        // Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        // if (auth == null || !auth.isAuthenticated() || !auth.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))) {
        //     return ResponseEntity.status(403).body("No autorizado");
        // }
        return ResponseEntity.ok().body("OK");
    }

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        // En el futuro, validar rol ADMIN aquí
        List<Product> products = productRepository.findAll();
        return ResponseEntity.ok(products);
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable("id") java.util.UUID id) {
        // En el futuro, validar rol ADMIN aquí
        if (!productRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        productRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
} 