
//Bubble sort

#include<stdio.h>
#include<conio.h>
#define SIZE 5
void main(){
	int arr[SIZE], i, j, temp;
	clrscr();
	for(i = 0; i < SIZE; i++){
		printf("\nEnter the arr[%d]", i);
		scanf("%d", &arr[i]);
	}

	printf("\nUnsorted array is:\n");
	for(i = 0; i < SIZE; i++){
		printf("%d\t", arr[i]);
	}//End


	for(i = 0; i<SIZE; i++){
		for(j = 0; j < SIZE-1; j++){
			if(arr[j] > arr[j+1]){
			temp = arr[j];
			arr[j] = arr[j+1];
			arr[j+1] = temp;
			}//End of if sorting
		}//End of j: sorting

	}//End of i: sorting

	printf("\nSorted array:\n");
	for(i = 0; i < SIZE; i++){
		printf("%d\t", arr[i]);
	}//End of for: sorted array
	getch();

}//End of main