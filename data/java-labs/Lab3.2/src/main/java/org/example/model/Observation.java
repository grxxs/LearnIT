package org.example.model;

import jakarta.xml.bind.annotation.XmlAccessType;
import jakarta.xml.bind.annotation.XmlAccessorType;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;
import jakarta.xml.bind.annotation.adapters.XmlJavaTypeAdapter;

import java.time.LocalDateTime;

@XmlRootElement(name = "weather-observation", namespace = "http://example.org/weather-observation")
@XmlAccessorType(XmlAccessType.FIELD)
public class Observation {

    public enum TemperatureUnit { Celsius, Fahrenheit, Kelvin }

    @XmlElement(required = true)
    @XmlJavaTypeAdapter(LocalDateTimeAdapter.class)
    private LocalDateTime timeStamp;

    @XmlElement(required = true)
    private TemperatureUnit unit;

    @XmlElement(required = true)
    private double value;

    @XmlElement(required = false)
    private String comment;

    public Observation() {}

    public Observation(LocalDateTime timeStamp, TemperatureUnit unit, double value, String comment) {
        this.timeStamp = timeStamp;
        this.unit = unit;
        this.value = value;
        this.comment = comment;
    }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public LocalDateTime getTimeStamp() { return timeStamp; }
    public void setTimeStamp(LocalDateTime timeStamp) { this.timeStamp = timeStamp; }

    public TemperatureUnit getUnit() { return unit; }
    public void setUnit(TemperatureUnit unit) { this.unit = unit; }

    public double getValue() { return value; }
    public void setValue(double value) { this.value = value; }

    @Override
    public String toString() {
        return "Observation{" +
                "timeStamp='" + timeStamp + '\'' +
                ", unit='" + unit + '\'' +
                ", value=" + value +
                ", comment='" + comment + '\'' +
                '}';
    }
}