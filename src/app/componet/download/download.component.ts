// // import { Component, OnInit } from '@angular/core';
// // import { ActivatedRoute } from '@angular/router';
// // import { FileService } from '../../shared/services/file.service';
// // import { Observable } from 'rxjs';

// // @Component({
// //   selector: 'app-download',
// //   templateUrl: './download.component.html',
// // })
// // export class DownloadComponent implements OnInit {
  
// //   public fileMeta$!: Observable<any>;
// //   public downloadUrl: string | null = null;
// //   private fileId: string | null = null;

// //   constructor(
// //     private route: ActivatedRoute,
// //     private fileService: FileService
// //   ) {}

// //   ngOnInit(): void {
// //     // Get the 'id' parameter from the URL
// //     this.fileId = this.route.snapshot.paramMap.get('id');

// //     if (this.fileId) {
// //       // Fetch the file metadata from our backend
// //       this.fileMeta$ = this.fileService.getFileMeta(this.fileId);
// //       // Construct the direct download stream URL
// //       this.downloadUrl = this.fileService.getStreamUrl(this.fileId);
// //     }
// //   }
// // }


// import { Component, OnInit, QueryList, ViewChildren, ElementRef } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { FileService } from '../../shared/services/file.service';
// import { Observable } from 'rxjs';
// import { catchError } from 'rxjs/operators';

// @Component({
//   selector: 'app-download',
//   templateUrl: './download.component.html',
// })
// export class DownloadComponent implements OnInit {
  
//   // Observables for holding data
//   public fileMeta$?: Observable<any>;
//   public batchFiles$?: Observable<any[]>;

//   // For single file downloads
//   public downloadUrl: string | null = null;

//   // This gives us access to the anchor tags in the template for "Download All"
//   @ViewChildren('downloadLink') downloadLinks!: QueryList<ElementRef>;

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private fileService: FileService
//   ) {}

//   ngOnInit(): void {
//     // --- START DEBUGGING ---
//     console.log("DownloadComponent Initialized.");
    
//     const routeSnapshot = this.route.snapshot;
//     const currentRoutePath = routeSnapshot.routeConfig?.path;
//     const paramsId = routeSnapshot.paramMap.get('id');

//     console.log("Current URL:", this.router.url);
//     console.log("Matched Route Path from Snapshot:", currentRoutePath);
//     console.log("ID found in params:", paramsId);
//     // --- END DEBUGGING ---


//     // Now we check the values we just logged
//     if (currentRoutePath === 'download/batch/:id' && paramsId) {
//       console.log(`Action: Detected BATCH route. Fetching batch with ID: ${paramsId}`);
//       this.batchFiles$ = this.fileService.getBatchMeta(paramsId).pipe(
//         catchError(err => {
//           console.error("API Error fetching batch:", err);
//           this.router.navigate(['/']); // Redirect home only if API fails
//           return [];
//         })
//       );

//     } else if (currentRoutePath === 'download/:id' && paramsId) {
//       console.log(`Action: Detected SINGLE FILE route. Fetching meta for ID: ${paramsId}`);
//       this.fileMeta$ = this.fileService.getFileMeta(paramsId).pipe(
//         catchError(err => {
//           console.error("API Error fetching file meta:", err);
//           this.router.navigate(['/']); // Redirect home only if API fails
//           return [];
//         })
//       );
//       this.downloadUrl = this.getStreamUrl(paramsId);

//     } else {
//       // If we land here, it means the route wasn't matched as expected.
//       // We will NOT redirect automatically. A blank page is a better clue.
//       console.error("Could not determine action. No matching route path or ID was found in the snapshot.");
//     }
//   }

//   // Helper method to construct stream URL, used by both single and batch views
//   public getStreamUrl(id: string): string {
//     return this.fileService.getStreamUrl(id);
//   }

//   // Method for the "Download All" button
//   public downloadAll(): void {
//     // A brief timeout allows Angular to render the links before we try to click them
//     setTimeout(() => {
//       this.downloadLinks.forEach(link => {
//         // Programmatically click each individual download link
//         link.nativeElement.click();
//       });
//     }, 100);
//   }
// }


import { Component, OnInit, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from '../../shared/services/file.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
})
export class DownloadComponent implements OnInit {
  
  public fileMeta$?: Observable<any>;
  public batchFiles$?: Observable<any[]>;
  public downloadUrl: string | null = null;

  @ViewChildren('downloadLink') downloadLinks!: QueryList<ElementRef>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    const currentRoutePath = this.route.snapshot.routeConfig?.path;
    const paramsId = this.route.snapshot.paramMap.get('id');

    if (currentRoutePath === 'download/batch/:id' && paramsId) {
      this.batchFiles$ = this.fileService.getBatchMeta(paramsId).pipe(
        catchError(err => {
          console.error("API Error fetching batch:", err);
          this.router.navigate(['/']);
          return of([]); // Return an empty observable on error
        })
      );
    } else if (currentRoutePath === 'download/:id' && paramsId) {
      this.fileMeta$ = this.fileService.getFileMeta(paramsId).pipe(
        catchError(err => {
          console.error("API Error fetching file meta:", err);
          this.router.navigate(['/']);
          return of(null); // Return an empty observable on error
        })
      );
      this.downloadUrl = this.getStreamUrl(paramsId);
    } else {
      console.error("DownloadComponent: Could not determine route. Redirecting home.");
      this.router.navigate(['/']);
    }
  }

  public getStreamUrl(id: string): string {
    return this.fileService.getStreamUrl(id);
  }

  public downloadAll(): void {
    setTimeout(() => {
      this.downloadLinks.forEach(link => {
        link.nativeElement.click();
      });
    }, 100);
  }
}