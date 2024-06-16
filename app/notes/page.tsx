import { createClient } from "@/app/utils/server";

export default async function Page() {
  const supabase = createClient();
  const { data: notes } = await supabase.from("notes").select();

  console.log(notes);
  return (
    <div className="">
      <h1>Notes</h1>
      <ul>
        {notes && notes.map((note) => <li key={note.id}>{note.title}</li>)}
      </ul>
    </div>
  );
}
