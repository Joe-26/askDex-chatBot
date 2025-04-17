package com.example.askdex;

import org.springframework.ai.document.Document;
import org.springframework.ai.embedding.EmbeddingModel;
import org.springframework.ai.transformer.splitter.TextSplitter;
import org.springframework.ai.transformer.splitter.TokenTextSplitter;
import org.springframework.ai.vectorstore.SimpleVectorStore;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@Service
public class VectorStoreService {
    private final EmbeddingModel embeddingModel;
    private SimpleVectorStore currentVectorStore;

    public VectorStoreService(EmbeddingModel embeddingModel) {
        this.embeddingModel = embeddingModel;
        try {
            // Try to load existing vector store if available at startup
            File vectorStoreFile = new File("src/main/resources/vectorDb/vectorStore.json");
            SimpleVectorStore vectorStore = SimpleVectorStore.builder(embeddingModel).build();
            if (vectorStoreFile.exists()) {
                vectorStore.load(vectorStoreFile);
            } else {
                this.currentVectorStore = SimpleVectorStore.builder(embeddingModel).build();
            }
        } catch (Exception e) {
            System.err.println("Failed to initialize vector store: " + e.getMessage());
            this.currentVectorStore = SimpleVectorStore.builder(embeddingModel).build();
        }
    }

    public void rebuildVectorStore(String filepath) throws IOException {
        File vectorStoreFile = new File("src/main/resources/vectorDb/vectorStore.json");
        SimpleVectorStore vectorStore = SimpleVectorStore.builder(embeddingModel).build();

        // Read file manually
        String fileContent = new String(Files.readAllBytes(Paths.get(filepath)));

        // Wrap it as a Document
        Document document = new Document(fileContent);
        document.getMetadata().put("filename", filepath);

        // Splitting
        TextSplitter splitter = new TokenTextSplitter();
        List<Document> splitDocs = splitter.apply(List.of(document));

        vectorStore.add(splitDocs);
        vectorStore.save(vectorStoreFile);

        this.currentVectorStore = vectorStore;
        System.out.println("Vector store updated and saved successfully.");
    }

    public SimpleVectorStore getCurrentVectorStore() {
        if (this.currentVectorStore == null) {
            System.out.println("Warning: current vector store is null.");
        }
        return this.currentVectorStore;
    }
}
