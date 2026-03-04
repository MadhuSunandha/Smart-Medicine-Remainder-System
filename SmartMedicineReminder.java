import java.util.Scanner;

public class SmartMedicineReminder {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        System.out.println("====================================");
        System.out.println("     SMART MEDICINE REMINDER     ");
        System.out.println("====================================\n");

        System.out.print("Enter the number of reminders: ");
        int numReminders = scanner.nextInt();
        scanner.nextLine();

        Reminder[] reminders = new Reminder[numReminders];

        for (int i = 0; i < numReminders; i++) {

            System.out.println("\nEnter details for Reminder " + (i + 1) + ":");

            System.out.print("Enter medicine name: ");
            String medicineName = scanner.nextLine();

            System.out.print("Enter reminder time (hour in 12-hour format): ");
            int hour = scanner.nextInt();

            System.out.print("Enter reminder time (minute, optional - enter -1 to skip): ");
            int minute = scanner.nextInt();
            scanner.nextLine();

            System.out.print("Enter AM or PM: ");
            String period = scanner.nextLine().toUpperCase();

            if (minute == -1) {
                reminders[i] = new Reminder(medicineName, hour, period);
            } else {
                reminders[i] = new Reminder(medicineName, hour, minute, period);
            }
        }

        for (int i = 0; i < numReminders; i++) {

            reminders[i].setReminder();
            reminders[i].triggerAlert();

            if (i < numReminders - 1) {
                System.out.println("\n[INFO] Get ready for your next reminder!\n");
            } else {
                System.out.println("\n[INFO] You are done with your reminders for today! Stay organized!");
            }
        }

        System.out.println("====================================\n");

        scanner.close();
    }
}