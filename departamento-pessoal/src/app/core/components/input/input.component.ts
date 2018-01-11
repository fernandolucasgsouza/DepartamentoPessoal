import { Component, OnInit, Input, forwardRef, ElementRef, Renderer2, } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';



// export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
//     provide: NG_VALUE_ACCESSOR,
//     useExisting: forwardRef(() => InputComponent),
//     multi: true
// };

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

    private _onChanged;
    private _onTouched;

    constructor( private _elRef: ElementRef, private _renderer: Renderer2) { }

    ngOnInit() { }


    writeValue(value: any): void {
        this._renderer.setProperty(this._elRef.nativeElement, 'value', value);

    }
    registerOnChange(fn: (_: any) => void): void {
        this._onChanged = fn;
    }
    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        this._renderer.setProperty(this._elRef.nativeElement,'disabled',isDisabled)
    }


    onKeyup(event){
        this.writeValue(event.target.value);
    }
    onBlur(event) {
        this._onTouched(event.target.value);
   }
    onChange(event) {
         this._onChanged(event.target.value);
    }
}
