
#include<stdio.h>
#include<conio.h>
//#define SIZE 2

struct student{
	int sid;
	char name[30];
	float eng, maths, comp, total, per;
	char grade;
}s[10];
int SIZE = 2;

void createStudentDetails();
void displayStudentDetails();
void updateStudentDetails();
void deleteStudentDetails();
void calculateGrade(int);
void displayParticularStudentDetails();
int search(int id);
void main(){
int choice, index, id;
	clrscr();
	while(1){
	clrscr();
	printf("\n1.  Create Student Details");
	printf("\n2.  Display Student Details");
	printf("\n3.  Search Student Details");
	printf("\n4.  Update Student Details");
	printf("\n5.  Delete Student Details");
	printf("\n6.  Exit");
	printf("\nEnter choice:");
	scanf("%d",&choice);
	switch(choice){
		case 1: createStudentDetails();
			break;
		case 2: displayStudentDetails();
			break;
		case 3: printf("\nEnter student id:");
			scanf("%d",&id);
			index=search(id);
			if(index>=0){
				displayParticularStudentDetails(index);
			}else{
				printf("No data found");
			}
			break;
		case 4: printf("\nUpdate student");
			printf("\nEnter student id:");
			scanf("%d", &id);
			index = search(id);
			if(index >= 0){
				updateStudentDetails(index);
			}else{
				printf("No data found");
			}
			break;
		case 5:	printf("\nEnter student id:");
			scanf("%d", &id);
			index = search(id);
			if(index >= 0){
				deleteStudentDetails(index);
			}else{
				printf("No data found");
			}
			break;
		case 6: exit(0);

	}//End of choice
		getch();
	}//End of while
}//End of main

void createStudentDetails(){
	int i;
	float temp;
	for(i=0;i<SIZE;i++){
	printf("\nEnter Student id:");
	scanf("%d",&s[i].sid);
	printf("\nEnter Name:");
	scanf("%s",&s[i].name);
	printf("\nEnter English marks:");
	scanf("%f",&temp);
	s[i].eng=temp;
	printf("\nEnter Maths marks:");
	scanf("%f",&temp);
	s[i].maths=temp;
	printf("\nEnter Computer marks:");
	scanf("%f",&temp);
	s[i].comp=temp;
	calculateGrade(i);
	}//End of For
}//End of Create

void calculateGrade(int i){
	s[i].total=s[i].eng+s[i].maths+s[i].comp;
	s[i].per=s[i].total/3;
	if(s[i].per > 90){
		s[i].grade = 'A';

	}else if(s[i].per > 80){
		s[i].grade = 'B';

	}else{
		s[i].grade = 'C';

	}
}//End of grade

void displayStudentDetails(){
	int i;
	printf("\nid\tName\tTotal\tPer\tGrade");
	for(i=0;i<SIZE;i++){
		printf("\n%d\t%s\t%.2f\t%.2f\t%c", s[i].sid, s[i].name, s[i].total, s[i].per, s[i].grade);
	}//End of for
}//End of display

int search(int id){
	int i;
	for(i=0;i < SIZE;i++){
		if(s[i].sid==id){
		return i;
		}
	}
	return -1;
}
void displayParticularStudentDetails(int i){

		printf("\nid\tName\tTotal\tPer\tGrade");
		printf("\n%d\t%s\t%.2f\t%.2f\t%c", s[i].sid, s[i].name, s[i].total, s[i].per, s[i].grade);

}//End of diplayparticular

void updateStudentDetails(int i){
	float temp;
	printf("Old details:");
	printf("\nid\tName\tTotal\tPer\tGrade");
	printf("\n%d\t%s\t%.2f\t%.2f\t%c\n", s[i].sid, s[i].name, s[i].total, s[i].per, s[i].grade);
	printf("\n\nEnter new details \n");

	printf("\nEnter Student id:");
	scanf("%d",&s[i].sid);
	printf("\nEnter Name:");
	scanf("%s",&s[i].name);
	printf("\nEnter English marks:");
	scanf("%f",&temp);
	s[i].eng=temp;
	printf("\nEnter Maths marks:");
	scanf("%f",&temp);
	s[i].maths=temp;
	printf("\nEnter Computer marks:");
	scanf("%f",&temp);
	s[i].comp=temp;
	calculateGrade(i);
       //	displayParticularStudentDtails();
	printf("\nid\tName\tTotal\tPer\tGrade");
	printf("\n%d\t%s\t%.2f\t%.2f\t%c\n", s[i].sid, s[i].name, s[i].total, s[i].per, s[i].grade);
	}

void deleteStudentDetails(int i){
	int j;
	for(j = i; j < SIZE -1; j++){
		s[j] = s[j + 1];
	}
	SIZE--;
	printf("\nStudent details removed.\n");
}
