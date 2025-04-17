package com.example.askdex;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.http.ResponseEntity;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.ai.document.Document;
import org.springframework.ai.rag.Query;
import org.springframework.ai.rag.retrieval.search.DocumentRetriever;
import org.springframework.ai.rag.retrieval.search.VectorStoreDocumentRetriever;
import org.springframework.ai.vectorstore.SimpleVectorStore;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*") // Specify allowed origins
@RestController
@RequestMapping("/api")
public class ChatController {

    private final SimpleVectorStore vectorStore;
    private final ChatClient chatClient;
    private final VectorStoreService vectorStoreService;

    @Value("classpath:/prompt/template.st")
    private Resource promptTemp;

    public ChatController(ChatClient.Builder builder, SimpleVectorStore vectorStore, VectorStoreService vectorStoreService) {
        this.chatClient = builder.build();
        this.vectorStore = vectorStore;
        this.vectorStoreService = vectorStoreService;
    }

    @GetMapping("/chat")
    public String getAnswer(@RequestParam String message){
        SimpleVectorStore latestVectorStore = vectorStoreService.getCurrentVectorStore();

        if (latestVectorStore == null) {
            return "Vector store is not initialized. Please upload a document first.";
        }

        DocumentRetriever retriever = VectorStoreDocumentRetriever.builder()
                .vectorStore(latestVectorStore)
                .similarityThreshold(0.7)
                .topK(2)
                .build();
        List<Document> documents = retriever.retrieve(new Query(message));

        Prompt prompt = new PromptTemplate(promptTemp)
                .create(Map.of(
                        "input", message,
                        "documents", String.join("\n", documents.toString())
                ));
        System.out.println("Final Prompt: \n" + prompt);
        return chatClient.prompt(prompt).call().content();
    }

    @PostMapping("/upload")
    public void uploadUserText(@RequestBody String reqBody) throws IOException {

        try {
            ObjectMapper mapper = new ObjectMapper();
            Map<String, String> jsonMap = mapper.readValue(reqBody, Map.class);
            String userText = jsonMap.get("userText");

            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("HHmmss"));
            String filePath = "uploads/userDocument_"+timestamp+".txt";
            FileWriter myWriter = new FileWriter(filePath);
            myWriter.write(userText);
            myWriter.close();

            System.out.println("Written file at: " + new File(filePath).getAbsolutePath());

            vectorStoreService.rebuildVectorStore(filePath);
            System.out.println("User Document uploaded and vector store rebuilt successfully.");
        } catch (Exception e){
            System.out.println("An Error occurred while uploading user document. - " + e);
        }
    }

    @DeleteMapping("/delDb")
    public ResponseEntity<String> deleteVectorDb() {
        System.out.println("Deleting Vector Database...");
        File vectorDbDir = new File("src/main/resources/vectorDb/vectorStore.json"); // adjust path as needed

        if (vectorDbDir.exists()) {
            vectorDbDir.delete();
            System.out.println("Vector Database deleted successfully.");
            return ResponseEntity.ok("Vector Database deleted successfully.");
        } else {
            System.out.println("Vector Database not found.");
            return ResponseEntity.ok("Vector Database not found.");
        }
    }
}
