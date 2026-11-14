package org.example;

import org.example.client.ClientGuessingGame;
import org.example.shared.AppUtils;
import static org.example.shared.GameColor.GREEN;

public class GreenGamer {

    final static String HOST = "localhost";
    final static Integer PORT = AppUtils.getServerPortNumberFromProperties();

    public static void main(String[] args) {

        System.out.println("--- GREEN GAMER ---");
        new ClientGuessingGame("Green Snake", GREEN).start(HOST, PORT);
    }
}
