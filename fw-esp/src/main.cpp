#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <Servo.h>
#include <Ultrasonic.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>
#include "soc/soc.h"
#include "soc/rtc_cntl_reg.h"

const char* ssid = "SEU_SSID";
const char* password =  "SEU_PASSWORD";
const char* mqttServer = "IP_BROKER_MQTT";
const int mqttPort = 1883;

Ultrasonic ultrasonic1(16, 17);
Servo servo = Servo();
WiFiClient espClient;
PubSubClient client(espClient);

const int beginOpenned = 32;
const int beginClosed = 33;

const int endOpenned = 26;
const int endClosed = 25;

const int echo = 17;
const int trigger = 16;

const int beginServo = 27; // 110 - encostada , 190 - levantada
const int endServo = 12;

const int buttonPin = 35;
#define SOUND_SPEED 0.034
#define CM_TO_INCH 0.393701

const int truckWeight = 10000;

void handleFirstWeighing(String weighing_id, int load_weight, String status) {
  digitalWrite(beginOpenned, 1);
  digitalWrite(beginClosed, 0);
  servo.write(beginServo, 25);

  double distanceCm = ultrasonic1.read(CM);
  int count = 0;
  while(count < 10){
    distanceCm = ultrasonic1.read(CM);
    Serial.println(distanceCm);
    if (distanceCm <= 7 && distanceCm > 0) {
      count++;
    }else if (distanceCm > 7) {
      count = 0;
    }
  }
  sleep(1);

  digitalWrite(beginOpenned, 0);
  digitalWrite(beginClosed, 1);
  servo.write(beginServo, 99);

  DynamicJsonDocument docToSend(JSON_OBJECT_SIZE(3));
  docToSend["measuredWeight"] = truckWeight + load_weight;

  String json;
  serializeJson(docToSend, json);
  Serial.println(json);

  HTTPClient http;
  int httpCode = NULL; 
  http.begin("https://q6gr2ekf53wriaeri-projetos-faculdade.svc-us.zcloud.ws/save_full_load_weight/" + weighing_id);
  http.addHeader("Content-Type", "application/json"); 

  httpCode = http.POST(json);
  if (httpCode > 0) {
    if (httpCode != HTTP_CODE_OK) {
      Serial.printf("[HTTP] POST... code: %d\n", httpCode);
    }
  } else {
    Serial.printf("[HTTP] POST... failed, error: %s\n", http.errorToString(httpCode).c_str());
  }
 

  String payload = http.getString();
  Serial.println(payload);
  Serial.println();
  http.end();

  DynamicJsonDocument resp(JSON_OBJECT_SIZE(4));
  deserializeJson(resp, payload);  
  serializeJsonPretty(resp, Serial);
  Serial.println();
  if (httpCode != HTTP_CODE_OK || (bool) resp["allowed"] != true) {
    bool buttonState = false;
    int count = 0;
    while (!buttonState){
      buttonState = digitalRead(buttonPin);
      if (count > 300){
        digitalWrite(endClosed, 1);
        digitalWrite(beginClosed, 1);
        if (count == 600) count = 0;
      } else {
        digitalWrite(endClosed, 0);
        digitalWrite(beginClosed, 0);
      }
      count++;
      Serial.println(httpCode);
      Serial.println(json);
      Serial.println(status);
      serializeJsonPretty(resp, Serial);
    }
    digitalWrite(endClosed, 1);
    digitalWrite(beginClosed, 1);
  }

  sleep(1);
  digitalWrite(endOpenned, 1);
  digitalWrite(endClosed, 0);
  servo.write(endServo, 260);

  count = 0;
  while(count < 10){
    distanceCm = ultrasonic1.read(CM);
    Serial.println(distanceCm);
    if (distanceCm > 12) {
      count++;
    }else if (distanceCm > 0) {
      count = 0;
    }
  }

  sleep(3);

  digitalWrite(endOpenned, 0);
  digitalWrite(endClosed, 1);
  servo.write(endServo, 115);

}

