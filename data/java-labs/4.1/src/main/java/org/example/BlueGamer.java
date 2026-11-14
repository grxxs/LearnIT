package org.example;

import org.example.client.ClientGuessingGame;
import org.example.shared.AppUtils;
import static org.example.shared.GameColor.BLUE;

public class BlueGamer {

    final static String HOST = "localhost";
    final static Integer PORT = AppUtils.getServerPortNumberFromProperties();

    public static void main(String[] args) {

        System.out.println("--- BLUE GAMER ---");
        new ClientGuessingGame("Blue Dolphin", BLUE).start(HOST, PORT);
    }
}
