package com.checkinn.back.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

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
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    /**
     * Ruta protegida: solo accesible para usuarios con rol ADMIN.
     *
     * Para proteger esta ruta:
     * 1. Implementar seguridad con Spring Security.
     * 2. Anotar el método con @PreAuthorize("hasRole('ADMIN')") o similar.
     * 3. Configurar el filtro de autenticación para extraer el rol del usuario autenticado.
     *
     * Si el usuario no tiene permisos:
     * - Spring Security devolverá automáticamente 403 Forbidden.
     * - Alternativamente, puedes manejarlo manualmente y devolver ResponseEntity.status(HttpStatus.FORBIDDEN).
     *
     * Validación de unicidad:
     * - Ya se valida en ProductService.saveProduct: si el nombre existe, lanza IllegalArgumentException y se responde 409 Conflict.
     * - Para edición, aplicar la misma lógica en el endpoint PUT/PATCH correspondiente.
     */
    @PostMapping(value = "/api/products", consumes = {"multipart/form-data"})
    public ResponseEntity<?> registerProduct(
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam(required = false) List<MultipartFile> images) {
        try {
            Product product = productService.saveProduct(name, description, images);
            return ResponseEntity.status(HttpStatus.CREATED).body(product);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al guardar imágenes");
        }
    }
} 