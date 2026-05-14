
// package src;

import java.sql.*;
import java.util.Scanner;

public class CRUD {

    static final String DB_URL = System.getenv("DB_URL") != null ? System.getenv("DB_URL") : "jdbc:oracle:thin:@localhost:1521/XEPDB1";
    static final String USER = System.getenv("DB_USER") != null ? System.getenv("DB_USER") : "your_database_user_here";
    static final String PASS = System.getenv("DB_PASSWORD") != null ? System.getenv("DB_PASSWORD") : "your_database_password_here";

    public static void main(String[] args) {

        try {

            Connection conn = DriverManager.getConnection(DB_URL, USER, PASS);
            Scanner sc = new Scanner(System.in);

            System.out.println("Connected to Database");

            createTable(conn);

            int choice;

            do {

                System.out.println("\n===== MENU =====");
                System.out.println("1. Insert");
                System.out.println("2. Display");
                System.out.println("3. Update");
                System.out.println("4. Delete");
                System.out.println("5. Exit");

                System.out.print("Enter Choice: ");
                choice = sc.nextInt();

                switch (choice) {

                    case 1:
                        insertStudent(conn, sc);
                        break;

                    case 2:
                        displayStudents(conn);
                        break;

                    case 3:
                        updateStudent(conn, sc);
                        break;

                    case 4:
                        deleteStudent(conn, sc);
                        break;

                    case 5:
                        System.out.println("Exit");
                        break;

                    default:
                        System.out.println("Invalid Choice");
                }

            } while (choice != 5);

            conn.close();
            sc.close();

        } catch (Exception e) {
            System.out.println(e);
        }
    }

    public static void createTable(Connection conn) {

        try {

            String sql = "CREATE TABLE student ("
                    + "name VARCHAR2(50), "
                    + "rollno NUMBER PRIMARY KEY, "
                    + "mark1 NUMBER, "
                    + "mark2 NUMBER, "
                    + "mark3 NUMBER)";

            Statement stmt = conn.createStatement();
            stmt.executeUpdate(sql);

            System.out.println("Table Created");

        } catch (SQLException e) {
            System.out.println("Table Already Exists");
        }
    }

    public static void insertStudent(Connection conn, Scanner sc) {

        try {

            String sql = "INSERT INTO student VALUES (?, ?, ?, ?, ?)";
            PreparedStatement pstmt = conn.prepareStatement(sql);

            sc.nextLine();

            System.out.print("Enter Name: ");
            String name = sc.nextLine();

            System.out.print("Enter Roll No: ");
            int rollno = sc.nextInt();

            System.out.print("Enter Mark1: ");
            int m1 = sc.nextInt();

            System.out.print("Enter Mark2: ");
            int m2 = sc.nextInt();

            System.out.print("Enter Mark3: ");
            int m3 = sc.nextInt();

            pstmt.setString(1, name);
            pstmt.setInt(2, rollno);
            pstmt.setInt(3, m1);
            pstmt.setInt(4, m2);
            pstmt.setInt(5, m3);

            pstmt.executeUpdate();

            System.out.println("Record Inserted");

        } catch (Exception e) {
            System.out.println(e);
        }
    }

    public static void displayStudents(Connection conn) {

        try {

            String sql = "SELECT * FROM student";

            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(sql);

            boolean found = false;

            System.out.println("\n------------------------------------------------");
            System.out.printf("%-20s %-10s %-8s %-8s %-8s\n",
                    "NAME", "ROLLNO", "MARK1", "MARK2", "MARK3");
            System.out.println("------------------------------------------------");

            while (rs.next()) {

                found = true;

                System.out.printf("%-20s %-10d %-8d %-8d %-8d\n",
                        rs.getString("name"),
                        rs.getInt("rollno"),
                        rs.getInt("mark1"),
                        rs.getInt("mark2"),
                        rs.getInt("mark3"));
            }

            if (!found) {
                System.out.println("No Records Found");
            }

            System.out.println("------------------------------------------------");

        } catch (Exception e) {
            System.out.println(e);
        }
    }

    public static void updateStudent(Connection conn, Scanner sc) {

        try {

            String sql = "UPDATE student SET name=?, mark1=?, mark2=?, mark3=? WHERE rollno=?";
            PreparedStatement pstmt = conn.prepareStatement(sql);

            System.out.print("Enter Roll No: ");
            int rollno = sc.nextInt();

            sc.nextLine();

            System.out.print("Enter New Name: ");
            String name = sc.nextLine();

            System.out.print("Enter New Mark1: ");
            int m1 = sc.nextInt();

            System.out.print("Enter New Mark2: ");
            int m2 = sc.nextInt();

            System.out.print("Enter New Mark3: ");
            int m3 = sc.nextInt();

            pstmt.setString(1, name);
            pstmt.setInt(2, m1);
            pstmt.setInt(3, m2);
            pstmt.setInt(4, m3);
            pstmt.setInt(5, rollno);

            int rows = pstmt.executeUpdate();

            if (rows > 0) {
                System.out.println("Record Updated");
            } else {
                System.out.println("Record Not Found");
            }

        } catch (Exception e) {
            System.out.println(e);
        }
    }

    public static void deleteStudent(Connection conn, Scanner sc) {

        try {

            String sql = "DELETE FROM student WHERE rollno=?";
            PreparedStatement pstmt = conn.prepareStatement(sql);

            System.out.print("Enter Roll No: ");
            int rollno = sc.nextInt();

            pstmt.setInt(1, rollno);

            int rows = pstmt.executeUpdate();

            if (rows > 0) {
                System.out.println("Record Deleted");
            } else {
                System.out.println("Record Not Found");
            }

        } catch (Exception e) {
            System.out.println(e);
        }
    }
}