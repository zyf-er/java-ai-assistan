
package com.itheima.javaaiassistan.service;

import org.springframework.stereotype.Service;

@Service
public class ChatService {

    public String chat(String message) {
        // 当前先模拟 AI 回复，后续替换为真实 AI 模型调用
        return "你提出的问题是：" + message;
    }
}
