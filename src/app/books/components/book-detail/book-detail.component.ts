import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup, FormControl, AbstractControl, Validators, ValidationErrors, AsyncValidatorFn } from "@angular/forms";
import { BookModel } from "src/app/shared/models";
import { BooksService } from 'src/app/shared/services';




@Component({
  selector: "app-book-detail",
  templateUrl: "./book-detail.component.html",
  styleUrls: ["./book-detail.component.css"]
})
export class BookDetailComponent {
  originalBook: BookModel | undefined;
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  constructor(private bookService: BooksService) {

  }

  bookForm = new FormGroup({
    name: new FormControl(""),
    earnings: new FormControl(0),
    description: new FormControl("")
  });

  @Input() set book(book: BookModel) {
    this.bookForm.reset();
    this.originalBook = undefined;

    if (book) {
      this.bookForm.setValue({
        name: book.name,
        earnings: book.earnings,
        description: book.description
      });

      this.originalBook = book;
    }
  }

  onSubmit(book: BookModel) {
    this.save.emit({ ...this.originalBook, ...book });
  }
}
