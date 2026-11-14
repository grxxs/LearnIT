package org.example.implementations.processing;

import org.example.requestprocessorlibrary.StringProcessing;
import org.springframework.stereotype.Component;

@Component("lowerCaseProcessing")
public class LowerCaseProcessing implements StringProcessing {
    @Override
    public String processString(String s) {
        return s.toLowerCase();
    }
}
