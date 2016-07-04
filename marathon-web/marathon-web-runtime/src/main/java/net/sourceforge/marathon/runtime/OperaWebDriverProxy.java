package net.sourceforge.marathon.runtime;

import java.io.IOException;
import java.net.ServerSocket;

import org.openqa.selenium.WebDriverException;
import org.openqa.selenium.opera.OperaDriverService;

public class OperaWebDriverProxy implements IWebdriverProxy {

    private int port;
    private OperaDriverService service;

    public OperaWebDriverProxy() {
        port = findPort();
        service = new OperaDriverService.Builder().usingPort(port).build();
        try {
            service.start();
        } catch (IOException e) {
            throw new RuntimeException("Unable to start InternetExplorerDriverService", e);
        }
    }

    @Override public String getURL() {
        return "http://localhost:" + port ;
    }

    private int findPort() {
        ServerSocket socket = null;
        try {
            socket = new ServerSocket(0);
            return socket.getLocalPort();
        } catch (IOException e1) {
            throw new WebDriverException("Could not allocate a port: " + e1.getMessage());
        } finally {
            if (socket != null)
                try {
                    socket.close();
                } catch (IOException e) {
                }
        }
    }

    @Override public void quit() {
        if(service != null)
            service.stop();
    }
}
