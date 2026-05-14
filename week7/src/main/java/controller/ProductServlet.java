package controller;

import dao.ProductDAO;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

import java.io.IOException;

@WebServlet("/products")
public class ProductServlet extends HttpServlet {

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		ProductDAO dao = new ProductDAO();

		request.setAttribute("products", dao.getAllProducts());

		RequestDispatcher rd = request.getRequestDispatcher("catalog.jsp");

		rd.forward(request, response);
	}
}
