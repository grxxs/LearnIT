package org.example.shared;

public enum GameColor {

    RESET_COLOR("\u001B[0m"),

    RED("\u001B[31m"),
    GREEN("\u001B[32m"),
    BLUE("\u001B[34m");

    private final String code;

    GameColor(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    @Override
    public String toString() {
        return code;
    }
}
