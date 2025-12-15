import Navbar from "@/components/Navbar";
import Todos from "@/components/Todos";
export default function Home() {
  return (
    <div className="w-full min-h-screen bg-sky-50 pt-4">
      <Navbar />
      <Todos />
    </div>
  );
}
