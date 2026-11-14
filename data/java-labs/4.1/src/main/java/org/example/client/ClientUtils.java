package org.example.client;

import java.util.Random;
import org.example.dto.*;

class ClientUtils {

    static ClientGuessRequest generateRandomGuess(ServerGameEnterResponse gameRange){

        int fromIncluded = gameRange.fromIncluded ? gameRange.from : gameRange.from + 1;
        int toIncluded = gameRange.toIncluded ? gameRange.to : gameRange.to - 1;

        int randomFromGameRange = new Random().nextInt((toIncluded - fromIncluded) + 1) + fromIncluded;

        return new ClientGuessRequest(randomFromGameRange);
    }
}
