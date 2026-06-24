import type { Note } from "../../types/note";

interface NoteListProps {
  notes: Note[];
}

function NoteList({ notes }: NoteListProps) {
  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <span>{note.tag}</span>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;