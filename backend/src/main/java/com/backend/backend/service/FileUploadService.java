package com.backend.backend.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface FileUploadService {

    public String uploadFile(MultipartFile file) throws IOException;
} 
