package com.itheima.javaaiassistan.service;


import org.springframework.stereotype.Service;

@Service
public class HelloService {

    public String getGreeting() {
        return "Hello, Spring Boot 4!";
    }
}
