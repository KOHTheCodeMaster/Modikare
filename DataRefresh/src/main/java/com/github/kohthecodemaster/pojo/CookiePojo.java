package com.github.kohthecodemaster.pojo;

import java.util.Date;

public class CookiePojo {

    private final String name;
    private final String value;
    private final String domain;
    private final Date expiry;
    private final String path;
    private final String sameSite;
    private final boolean isSecure;
    private final boolean isHttpOnly;

    public CookiePojo(String name, String value, String domain, Date expiry, String path, String sameSite, boolean isSecure, boolean isHttpOnly) {
        this.name = name;
        this.value = value;
        this.domain = domain;
        this.expiry = expiry;
        this.path = path;
        this.sameSite = sameSite;
        this.isSecure = isSecure;
        this.isHttpOnly = isHttpOnly;
    }

    @Override
    public String toString() {
        return "name - " + name +
                "\nvalue - " + value +
                "\ndomain - " + domain +
                "\nexpiry - " + expiry +
                "\npath - " + path +
                "\nsameSite - " + sameSite +
                "\nisSecure - " + isSecure +
                "\nisHttpOnly - " + isHttpOnly;
    }

    public String getName() {
        return name;
    }

    public String getValue() {
        return value;
    }

    public String getDomain() {
        return domain;
    }

    public Date getExpiry() {
        return expiry;
    }

    public String getPath() {
        return path;
    }

    public String getSameSite() {
        return sameSite;
    }

    public boolean isSecure() {
        return isSecure;
    }

    public boolean isHttpOnly() {
        return isHttpOnly;
    }
}
