package org.example.dto;

import java.io.Serializable;

public class ClientGuessRequest implements Serializable{

    private static final long serialVersionUID = 10L;

    final public int guess;

    public ClientGuessRequest(int guess) {

        this.guess = guess;
    }
}
