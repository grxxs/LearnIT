package org.example;

import java.io.IOException;
import java.io.OutputStream;

public class SecretDataActions {

    public static <T extends HaveFunctionPrintOnScreen> void printOnScreen(T data) {
        System.out.println("Wykonuję: <T extends HavaFunctionPrintOnScreen> void printOnScreen(T data)");
        data.printOnScreen();
    }

    public static <T1, T2> void printOnScreen(SecretData<T1, T2> data){
        System.out.println("Wykonuję: <T1, T2> void printOnScreen(SecretData<T1, T2> data");
        System.out.println(data.getData1() + " " + data.getData2());
    }

    public static <T1 extends Number, T2 extends Number> double sumOfData(SecretData<T1, T2>data){
        double sum = data.getData1().doubleValue() + data.getData2().doubleValue();
        return sum;
    }

    public static <T2 extends OutputStream> boolean writeToStream(SecretData<String, T2> data){

        OutputStream outputStream = data.getData2();
        String text = data.getData1();

        try{
            outputStream.write(text.getBytes());
            outputStream.write('\n');
            return true;
        } catch (IOException e){
            return false;
        }

    }

}
