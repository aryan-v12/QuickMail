package com.example.QuickMail.controllers.api;


import com.example.QuickMail.Helper.CustomResponse;
import com.example.QuickMail.Helper.EmailRequest;
import com.example.QuickMail.services.impl.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/email")
public class EmailController {


    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    private EmailService emailService;


    @PostMapping("/send")
    public ResponseEntity<?> sendEmail(@RequestBody EmailRequest request)
    {
        emailService.sendEmailWithHtml(request.getTo(),request.getSubject(),request.getMessage());
        return ResponseEntity.ok(
                CustomResponse.builder().message("Email Send Successfully !").httpStatus(HttpStatus.OK).success(true).build()
        );
    }

    @PostMapping("/send-with-file")
    public ResponseEntity<CustomResponse> sendWithFile(@RequestPart EmailRequest request, @RequestPart MultipartFile file)throws IOException
    {
        emailService.sendEmailWithFile(request.getTo(),request.getSubject(),request.getMessage(),file.getInputStream());
        return ResponseEntity.ok(
                CustomResponse.builder().message("Email Send Successfully !").httpStatus(HttpStatus.OK).success(true).build()
        );
    }
}
