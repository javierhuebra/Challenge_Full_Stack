package com.notes_app.challenge;

import com.notes_app.challenge.security.TokenGenerator;
import com.notes_app.challenge.security.PasswordEncoder;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ChallengeApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(ChallengeApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
//		System.out.println(TokenGenerator.encodeId(1L));
//		System.out.println(TokenGenerator.decodeId("MQ=="));
//		System.out.println("-----");
//		System.out.println(PasswordEncoder.encode("password"));
//		System.out.println(PasswordEncoder.matches("password", "1216985755"));
		System.out.println("Started...");
	}

}
