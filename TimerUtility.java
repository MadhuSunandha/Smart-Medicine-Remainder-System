import java.util.concurrent.TimeUnit;

public class TimerUtility {

    public static void countdown(int seconds) {
        try {
            for (int i = seconds; i > 0; i--) {
                System.out.println("[TIMER] " + i + " seconds remaining...");
                TimeUnit.SECONDS.sleep(1);
            }
        } catch (InterruptedException e) {
            System.out.println("Timer interrupted!");
        }
    }
}