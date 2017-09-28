
import { IssuesTablePage } from './issues_table_page';

export class IssuesPagedData<T> {
  data = new Array<T>();
  page = new IssuesTablePage();
}
