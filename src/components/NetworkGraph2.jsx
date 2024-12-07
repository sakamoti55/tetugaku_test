import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

function NetworkGraph2 () {
  const svgRef = useRef();
  const [highlightedNode, setHighlightedNode] = useState(null);

  useEffect(() => {
    // データの定義
    const nodes = [
      { id: "A" },
      { id: "B" },
      { id: "C" },
      { id: "D" },
    ];

    const links = [
      { source: "A", target: "B" },
      { source: "A", target: "C" },
      { source: "B", target: "D" },
    ];

    // SVGの初期化
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 600;
    const height = 400;

    // ズーム設定
    const zoom = d3.zoom().on("zoom", (event) => {
      svgGroup.attr("transform", event.transform);
    });

    svg.call(zoom);

    // グループを作成（ズームの対象）
    const svgGroup = svg.append("g");

    // シミュレーションの設定
    const simulation = d3
      .forceSimulation(nodes)
      .force("link", d3.forceLink(links).id((d) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    // リンクを描画
    const link = svgGroup
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "#aaa");

    // ノードを描画
    const node = svgGroup
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", 10)
      .attr("fill", (d) => (d.id === highlightedNode ? "orange" : "steelblue"))
      .call(
        d3
          .drag()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      )
      .on("click", (event, d) => setHighlightedNode(d.id));

    // ノードとリンクの位置を更新
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    });
  }, [highlightedNode]);

  return (
    <svg
      ref={svgRef}
      width={600}
      height={400}
      style={{ border: "1px solid black" }}
    ></svg>
  );
};

export default NetworkGraph2;
