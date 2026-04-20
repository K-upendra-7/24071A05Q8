package com.week8;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");
        
        // 1. Get the session (creates a new one if it doesn't exist)
        HttpSession session = request.getSession();
        
        // 2. Store user data in the session
        session.setAttribute("user", username);
        
        response.getWriter().println("Welcome, " + username + "! Session created.");
        response.getWriter().println("<br><a href='ProfileServlet'>Go to Profile</a>");
    }
    
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.getWriter().println("Please submit a form using POST to login.");
    }

}
