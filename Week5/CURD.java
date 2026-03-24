import java.sql.*;
import java.util.Scanner;

public class CURD {
    public static void main(String[] args) {
        try (Scanner s = new Scanner(System.in); Connection c = DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521/XEPDB1", "upendra","12345")) {
            System.out.println("Connection Established");
            for (int ch = 0; ch != 6;) {
                System.out.print("\n1.Create 2.Read 3.Update 4.Delete 5.Display 6.Exit\nEnter choice: ");
                switch (ch = s.nextInt()) {
                    case 1:
                        System.out.print("Name, Roll, Marks: ");
                        PreparedStatement p1 = c.prepareStatement("INSERT INTO student (name, roll, marks) VALUES (?,?,?)");
                        p1.setString(1, s.next());
                        p1.setInt(2, s.nextInt());
                        p1.setInt(3, s.nextInt());
                        p1.executeUpdate();
                        System.out.println("Inserted!");
                        break;
                    case 2:
                        System.out.print("Enter Roll to Read: ");
                        PreparedStatement p2 = c.prepareStatement("SELECT * FROM student WHERE roll=?");
                        p2.setInt(1, s.nextInt());
                        ResultSet rs2 = p2.executeQuery();
                        if (rs2.next())
                            System.out.println("Name: " + rs2.getString("name") + ", Roll: " + rs2.getInt("roll")
                                    + ", Marks: " + rs2.getInt("marks"));
                        else
                            System.out.println("Not Found!");
                        break;
                    case 3:
                        System.out.print("Enter Roll then New Marks: ");
                        PreparedStatement p3 = c.prepareStatement("UPDATE student SET marks=? WHERE roll=?");
                        int r = s.nextInt();
                        p3.setInt(1, s.nextInt());
                        p3.setInt(2, r);
                        p3.executeUpdate();
                        System.out.println("Updated!");
                        break;
                    case 4:
                        System.out.print("Enter Roll to delete: ");
                        PreparedStatement p4 = c.prepareStatement("DELETE FROM student WHERE roll=?");
                        p4.setInt(1, s.nextInt());
                        p4.executeUpdate();
                        System.out.println("Deleted!");
                        break;
                    case 5:
                        ResultSet rs = c.createStatement().executeQuery("SELECT * FROM student");
                        while (rs.next())
                            System.out.println("Name: " + rs.getString("name") + ", Roll: " + rs.getInt("roll")
                                    + ", Marks: " + rs.getInt("marks"));
                        break;
                    case 6:
                        System.out.println("Exiting...");
                        break;
                }
            }
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
