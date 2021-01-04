import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  AsyncValidatorFn,
} from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BookModel } from "src/app/shared/models";
import { BooksService } from "src/app/shared/services";

@Component({
  selector: "app-book-detail",
  templateUrl: "./book-detail.component.html",
  styleUrls: ["./book-detail.component.css"],
})
export class BookDetailComponent {
  originalBook: BookModel | undefined;
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  constructor(private bookService: BooksService) {}

  bookForm = new FormGroup({
    name: new FormControl(""),
    earnings: new FormControl(0),
    description: new FormControl(""),
    ref: new FormControl("", [Validators.required], this.referenceValidator()),
  });

  @Input() set book(book: BookModel) {
    this.bookForm.reset();
    this.originalBook = undefined;

    if (book) {
      this.bookForm.setValue({
        name: book.name,
        earnings: book.earnings,
        description: book.description,
        ref: book.ref,
      });

      this.originalBook = book;
    }
  }

  isReferenceErrorShown(): boolean {
    const refControl = this.bookForm.get("ref");
    return refControl ? refControl.hasError("refExists") : false;
  }

  onSubmit(book: BookModel) {
    this.save.emit({ ...this.originalBook, ...book });
    this.bookForm.reset();
  }

  private referenceValidator(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: any } | null> => {
      return this.bookService
        .checkReference(control.value)
        .pipe(
          map((res) =>
            res.length > 0 && !this.originalBook ? { refExist: true } : null
          )
        );
    };
  }
}
