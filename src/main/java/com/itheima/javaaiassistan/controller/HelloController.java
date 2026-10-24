
package com.itheima.javaaiassistan.controller;

import com.itheima.javaaiassistan.common.ApiResponse;
import com.itheima.javaaiassistan.service.HelloService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    private final HelloService helloService;

    // 构造方法：让 Spring 把 HelloService 注入进来
    public HelloController(HelloService helloService) {
        this.helloService = helloService;
    }

    // 处理 GET 请求
    @GetMapping("/api/hello")
    public ApiResponse<String> hello() {
        String greeting = helloService.getGreeting();
        return ApiResponse.success(greeting);
    }
}
