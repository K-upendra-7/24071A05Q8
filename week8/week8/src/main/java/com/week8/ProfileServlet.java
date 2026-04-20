package com.week8;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;



@WebServlet("/ProfileServlet")
public class ProfileServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 1. Get the existing session (pass 'false' so it doesn't create a new one if none exists)
        HttpSession session = request.getSession(false);
        
        if (session != null && session.getAttribute("user") != null) {
            String username = (String) session.getAttribute("user");
            response.getWriter().println("Hello again, " + username);
        } else {
            response.getWriter().println("Please login first.");
        }

    }
}
