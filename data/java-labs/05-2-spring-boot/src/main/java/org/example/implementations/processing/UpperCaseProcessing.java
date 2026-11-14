package org.example.implementations.processing;

import org.example.requestprocessorlibrary.StringProcessing;
import org.springframework.stereotype.Component;

@Component("upperCaseProcessing")
public class UpperCaseProcessing implements StringProcessing {
    @Override
    public String processString(String s) {
        return s.toUpperCase();
    }
}
