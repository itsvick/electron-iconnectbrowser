import { AbstractControl, Validators } from '@angular/forms';
import { AbstractStateComponent } from './abstract-state';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@api/services/auth.service';

export abstract class AbstractBaseComponent extends AbstractStateComponent {
    location: Location;

    constructor(http?: HttpClient) { 
        super(http);
    }

    public readonly emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    public readonly webRegex = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    public readonly mobileRegex = /^([0-9]\d{1,14})$/;
    public readonly codeRegex = /^(\+?\d{1,3}|\d{1,4})$/;
    // public readonly incomeRegex = "/([m|b|t|])/i";

    public readonly requiredEmailValidators = [Validators.pattern(this.emailRegex), Validators.required];
    public readonly requiredMobileValidators = [Validators.pattern(this.mobileRegex), Validators.required];

    public readonly validationErrors = {
        required: (params) => (this.isVowel(params.label[0]) ?
            (params.type === 'select' ? 'Please select an ' : 'Please enter an ') :
            (params.type === 'select' ? 'Please select a ' : 'Please enter a ')) + params.label,

        emailpattern: () => 'This email is invalid, please try again',
        taken: (label) => 'This ' + label + ' already exists, please provide another ' + label,
        emailTaken: 'A user is already registerd with this email address, please choose another email address',
        nameTaken: (label) => 'This ' + label + ' already exists, please provide another ' + label + '.',
        notFound: (label) => 'This ' + label + ' was not found, please enter correct ' + label + '.',

        passwordMismatch: () => 'Passwords do not match',
        numberRequired: () => 'Password must contain at least 2 numbers',
        specialRequired: () => 'Password must contain at least 2 special characters',
        uppercaseRequired: () => 'Password must contain at least 2 uppercase letters',
        lowercaseRequired: () => 'Password must contain at least 2 lowercase letters',

        notValidEmailAddress: 'Email address is not valid',
        matDatepickerMin: () => 'End date must be after start date',
        campaignDateMin: () => 'The end date needs to be at least 2 days after the start date',
        campaignTimeMin: () => 'The end time needs to be at least 48 hours after the start time',
        invalidMobile: () => 'This mobile number is invalid',
        pattern: () => 'This mobile number is invalid, please try again',
        codepattern: () => 'Invalid country code',
        numberLimit: (min, max) => `Please enter a value between ${min} - ${max}`,
        minLength: (min) => `Please enter a value of at least ${min} characters`,
        maxLength: (max) => `Please enter a value of ${max} characters or less`,
    };

    public isVowel(c) {
        return ['a', 'e', 'i', 'o', 'u'].indexOf(c.toLowerCase()) !== -1;
    }

    getValidationErrorMessage(control: AbstractControl, label: string, type?: string, modelName?: string, min?: number, max?: number) {
        if (control.hasError('required') && type === 'custom') { return label; }
        if (control.hasError('required')) { return this.validationErrors.required({ type, label }); }
        if (control.hasError('taken')) { return this.validationErrors.taken(label); }
        if (control.hasError('nameTaken')) { return this.validationErrors.nameTaken(label); }
        if (control.hasError('notFound')) { return this.validationErrors.notFound(label); }
        if (control.hasError('uppercaseRequired')) { return this.validationErrors.uppercaseRequired(); }
        if (control.hasError('lowercaseRequired')) { return this.validationErrors.lowercaseRequired(); }
        if (control.hasError('lowercaseRequired')) { return this.validationErrors.lowercaseRequired(); }
        if (control.hasError('numberRequired')) { return this.validationErrors.numberRequired(); }
        if (control.hasError('specialRequired')) { return this.validationErrors.specialRequired(); }
        if (control.hasError('passwordMismatch')) { return this.validationErrors.passwordMismatch(); }
        if (control.hasError('emailTaken')) { return this.validationErrors.emailTaken; }
        if (control.hasError('notValidEmailAddress')) { return this.validationErrors.notValidEmailAddress; }
        if (control.hasError('nameTaken')) { return this.validationErrors.nameTaken; }
        if (control.hasError('matDatepickerMin') && modelName === 'campaign') { return this.validationErrors.campaignDateMin(); }
        if (control.hasError('matDatepickerMin')) { return this.validationErrors.matDatepickerMin(); }
        if (control.hasError('pattern') && modelName === 'mobile') { return this.validationErrors.invalidMobile(); }
        if (control.hasError('pattern') && modelName === 'countryCode') { return this.validationErrors.codepattern(); }
        if (control.hasError('pattern') && modelName === 'email') { return this.validationErrors.emailpattern(); }
        if (control.hasError('invalidMobile')) { return this.validationErrors.invalidMobile(); }
        if (control.hasError('min') || control.hasError('max')) { return this.validationErrors.numberLimit(min, max); }
        if (control.hasError('invalidDate') && modelName === 'campaign') { return this.validationErrors.campaignDateMin(); }
        if (control.hasError('invalidTime') && modelName === 'campaign') { return this.validationErrors.campaignTimeMin(); }
        if (control.hasError('minLength')) { return this.validationErrors.campaignTimeMin(); }
        if (control.hasError('minlength')) { return this.validationErrors.minLength(control.errors.minlength.requiredLength); }
        if (control.hasError('maxlength')) { return this.validationErrors.maxLength(control.errors.maxlength.requiredLength); }
        if (control.hasError('pattern')) { return `${label} does not match pattern ${type}`; }
        if (control.hasError('codeUsed')) { return `This ${label} has already been used the maximum amount of times.`; }
        return '';
    }

    ValidateValueTypeOfObject(control: AbstractControl) {
        // "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "function" | "object"
        switch (typeof control.value) {
            case 'string': {
                return { validObject: false, type: 'string' };
            }
            case 'number': {
                return { validObject: false, type: 'number' };
            }
            case 'bigint': {
                return { validObject: false, type: 'bigint' };
            }
            case 'boolean': {
                return { validObject: false, type: 'boolean' };
            }
            case 'symbol': {
                return { validObject: false, type: 'symbol' };
            }
            case 'undefined': {
                return { validObject: false, type: 'undefined' };
            }
            case 'function': {
                return { validObject: false, type: 'function' };
            }
            case 'object': {
                return null;
            }
            default: return null;
        }
    }

    isValidDate(value: any): boolean {
        if (value === 'Invalid date' || value === '' || value === undefined || value === null) {
            return false;
        }

        value = new Date(value);
        if (isNaN(value.getTime())) {
            return false;
        }

        return true;
    }

    back(url?: string, router?: Router) {
        if (url) {
            router.navigate([url]);
        } else {
            this.location.back();
        }
    }
}
