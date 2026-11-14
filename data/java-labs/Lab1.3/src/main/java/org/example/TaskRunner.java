package org.example;

import org.reflections.Reflections;
import java.util.Set;
import java.util.Map;
import java.util.HashMap;

public class TaskRunner {

    public void scanPackageAndRun(String packageName) {

        System.out.println(" -> Skanuję pakiet: " + packageName);

        Reflections reflections = new Reflections(packageName);

        Set<Class<? extends HaveRunMethod>> classes
                = reflections.getSubTypesOf(HaveRunMethod.class);

        Map<HaveRunMethod, Integer> tasksWithCounters = new HashMap<>();

        for(Class<? extends HaveRunMethod> cls : classes){

            if(!cls.isAnnotationPresent(Task.class)) continue;

            Task annotation = cls.getAnnotation(Task.class);

            try {

                HaveRunMethod instance = cls.getDeclaredConstructor().newInstance();

                tasksWithCounters.put(instance, annotation.numberOfRepetition());

            } catch (Exception e) {
            }

        }

        tasksWithCounters.forEach((taskInstance, numeberOfRepetitions) -> {

            for(int i=0; i<numeberOfRepetitions; i++) taskInstance.run();

        });

        System.out.println(" -> Wszystkie taski wykonane");
    }
}
