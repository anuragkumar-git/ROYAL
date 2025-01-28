//read and write dynamically


#include<stdio.h>
#include<conio.h>

struct student{
 int sid;
 char name[30];
 float fees;
}s[2];

void create();
void display();

void main(){
clrscr();

FILE *fp;
char fileName[30];
mainMenu:
printf("\n Enter the file name:");
scanf("%s", fileName);
openFile = fopen(fileName, "w");
for(s[i].)

}