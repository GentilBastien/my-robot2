import { Component, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Coordinate } from "shared";

@Component({
  selector: "app-root",
  imports: [RouterOutlet],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App {
  protected readonly title = signal("client");

  private readonly coord = signal<Coordinate | undefined>(undefined);
}
