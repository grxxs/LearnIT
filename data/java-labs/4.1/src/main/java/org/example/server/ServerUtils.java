package org.example.server;

import java.util.Random;
import org.example.dto.*;

class ServerUtils {

    static int generateSecretNumber(int fromIncluded, int toIncluded){

        Random rand = new Random();
        return rand.nextInt((toIncluded - fromIncluded) + 1) + fromIncluded;
    }

    static ServerEvaluationResponse evaluate(ClientGuessRequest clientGuess, int secretNumber){

        Evaluation evaluation =
            clientGuess.guess > secretNumber ? Evaluation.OVERVALUED :
            clientGuess.guess < secretNumber ? Evaluation.UNDERVALUED :
            Evaluation.HIT;

        return new ServerEvaluationResponse(clientGuess.guess, evaluation);
    }

}
