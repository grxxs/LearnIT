package org.example.implementations.handlers;

import org.example.requestprocessorlibrary.*;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component
public class LowerCaseHandler extends Handler {
    public LowerCaseHandler(@Qualifier("lowerCaseProcessing") StringProcessing sp) {
        super("lower", sp);
    }
}
