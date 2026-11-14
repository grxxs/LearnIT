package org.example;

import org.example.client.ClientGuessingGame;
import org.example.shared.AppUtils;
import static org.example.shared.GameColor.RED;

public class RedGamer {

    final static String HOST = "localhost";
    final static Integer PORT = AppUtils.getServerPortNumberFromProperties();

    public static void main(String[] args) {

        System.out.println("--- RED GAMER ---");
        new ClientGuessingGame("Red Fox", RED).start(HOST, PORT);
    }
}
