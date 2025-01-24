#include<stdio.h>
#include<conio.h>

void main(){
    int candyX = 43, candyY = 3, boxX = 45,  boxY = 13;
    

    clrscr();
    gotoxy(candyX, candyY);
    printf("@");

    gotoxy(boxX, boxY);
    printf("#");
    gotoxy(boxX, boxY + 1);
    printf("#");
    gotoxy(boxX + 7, boxY);
    printf("#");
    gotoxy(boxX + 7, boxY + 1);
    printf("#");
    gotoxy(boxX, boxY + 2);
    printf("########")


}