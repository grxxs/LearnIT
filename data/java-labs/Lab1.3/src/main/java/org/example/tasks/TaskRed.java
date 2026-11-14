package org.example.tasks;

import org.example.HaveRunMethod;
import org.example.Task;

@Task(numberOfRepetition = 3)
public class TaskRed implements HaveRunMethod {

    static final String RED = "\u001B[31m";
    static final String RESET = "\u001B[0m";

    @Override
    public void run() {
        System.out.println( RED + "Task RED -> wykonuję swoje zadanie" + RESET);
    }

}
