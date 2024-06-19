import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { EditorState } from '@codemirror/state';
import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';

@Component({
  selector: 'code-mirror-editor',
  standalone: true,
  imports: [],
  templateUrl: './code-mirror-editor.component.html',
  styleUrl: './code-mirror-editor.component.css'
})
export class CodeMirrorEditorComponent implements OnInit {
  @ViewChild('editor', { static: true }) editorElement!: ElementRef;

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
        javascript({typescript: true}),
        updateListener
      ]
    });

    this.editorView = new EditorView({
      state,
      parent: this.editorElement.nativeElement
    });
  }
}
