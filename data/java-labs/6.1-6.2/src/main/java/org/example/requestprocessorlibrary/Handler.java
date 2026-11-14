package org.example.requestprocessorlibrary;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class Handler{

    private String requestType;
    private StringProcessing stringProcessing;

    public boolean isYourJob(String requestType) {
        return this.requestType.equals(requestType);
    }

    public String processData(String data) {
        return stringProcessing.processString(data);
    }
}
