package org.example.model;

import jakarta.xml.bind.annotation.XmlRootElement;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlAccessType;
import java.util.List;
import java.util.ArrayList;

@XmlRootElement(name = "weather-observations", namespace = "http://example.org/weather-observation")
@XmlAccessorType(XmlAccessType.FIELD)
public class ObservationList {

    @XmlElement(name = "observation")
    private List<Observation> observations = new ArrayList<>();

    public ObservationList() {}

    public ObservationList(List<Observation> observations) {
        this.observations = observations;
    }

    public List<Observation> getObservations() {
        return observations;
    }

    public void setObservations(List<Observation> observations) {
        this.observations = observations;
    }

    public void addObservation(Observation observation) {
        this.observations.add(observation);
    }

    @Override
    public String toString() {
        return "ObservationList{" +
                "observations=" + observations +
                '}';
    }
}