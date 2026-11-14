package org.example;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class Main {
    static List<String> dataRaw = List.of(
            "ID-30492-a", "ID-60492-a", "key-330345-C", "kEy-333594-a", "key-330494-c", "Id-30262-c",
            "key-333594-a", "key-330494-c", "KEY-550494-A", "uid-304911-a", "key-550494-a", "uid-304911-A",
            "uid-304944-a", "key-660494-b", "ID-30435-B", "ID-99435-b", "id-30435-b", "uid-304923-b",
            "uid-304234-b", "id-60492-a", "ID-38462-c", "uid-364984-A", "uid-304944-c", "uid-304923-b",
            "KEY-330494-c", "uid-304944-C", "key-330494-a", "Key-340494-a", "key-330494-b", "kEy-550494-a",
            "key-660494-B", "keY-660494-b"
    );
    static List<String> clean(List<String> dataRaw) {
        return dataRaw.stream()
                .map(s -> s.toUpperCase())
                .distinct()
                .sorted()
                .toList();
    }
    static List<String> filterByPrefix(List<String> rawData, String prefix) {
        return dataRaw.stream()
                .filter(s -> s.toUpperCase().startsWith(prefix.toUpperCase()))
                .toList();
    }
    public static Map<String, Long> countBySuffix(List<String> data) {
        return data.stream()
                .map(s -> s.substring(s.lastIndexOf('-') + 1))
                .map(String::toLowerCase)
                .collect(Collectors.groupingBy(
                        s -> s,
                        Collectors.counting()
                ));
    }
    public static void main(String[] args) {
        System.out.println("Zadanie 2.1");
        System.out.println("---");
        clean(dataRaw).forEach(System.out::println);
        System.out.println("---");
        filterByPrefix(dataRaw, "key").forEach(System.out::println);
        System.out.println("---");
        countBySuffix(dataRaw).forEach((k, v) -> System.out.println(k + "->" + v));
        System.out.println("---");
    }
}