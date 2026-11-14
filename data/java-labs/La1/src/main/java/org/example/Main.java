package org.example;
import java.io.PrintStream;

public class Main {
    static void main() {
        SecretData<String, PrintStream> tekstWithOutputStreamSecretData = new SecretData<>("Dane tekstowe", System.out);
        SecretDataActions.writeToStream(tekstWithOutputStreamSecretData);
        SecretDataActions.printOnScreen(tekstWithOutputStreamSecretData);
        SecretData<Integer, Double> numericData = new SecretData<>(5, 2.2);
        SecretDataActions.printOnScreen(numericData);
        double sum = SecretDataActions.sumOfData(numericData);
        System.out.println("suma=" + sum);
        SecretDataWithPrintOnScreen<String, Integer> secretDataWithPrintOnScreen = new SecretDataWithPrintOnScreen<>("Opis", 5);
        SecretDataActions.printOnScreen((HaveFunctionPrintOnScreen) secretDataWithPrintOnScreen);
        SecretDataActions.printOnScreen((SecretData<?,?>)secretDataWithPrintOnScreen);
    }
}
