package com.github.kohthecodemaster.controller;

import com.github.kohthecodemaster.pojo.CookiePojo;
import com.github.kohthecodemaster.pojo.ProductPojo;
import com.github.kohthecodemaster.utils.JsonController;
import com.github.kohthecodemaster.utils.SeleniumHelper;
import com.google.gson.reflect.TypeToken;
import org.openqa.selenium.Cookie;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.Select;
import stdlib.enums.StringOptions;
import stdlib.utils.KOHFilesUtil;
import stdlib.utils.KOHStringUtil;
import stdlib.utils.MyTimer;

import java.io.File;
import java.lang.reflect.Type;
import java.time.Instant;
import java.util.Date;
import java.util.List;

public class MainController {

    private static final int DEFAULT_WAIT_TIME = 1_000; //    1000 ms i.e.  1 second
    private static final int DEFAULT_TIME_OUT = 10_000; //  10,000 ms i.e. 10 second

    private static final String STR_BILLING_ORDER_URL = "https://www.modicare.com/NewConsultant/Shopping.aspx";

    public static final File TABLE_HTML_FILE = new File("DataRefresh/src/main/resources/latest/Table - Billing Order.html");
    public static final File PRODUCT_JSON_FILE = new File("DataRefresh/src/main/resources/latest/latest-product-list.json");

    private ChromeDriver driver;

    public static void main(String[] args) {

        MainController obj = new MainController();
        obj.major();

    }

    public void major() {

        downloadProductDetails();

        testing();

    }

    private void testing() {

        testExtractingAndSavingProductPojoListJson();

    }

    private void testExtractingAndSavingProductPojoListJson() {

        KOHFilesUtil.deleteFileNow(PRODUCT_JSON_FILE);

        List<ProductPojo> productPojoListFromHtml = ProductPojo.extractFromTableHtmlFile();
        JsonController.saveListToJsonFile(productPojoListFromHtml, PRODUCT_JSON_FILE);

        List<ProductPojo> productPojoListFromJson = loadProductListFromJson();

        System.out.println("\n-------------\nProducts Count from HTML Table: " + productPojoListFromHtml.size());
        System.out.println("Product Pojo Count from Json File: " + productPojoListFromJson.size());

        /*
            int count = 0;
            for (int i = 0; i < productPojoListFromHtml.size(); i++) {
                ProductPojo productPojoFromHtml = productPojoListFromHtml.get(i);
                ProductPojo productPojoFromJson = productPojoListFromJson.get(i);
                if (productPojoFromJson.equals(productPojoFromHtml)) count++;
            }
            System.out.println("\n-------------\nLists are Same? --> " + (count == productPojoListFromHtml.size() &&
                    productPojoListFromHtml.size() == productPojoListFromJson.size()));
        */

        System.out.println("\nLists are Same? --> " + (productPojoListFromHtml.equals(productPojoListFromJson)));

    }

    private void downloadProductDetails() {
        init();
        performDataRefresh();
        quitDriver();
    }

    private void quitDriver() {

        try {
            driver.close();
            driver.quit();
        } catch (Exception e) {
            System.out.println("MSG: " + e.getMessage());
        }

    }

    private void init() {

        // System Property for Chrome Driver
        System.setProperty("webdriver.chrome.driver", "DataRefresh/src/main/resources/chromedriver/chromedriver.exe");

        ChromeOptions options = new ChromeOptions();
//        options.setHeadless(true);

        // Instantiate a ChromeDriver class.
        this.driver = new ChromeDriver(options);
        driver.manage().window().maximize();

        KOHFilesUtil.deleteFileNow(TABLE_HTML_FILE);
        KOHFilesUtil.deleteFileNow(PRODUCT_JSON_FILE);

    }

