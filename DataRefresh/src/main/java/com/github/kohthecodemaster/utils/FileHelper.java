package com.github.kohthecodemaster.utils;

import stdlib.utils.KOHFilesUtil;

import java.io.File;
import java.io.IOException;

public class FileHelper {

    public static File saveHtmlFile(String htmlPageSource, File htmlFile) {

        createFileIfNotExists(htmlFile);

        if (!KOHFilesUtil.writeStrToFile(htmlPageSource, htmlFile)) {
            System.out.println("Unable To Write htmlPageSource to : " + htmlFile.getAbsolutePath());
            return null;
        }
        return htmlFile;

    }

    public static void createFileIfNotExists(File file) {

        try {
            if (!file.isFile()) {
                if (!file.createNewFile())
                    System.out.println("Failed to Create: " + file.getCanonicalPath());
            } else
                System.out.println("File already Exists : " + file.getCanonicalPath());
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

}
