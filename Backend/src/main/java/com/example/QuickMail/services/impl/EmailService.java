package com.example.QuickMail.services.impl;

import java.io.File;
import java.io.InputStream;

public interface EmailService {

//    send email to single person
    void sendEmail(String to,String subject,String message);

//    sen mail to multiple
    void sendEmail(String []to,String subject,String message);

//    send mail with html
    void sendEmailWithHtml(String to,String subject,String htmlContent);

//    send mail with file
    void sendEmailWithFile(String to, String subject, String message, File file);

    void sendEmailWithFile(String to, String subject, String message, InputStream is);

}
