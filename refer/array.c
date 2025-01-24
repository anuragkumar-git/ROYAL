#include<stdio.h>
#include<conio.h>
#define SIZE 5
#define SIZE2 2
void main(){//function body
	int choice,choiceSD,choiceDD,i,j;
	int arr1[SIZE],arr2[SIZE],arr3[SIZE];
	int arr1D[SIZE2][SIZE2],arr2D[SIZE2][SIZE2],arr3D[SIZE2][SIZE2];
	clrscr();
	mainMenu:
	while(1){
		printf("\n1-----single");
		printf("\n2-----tow dimension");
		printf("\n3-----exit");
		printf("\nenter teh chice");
		scanf("%d",&choice);
		switch(choice){
			case 1:for(i=0;i<SIZE;i++){
					printf("\nEnter the arry arr1[%d]",i);
					scanf("%d",&arr1[i]);
					}
					for(i=0;i<SIZE;i++){
						printf("\nEnter the arry arr2[%d]",i);
						scanf("%d",&arr2[i]);
					}
					while(1){
						clrscr();
						printf("\n1-----Addition of array");
						printf("\n2-----Subtract of array");
						printf("\n3-----Multiolication of array");
						printf("\n4-----Division of array");
						printf("\n5-----sort of array");
						printf("\n6-----search of array");
						printf("\n7-----go to main menu");
						printf("\nEnter the choice");
						scanf("%d",&choiceSD);
						switch(choiceSD){
							case 1:for(i=0;i<SIZE;i++){
									arr3[i]=arr1[i]+arr2[i];
								}
								for(i=0;i<SIZE;i++){
									printf("\n%d + %d = %d",arr1[i],arr2[i],arr3[i]);
								}
								getch();
								break;
							case 2:for(i=0;i<SIZE;i++){
									arr3[i]=arr1[i]-arr2[i];
								}
								for(i=0;i<SIZE;i++){
									printf("\n%d - %d = %d",arr1[i],arr2[i],arr3[i]);
								}
								getch();
								break;
							case 3:for(i=0;i<SIZE;i++){
									arr3[i]=arr1[i]*arr2[i];
								}
								for(i=0;i<SIZE;i++){
									printf("\n%d * %d = %d",arr1[i],arr2[i],arr3[i]);
								}
								getch();
								break;
							case 4:for(i=0;i<SIZE;i++){
									arr3[i]=arr1[i]/arr2[i];
								}
								for(i=0;i<SIZE;i++){
									printf("\n%d / %d = %d",arr1[i],arr2[i],arr3[i]);
								}
								break;
							case 5:printf("\nThis is the sorting case");
								break;
							case 6:printf("\nThis is the searching case");
								break;
							case 7:goto mainMenu;
						}//end while
				}//end swich SD
				break;
			case 2: printf("\n1-----scan the array");
						printf("\n2-----Addition of array");
						printf("\n3-----Subtraction of array");
						printf("\n4-----multiplication of array");
						printf("\n5-----division of array");
						printf("\n6-----sort of array");
						printf("\n7-----search of array");
						printf("\n8-----go to main menu");
						printf("\nEnter the choice");
						scanf("%d",&choiceDD);
						switch(choiceDD){
							case 1:for(i=0;i<SIZE2;i++){
									for(j=0;j<SIZE2;j++){
										printf("\nEnter thr array arr1[%d]",i);
										scanf("d",&arr1D[i][j]);
									}
								}
								for(i=0;i<SIZE2;i++){
									for(j=0;j<SIZE2;j++){
										printf("\nEnter thr array arr1[%d]",i);
										scanf("%d",&arr2D[i][j]);
									}
								}
								break;
							case 2:for(i=0;i<SIZE2;i++){
									for(j=0;j<SIZE2;j++){
										arr3D[i][j]=arr1D[i][j]+arr2D[i][j];
									}
								}
								for(i=0;i<SIZE2;i++){
									for(j=0;j<SIZE2;j++){
										printf("%d\t",arr3D[i][j]);
									}
									printf("\n");
								}
								break;
							case 3:for(i=0;i<SIZE2;i++){
									for(j=0;j<SIZE2;j++){
										arr3D[i][j]=arr1D[i][j]-arr2D[i][j];
									}
								}
								for(i=0;i<SIZE2;i++){
									for(j=0;j<SIZE2;j++){
										printf("%d\t",arr3D[i][j]);
									}
									printf("\n");
								}
								break;
							case 4:for(i=0;i<SIZE2;i++){
									for(j=0;j<SIZE2;j++){
										arr3D[i][j]=arr1D[i][j]*arr2D[i][j];
									}
								}
								for(i=0;i<SIZE2;i++){
									for(j=0;j<SIZE2;j++){
										printf("%d\t",arr3D[i][j]);
									}
									printf("\n");
								}
								break;
							case 5:for(i=0;i<SIZE2;i++){
									for(j=0;j<SIZE2;j++){
										arr3D[i][j]=arr1D[i][j]/arr2D[i][j];
									}
								}
								for(i=0;i<SIZE2;i++){
									for(j=0;j<SIZE2;j++){
										printf("%d\t",arr3D[i][j]);
									}
									printf("\n");
								}
								break;
							case 6:printf("\nThis is the sorting case");
								break;
							case 7:printf("\nThis is the searching case");
								break;
							case 8:goto mainMenu;
						}
						break;
					case 3:exit(0);
		}
			getch();
	}


}
