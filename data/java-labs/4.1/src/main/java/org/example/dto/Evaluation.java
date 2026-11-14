package org.example.dto;

public enum Evaluation {

    HIT("HIT! :-)"),
    OVERVALUED("TOO HIGH :-("),
    UNDERVALUED("TOO LOW :-(");

    private final String message;

    Evaluation(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return message;
    }
}
