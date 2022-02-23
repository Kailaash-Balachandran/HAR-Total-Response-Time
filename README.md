An ease-to-use script to get the total response time from .HAR files for Web page Performance Analysis. 

Clone the repo
1. ```npm install```
2. Copy .HAR files inside ./harFiles dir (you can more than file - better for benchmark comparisons)
3. Run ```node calculateTRT.js```

Console logs the total response time in the format
```{file_name} : {total_response_time_in_HH:MM:SS}```
