package org.example;

public class SecretDataWithPrintOnScreen<T1, T2> extends SecretData<T1, T2> implements HaveFunctionPrintOnScreen {
    public SecretDataWithPrintOnScreen(T1 data1, T2 data2){
        super(data1, data2);
    }

    @Override
    public void printOnScreen(){
        System.out.println("Data 1 -> " + getData1());
        System.out.println("Data 2 -> " + getData2());
    }
}
