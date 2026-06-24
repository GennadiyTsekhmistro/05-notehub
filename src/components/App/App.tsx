import { useEffect, useState } from "react";
import { fetchNotes } from "../../services/noteService";
import type { Note } from "../../types/note";
import css from "./App.module.css";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function loadNotes() {
      try {
        setIsLoading(true);
        setError("");

        const data = await fetchNotes({
          page,
          perPage: 12,
          search: searchQuery,
        });

        setNotes(data.notes);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch notes");
      } finally {
        setIsLoading(false);
      }
    }

    loadNotes();
  }, [page, searchQuery]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <h1>NoteHub</h1>

      <SearchBox value={searchQuery} onChange={handleSearchChange} />

      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <NoteList notes={notes} />

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}

export default App;
