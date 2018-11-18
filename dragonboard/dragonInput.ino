const int buttonIncr = 4;
const int buttonDecr = A0;
const int good = 5;
const int bad = 6;

int pressedIncr;
int pressedDecr;
int lastIncr;
int lastDecr;
char confirm;

void setup() {
    pinMode(buttonIncr, INPUT);
    pinMode(buttonDecr, INPUT);
	pinMode(good, OUTPUT);
	pinMode(bad, OUTPUT);
    Serial.begin(115200);
    Serial.println("waiting");
}

void loop() {
    pressedIncr = digitalRead(buttonIncr);
	pressedDecr = digitalRead(buttonDecr);
	
	// compare the buttonState to its previous state
	if (pressedIncr != lastIncr) {
		// if the state has changed, increment the counter
		if (pressedIncr == HIGH) {
			// if the current state is HIGH then the button went from off to on:
			Serial.println("increment");
			confirm = Serial.readString()[0];
			if (confirm == 'g') {
				analogWrite(good, HIGH);
			} else if (confirm == 'b') {
				analogWrite(bad, HIGH);
			}
		}
		// Delay a little bit to avoid bouncing
		delay(250);
		analogWrite(good, LOW);
		analogWrite(bad, LOW);
	}
	// save the current state as the last state, for next time through the loop
	lastIncr = pressedIncr;
	
	// compare the buttonState to its previous state
	if (pressedDecr != lastDecr) {
		// if the state has changed, increment the counter
		if (pressedDecr == HIGH) {
			// if the current state is HIGH then the button went from off to on:
			Serial.println("decrement");
			confirm = Serial.readString()[0];
			if (confirm == 'g') {
				analogWrite(good, HIGH);
			} else if (confirm == 'b'){
				analogWrite(bad, HIGH);
			}
		}
		// Delay a little bit to avoid bouncing
		delay(250);
		analogWrite(good, LOW);
		analogWrite(bad, LOW);
	}
	// save the current state as the last state, for next time through the loop
	lastDecr = pressedDecr;	
}
