package controller;

import dao.UserDAO;
import model.User;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/register")
public class RegisterServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request,
                          HttpServletResponse response)
            throws IOException {

        User user = new User();

        user.setName(request.getParameter("name"));
        user.setEmail(request.getParameter("email"));
        user.setPassword(request.getParameter("password"));

        UserDAO dao = new UserDAO();

        // ❌ NEVER print messages from servlet
        if (dao.register(user)) {

            // ✅ SUCCESS → go to login with message
            response.sendRedirect(
                request.getContextPath() + "/login.jsp?registered=1"
            );

        } else {

            // ❌ FAILURE → go back to register with error
            response.sendRedirect(
                request.getContextPath() + "/register.jsp?error=1"
            );
        }
    }
}
