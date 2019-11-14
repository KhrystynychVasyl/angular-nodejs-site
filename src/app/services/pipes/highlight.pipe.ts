import { Pipe, PipeTransform } from "@angular/core";
import { match } from "minimatch";

@Pipe({
  name: "highlight"
})
export class HighlightPipe implements PipeTransform {
  transform(text: string, search): string {
    function regex(search) {
      var pattern = search.replace(
        /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
        "\\$&"
      );
      pattern = pattern
        .split(" ")
        .filter(t => {
          return t.length > 0;
        })
        .join("|");
      var regex = new RegExp(pattern, "gi");
      return regex;
    }

    return search
      ? text.replace(
          regex(search),
          match => `<span class="highlight">${match}</span>`
        )
      : text;
  }
}
