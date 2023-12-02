import os
os.environ["OPENCV_LOG_LEVEL"]="SILENT"
from ultralytics import YOLO
import cv2
from util import read_license_plate
import paho.mqtt.client as paho
import datetime
import json
import urllib

BROKER = "BROKER_IP"
PORT = 1883

try:
    client = paho.Client("ESP-CAM")
    client.connect(BROKER, PORT)
    client.loop_start()
except:
    exit()


# load model
license_plate_detector = YOLO('./model.pt')

# read frames
ret = True
last_plate = ""
count = 0
last_sent_payload_time = None
while ret:
    cam = cv2.VideoCapture(0)
    ret, frame = cam.read()
    if ret:
        # detect license plates
        license_plates = license_plate_detector(frame)[0]
        plates = license_plates.boxes.data.tolist()
        if len(plates):
            x1, y1, x2, y2, score, class_id = plates[0]
            x1 = int(x1)
            y1 = int(y1)
            x2 = int(x2) + 30
            y2 = int(y2)

            # crop license plate
            license_plate_crop = frame[y1:y2, x1:x2, :]

            # process license plate
            license_plate_crop_gray = cv2.cvtColor(license_plate_crop, cv2.COLOR_BGR2GRAY)
            _, license_plate_crop_thresh = cv2.threshold(license_plate_crop_gray, 120, 255, cv2.THRESH_BINARY_INV)
            cv2.imshow("Plate",license_plate_crop_thresh)

            # read license plate number
            license_plate_text, license_plate_text_score = read_license_plate(license_plate_crop_thresh)

            # draw license plate box
            cv2.rectangle(frame, (x1, y1),(x2, y2),(0,0,255),3)

            # checking whether the identified plate can have access to weighing. If so, send a command to the esp to open the gate
            if license_plate_text is not None:
                if last_plate == license_plate_text:
                    count += 1
                    currentTime = datetime.datetime.now()
                    allow = True
                    if last_sent_payload_time:
                        diffTime = (currentTime - last_sent_payload_time).total_seconds()
                        if diffTime < 10:
                            allow = False
                            count = 0

                    req = urllib.request.Request('https://q6gr2ekf53wriaeri-projetos-faculdade.svc-us.zcloud.ws/verify-plate/' + license_plate_text, method="GET")
                    response = urllib.request.urlopen(req)
                    respData = json.loads(response.read())

                    weighing_id = respData.get("weighing_id", None)
                    load_weight = respData.get("load_weight", None)
                    status = respData.get("status", None)

                    if not respData.get("allowed", None):
                        allow = False

                    if (count >= 1 and allow): 
                        client.publish("status",  json.dumps({"allowed": True, "weighing_id": weighing_id, "load_weight": int(load_weight), "status": status}))
                        count = 0
                        last_sent_payload_time = datetime.datetime.now()
                else:
                    count = 0
                last_plate = license_plate_text


            h,w,c = frame.shape
            frame = cv2.putText(frame, last_plate, (20, h-100), cv2.FONT_HERSHEY_SIMPLEX, 
                1, (0, 0, 255), 2, cv2.LINE_AA)

    cv2.imshow("OpenCV",frame)

    key = cv2.waitKey(5)
    if key == ord('q'):
        break
 
cv2.destroyAllWindows()