package org.example.implementations.processing;

import org.example.requestprocessorlibrary.StringProcessing;
import org.springframework.stereotype.Component;

@Component("reverseProcessing")
public class ReverseProcessing implements StringProcessing {
    @Override
    public String processString(String s) {
        return new StringBuilder(s).reverse().toString();
    }
}
