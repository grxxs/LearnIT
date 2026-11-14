package org.example;

import org.example.requestprocessorlibrary.*;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.List;

@Configuration
public class App1Config {

    String upper = "upper", lower = "lower", revese = "reverse";

    @Bean
    public StringProcessing upperCaseProcessing() {
        return s -> s.toUpperCase();
    }

    @Bean
    public StringProcessing lowerCaseProcessing() {
        return s -> s.toLowerCase();
    }

    @Bean
    public StringProcessing reverseProcessing() {
        return s -> new StringBuilder(s).reverse().toString();
    }

    @Bean
    public Handler upperCaseHandler(@Qualifier("upperCaseProcessing") StringProcessing sp) {
        return new Handler(upper, sp);
    }

    @Bean
    public Handler lowerCaseHandler(@Qualifier("lowerCaseProcessing") StringProcessing sp) {
        return new Handler("lower", sp);
    }


    @Bean
    public Handler reverseHandler(@Qualifier("reverseProcessing") StringProcessing sp) {
        return new Handler(revese, sp);
    }

    @Bean
    public Dispatcher dispatcher() {
        return new Dispatcher();
    }

    @Bean
    public RequestProcessor requestProcessor(Dispatcher dispatcher,  List<Handler> handlers) {
        return new RequestProcessor(dispatcher, handlers);
    }

}
