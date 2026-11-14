package org.example;

import org.example.model.*;
import org.example.requestprocessorlibrary.RequestProcessor;

public class App0 {

    public static void main(String[] args) {

        System.out.println("Klasycznie.");

        RequestProcessor requestProcessor = App0Generator.getRequestProcessor();

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

    }
}
