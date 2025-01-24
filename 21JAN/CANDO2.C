
#include<stdio.h>
#include<conio.h>
void main(){
	int boxX = 40, boxY = 20, candyX = 43, candyY = 5,candyX1 = 42, candyY1 = 5, lifeline = 3,
	score = 0, d;

	char ch;
	start:
	clrscr();
	textcolor(GREEN);
	gotoxy(candyX, candyY);
	cprintf("@");
	gotoxy(candyX1, candyY1);
	cprintf("@");

	gotoxy(boxX, boxY);
	printf("#");
	gotoxy(boxX+7, boxY);
	printf("#");
	gotoxy(boxX, boxY + 1);
	printf("#");
	gotoxy(boxX + 7, boxY+1);
	printf("#");
	gotoxy(boxX, boxY +2 );
	printf("########");
	gotoxy(69,2);
	printf("Lifeline = %d", lifeline);
	gotoxy(69,3);
	printf("Score = %d", score);

	if(kbhit()){
		ch = getch();
		switch(ch){
		   case 'A':if(boxX > 1){
				boxX--;
				}
			break;
		   case 'a': if(boxX >1){
			boxX--;
			}
			break;
		   case 'D':if(boxX < 73){
			 boxX++;
			 }
			 break;
		   case 'd':if(boxX < 73){
			boxX++;
			}
			break;

		  /* case 'w':if(boxY > 5){
			boxY--;
			}
			break;
		   case 'W':if(boxY > 5){
			boxY--;
			}
			break;
		   case 's':if(boxY < 22){
			boxY++;
			}
			break;
		   case 'S':if(boxY < 22){
			boxY++;
			}
			break; */
		   case 'x': exit(0);
		   case 'X': exit(0);

				}
	}


	if(candyY == 25){
		lifeline--;
		}
	if(lifeline == 0){
		gotoxy(boxX,boxY);
		printf("GAME OVER");
		}

	candyY++;
	if(candyY == 21){
		d = candyX - boxX;
		if(d >= 1 && d <= 6){
		score++;
		}
		else{
			lifeline--;
			if(lifeline == 0){
				clrscr();
				gotoxy(38, 10);
				textcolor(RED);
				cprintf("GAME OVER");
				getch();
				exit(0);
				}
			}
			candyY = 1;
			candyX = rand()%80+1;
		}

	candyY1++;
	if(candyY1 == 21){
		d = candyY1 - boxX;
		if(d > 1 && d < 6){
			score++;
			}
		else{
		lifeline--;

		if(lifeline == 0 ){
			gotoxy(38, 10);
			textcolor(RED);
			cprintf("GAME OVER");
			getch();
			exit(0);
		}
		}
		candyY1 = 1;
		candyX1 = rand()%80+1;
		}
	delay(200);
	/*if(score >= 2 && lifeline > 0){
	start2:
	gotoxy(candyX, candyY);
	printf("@");
	gotoxy(candyX1, candyY1);
	printf("@");

	}     */
	goto start;

}
