import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentService } from '../Api/document.service';
import { Document } from '../model/Document';
import {ErrorService} from '../Api/error.service';
import {DatePipe} from '@angular/common';
import {UserService} from '../Api/user.service';
import {User} from '../model/user';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  user: boolean;
  admin: boolean;
  flagSaveWindow: boolean;
  flagDateEditor: boolean;
  flagTextEditor: boolean;
  flagShowDocument: boolean;

  documents: Document[] = [];
  pages: Array<number>;
  document: Document;
  page: number;

  sortBy: string;
  filter: string;
  filterDate: string;
  search: string;
  termOfExecution: Date;
  date: string;

  pipe = new DatePipe('en-US');

  // admin fields
  adminDocuments: boolean;
  adminUsers: boolean;

  users: User[] = [];

  constructor(private documentService: DocumentService, private errorService: ErrorService,
              private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.admin = false;
    this.user = false;
    this.filter = '';
    this.search = '';
    this.page = 0;
    this.sortBy = 'id';
    this.document = this.initDocument();

    this.userService.verificationOfAuthToAccessAdmin().subscribe(
      res => {
        this.admin = true;
      },
      err => {
        this.documentService.verificationOfAuthToAccessDocuments().subscribe(
          userRes => {
            this.user = true;
            this.selectDocumentByAuthor();
          },
          userErr => {
            this.errorService.errorCode(userErr);
          }
        );
      }
    );
  }

  public selectDocumentByAuthor() {
    this.documentService.selectDocumentByAuthor(this.search, this.page, this.sortBy).subscribe(
      res => {
        if (res === null) {
          this.documents = [];
          this.pages = [];
        } else {
          this.documents = res.content;
          this.pages = new Array<number>(res.totalPages);
        }
      },
      err => {
        this.errorService.errorCode(err);
      }
    );
  }

  public selectDocumentByDateCreated() {
    this.documentService.selectDocumentByFilterDateCreated(this.date, this.page, this.sortBy).subscribe(
      res => {
        if (res === null) {
          this.documents = [];
          this.pages = [];
        } else {
          this.documents = res.content;
          this.pages = new Array<number>(res.totalPages);
        }
      },
      err => {
        this.errorService.errorCode(err);
      }
    );
  }

  public selectDocumentByWhoContracted() {
    this.documentService.selectDocumentByFilterWhoContracted(this.search, this.page, this.sortBy).subscribe(
      res => {
        if (res === null) {
          this.documents = [];
          this.pages = [];
        } else {
          this.documents = res.content;
          this.pages = new Array<number>(res.totalPages);
        }
      },
      err => {
        this.errorService.errorCode(err);
      }
    );
  }

  public selectDocumentByWhomContract() {
    this.documentService.selectDocumentByFilterWhomContract(this.search, this.page, this.sortBy).subscribe(
      res => {
        if (res === null) {
          this.documents = [];
          this.pages = [];
        } else {
          this.documents = res.content;
          this.pages = new Array<number>(res.totalPages);
        }
      },
      err => {
        this.errorService.errorCode(err);
      }
    );
  }

  public searchDocument() {
    switch (this.filter) {
      case 'name':
        this.selectDocumentByAuthor();
        break;
      case 'whoContracted':
        this.selectDocumentByWhoContracted();
        break;
      case 'whomContract':
        this.selectDocumentByWhomContract();
        break;
      default:
        this.selectDocumentByAuthor();
    }
  }

  public searchDocumentByDateCreated() {
    const d = new Date();
    switch (this.filterDate) {
      case 'today':
        this.date = this.pipe.transform(d, 'dd-MM-yyyy');
        this.selectDocumentByDateCreated();
        break;
      case 'month':
        d.setMonth(d.getMonth() - 1);
        this.date = this.pipe.transform(d, 'dd-MM-yyyy');
        this.selectDocumentByDateCreated();
        break;
      case 'year':
        d.setUTCFullYear(d.getFullYear() - 1);
        this.date = this.pipe.transform(d, 'dd-MM-yyyy');
        this.selectDocumentByDateCreated();
        break;
    }
  }

  public createDocument() {
    this.documentService.createDocument(this.document).subscribe(
      res => {
        this.closeWindowSave();
        this.selectDocumentByAuthor();
      }, err => {
        this.errorService.errorCode(err);
      }
    );
  }

  public updateDocument() {
    this.documentService.updateDocument(this.document).subscribe(
      res => {
        this.closeWindowSave();
        this.selectDocumentByAuthor();
      },
      err => {
        this.errorService.errorCode(err);
      }
    );
  }

  public deleteDocument(document: Document) {
    if (confirm('Do you really want to delete it?')) {
      this.documentService.deleteDocument(document.id).subscribe(
        res => {
          this.selectDocumentByAuthor();
        },
        err => {
          this.errorService.errorCode(err);
        }
      );
    }
  }

  setPages(i: number, $event: MouseEvent) {
    this.page = i;
    if (this.admin && this.adminDocuments) {
      this.selectAllDocuments();
    } else if (this.admin && this.adminUsers) {
      this.selectAllUsers();
    }
    if (this.user) {
      this.selectDocumentByAuthor();
    }
    $event.preventDefault();
  }

  showDocument(document: Document) {
    this.document = document;
    this.flagShowDocument = true;
  }

  initDocument() {
    return {
      author: null,
      created: null,
      file: '',
      id: null,
      name: '',
      status: '',
      termOfExecution: new Date(),
      whoContracted: '',
      whomContract: ''
    };
  }

  public closeWindowSave() {
    this.flagSaveWindow = false;
  }

  public createDocumentWindow() {
    this.flagSaveWindow = true;
    this.document = this.initDocument();
  }

  public updateDocumentWindow(document: Document) {
    this.flagSaveWindow = true;
    this.document = document;
  }

  // Admin functions
  selectAllDocuments() {
    this.adminDocuments = true;
    this.adminUsers = false;
    this.userService.selectAllDocuments(this.search, this.page, this.sortBy).subscribe(
      res => {
        if (res === null) {
          this.documents = [];
          this.pages = [];
        } else {
          this.documents = res.content;
          this.pages = new Array<number>(res.totalPages);
        }
      },
      err => {

      }
    );
  }

  selectAllUsers() {
    this.adminDocuments = false;
    this.adminUsers = true;
    this.userService.selectAllUsers(this.page, this.sortBy).subscribe(
      res => {
        if (res === null) {
          this.users = [];
          this.pages = [];
        } else {
          this.users = res['content'];
          this.pages = new Array<number>(res.totalPages);
        }
      }, err => {

      }
    )
  }
}