    private void performDataRefresh() {

        System.out.println("performDataRefresh() Invoked.");

        loginAutomation();

        String htmlTable = fetchProductHtmlTable(); //  Using Selenium Chrome Driver Browser Automation

        saveProductTableToHtmlFile(htmlTable); //  System.exit(-400) if Save Failed.

        List<ProductPojo> productPojoListFromHtml = ProductPojo.extractFromTableHtmlFile();
        JsonController.saveListToJsonFile(productPojoListFromHtml, PRODUCT_JSON_FILE);

        List<ProductPojo> productPojoListFromJson = loadProductListFromJson();

        System.out.println("\n-------------\nProducts Count from HTML Table: " + productPojoListFromHtml.size());
        System.out.println("Product Pojo Count from Json File: " + productPojoListFromJson.size());


        System.out.println("\n-------------\nLists are Same? --> " + (productPojoListFromHtml.equals(productPojoListFromJson)));

    }

    private void loginAutomation() {

        SeleniumHelper.switchToUrl(driver, "https://www.modicare.com");

        SeleniumHelper.waitUntil(driver, ".topLogin_popup_link", 5000);
        SeleniumHelper.acquireWebElement(driver, ".topLogin_popup_link", DEFAULT_WAIT_TIME).click();

        SeleniumHelper.waitUntil(driver, ".loginPanelClickCO", 5000);
        SeleniumHelper.acquireWebElement(driver, ".loginPanelClickCO", DEFAULT_WAIT_TIME).click();

/*
        SeleniumHelper.pauseControl(1000);
        SeleniumHelper.waitUntil(driver, "#txtELogin", 5000);
//        SeleniumHelper.acquireWebElement(driver, "#txtELogin").sendKeys(MCA_NO);

        SeleniumHelper.pauseControl(1000);
        SeleniumHelper.waitUntil(driver, "#txtPasLogin", 5000);
//        SeleniumHelper.acquireWebElement(driver, "#txtPasLogin").sendKeys(PASSWORD);
*/

        //   Stop the control.
        KOHStringUtil.userInputString("Enter Captcha & Press Y",
                StringOptions.YES_OR_NO, new MyTimer());

        SeleniumHelper.acquireWebElement(driver, "#btnlogin", DEFAULT_WAIT_TIME).click();

    }

    private String fetchProductHtmlTable() {

        //  Click Close Btn for 1st Popup
        SeleniumHelper.pauseControl(DEFAULT_WAIT_TIME);
        SeleniumHelper.waitUntil(driver, "#loyaltyCouponPopup", DEFAULT_TIME_OUT);
        SeleniumHelper.acquireWebElement(driver, "#loyaltyCouponPopup > div > div > div.modal-footer > button", DEFAULT_WAIT_TIME).click();

        //  Click Close Btn for 2nd Popup
        SeleniumHelper.pauseControl(DEFAULT_WAIT_TIME);
        SeleniumHelper.waitUntil(driver, "#agriPopup", DEFAULT_TIME_OUT);
        SeleniumHelper.acquireWebElement(driver, "#agriPopup > div > div > div.modal-footer > button", DEFAULT_WAIT_TIME).click();

        //  Switch to Billing URL to fetch Product Table
        SeleniumHelper.pauseControl(DEFAULT_WAIT_TIME);
        SeleniumHelper.switchToUrl(driver, STR_BILLING_ORDER_URL);

/*
        //  Allow user to manually load the billing page & press enter once opened up.
        while (!driver.getCurrentUrl().equals(STR_BILLING_ORDER_URL)) {
            System.out.println("Current URL : " + driver.getCurrentUrl());
            KOHStringUtil.userInputString("Copy Paste this URL once Login Successful - " + STR_BILLING_ORDER_URL +
                            "\nPage Opened Successfully?: [Y/N] ",
                    StringOptions.YES_OR_NO, new MyTimer());
        }
*/

        //  Click Self Order Radio Btn
        SeleniumHelper.pauseControl(DEFAULT_WAIT_TIME);
        SeleniumHelper.waitUntil(driver, "#ContentPlaceHolder1_rdobillto_0", DEFAULT_TIME_OUT);
        SeleniumHelper.acquireWebElement(driver, "#ContentPlaceHolder1_rdobillto_0", DEFAULT_WAIT_TIME).click();

        //  Click Shipping Address Collapsible Drop Down
        SeleniumHelper.acquireWebElement(driver, "#acollapse2", DEFAULT_WAIT_TIME).click();

        //  Click Courier Radio Btn (Requires clicking twice as it's input element)
        SeleniumHelper.waitUntil(driver, "#ContentPlaceHolder1_ddlDeliveryMode_0", DEFAULT_TIME_OUT);
        SeleniumHelper.acquireWebElement(driver, "#ContentPlaceHolder1_ddlDeliveryMode_0", DEFAULT_WAIT_TIME).click();
        SeleniumHelper.acquireWebElement(driver, "#ContentPlaceHolder1_ddlDeliveryMode_0", DEFAULT_WAIT_TIME).click();

        //  Click Next Btn
        SeleniumHelper.pauseControl(DEFAULT_WAIT_TIME);
        SeleniumHelper.waitUntil(driver, "#example-basic1 > div.actions.clearfix > ul > li:nth-child(2) > a", DEFAULT_TIME_OUT);
        SeleniumHelper.acquireWebElement(driver, "#example-basic1 > div.actions.clearfix > ul > li:nth-child(2) > a", DEFAULT_WAIT_TIME).click();

        //  Select All Categories (1st Index)
        SeleniumHelper.pauseControl(DEFAULT_WAIT_TIME);
        SeleniumHelper.waitUntil(driver, "#ContentPlaceHolder1_ddlTCategory", DEFAULT_TIME_OUT);
        new Select(SeleniumHelper.acquireWebElement(driver, "#ContentPlaceHolder1_ddlTCategory", DEFAULT_WAIT_TIME))
                .selectByIndex(1);

        //  Fetch Product Table element which contains all the product details.
        SeleniumHelper.pauseControl(DEFAULT_WAIT_TIME);
        SeleniumHelper.waitUntil(driver, "#example", DEFAULT_TIME_OUT);
        WebElement elementProductTable = SeleniumHelper.acquireWebElement(driver, "#example", DEFAULT_WAIT_TIME);

        // Return product table's outer html as string
        return elementProductTable.getAttribute("outerHTML");

    }

