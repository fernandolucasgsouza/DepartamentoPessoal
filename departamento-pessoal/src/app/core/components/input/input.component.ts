import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormControlName } from '@angular/forms';
import { ControlValueAccessor } from '@angular/forms';
import { ElementRef } from '@angular/core';

@Component({
    selector: 'fs-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, ControlValueAccessor {
    @Input() label: string;
    @Input() id: string;
    @Input() type: string;
    @Input() placeholder: string;
    @Input() control: FormControl;

    constructor(private _elRef: ElementRef) { }

    ngOnInit() {
    }

    writeValue(obj: any): void {
        debugger
        console.log(obj)
    }
    registerOnChange(fn: any): void {
        debugger
        console.log(fn)
    }
    registerOnTouched(fn: any): void {
        debugger
        console.log(fn)
    }
    setDisabledState?(isDisabled: boolean): void {
        throw new Error("Method not implemented.");
    }

}
