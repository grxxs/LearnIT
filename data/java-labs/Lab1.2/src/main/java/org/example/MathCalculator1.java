package org.example;

public class MathCalculator1 {

    public static double executeOperation(double x, double y, MathOperation operation){

        return operation.performOperation(x, y);
    }
}