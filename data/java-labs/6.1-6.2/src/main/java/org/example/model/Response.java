package org.example.model;

import lombok.*;

@Getter
@AllArgsConstructor
@Builder
@ToString
public class Response {

    final private String message;
    final private String data;
}
