import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, take } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class RouterCustomService {

    public routerUrl = {
        current: '/',
        last: '/',
    };

    constructor(private router: Router) { }

    public getUrl() {
        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd))
            .subscribe((e: NavigationEnd) => this.updateRouter(e.url));

    }

    private updateRouter(currentUrl: string) {
        this.routerUrl.last = this.routerUrl.current;
        this.routerUrl.current = currentUrl;
    }

}
