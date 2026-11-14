package org.example.requestprocessorlibrary;

import java.util.List;

import org.example.model.*;
import lombok.AllArgsConstructor;


@AllArgsConstructor
public class RequestProcessor {

    private Dispatcher dispatcher;

    private List<Handler> handlers;

    public Response processRequest(Request request) {

        return dispatcher.processRequest(request, handlers);
    }
}
