package org.example.tasks;

import org.example.HaveRunMethod;
import org.example.Task;

@Task(numberOfRepetition = 4)
public class TaskYellow implements HaveRunMethod {

    static final String YELLOW = "\u001B[33m";
    static final String RESET = "\u001B[0m";

    @Override
    public void run() {
        System.out.println( YELLOW + "Task YELLOW -> wykonuję swoje zadanie" + RESET );
    }

}