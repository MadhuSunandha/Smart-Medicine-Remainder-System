public class Reminder implements ReminderService {

    private String medicineName;
    private int hour;
    private int minute;
    private String period;

    // Constructor Overloading
    public Reminder(String medicineName, int hour, int minute, String period) {
        this.medicineName = medicineName;
        this.hour = hour;
        this.minute = minute;
        this.period = period;
    }

    public Reminder(String medicineName, int hour, String period) {
        this(medicineName, hour, 0, period);
    }

    @Override
    public void setReminder() {
        System.out.println("====================================");
        System.out.println("         REMINDER ALERT         ");
        System.out.println("====================================");
        System.out.println("[INFO] Setting a reminder for: " + medicineName);
        System.out.println("[TIME] Scheduled at: " + hour + ":" 
                + (minute < 10 ? "0" + minute : minute) 
                + " " + period);
        System.out.println("====================================\n");
    }

    @Override
    public void triggerAlert() {
        System.out.println("####################################");
        System.out.println("           ALARM COUNTDOWN          ");
        System.out.println("####################################");
        System.out.println("[ALARM] Reminder will trigger 2 minutes before " 
                + hour + ":" 
                + (minute < 10 ? "0" + minute : minute) 
                + " " + period);

        TimerUtility.countdown(3);

        System.out.println("[ALERT] BEEP BEEP! Time to prepare for " 
                + medicineName 
                + "! (2 minutes remaining)\n");
        System.out.println("####################################\n");
    }
}