import { createReducer, on, Action, createSelector } from "@ngrx/store";
import { BookModel, calculateBooksGrossEarnings } from "src/app/shared/models";
import { BooksPageActions, BooksApiActions } from "src/app/books/actions";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface State extends EntityState<BookModel> {
  activeBookId: string | null;
}

export const adapter: EntityAdapter<BookModel> = createEntityAdapter<BookModel>();

export const initialState: State = adapter.getInitialState({
  activeBookId: null,
});

// return { ...state, selectedUserId: userId };
const booksReducer = createReducer(
  initialState,
  on(BooksPageActions.clearSelectedBook, BooksPageActions.enter, (state) => {
    return { ...state, activeBookId: null };
  }),
  on(BooksPageActions.selectBook, (state, { bookId }) => {
    return { ...state, activeBookId: bookId };
  }),
  on(BooksApiActions.booksLoaded, (state, { books }) => {
    return adapter.addMany(books, state);
  }),
  on(BooksApiActions.bookUpdated, (state, { book }) => {
    return adapter.updateOne(
      { id: book.id, changes: book },
      { ...state, activeBookId: null }
    );
  }),
  on(BooksApiActions.bookCreated, (state, { book }) => {
    return adapter.addOne(book, { ...state, activeBookId: null });
  }),
  on(BooksApiActions.bookDeleted, (state, { bookId }) => {
    return adapter.removeOne(bookId, state);
  })
);

export function reducer(state: State | undefined, action: Action) {
  return booksReducer(state, action);
}

export const selectActiveBookId = (state: State) => state.activeBookId;

const { selectEntities, selectAll, selectTotal } = adapter.getSelectors();

export const selectUserEntities = selectEntities;

export const selectAllBooks = selectAll;

export const selectEarningsTotals = createSelector(
  selectAll,
  calculateBooksGrossEarnings
);

export const selectActiveBook = createSelector(
  selectAll,
  selectActiveBookId,
  (books, activeBookId) =>
    books.find((book) => book.id === activeBookId) || null
);
