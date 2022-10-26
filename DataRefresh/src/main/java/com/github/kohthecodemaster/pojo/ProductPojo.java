package com.github.kohthecodemaster.pojo;

import com.github.kohthecodemaster.controller.MainController;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class ProductPojo {

    private final String code;
    private final String name;
    private final boolean tillStockLast;
    private final String netContent;
    private final boolean outOfStock;
    private final Double MRP;
    private final Double DP;
    private final Double BV;
    private final Double PV;

    public ProductPojo(String code, String name, boolean tillStockLast, String netContent, boolean outOfStock, Double MRP, Double DP, Double BV, Double PV) {
        this.code = code;
        this.name = name;
        this.tillStockLast = tillStockLast;
        this.netContent = netContent;
        this.outOfStock = outOfStock;
        this.MRP = MRP;
        this.DP = DP;
        this.BV = BV;
        this.PV = PV;
    }

    public static List<ProductPojo> extractFromTableHtmlFile() {

        List<ProductPojo> productPojoList = new ArrayList<>();
        List<Element> trList = extractTrListFromHtmlTableFile();

        for (Element tr : trList) {

            Elements tdList = tr.getElementsByTag("td");
            int pos = 0;

            String code = tdList.get(pos++).text();
            String name = tdList.get(pos++).text();
            boolean tillStockLast = tdList.get(pos++).text().equals("Yes");
            String netContent = tdList.get(pos++).text();
            boolean outOfStock = tdList.get(pos++).text().contains("Out Of Stock");
            Double mrp = Double.valueOf(tdList.get(pos++).text());
            Double dp = Double.valueOf(tdList.get(pos++).text());
            Double bv = Double.valueOf(tdList.get(pos++).text());
            Double pv = Double.valueOf(tdList.get(pos).text());

            ProductPojo productPojo = new ProductPojo(code, name, tillStockLast, netContent, outOfStock, mrp, dp, bv, pv);
            productPojoList.add(productPojo);

        }

        return productPojoList;

    }

    private static List<Element> extractTrListFromHtmlTableFile() {

        try {

            //  Read HTML_TABLE_FILE & parse it into JSOUP Document
            Document htmlTableDocument = Jsoup.parse(Files.readString(MainController.TABLE_HTML_FILE.toPath()));

            //  Return list of JSOUP Element containing tr elements of the tbody from the table
            return Objects.requireNonNull(htmlTableDocument.selectFirst("tbody")).getElementsByTag("tr");

        } catch (IOException e) {

            e.printStackTrace();

            String errMsg = "[Error] Unable To Read/Parse HTML Table File to Jsoup Element.\n" +
                    "HTML_TABLE_FILE -> " + MainController.TABLE_HTML_FILE + "\n" +
                    "PROGRAM TERMINATED..!! -_-";
            System.out.println(errMsg);

            System.exit(-400);
            return null;
        }

    }

    @Override
    public boolean equals(Object obj) {

        ProductPojo productPojo = (ProductPojo) obj;
        return (this.getCode().equals(productPojo.getCode()) &&
                this.getName().equals(productPojo.getName()) &&
                this.isTillStockLast() == productPojo.isTillStockLast() &&
                this.getNetContent().equals(productPojo.getNetContent()) &&
                this.isOutOfStock() == productPojo.isOutOfStock() &&
                this.getMRP().equals(productPojo.getMRP()) &&
                this.getDP().equals(productPojo.getDP()) &&
                this.getBV().equals(productPojo.getBV()) &&
                this.getPV().equals(productPojo.getPV())
        );

    }

    public String toString() {
        return "\nname - " + name +
                "\ncode - " + code +
                "\ntillStockLast - " + tillStockLast +
                "\nnetContent - " + netContent +
                "\noutOfStock - " + outOfStock +
                "\nMRP - " + MRP +
                "\nDP - " + DP +
                "\nBV - " + BV +
                "\nPV - " + PV;
    }

    public String getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

    public boolean isTillStockLast() {
        return tillStockLast;
    }

    public String getNetContent() {
        return netContent;
    }

    public boolean isOutOfStock() {
        return outOfStock;
    }

    public Double getMRP() {
        return MRP;
    }

    public Double getDP() {
        return DP;
    }

    public Double getBV() {
        return BV;
    }

    public Double getPV() {
        return PV;
    }
}