void handleSecondWeighing(String weighing_id, int load_weight, String status) {
  digitalWrite(endOpenned, 1);
  digitalWrite(endClosed, 0);
  servo.write(endServo, 260);

  double distanceCm = ultrasonic1.read(CM);
  int count = 0;
  while(count < 20){
    distanceCm = ultrasonic1.read(CM);
    Serial.println(distanceCm);
    if (distanceCm <= 7 && distanceCm > 0) {
      count++;
    }else if (distanceCm > 7) {
      count = 0;
    }
  }
  sleep(1);

  digitalWrite(endOpenned, 0);
  digitalWrite(endClosed, 1);
  servo.write(endServo, 115);

  DynamicJsonDocument docToSend(JSON_OBJECT_SIZE(3));
  docToSend["measuredUnloadWeight"] = truckWeight;

  String json;
  serializeJson(docToSend, json);
  Serial.println(json);

  HTTPClient http;
  int httpCode = NULL;
  http.begin("https://q6gr2ekf53wriaeri-projetos-faculdade.svc-us.zcloud.ws/verify_weight/" + weighing_id);
  http.addHeader("Content-Type", "application/json"); 

  for(int i = 0; i < 5; i++) {
    httpCode = http.POST(json);
    if (httpCode > 0) {
      if (httpCode != HTTP_CODE_OK) {
        Serial.printf("[HTTP] POST... code: %d\n", httpCode);
      } else {
        break;
      }
    } else {
      Serial.printf("[HTTP] POST... failed, error: %s\n", http.errorToString(httpCode).c_str());
    }
  }

  String payload = http.getString();
  Serial.println(payload);
  Serial.println();
  http.end();

  DynamicJsonDocument resp(JSON_OBJECT_SIZE(4));
  deserializeJson(resp, payload);  
  serializeJsonPretty(resp, Serial);
  Serial.println();
  if (httpCode != HTTP_CODE_OK || (bool) resp["allowed"] != true) {
    bool buttonState = false;
    int count = 0;
    while (!buttonState){
      buttonState = digitalRead(buttonPin);
      if (count > 300){
        digitalWrite(endClosed, 1);
        digitalWrite(beginClosed, 1);
        if (count == 600) count = 0;
      } else {
        digitalWrite(endClosed, 0);
        digitalWrite(beginClosed, 0);
      }
      count++;
      Serial.println(httpCode);
      Serial.println(json);
      Serial.println(status);
      serializeJsonPretty(resp, Serial);
    }
    digitalWrite(endClosed, 1);
    digitalWrite(beginClosed, 1);
  }

  sleep(1);

  digitalWrite(beginOpenned, 1);
  digitalWrite(beginClosed, 0);
  servo.write(beginServo, 25);

  count = 0;
  while(count < 20){
    distanceCm = ultrasonic1.read(CM);
    Serial.println(distanceCm);
    if (distanceCm > 12) {
      count++;
    }else if (distanceCm > 0) {
      count = 0;
    }
  }
  
  if (status == "WAITING_WEIGHT_CONFIRMATION") {
    http.begin("https://q6gr2ekf53wriaeri-projetos-faculdade.svc-us.zcloud.ws/finalize/weighing/" + weighing_id);

    for(int i = 0; i < 5; i++) {
      httpCode = http.PUT("");
      if (httpCode > 0) {
        if (httpCode != HTTP_CODE_OK) {
          Serial.printf("[HTTP] PUT... code: %d\n", httpCode);
        } else {
          Serial.println("SAIDA LIBERADA");
          break;
        }
      } else {
        Serial.printf("[HTTP] PUT... failed, error: %s\n", http.errorToString(httpCode).c_str());
      }
    }

    http.end();
  }


  sleep(2);
  digitalWrite(beginOpenned, 0);
  digitalWrite(beginClosed, 1);
  servo.write(beginServo, 99);
	
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.println("Iniciando Callback");
  DynamicJsonDocument doc(length);
  deserializeJson(doc, payload);  
  serializeJsonPretty(doc, Serial);

  const char* weighing_id =  doc["weighing_id"];
  const char* status =  doc["status"];
  const int load_weight = doc["load_weight"];

  if((bool) doc["allowed"] == true){
    if (String(status) == "PENDING") {
      handleFirstWeighing(weighing_id, load_weight, status); 

    } else {
      handleSecondWeighing(weighing_id, load_weight, status);
    }
    ESP.restart();
  }
  return;
}

long lastReconnectAttempt = 0;

boolean reconnect() {
  return client.connect("ESP-NODE");
}

void setup() {
  Serial.begin(115200);
  
  pinMode(beginOpenned, OUTPUT);
  pinMode(beginClosed, OUTPUT);
  pinMode(endOpenned, OUTPUT);
  pinMode(endClosed, OUTPUT);
  pinMode(trigger, OUTPUT);
  pinMode(echo, INPUT);
  pinMode(buttonPin, INPUT);

  servo.write(beginServo, 99);
  servo.write(endServo, 115);
  digitalWrite(beginOpenned, 0);
  digitalWrite(beginClosed, 1);
  digitalWrite(endOpenned, 0);
  digitalWrite(endClosed, 1);

  WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi..");
  }
  Serial.println("Connected to the WiFi network");
  client.setServer(mqttServer, mqttPort);
  client.setCallback(callback);
  while (!client.connected()) {

    Serial.println("Connecting to MQTT...");
 
    if (client.connect("ESP-NODE")) {
 
      Serial.println("connected");  
 
    } else {
 
      Serial.print("failed with state ");
      Serial.print(client.state());
      delay(2000);
 
    }
    delay(2000);
  }
 
  client.subscribe("status");

}

void loop() {
  while (!client.connected()) {

    Serial.println("Connecting to MQTT...");
 
    if (client.connect("ESP-NODE")) {
 
      Serial.println("connected");  
 
    } else {
 
      Serial.print("failed with state ");
      Serial.print(client.state());
      delay(2000);
 
    }
  }
  // Client connected
  client.loop();
  delay(100);

}

