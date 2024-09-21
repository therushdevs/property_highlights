// pages/index.tsx
import DragDrop from "@/components/DragDrop";
import PropertyHighlights from "../components/PropertyHighlights";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <PropertyHighlights />
    </div>
  );
};

export default Home;
