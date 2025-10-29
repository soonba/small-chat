package com.smallchat.backend

import com.smallchat.backend.global.config.RabbitMQConfig
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication

@SpringBootApplication
open class BackendApplication

fun main(args: Array<String>) {
    val rabbitMQConfig = RabbitMQConfig()
    rabbitMQConfig.someFunction()
    SpringApplication.run(BackendApplication::class.java, *args)
}
