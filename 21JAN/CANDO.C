#include<stdio.h>
#include<conio.h>
void main(){
	int boxX = 40, boxY = 20, candyX = 43, candyY = 5, lifeline = 3,
	score = 0, d;

	char ch;
	start:
	clrscr();
	gotoxy(candyX, candyY);
	printf("@");

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
		   case 'x': exit(0);
		   case 'X': exit(0);

		   }//End of switch
	}//End of if

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
	delay(200);
	goto start;
}
