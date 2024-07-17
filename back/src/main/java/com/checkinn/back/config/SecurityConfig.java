package com.checkinn.back.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/admin/**").permitAll() // Permitir acceso libre temporalmente
                .anyRequest().permitAll()
            )
            .sessionManagement().disable(); // Solo JWT, sin sesiones
        // Falta agregar filtro JWT (cuando se implemente login)
        return http.build();
    }
} 