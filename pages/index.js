import { supabase } from "../utils/supabase";
import Link from "next/link";

export const getStaticProps = async () => {
  const { data: lessons } = await supabase.from("lesson").select("*");
  return {
    props: {
      lessons,
    },
  };
};

export default function Home({ lessons }) {
  console.log("supabase", supabase.auth.user());
  console.log("lessons", lessons);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {lessons.map((lesson) => (
        <Link key={lesson.id} href={`/${lesson.id}`}>
          <a className="flex h-40 p-8 mb-4 text-xl rounded shadow">
            {lesson.title}
          </a>
        </Link>
      ))}
    </div>
  );
}
