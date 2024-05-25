import { Quill } from "react-quill";
import Delta from "quill-delta";

const Clipboard = Quill.import("modules/clipboard");

export class SurveyFormClipboard extends Clipboard {
    onPaste(e) {
        e.preventDefault();
        const range = this.quill.getSelection();
        const text = e.clipboardData.getData("text");

        // const itemsToPaste = text.split("\r\n").filter((item) => item);

        const delta = new Delta()
            .retain(range.index)
            .delete(range.length)
            .insert(text);
        const index = text.length + range.index;
        const length = 0;
        this.quill.updateContents(delta, "silent");
        this.quill.setSelection(index, length, "silent");
        debugger
    }


}

// var Clipboard = Quill.import('modules/clipboard');
// class Clipboard2 extends Clipboard {
//     onCapturePaste(e) {
//         if (e.defaultPrevented!this.quill.isEnabled()) return;
//         e.preventDefault();
//         const range = this.quill.getSelection(true);
//         if (range == null) return;
//         let html = e.clipboardData.getData('text/html');
//         html = html.replace('<b style="font-weight:normal;"', '<span"');
//         const text = e.clipboardData.getData('text/plain');
//         const files = Array.from(e.clipboardData.files[]);
//         if (!html && files.length > 0) {
//             this.quill.uploader.upload(range, files);
//         }
//         else {
//             this.onPaste(range, { html, text });
//         }
//     }
// }
// window.Quill.register({ 'modules/clipboard': Clipboard2 }, true);
