package com.example.askdex;

import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.vectorstore.SimpleVectorStore;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class CreateVectorStore {

    @Bean
    SimpleVectorStore simpleVectorStore(EmbeddingModel embeddingModel) throws IOException {
        var simpleVectorStore = SimpleVectorStore.builder(embeddingModel).build();
        var vectorStoreFile = getVectoreStoreFile();

        if (vectorStoreFile.exists()){
            System.out.println("Vector Store file already exits.");
            simpleVectorStore.load(vectorStoreFile);
        }else {
            System.out.println("🚀 Creating new Vector Store file...");
            simpleVectorStore.save(vectorStoreFile);
        }
        return simpleVectorStore;
    }

    private File getVectoreStoreFile() {
        Path path = Paths.get("src", "main", "resources", "vectorDb", "vectorStore.json");
        return path.toFile();
    }
}
