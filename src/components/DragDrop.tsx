"use client";
import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

const Tile = ({ tile }: { tile: any }) => {
  return (
    <div className="bg-blue-500 text-white p-4 m-2 rounded">{tile.content}</div>
  );
};

const initialTiles = [
  { id: "1", content: "Tile 1" },
  { id: "2", content: "Tile 2" },
  { id: "3", content: "Tile 3" },
];

const DragDrop = () => {
  const [tiles, setTiles] = useState(initialTiles);

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedTiles = Array.from(tiles);
    const [removed] = reorderedTiles.splice(result.source.index, 1);
    reorderedTiles.splice(result.destination.index, 0, removed);

    setTiles(reorderedTiles);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="tiles">
        {(provided) => (
          <div
            className="flex flex-wrap"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tiles.map((tile, index) => (
              <Draggable key={tile.id} draggableId={tile.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Tile tile={tile} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragDrop;
