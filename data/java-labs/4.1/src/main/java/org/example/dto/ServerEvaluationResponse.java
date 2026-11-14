package org.example.dto;

import java.io.Serializable;

public class ServerEvaluationResponse implements Serializable {

    private static final long serialVersionUID = 11L;

    final public int guess;
    final public Evaluation result;

    public ServerEvaluationResponse(int guess, Evaluation evaluation) {
        this.guess = guess;
        this.result = evaluation;
    }
}
