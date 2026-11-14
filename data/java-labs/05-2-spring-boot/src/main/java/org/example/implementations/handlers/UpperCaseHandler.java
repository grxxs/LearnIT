package org.example.implementations.handlers;

import org.example.requestprocessorlibrary.*;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component
public class UpperCaseHandler extends Handler {
    public UpperCaseHandler(@Qualifier("upperCaseProcessing") StringProcessing sp) {
        super("upper", sp);
    }
}
