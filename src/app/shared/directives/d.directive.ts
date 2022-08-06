import { Directive, ContentChildren, QueryList, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';

import { Observable, merge, BehaviorSubject, Subject, fromEvent } from 'rxjs';
import { mapTo, tap, filter, takeUntil, distinctUntilChanged } from 'rxjs/operators'


@Directive({
    selector: 'wMat-menu-group'
})
export class WMatMenuGroupDirective implements AfterViewInit, OnDestroy {

    @ContentChildren(MatMenuTrigger)
    triggers!: QueryList<MatMenuTrigger>;
    @ContentChildren(MatMenu)
    menus!: QueryList<MatMenu>;

    constructor() { }

    // stop click propagation when clicking on the group.
    @HostListener('click', ['$event'])
    onClick(e: MouseEvent) {
        e.stopPropagation();
    }

    closingStream!: Observable<number>;
    openingStream!: Observable<number>;

    clickSomewhereStream = fromEvent(document, 'click').pipe(
        filter(_ => this.currentlyOpen.value != null),
        distinctUntilChanged(),
        tap(_ => this.closeOldMenu())
    );

    currentlyOpen = new BehaviorSubject<null | number>(null);

    killSub = new Subject<void>();

    ngAfterViewInit() {
        // remove all backDrops
        this.menus.forEach(m => { m.hasBackdrop = false; })

        this.setUpStreams()

        this.testRx()

    }

    setUpStreams() {

        const closings =
            this.triggers.toArray().map((t, idx) => {
                return t.menuClosed.pipe(
                    mapTo(idx),
                    tap(n => this.currentlyOpen.next(null))
                );
            });

        this.closingStream = merge(...closings);

        const openings =
            this.triggers.toArray().map((t, idx) => {
                return t.menuOpened.pipe(
                    mapTo(idx)
                )
            });

        this.openingStream = merge(...openings)
            .pipe(
                tap(n => {
                    this.closeOldMenu();
                    this.currentlyOpen.next(n);

                })
            );
    }

    closeOldMenu() {
        if (this.currentlyOpen.value != null) {
            this.triggers.toArray()[this.currentlyOpen.value as number].closeMenu();
        }
    }

    testRx() {
        merge(this.closingStream, this.openingStream)
            .pipe(takeUntil(this.killSub))
            .subscribe();

        this.clickSomewhereStream
            .pipe(takeUntil(this.killSub))
            .subscribe(_ => {});
    }

    ngOnDestroy() {
        this.killSub.next();
        this.killSub.complete();
    }

}