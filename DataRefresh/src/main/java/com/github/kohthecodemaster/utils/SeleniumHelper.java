package com.github.kohthecodemaster.utils;

import org.openqa.selenium.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.File;
import java.time.Duration;
import java.util.Set;

public class SeleniumHelper {

    public static void switchToUrl(WebDriver driver, String currentUrl) {

        System.out.println("Waiting for 1 Second before Switching URL.");
        SeleniumHelper.pauseControl(1000);

//        String regexSpecialSymbols = "[/\\\\:\"?<>*|]";
        String pageTitle = "";
        int maxRetryAttempts = 3;

        do {
            try {
                //  Navigate the driver to the currentUrl
                driver.navigate().to(currentUrl);
                break;
            } catch (TimeoutException e) {
                System.out.println("TimeOutException : " + e.getMessage());
                maxRetryAttempts--;
            } catch (Exception e) {
                System.out.println("Exception : " + e.getMessage());
                e.printStackTrace();
                maxRetryAttempts--;
            }

        } while (maxRetryAttempts > 0);

        if (maxRetryAttempts <= 0) {
            System.out.println("ERROR: Max. Retry Attemps Exceeded for reloading the url: " + currentUrl);
            return;
        }
        //  Display Page Title
        pageTitle = SeleniumHelper.acquirePageTitle(driver);
        System.out.println(pageTitle + " WebPage is now Loaded.");

    }

    public static void switchToUrl(WebDriver driver, String currentUrl, boolean shouldSaveHTMLFile) {

        System.out.println("Waiting for 1 Second before Switching URL.");
        SeleniumHelper.pauseControl(1000);

//        String regexSpecialSymbols = "[/\\\\:\"?<>*|]";
        String pageTitle = "";

        //  Navigate the driver to the currentUrl
        driver.navigate().to(currentUrl);

        //  Display Page Title
        pageTitle = SeleniumHelper.acquirePageTitle(driver);
        System.out.println(pageTitle);

        //  Extract the Html Page Source of the currentUrl
        String htmlPageSource = driver.getPageSource();

        if (shouldSaveHTMLFile) {
            File htmlFile = new File("./temp/html/" + pageTitle + System.nanoTime() + ".html");
            File newFile = FileHelper.saveHtmlFile(htmlPageSource, htmlFile);

            if (newFile == null) System.out.println("Unable to save the Html File - " + htmlFile.getAbsolutePath());
            else System.out.println("Successfully Saved Html File - " + htmlFile.getAbsolutePath());

        }

    }

    public static WebElement acquireWebElement(WebDriver driver, String cssSelector) {
        return driver.findElement(By.cssSelector(cssSelector));
    }

    public static WebElement acquireWebElement(WebDriver driver, String cssSelector, int waitTimeMs) {
        pauseControl(waitTimeMs);
        return driver.findElement(By.cssSelector(cssSelector));
    }

    public static String acquirePageTitle(WebDriver driver, boolean shouldDisplayPageTitle) {
        String pageTitle = acquirePageTitle(driver);
        if (shouldDisplayPageTitle)
            System.out.println("Page Title : " + pageTitle);
        return pageTitle;
    }

    public static String acquirePageTitle(WebDriver driver) {
        //  Extract the Page Title of the currentUrl
        try {
            String regexSpecialSymbols = "[/\\\\:\"?<>*|]";
            return driver.getTitle().replaceAll(regexSpecialSymbols, "-");
        } catch (Exception e) {
            System.out.println("Exception: Failed to extract title of the page.");
            e.printStackTrace();
        }
        return "Untitled";
    }

    public static void pauseControl(int ms) {

        try {
            Thread.sleep(ms);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    public static boolean isWebElementVisible(WebDriver driver, String cssSelector) {

        return driver.findElement(By.cssSelector(cssSelector)).isDisplayed();

    }

    public static void waitUntil(WebDriver driver, String cssSelector) {

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(60), Duration.ofSeconds(1));
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector(cssSelector)));

    }

    public static void waitUntil(WebDriver driver, String cssSelector, int timeOutInSeconds) {

        Duration durationTimeOut = Duration.ofSeconds(timeOutInSeconds);
        Duration durationSleepBetweenPolls = Duration.ofMillis(200);    //  Check after every 200 ms

        WebDriverWait wait = new WebDriverWait(driver, durationTimeOut, durationSleepBetweenPolls);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector(cssSelector)));

    }

    public static void displayCookiesList(WebDriver driver) {

        System.out.println("Title : " + driver.getTitle());
        System.out.println("\n============================");

        //  Display Cookies
        Set<Cookie> cookiesSet = driver.manage().getCookies();
        cookiesSet.forEach(cookie -> System.out.println("Key : " + cookie.getName() + "\n" +
                "Value : " + cookie.getValue() + "\n" +
                "Expiry : " + cookie.getExpiry() + "\n" +
                "Domain : " + cookie.getDomain() + "\n" +
                "Path : " + cookie.getPath() + "\n"
        ));

    }
}
