package org.example;

import org.example.model.Observation;
import org.example.model.ObservationList;
import org.example.service.XmlFileReader;
import org.example.service.XmlValidator;
import java.util.List;
import java.util.Comparator;

public class App {
    final static String [] schemaFiles = { "schema1.xsd", "schema2.xsd" };
    final static String dataObservationFile = "observation.xml";
    final static String dataObservationsFile = "observations.xml";

    public static void main(String[] args) {

        boolean reslut_1 = XmlValidator.validate(dataObservationFile, schemaFiles);
        boolean reslut_list = XmlValidator.validate(dataObservationsFile, schemaFiles);
        System.out.println("Validate: " + dataObservationFile + " -> " + reslut_1);
        System.out.println("Validate: " + dataObservationsFile + " -> " + reslut_list);

        System.out.println("---");

        Observation observation = XmlFileReader.readObservation(dataObservationFile, Observation.class);
        System.out.println(observation);

        System.out.println("---");

        ObservationList observationList = XmlFileReader.readObservation(dataObservationsFile, ObservationList.class);

        List<Observation> observationListFiltered = observationList.getObservations().stream()
                .filter(o -> o.getComment() != null)
                .map(o -> {
                    double valueInCelsius = switch (o.getUnit()) {
                        case Celsius -> o.getValue();
                        case Fahrenheit -> (o.getValue() - 32) * 5.0 / 9.0;
                        case Kelvin -> o.getValue() - 273.15;
                    };
                    return new Observation( o.getTimeStamp(), Observation.TemperatureUnit.Celsius, valueInCelsius,o.getComment());})
                .filter(o -> o.getValue() > -1 && o.getValue() < 1)
                .sorted(Comparator.comparingDouble(Observation::getValue))
                .toList();

        observationListFiltered.forEach(System.out::println);
    }
}