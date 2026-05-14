package util;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBConnection {

	private static final String URL = System.getenv("DB_URL") != null ? System.getenv("DB_URL") : "jdbc:oracle:thin:@localhost:1521/XEPDB1";
	private static final String USER = System.getenv("DB_USER") != null ? System.getenv("DB_USER") : "your_database_user_here";
	private static final String PASSWORD = System.getenv("DB_PASSWORD") != null ? System.getenv("DB_PASSWORD") : "your_database_password_here";

	public static Connection getConnection() {

		Connection con = null;

		try {

			Class.forName("oracle.jdbc.driver.OracleDriver");

			con = DriverManager.getConnection(URL, USER, PASSWORD);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return con;
	}
}
