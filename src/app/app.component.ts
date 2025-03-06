import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = "angular-ssr";
	doc = inject(DOCUMENT);

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
  }

	ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log("Browser");
    }
	}
}
