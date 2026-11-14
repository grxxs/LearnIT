package org.example;

import java.util.function.BiFunction;

public class MathCalculator2 {

    public static double executeOperation(
            double x,
            double y,
            BiFunction<Double, Double, Double> operation ){

        return operation.apply(x, y);
    }

}
