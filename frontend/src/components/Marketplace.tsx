import { useState, useEffect } from "react";
import { apiUrl } from "../lib/api";

type Project = {
  _id: string;
  name: string;
  description: string;
  category: string;
  tag: string;
  price: string;
  symbol: string;
  previewClass: string;
};

export default function Marketplace() {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/projects`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Ensure the response is JSON before parsing
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const data = await response.json();
          setProjects(data as Project[]);
        } else {
          throw new TypeError("Oops, we haven't got JSON!");
        }
      } catch (error) {
        console.error("Unable to fetch marketplace projects:", error);
        setProjects([]);
      }
    };
    fetchProjects();
  }, []);

  const filteredProducts = projects.filter(
    (p) => (filter === "all" || p.category === filter) && p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="marketplace" className="glass w-[min(92%,1100px)] mx-auto p-[25px] rounded-[28px]">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-[15px] mb-[24px]">
        <div>
          <h2 className="text-[20px] font-bold">Explore the marketplace</h2>
          <p className="mt-[5px] text-[#777984] text-[10px]">Complete digital projects built by developers and creators.</p>
        </div>
        <input
          type="text"
          className="w-full md:w-[240px] px-[14px] py-[11px] outline-none rounded-[13px] text-white bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] placeholder:text-[#666873] text-sm"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex gap-[8px] overflow-x-auto pb-[20px] hide-scrollbar">
        {["all", "templates", "ui", "development", "tools", "opensource"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`shrink-0 px-[13px] py-[8px] rounded-[30px] border text-[10px] cursor-pointer transition-colors ${
              filter === cat
                ? "text-white bg-[rgba(145,85,255,0.14)] border-[rgba(145,85,255,0.35)]"
                : "text-[#858691] bg-[rgba(255,255,255,0.035)] border-[rgba(255,255,255,0.1)] hover:text-white hover:bg-[rgba(145,85,255,0.14)] hover:border-[rgba(145,85,255,0.35)]"
            }`}
          >
            {cat === "all" ? "All" : cat === "ui" ? "UI / Components" : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[14px]">
        {filteredProducts.map((product) => (
          <article
            key={product._id}
            className="overflow-hidden rounded-[20px] bg-[rgba(255,255,255,0.035)] border border-[rgba(255,255,255,0.09)] transition duration-300 hover:-translate-y-[6px] hover:border-[rgba(255,255,255,0.2)]"
          >
            <div className={`h-[170px] grid place-items-center ${product.previewClass}`}>
              <div className="w-[70px] h-[70px] grid place-items-center rounded-[20px] text-white text-[26px] font-extrabold bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.18)] backdrop-blur-[15px] shadow-[inset_0_1px_rgba(255,255,255,0.2),0_15px_40px_rgba(0,0,0,0.3)]">
                {product.symbol}
              </div>
            </div>
            <div className="p-[17px]">
              <h3 className="text-[13px] font-bold">{product.name}</h3>
              <p className="mt-[7px] text-[#777984] text-[10px] leading-[1.5]">{product.description}</p>
              <div className="flex justify-between items-center mt-[15px]">
                <span className="px-[8px] py-[5px] rounded-[8px] text-[#aeb0bc] bg-[rgba(255,255,255,0.05)] text-[9px]">
                  {product.tag}
                </span>
                <span className="text-[#71dfcc] text-[10px] font-semibold">{product.price}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <p className="py-[34px] text-center text-[#858691] text-[11px]">No projects have been published yet. Be the first to share one.</p>
      )}
    </section>
  );
}