    private void saveProductTableToHtmlFile(String tableOuterHtml) {

        String errMsg = "[Error] Unable To Save HTML Table to File.\n" +
                "HTML Table Outer HTML -> " + tableOuterHtml + "\n" +
                "HTML_TABLE_FILE -> " + TABLE_HTML_FILE + "\n" +
                "PROGRAM TERMINATED..!! -_-";

        boolean fileSavedSuccessfully = KOHFilesUtil.writeStrToFile(tableOuterHtml, TABLE_HTML_FILE);
        if (!fileSavedSuccessfully) System.out.println(errMsg);

    }

    private List<ProductPojo> loadProductListFromJson() {

        Type type = new TypeToken<List<ProductPojo>>() {
        }.getType();

        @SuppressWarnings("unchecked")
        List<ProductPojo> productPojos = (List<ProductPojo>) JsonController.parseJsonFileToList(
                PRODUCT_JSON_FILE,
                type);

        return productPojos;

    }

    @Deprecated
    private void initializeCookies() {

        SeleniumHelper.displayCookiesList(driver);

        SeleniumHelper.switchToUrl(driver, "https://www.modicare.com");
//        SeleniumHelper.switchToUrl(driver, "https://www.modicare.com/NewConsultant/SelfStockBIll.aspx");

        Type type = new TypeToken<List<CookiePojo>>() {
        }.getType();
        @SuppressWarnings("unchecked")
        List<CookiePojo> cookiePojoList = (List<CookiePojo>) JsonController.parseJsonFileToList(
                new File("DataRefresh/src/main/resources/json/cookie.json"), type);

        System.out.println("cookiePojoList Size: " + cookiePojoList.size());

        cookiePojoList.forEach(cookiePojo -> {

            System.out.println("Loading Cookie.");
            System.out.println(cookiePojo);

            driver.manage().addCookie(new Cookie(
                    cookiePojo.getName(),
                    cookiePojo.getValue(),
                    cookiePojo.getDomain(),
                    cookiePojo.getPath(),
                    Date.from(Instant.parse("2023-06-30T10:15:30.00Z")),
                    cookiePojo.isSecure(),
                    cookiePojo.isHttpOnly(),
                    cookiePojo.getSameSite()
            ));

        });

        System.out.println("Cookies List Loaded.");
        System.out.println("Driver Cookies Size: " + driver.manage().getCookies().size());

    }

}
