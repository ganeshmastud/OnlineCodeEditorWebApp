#include <stdio.h>  
#include <conio.h>  
int main()  
{  
    int i, j, rows=3; 
    printf("\n");  
    for (i = rows; i > 0; i--) // define the outer loop  
    {  
        for (j = i; j > 0; j--) // define the inner loop  
        {  
            printf ("* "); // print the Star  
        }  
        printf ("\n");   
    }  
    return 0;      
}