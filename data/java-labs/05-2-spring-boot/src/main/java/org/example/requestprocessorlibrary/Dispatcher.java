package org.example.requestprocessorlibrary;

import org.example.model.*;
import lombok.NoArgsConstructor;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor
public class Dispatcher {

    public Response processRequest(Request request, List<Handler> handlers ) {

        if(handlers == null || handlers.isEmpty())
            return Response.builder().message("No handlers registered")
                    .data(null).build();

        for(Handler handler : handlers) {
            if(handler.isYourJob(request.getType())) {
                String result = handler.processData(request.getData());
                return Response.builder().message( result != null ? "OK" : "Processing failed.")
                        .data(result).build();
            }
        }

        return Response.builder().message("No matching handler registered")
                .data(null).build();
    }
}
