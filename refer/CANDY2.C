#include <stdio.h>
#include <conio.h>


void main() {
    int boxX = 40, boxY = 20, candyX1 = 40, candyY1 = 3, candyX2, candyY2;
    int score = 0, life = 5, d1, d2;
    char ch;
    int candyFallDelay = 200; // delay for candy falling
    int boxMoveDelay = 10;    // delay for box movement (to prevent CPU overload)

    int candyFallCounter = 0;
    int spawnSecondCandy = 0;

    textbackground(BLACK);

    while (1) {
	clrscr();
	gotoxy(60, 1);
	cprintf("SCORE=%d", score);
	gotoxy(60, 2);
	cprintf("Lifeline=%d", life);

	// First candy
	gotoxy(candyX1, candyY1);
	textcolor(YELLOW);
	cprintf("0");

	// Second candy
	if (spawnSecondCandy) {
	    gotoxy(candyX2, candyY2);
	    textcolor(YELLOW);
	    cprintf("0");
	}

	// Box
	gotoxy(boxX, boxY);
	cprintf("#");
	gotoxy(boxX + 7, boxY);
	cprintf("#");
	gotoxy(boxX, boxY + 1);
	cprintf("########");

	// Box movement
	if (kbhit()) {
	    ch = getch();
	    switch (ch) {
		case 'A':
		case 'a':
		    if (boxX > 1) {
			boxX--;
		    }
		    break;
		case 'D':
		case 'd':
		    if (boxX < 73) {
			boxX++;
		    }
		    break;
		case 'X':
		case 'x':
		    exit(0);
	    }
	}

	// Candy falling delay
	candyFallCounter++;
	if (candyFallCounter >= candyFallDelay / 10) {
	    candyY1++;
	    candyFallCounter = 0;

	    // Spawn the second candy if the first candy has crossed half the screen
	    if (!spawnSecondCandy && candyY1 >= 10) {
		spawnSecondCandy = 1;
		candyX2 = rand() % 73 + 1; // X position for candy 2
		candyY2 = 1;               // Start candy 2
	    }

	    // Move the second candy
	    if (spawnSecondCandy) {
		candyY2++;
	    }

	    // Check if candy 1 dropped in the box
	    if (candyY1 == boxY) {
		d1 = candyX1 - boxX;
		if (d1 >= 1 && d1 <= 6) {
		    score++;  // Score increases if candy drops in the box
		    sound(1000); // Sound for successful drop
		    delay(50);
		    nosound();
		} else {
		    life--;  // Candy missed
		    sound(500); // Sound for missed drop
		    delay(50);
		    nosound();
		}
		candyY1 = 1;  // Reset candy after it reaches bottom
		candyX1 = rand() % 73 + 1; // Spawn new candy at random position
	    }

	    // Check if candy 2 dropped in the box
	    if (spawnSecondCandy && candyY2 == boxY) {
		d2 = candyX2 - boxX;
		if (d2 >= 1 && d2 <= 6) {
		    score++;
		    sound(1000); // Sound for successful drop
		    delay(50);
		    nosound();
		} else {
		    life--;
		    sound(500); // Sound for missed drop
		    delay(50);
		    nosound();
		}
		candyY2 = 1;
		candyX2 = rand() % 73 + 1;
	    }

	    // Respawn new candy if previous one reaches the bottom
	    if (candyY1 >= 20) {
		candyY1 = 1;
		candyX1 = rand() % 73 + 1;
	    }

	    if (spawnSecondCandy && candyY2 >= 20) {
		candyY2 = 1;
		candyX2 = rand() % 73 + 1;
	    }
	}

	// Game Over if lives are 0
	if (life == 0) {
	    clrscr();
	    gotoxy(40, 13);
	    textcolor(RED);
	    cprintf("GAME IS OVER");
	    getch();
	    exit(0);
	}
	delay(boxMoveDelay);
    }
}