package org.example;

import org.example.model.Observation;
import org.example.model.ObservationList;
import org.example.service.RandomObservation;
import org.example.service.XmlFileWriter;
import org.example.service.XsdFileGenerator;

public class App {

    public static void main(String[] args) {

        XsdFileGenerator.generate(Observation.class, ObservationList.class);

        Observation observation = RandomObservation.generate();
        XmlFileWriter.write(observation, "observation.xml");

        ObservationList observationList = new ObservationList();
        for(int i=0; i<1000; i++) observationList.addObservation(RandomObservation.generate());
        XmlFileWriter.write(observationList, "observations.xml");
    }
}