import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { EditorState } from '@codemirror/state';
import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { solarizedDark } from 'cm6-theme-solarized-dark'
@Component({
  selector: 'code-mirror-editor',
  standalone: true,
  imports: [],
  templateUrl: './code-mirror-editor.component.html',
  styleUrl: './code-mirror-editor.component.css'
})
export class CodeMirrorEditorComponent implements OnInit {
  @ViewChild('editor', { static: true }) editorElement!: ElementRef;

  @Input() editable: boolean = true;
  @Input() content: string = '';
  @Output() contentChange = new EventEmitter<string>();

  private editorView!: EditorView;

  constructor() {}

  ngOnInit(): void {
    this.initializeCodeMirror();
  }

  initializeCodeMirror(): void {
    const updateListener = EditorView.updateListener.of(update => {
      if (update.changes) {
        this.contentChange.emit(this.editorView.state.doc.toString());
      }
    });

    const state = EditorState.create({
      doc: this.content,
      extensions: [
        basicSetup,
        solarizedDark,
        javascript({typescript: true}),
        this.editable ? updateListener : EditorView.editable.of(false) // Make the editor read-only
      ]
    });

    this.editorView = new EditorView({
      state,
      parent: this.editorElement.nativeElement
    });
  }
}
