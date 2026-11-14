package org.example;

import org.example.dto.ServerGameEnterResponse;
import org.example.server.ServerGuessingGame;

public class Server {

    final static int N = 25; //Zakres liczb będzie od 0 do 25

    public static void main(String[] args) {

        System.out.println("--- SERVER ---");
        ServerGameEnterResponse gameRange = new ServerGameEnterResponse(N);
        new ServerGuessingGame(gameRange).start();
    }
}
