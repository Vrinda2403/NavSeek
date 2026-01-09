from ultralytics import YOLO
import cv2
import time
import pyttsx3

# ======================
# INITIAL SETUP
# ======================

model = YOLO("yolov8n.pt")

engine = pyttsx3.init()
engine.setProperty("rate", 170)

TARGET_CLASSES = {
    0: "person",
    2: "car",
    5: "bus",
    7: "truck"
}

# ======================
# HELPER FUNCTIONS
# ======================

def estimate_distance(y_bottom, h):
    r = y_bottom / h
    if r > 0.7:
        return "NEAR"
    elif r > 0.4:
        return "MEDIUM"
    else:
        return "FAR"

def estimate_direction(xc, w):
    if xc < w / 3:
        return "LEFT"
    elif xc > 2 * w / 3:
        return "RIGHT"
    else:
        return "FRONT"

def get_risk(obj, dist):
    if obj in ["car", "bus", "truck"] and dist == "NEAR":
        return "CRITICAL"
    if obj == "person" and dist == "NEAR":
        return "HIGH"
    return "IGNORE"

def generate_message(e):
    if e["risk"] == "CRITICAL":
        return f"Vehicle very close on your {e['direction'].lower()}"
    if e["risk"] == "HIGH":
        return f"{e['object']} nearby in front"
    return None

# ======================
# MAIN LOOP
# ======================

cap = cv2.VideoCapture(0)

last_spoken_time = 0
last_message = None
COOLDOWN = 4  # seconds (testing-friendly)

print("Blind Assist running. Press 'q' to quit.")

while True:
    ret, frame = cap.read()
    if not ret:
        break

    results = model(frame, conf=0.4, verbose=False)
    events = []

    for box in results[0].boxes:
        cls = int(box.cls[0])
        if cls in TARGET_CLASSES:
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            obj = TARGET_CLASSES[cls]

            dist = estimate_distance(y2, frame.shape[0])
            direction = estimate_direction((x1 + x2) / 2, frame.shape[1])
            risk = get_risk(obj, dist)

            events.append({
                "object": obj,
                "distance": dist,
                "direction": direction,
                "risk": risk
            })

    message = None
    if events:
        events.sort(key=lambda x: ["IGNORE", "HIGH", "CRITICAL"].index(x["risk"]))
        top = events[-1]
        message = generate_message(top)

    now = time.time()

    # 🔊 SPEECH LOGIC (FIXED)
    if message:
        should_speak = False

        if message != last_message:
            should_speak = True
        elif now - last_spoken_time > COOLDOWN:
            should_speak = True

        if should_speak:
            print("SPEAKING:", message)
            engine.say(message)
            engine.runAndWait()
            last_spoken_time = now
            last_message = message

    cv2.imshow("Blind Assist - Live View", frame)

    # ✅ EXIT FIX
    if cv2.waitKey(1) & 0xFF == ord('q'):
        print("Exiting...")
        break

cap.release()
cv2.destroyAllWindows()
