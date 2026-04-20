package com.week8;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/ReadCookieServlet")
public class ReadCookieServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 1. Retrieve all cookies from the request
        Cookie[] cookies = request.getCookies();
        String username = "Guest";
        
        if (cookies != null) {
            // 2. Loop through to find your specific cookie
            for (Cookie cookie : cookies) {
                if ("username".equals(cookie.getName())) {
                    username = cookie.getValue();
                    break;
                }
            }
        }
        response.getWriter().println("Welcome back, " + username);
    }
}
