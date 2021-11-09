#include <stdio.h>  
#include <conio.h>  
void main()  
{  
    int i, j, rows=3;  
   
    printf("\n");  
    for (i = 1; i <= rows; ++i) // outer loop  
    {  
        for (j = 1; j <= i; ++j) // inner loop  
        {  
            printf ("* "); // print the Star  
        }  
        printf ("\n");   
    }  
    return;     
}  