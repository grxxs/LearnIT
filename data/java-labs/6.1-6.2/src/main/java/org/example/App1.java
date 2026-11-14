package org.example;

import org.example.model.*;
import org.example.requestprocessorlibrary.RequestProcessor;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class App1 {

    public static void main(String[] args) throws Exception {

        System.out.println("Spring Framework, ale bez Boot.");

        AnnotationConfigApplicationContext context
                = new AnnotationConfigApplicationContext(App1Config.class);

        RequestProcessor requestProcessor = context.getBean(RequestProcessor.class);

        Request request1 = Request.builder()
                .type("reverse")
                .data("Ala ma kota Filemona")
                .build();

        Request request2 = Request.builder()
                .type("upper")
                .data("Ala ma kota Filemona")
                .build();

        Request request3 = Request.builder()
                .type("unknown")
                .data("Some data")
                .build();

        Response response1 = requestProcessor.processRequest(request1);
        Response response2 = requestProcessor.processRequest(request2);
        Response response3 = requestProcessor.processRequest(request3);

        System.out.println(request1 + " -> " + response1);
        System.out.println(request2 + " -> " + response2);
        System.out.println(request3 + " -> " + response3);

        context.close();
    }
}
