package org.example.implementations.handlers;

import org.example.requestprocessorlibrary.*;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component
public class ReverseHandler extends Handler {
    public ReverseHandler(@Qualifier("reverseProcessing") StringProcessing sp) {
        super("reverse", sp);
    }
}
