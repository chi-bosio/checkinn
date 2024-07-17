package com.checkinn.back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @GetMapping("/validate")
    public ResponseEntity<?> validateAdmin() {
        // En el futuro, aquí se validará si el usuario tiene el rol ADMIN
        // Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        // if (auth == null || !auth.isAuthenticated() || !auth.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))) {
        //     return ResponseEntity.status(403).body("No autorizado");
        // }
        return ResponseEntity.ok().body("OK");
    }
} 