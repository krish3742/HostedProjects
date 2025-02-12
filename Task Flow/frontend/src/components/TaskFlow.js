"use client";

import { useCallback, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";

import "reactflow/dist/style.css";

function TaskFlow({ tasks }) {
  const initialNodes = tasks.map((task, index) => ({
    id: `${index}`,
    data: { label: task },
    position: {
      x: 100 + (index % 3) * 200,
      y: 100 + Math.floor(index / 3) * 100,
    },
    style: {
      background: "#fff",
      padding: "15px",
      borderRadius: "8px",
      border: "1px solid #e0e0e0",
      width: 180,
    },
  }));

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  useEffect(() => {
    setNodes(
      tasks.map((task, index) => ({
        id: `${index}`,
        data: { label: task.title },
        position: {
          x: 100 + (index % 3) * 200,
          y: 100 + Math.floor(index / 3) * 100,
        },
        style: {
          background: "#fff",
          padding: "15px",
          borderRadius: "8px",
          border: "1px solid #e0e0e0",
          width: 180,
        },
      }))
    );
  }, [tasks, setNodes]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      style={{
        background: "#fafafa",
      }}
    >
      <Background color="#ccc" gap={16} />
      <Controls />
    </ReactFlow>
  );
}

export default TaskFlow;
