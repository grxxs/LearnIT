package org.example.model;

import lombok.*;

@Getter
@AllArgsConstructor
@Builder
@ToString
public class Request {

    final private String type;
    final private String data;
}
