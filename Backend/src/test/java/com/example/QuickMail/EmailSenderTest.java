package com.example.QuickMail;

import com.example.QuickMail.services.impl.EmailService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;


@SpringBootTest
public class EmailSenderTest {

    @Autowired
    private EmailService emailService;

    @Test
    void emailSendTest(){
        System.out.println("sending email..");
        emailService.sendEmail("aryanverma86301@gmail.com","Email from QuickMail" , "Hello from QuickMail send while testing the code and services");
    }

    @Test
    void sendHtmlInEmail(){
        String html="Hii" +
                "<h2 style='color:yellow; border:1px solid red;'>Welcome to QuickMail App using Spring boot and React</h2>"+ "Bye";
        emailService.sendEmailWithHtml("aryanverma86301@gmail.com","Email from QuickMail",html);
    }
    @Test
    void sendEmailWithFile(){
        emailService.sendEmailWithFile("aryanverma86301@gmail.com",
                "Email with File from QuickMail",
                "This email contain Image",
                 new File("C:\\Users\\HP\\Desktop\\QuickMail\\src\\main\\resources\\static\\MataRani.jpg")
                );
    }
    @Test
    void sendEmailWithFileWithStream() throws FileNotFoundException {
        File file=new File("C:\\Users\\HP\\Desktop\\QuickMail\\src\\main\\resources\\static\\MataRani.jpg");
        try {
            InputStream is = new FileInputStream(file);
            emailService.sendEmailWithFile("aryanverma86301@gmail.com",
                    "Email with File from QuickMail",
                    "This email contain Image",is);
        }
        catch (FileNotFoundException e){
            throw new RuntimeException(e);
        }

    }
}
