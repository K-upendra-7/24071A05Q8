package com.week8;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class SetCookieServlet
 */
@WebServlet("/SetCookieServlet")
public class SetCookieServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");
     

        // 1. Create a cookie (Name, Value)
        Cookie userCookie = new Cookie("username", username);
        
        // 2. Set expiry time in seconds (e.g., 1 hour)
        userCookie.setMaxAge(3600); 
        
        // 3. Add the cookie to the response
        response.addCookie(userCookie);
        
        response.getWriter().println("Cookie has been set!");
    }
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.getWriter().println("Please submit a form using POST to save a cookie.");
    }
}

