package com.stripo.plugin.documents;

import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;

@SpringBootApplication()
public class DocumentsUploaderApplication implements ApplicationListener<ContextRefreshedEvent> {
	@Autowired
	private StripoRestClient stripoRestClient;

	public static void main(String[] args) {
		SpringApplication.run(DocumentsUploaderApplication.class, args);

	}

	@SneakyThrows
	@Override
	public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
		stripoRestClient.uploadImage();
		System.exit(0);
	}
}

