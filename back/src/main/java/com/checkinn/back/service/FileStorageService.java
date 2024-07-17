package com.checkinn.back.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;

@Service
public class FileStorageService {
    private final String cloudName;
    private final String apiKey;
    private final String apiSecret;
    private final RestTemplate restTemplate = new RestTemplate();

    public FileStorageService(
            @Value("${cloudinary.cloud_name}") String cloudName,
            @Value("${cloudinary.api_key}") String apiKey,
            @Value("${cloudinary.api_secret}") String apiSecret
    ) {
        this.cloudName = cloudName;
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
    }

    public List<String> saveFiles(List<MultipartFile> files) throws IOException {
        List<String> urls = new ArrayList<>();
        for (MultipartFile file : files) {
            urls.add(uploadToCloudinary(file));
        }
        return urls;
    }

    private String uploadToCloudinary(MultipartFile file) throws IOException {
        String url = "https://api.cloudinary.com/v1_1/" + cloudName + "/image/upload";
        long timestamp = System.currentTimeMillis() / 1000L;
        String signature = generateSignature(timestamp);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", file.getResource());
        body.add("api_key", apiKey);
        body.add("timestamp", String.valueOf(timestamp));
        body.add("signature", signature);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, Map.class);
        if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
            return (String) response.getBody().get("secure_url");
        } else {
            throw new IOException("Error al subir imagen a Cloudinary: " + response.getStatusCode());
        }
    }

    private String generateSignature(long timestamp) {
        // Solo firmamos el parámetro timestamp
        String data = "timestamp=" + timestamp + apiSecret;
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-1");
            byte[] digest = md.digest(data.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder();
            for (byte b : digest) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error generando la firma para Cloudinary", e);
        }
    }
} 