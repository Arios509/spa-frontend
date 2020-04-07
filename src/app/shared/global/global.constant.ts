import { HttpHeaders } from '@angular/common/http';

export const environment = {
    production: true,
    API_SERVER: 'http://localhost:3000',
    httpOptions : {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization : 'Bearer ' + localStorage.getItem('ACCESS_TOKEN')
        })
    }
};
