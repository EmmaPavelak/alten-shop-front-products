import { Component, Input, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { SidenavItem } from "app/base/sidenav/sidenav.model";
import { SidenavService } from "app/base/sidenav/sidenav.service";
import { SIDENAV_ITEMS } from "app/base/sidenav/SIDENAV_ITEMS";
import { MenuItem } from "primeng/api";
import { filter, map, startWith, tap } from "rxjs";

@Component({
  selector: "app-breadcrumb",
  templateUrl: "./breadcrumb.component.html",
  styleUrls: ["./breadcrumb.component.scss"],
})
export class BreadcrumbComponent implements OnInit {
  @Input() public lang = "en";
  public items: MenuItem[] = [];
  private readonly sidenavItems: SidenavItem[] = SIDENAV_ITEMS;
  private homeItem: MenuItem = { label: "Home", routerLink: "/" };
  private productItem: MenuItem = {
    label: "Products",
    routerLink: "/products",
  };
  private adminItem: MenuItem = {
    label: "Admin",
    routerLink: "/admin/products",
  };

  constructor(
    private readonly sidenavService: SidenavService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event: NavigationEnd) => event.url),
        startWith(this.router.url),
        tap(
          (url) =>
            (this.items = [this.homeItem].concat(
              url.includes("/admin")
                ? [this.adminItem]
                : url === "/products"
                ? [this.productItem]
                : []
            ))
        )
      )
      .subscribe((url) => {
        this.buildBreadcrumb(url);
      });
  }

  private buildBreadcrumb(path: string): void {
    const firstPath: SidenavItem = this.sidenavItems.find(
      (item) => "/" + item.id === path
    );
    if (firstPath) {
      this.items.push({
        label: firstPath.labels[this.lang],
        routerLink: firstPath.link,
        command: () => this.sidenavService.setCurrentEntityName(""),
      });
    }
  }
}
