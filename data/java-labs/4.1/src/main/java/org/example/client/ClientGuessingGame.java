package org.example.client;

import java.net.Socket;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.IOException;
import java.net.UnknownHostException;
import org.example.dto.*;
import static org.example.dto.Evaluation.*;
import org.example.shared.*;

public class ClientGuessingGame {

    private final ClientGameEnterRequest myGameEnterRequest;
    private ServerGameEnterResponse gameRange;

    public ClientGuessingGame(String nick, GameColor color){
        myGameEnterRequest = new ClientGameEnterRequest(nick, color);
    }

    private void  printInColor(String msg) {
        System.out.print(myGameEnterRequest.color
            + msg + GameColor.RESET_COLOR);
    }

    public void start(String serverAddress, int serverPort) {
        try(
            Socket socket = new Socket(serverAddress, serverPort);
            ObjectOutputStream out = new ObjectOutputStream(socket.getOutputStream());
            ObjectInputStream in = new ObjectInputStream(socket.getInputStream()) ){
                //0. Informacje o połączeniu z serwerem
                printInColor("I am " + myGameEnterRequest.nick +"\n");
                printInColor("I have connedted to: " + socket.getRemoteSocketAddress() + "\n");
                //1. Pobranie zasad gry, tylko raz
                out.writeObject(myGameEnterRequest);
                out.flush();
                gameRange = (ServerGameEnterResponse)in.readObject();
                //2. Udział w grze w pętli
                ClientGuessRequest myGuess = ClientUtils.generateRandomGuess(gameRange);
                while (true) {
                    printInColor("Trying " + myGuess.guess + "... ");
                    out.writeObject(myGuess);
                    out.flush();
                    ServerEvaluationResponse serverEvaluation = (ServerEvaluationResponse) in.readObject();
                    printInColor(serverEvaluation.result + "\n");
                    if(serverEvaluation.result == HIT) break;
                    myGuess = ClientUtils.generateRandomGuess(gameRange);
                }
        }catch(UnknownHostException ex){ printInColor("!Failed to connect to: " + serverAddress + "\n"); }
        catch(IOException ex){ printInColor("!Failed to connect or transfer data to: " + serverAddress + "\n"); }
        catch(ClassNotFoundException ex){ printInColor("Failed to communicate with: " + serverAddress + "\n");}
    }
}
