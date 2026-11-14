package org.example.dto;

import java.io.Serializable;

public class ServerGameEnterResponse implements Serializable{

    private static final long serialVersionUID = 2L;

    final public int from, to;
    final public boolean fromIncluded, toIncluded;

    public ServerGameEnterResponse(int from, boolean fromIncluded, int to, boolean toIncluded){

        if(from >= to) throw new IllegalArgumentException();
        this.from = from;
        this.fromIncluded = fromIncluded;
        this.to = to;
        this.toIncluded = toIncluded;
    }


    public ServerGameEnterResponse(int max) {

        this(0, true, max, true);
    }

}
