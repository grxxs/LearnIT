package org.example.server;

import java.net.Socket;
import java.util.concurrent.ThreadLocalRandom;
import java.net.ServerSocket;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.EOFException;
import java.io.IOException;

import org.example.dto.*;
import org.example.shared.*;
import static org.example.shared.GameColor.*;

public class ServerGuessingGame {

    private final ServerGameEnterResponse gameRange;
    private final Integer port, delayMs, secretNumber;

    public ServerGuessingGame(ServerGameEnterResponse gameRange){

        this.gameRange = gameRange;

        this.port = AppUtils.getServerPortNumberFromProperties();
        if(this.port == null ) throw new IllegalArgumentException("!Failed to read the server port");

        this.delayMs = AppUtils.getServerDalayFromProperties();
        if(this.delayMs == null) throw new IllegalArgumentException("!Failed to read the server delay");

        this.secretNumber = ServerUtils.generateSecretNumber(
            gameRange.fromIncluded ? gameRange.from : gameRange.from + 1,
            gameRange.toIncluded ? gameRange.to : gameRange.to - 1
        );
    }

    public void start() {

        try(ServerSocket serverSocket = new ServerSocket(port)) {

            System.out.println("The game server started at port " + port);
            System.out.println("The secrete number is: " + secretNumber + " (Do not tell the Gamers!)");

            while (true) {
                //Akceptacja połączenia z klientem
                Socket socketForClient = serverSocket.accept();
                //i przerzucenie obsługi do odrębnego wątku
                Thread.startVirtualThread(() -> handleClient(socketForClient));
            }

        } catch (IOException e) {
            System.err.println("!Failed to start the game server");
        }

        System.out.println("The game server is colosed");
        //try-with-resource automatyznie zamyka serverSocket
    }

    private void handleClient(Socket socket) {

        GameColor clientColor = RESET_COLOR;
        String clientNick = "";

        try( ObjectInputStream in = new ObjectInputStream(socket.getInputStream());
             ObjectOutputStream out = new ObjectOutputStream(socket.getOutputStream())) {

            while(true){
                Object request = in.readObject(); //ClassNotFoundException

                if(request instanceof ClientGameEnterRequest enterRequest) {
                    //Jeżeli odebrany obiekt jest klasy ClientGameEnterRequest
                    out.writeObject(gameRange); //Wówczas odsyła zasady gry,
                    out.flush();                //czyli tutaj zakres liczbowy
                    clientColor = enterRequest.color; //Zapisuje też kolor
                    clientNick = enterRequest.nick;   //i nazwę klienta

                    System.out.println(clientColor + clientNick + " entered the game" + RESET_COLOR);

                } else if(request instanceof ClientGuessRequest guessRequest) {
                    //Jeżeli odebrany obiekt jest klasy ClientGuessRequest, to odsyła ewaluację wartości klienta
                    //Wprowadza sztuczne opóźnienie o losowej długości
                    try { Thread.sleep(ThreadLocalRandom.current().nextInt(delayMs));
                    } catch (InterruptedException _ignored) {}
                    ServerEvaluationResponse evaluationResponse = ServerUtils.evaluate(guessRequest, secretNumber);
                    out.writeObject(evaluationResponse);
                    out.flush();

                    System.out.println(clientColor + clientNick + " guessing "
                        + guessRequest.guess + " " + evaluationResponse.result + RESET_COLOR);
                }
            }

        }catch(EOFException ex) {
            System.err.println("Connection closed: " + socket.getRemoteSocketAddress());
        }catch(IOException ex){ //Strumienie
            System.err.println("!Failed to connect to: " + socket.getRemoteSocketAddress());
        } catch(ClassNotFoundException ex){
            System.err.println("!Failed to read data from: " + socket.getRemoteSocketAddress());
        } finally{ try { socket.close(); } catch (IOException ignored) {} }

    }
}
