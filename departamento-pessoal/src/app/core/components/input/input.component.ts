import { Component, OnInit, Input, forwardRef, ElementRef, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlName,ControlValueAccessor } from '@angular/forms';


@Component({
    selector: 'fs-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true
        }]
})

export class InputComponent implements OnInit, ControlValueAccessor {

    @Input() label: string;
    @Input() id: string;
    @Input() type: string;
    @Input() placeholder: string;
    @Input() control: FormControl;
    @Input() controlGroup: FormGroup;

    public onChanged;
    public onTouched;

    constructor( private _elRef: ElementRef, private _renderer: Renderer2) { }

    ngOnInit() {

        // console.log(this.control)
        // console.log(this.item)
        // console.log(this.controlGroup)
    }
    writeValue(value: any): void {
        this._renderer.setProperty(this._elRef.nativeElement, 'value', value);
    }
    registerOnChange(fn: (_: any) => void): void {
        this.onChanged = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        this._renderer.setProperty(this._elRef.nativeElement,'disabled',isDisabled)
    }


   onChange(event) {
         this.onChange(event.target.value);
         console.log(event.target.value)
    }
}
