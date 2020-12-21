import { BooksService } from "./../services/book.service";
import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export const referenceValidator = (
  bookService: BooksService
): AsyncValidatorFn => {
  return (
    control: AbstractControl
  ): Observable<{ [key: string]: any } | null> => {
    return bookService
      .checkReference(control.value)
      .pipe(map((res) => (res.length > 0 ? { refExist: true } : null)));
  };
};
