package org.example;

import org.example.requestprocessorlibrary.*;
import java.util.List;

public class App0Generator {

    public static RequestProcessor getRequestProcessor() {

        String upper = "upper", lower = "lower", revese = "reverse";

        StringProcessing upperCaseProcessing = s -> s.toUpperCase();
        StringProcessing lowerCaseProcessing = s -> s.toLowerCase();
        StringProcessing reverseProcessing =  s -> new StringBuilder(s).reverse().toString();

        Handler upperCaseHandler = new Handler(upper, upperCaseProcessing);
        Handler lowerCaseHandler = new Handler(lower, lowerCaseProcessing);
        Handler reverseHandler = new Handler(revese, reverseProcessing);

        Dispatcher dispatcher = new Dispatcher();

        RequestProcessor requestProcessor = new RequestProcessor( dispatcher,
                List.of(upperCaseHandler, lowerCaseHandler, reverseHandler)
        );

        return requestProcessor;
    }
}
