package org.example.tasks;

import org.example.HaveRunMethod;
import org.example.Task;

@Task(numberOfRepetition = 5)
public class TaskGreen implements HaveRunMethod {

    static final String GREEN = "\u001B[32m";
    static final String RESET = "\u001B[0m";

    @Override
    public void run() {
        System.out.println( GREEN + "Task GREEN -> wykonuję woje zadanie" + RESET );
    }

}