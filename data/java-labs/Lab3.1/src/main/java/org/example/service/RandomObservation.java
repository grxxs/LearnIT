package org.example.service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Random;
import org.example.model.Observation;

public class RandomObservation {

    private static final Observation.TemperatureUnit[] UNITS
            = Observation.TemperatureUnit.values();

    private static final String[] COMMENTS
            = {"Sunny", "Cloudy", "Rainy", "Windy", "Foggy", "Stormy", "Clear night"};

    private static final Random RANDOM = new Random();

    public static Observation generate() {

        LocalDateTime timeStamp = LocalDateTime.now()
                .minus(RANDOM.nextInt(7 * 24), ChronoUnit.HOURS)
                .minus(RANDOM.nextInt(60), ChronoUnit.MINUTES);

        Observation.TemperatureUnit unit = UNITS[RANDOM.nextInt(UNITS.length)];

        double value = switch (unit) {
            case Celsius -> -10 + RANDOM.nextDouble() * 45;
            case Fahrenheit -> 14 + RANDOM.nextDouble() * 95;
            case Kelvin -> 263 + RANDOM.nextDouble() * 45;
        };

        String comment = RANDOM.nextBoolean() ? COMMENTS[RANDOM.nextInt(COMMENTS.length)] : null;

        return new Observation(timeStamp, unit, value, comment);
    }
}