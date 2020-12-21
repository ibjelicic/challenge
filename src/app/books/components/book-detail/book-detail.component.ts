import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { BookModel } from "src/app/shared/models";
import { BooksService } from "src/app/shared/services";
import { referenceValidator } from "src/app/shared/validators/referenceValidator";

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
    ref: new FormControl(
      "",
      [Validators.required],
      referenceValidator(this.bookService)
    ),
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
}
