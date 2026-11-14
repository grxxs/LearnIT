package org.example.service;

import jakarta.xml.bind.JAXBContext;
import jakarta.xml.bind.JAXBException;
import jakarta.xml.bind.Unmarshaller;
import java.io.File;

public class XmlFileReader {

    public static <T> T readObservation(String xmlFileName, Class<T> clazz) {

        File xmlFile = new File(xmlFileName);

        try {
            JAXBContext context = JAXBContext.newInstance(clazz);
            Unmarshaller unmarshaller = context.createUnmarshaller();
            return clazz.cast(unmarshaller.unmarshal(xmlFile));
        } catch (JAXBException _ignored) { return null; }
    }
}