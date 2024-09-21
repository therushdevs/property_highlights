"use client";
import React, { useEffect, useState, useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axiosInstance from "@/app/utils/axiosInstance";
import { toast } from "react-toastify";

interface PropertyHighlight {
  _id: string;
  title: string;
  created_at: string;
  updated_at: string;
  order: number;
}

const ItemType = {
  HIGHLIGHT: "highlight",
};

const HighlightItem: React.FC<{
  highlight: PropertyHighlight;
  index: number;
  moveHighlight: (dragIndex: number, hoverIndex: number) => void;
  deleteHighlight: ({ id }: { id: string }) => Promise<void>;
}> = ({ highlight, index, moveHighlight, deleteHighlight }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drag] = useDrag({
    type: ItemType.HIGHLIGHT,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType.HIGHLIGHT,
    drop(item: { index: number }) {
      if (item.index !== index) {
        moveHighlight(item.index, index);
        item.index = index;
      }
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className="flex justify-between items-center border-b px-4 py-2 my-2 bg-white rounded shadow cursor-pointer"
    >
      <span>{highlight.title}</span>
      <button
        onClick={async () => {
          await deleteHighlight({ id: highlight._id });
        }}
      >
        {" "}
        <p className="text-red-700">Delete</p>
      </button>
    </div>
  );
};

const PropertyHighlights: React.FC = () => {
  const [highlights, setHighlights] = useState<PropertyHighlight[]>([]);
  const [title, setTitle] = useState("");

  const fetchHighlights = async () => {
    try {
      const response = await axiosInstance.get("/property_highlights");
      setHighlights(response.data);
    } catch (error) {
      toast.error("Error fetching property highlights");
      console.error(error);
    }
  };

  const addHighlight = async () => {
    try {
      const response = await axiosInstance.post("/property_highlights", {
        title,
      });
      setHighlights([...highlights, response.data]);
      setTitle("");
      toast.success("Property highlight added successfully");
    } catch (error) {
      toast.error("Error adding property highlight");
      console.error(error);
    }
  };
  const deleteHighlight = async ({ id }: { id: string }) => {
    try {
      await axiosInstance.delete(`/property_highlights/${id}`);
      await fetchHighlights();
      toast.success("Property highlight deleted successfully");
    } catch (error) {
      toast.error("Error deleting property highlight");
      console.error(error);
    }
  };

  const moveHighlight = async (dragIndex: number, hoverIndex: number) => {
    const updatedHighlights = [...highlights];
    const [removed] = updatedHighlights.splice(dragIndex, 1);
    updatedHighlights.splice(hoverIndex, 0, removed);
    setHighlights(updatedHighlights);

    const reorderedIds = updatedHighlights.map((highlight) => highlight._id);
    console.log(
      `data: ${JSON.stringify(updatedHighlights)} ${JSON.stringify(
        reorderedIds
      )}`
    );

    try {
      const response = await axiosInstance.put("/property_highlights/reorder", {
        reorderedIds,
      });
      await fetchHighlights();
      if (response.status === 200) {
        toast.success("Order updated successfully in the database");
      } else {
        throw new Error("Failed to update order");
      }
    } catch (error) {
      toast.error("Error updating order in the database");
      console.error(error);
      fetchHighlights();
    }
  };

  useEffect(() => {
    fetchHighlights();
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Property Highlights</h1>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter highlight title"
          className="border rounded p-2 mb-4"
        />
        <button
          onClick={addHighlight}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Highlight
        </button>

        <div className="mt-4">
          {highlights.map((highlight, index) => (
            <HighlightItem
              key={highlight._id}
              index={index}
              highlight={highlight}
              moveHighlight={moveHighlight}
              deleteHighlight={deleteHighlight}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default PropertyHighlights;
