package org.example.dto;

import java.io.Serializable;
import org.example.shared.GameColor;

public class ClientGameEnterRequest implements Serializable{

    private static final long serialVersionUID = 1L;

    public final String nick;
    public final GameColor color;

    public ClientGameEnterRequest(String nick, GameColor color) {

        this.nick = nick;
        this.color = color;
    }
}
