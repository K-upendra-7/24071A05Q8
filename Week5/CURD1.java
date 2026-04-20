package src;

import java.sql.*;
import java.util.Scanner;

public class CURD1 {

    static final String DB_URL = "jdbc:oracle:thin:@localhost:1521/XEPDB1";
    static final String USER = "upendra";
    static final String PASS = "123456";

    public static void main(String[] args) {

        try (
            Connection conn = DriverManager.getConnection(DB_URL, USER, PASS);
            Scanner sc = new Scanner(System.in)
        ) {
            System.out.println("✅ Connected to Oracle Database!");

            // ✅ CHECK + CREATE TABLE
            createTableIfNotExists(conn);

            int choice;
            do {
                System.out.println("\n===== STUDENT CRUD MENU =====");
                System.out.println("1. Insert Student");
                System.out.println("2. Display Students");
                System.out.println("3. Update Student");
                System.out.println("4. Delete Student");
                System.out.println("5. Exit");
                System.out.print("Enter choice: ");

                choice = sc.nextInt();
                sc.nextLine();

                switch (choice) {
                    case 1 -> insertStudent(conn, sc);
                    case 2 -> displayStudents(conn);
                    case 3 -> updateStudent(conn, sc);
                    case 4 -> deleteStudent(conn, sc);
                    case 5 -> System.out.println("👋 Exiting...");
                    default -> System.out.println("❌ Invalid choice!");
                }

            } while (choice != 5);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // ✅ METHOD: CHECK TABLE EXISTENCE USING USER_TABLES
    private static void createTableIfNotExists(Connection conn) {

        String checkSQL = "SELECT COUNT(*) FROM user_tables WHERE table_name = 'STUDENT'";
        String createSQL = "CREATE TABLE student (" +
                           "name VARCHAR2(50), " +
                           "reg_number NUMBER PRIMARY KEY, " +
                           "mark1 NUMBER, " +
                           "mark2 NUMBER, " +
                           "mark3 NUMBER)";

        try (
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(checkSQL)
        ) {
            if (rs.next() && rs.getInt(1) == 0) {
                stmt.executeUpdate(createSQL);
                System.out.println("📦 Table 'student' created.");
            } else {
                System.out.println("ℹ️ Table 'student' already exists.");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // INSERT
    private static void insertStudent(Connection conn, Scanner sc) {
        String sql = "INSERT INTO student VALUES (?, ?, ?, ?, ?)";

        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {

            System.out.print("Enter Name: ");
            String name = sc.nextLine();

            System.out.print("Enter Reg Number: ");
            int regNo = sc.nextInt();

            System.out.print("Enter Mark1: ");
            int m1 = sc.nextInt();

            System.out.print("Enter Mark2: ");
            int m2 = sc.nextInt();

            System.out.print("Enter Mark3: ");
            int m3 = sc.nextInt();
            sc.nextLine();

            pstmt.setString(1, name);
            pstmt.setInt(2, regNo);
            pstmt.setInt(3, m1);
            pstmt.setInt(4, m2);
            pstmt.setInt(5, m3);

            int rows = pstmt.executeUpdate();
            System.out.println("✅ " + rows + " record inserted.");

        } catch (SQLException e) {
            if (e.getErrorCode() == 1) {
                System.out.println("❌ Duplicate Reg Number!");
            } else {
                e.printStackTrace();
            }
        }
    }

    // READ
    private static void displayStudents(Connection conn) {
        String sql = "SELECT * FROM student";

        try (
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(sql)
        ) {
            System.out.println("\n📋 Student Records:");
            System.out.println("--------------------------------");

            boolean found = false;

            while (rs.next()) {
                found = true;
                System.out.println(
                    "Name: " + rs.getString("name") +
                    ", Reg: " + rs.getInt("reg_number") +
                    ", Marks: [" +
                    rs.getInt("mark1") + ", " +
                    rs.getInt("mark2") + ", " +
                    rs.getInt("mark3") + "]"
                );
            }

            if (!found) {
                System.out.println("⚠️ No records found.");
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // UPDATE
    private static void updateStudent(Connection conn, Scanner sc) {
        String sql = "UPDATE student SET name=?, mark1=?, mark2=?, mark3=? WHERE reg_number=?";

        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {

            System.out.print("Enter Reg Number to update: ");
            int regNo = sc.nextInt();
            sc.nextLine();

            System.out.print("Enter New Name: ");
            String name = sc.nextLine();

            System.out.print("Enter New Mark1: ");
            int m1 = sc.nextInt();

            System.out.print("Enter New Mark2: ");
            int m2 = sc.nextInt();

            System.out.print("Enter New Mark3: ");
            int m3 = sc.nextInt();
            sc.nextLine();

            pstmt.setString(1, name);
            pstmt.setInt(2, m1);
            pstmt.setInt(3, m2);
            pstmt.setInt(4, m3);
            pstmt.setInt(5, regNo);

            int rows = pstmt.executeUpdate();

            if (rows > 0)
                System.out.println("✅ Record updated.");
            else
                System.out.println("⚠️ Student not found.");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // DELETE
    private static void deleteStudent(Connection conn, Scanner sc) {
        String sql = "DELETE FROM student WHERE reg_number=?";

        try (PreparedStatement pstmt = conn.prepareStatement(sql)) {

            System.out.print("Enter Reg Number to delete: ");
            int regNo = sc.nextInt();
            sc.nextLine();

            pstmt.setInt(1, regNo);

            int rows = pstmt.executeUpdate();

            if (rows > 0)
                System.out.println("🗑️ Record deleted.");
            else
                System.out.println("⚠️ Student not found.");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}