package org.example;

public class Main {

    public static void main(String[] args) {

        TaskRunner taskRunner = new TaskRunner();

        taskRunner.scanPackageAndRun("org.example.tasks");
    }

}
