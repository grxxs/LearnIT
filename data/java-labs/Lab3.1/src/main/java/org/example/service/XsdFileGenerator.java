package org.example.service;

import jakarta.xml.bind.JAXBContext;
import jakarta.xml.bind.JAXBException;
import jakarta.xml.bind.SchemaOutputResolver;
import javax.xml.transform.Result;
import javax.xml.transform.stream.StreamResult;
import java.io.File;
import java.io.IOException;

public class XsdFileGenerator {

    public static boolean generate(Class<?>... jaxbClasses) {

        try {
            JAXBContext context = JAXBContext.newInstance(jaxbClasses);

            SchemaOutputResolver resolver = new SchemaOutputResolver() {
                @Override
                public Result createOutput(String namespaceUri, String suggestedFileName) throws IOException {
                    File file = new File(suggestedFileName);
                    StreamResult result = new StreamResult(file);
                    result.setSystemId(file.getAbsolutePath());
                    return result;
                }
            };

            context.generateSchema(resolver);
            return true;

        } catch (JAXBException ex) {
            return false;
        } catch (IOException ex) {
            return false;
        }
    }
}