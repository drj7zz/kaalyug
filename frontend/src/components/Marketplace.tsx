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
  author?: { name: string; email: string };
  githubUrl?: string;
};

export default function Marketplace() {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${apiUrl}/projects`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

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
          <h2 className="text-[20px] font-bold"><i className="fa-solid fa-layer-group text-[#22a04a] mr-2 text-[16px]"></i>Explore the marketplace</h2>
          <p className="mt-[5px] text-[#64748b] text-[12px]">Complete digital projects built by developers and creators.</p>
        </div>
        <div className="relative w-full md:w-[240px]">
          <i className="fa-solid fa-magnifying-glass absolute left-[14px] top-1/2 -translate-y-1/2 text-[#64748b] text-[12px]"></i>
          <input
            type="text"
            className="w-full pl-[36px] pr-[14px] py-[11px] outline-none rounded-[13px] text-[#1e293b] bg-[#f1f5f9] border border-[#e2e8f0] focus:border-[#22a04a] transition-colors placeholder:text-[#64748b] text-sm"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex gap-[8px] overflow-x-auto pb-[20px] hide-scrollbar">
        {["all", "templates", "ui", "development", "tools", "opensource"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`btn-hover shrink-0 px-[13px] py-[8px] rounded-[30px] border text-[10px] cursor-pointer transition-colors ${
              filter === cat
                ? "text-[#1b8a3e] font-bold bg-[rgba(34,160,74,0.12)] border-[rgba(34,160,74,0.35)]"
                : "text-[#64748b] bg-[rgba(15,23,42,0.055)] border-[#e2e8f0] hover:text-[#1e293b] hover:bg-[rgba(34,160,74,0.12)] hover:border-[rgba(34,160,74,0.35)]"
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
            className="overflow-hidden rounded-[20px] bg-[rgba(15,23,42,0.055)] border border-[#e2e8f0] transition duration-300 hover:-translate-y-[6px] hover:border-[#cbd5e1] hover:shadow-[0_10px_30px_rgba(15,23,42,0.12)]"
          >
            <div className={`h-[170px] grid place-items-center ${product.previewClass}`}>
              <div className="w-[70px] h-[70px] grid place-items-center rounded-[20px] text-[#1e293b] text-[26px] font-extrabold bg-white border border-[#e2e8f0] shadow-[0_10px_25px_rgba(15,23,42,0.08)]">
                {product.symbol}
              </div>
            </div>
            <div className="p-[17px]">
              <div className="flex justify-between items-start">
                <h3 className="text-[13px] font-bold">{product.name}</h3>
                {product.githubUrl && (
                  <a href={product.githubUrl.startsWith('http') ? product.githubUrl : `https://${product.githubUrl}`} target="_blank" rel="noreferrer" className="text-[#64748b] hover:text-[#1e293b] transition-colors">
                    <i className="fa-brands fa-github text-[14px]"></i>
                  </a>
                )}
              </div>
              {product.author && <span className="block mt-[3px] text-[#64748b] text-[9px]">by {product.author.name}</span>}
              <p className="mt-[7px] text-[#64748b] text-[11px] leading-[1.55] line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center mt-[15px]">
                <span className="px-[9px] py-[5px] rounded-[8px] text-[#64748b] bg-[rgba(15,23,42,0.055)] text-[10px]">
                  {product.tag}
                </span>
                <span className="text-[#22a04a] text-[10px] font-semibold">{product.price}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <p className="py-[34px] text-center text-[#64748b] text-[13px]"><i className="fa-solid fa-box-open mr-2"></i>No projects have been published yet. Be the first to share one.</p>
      )}
    </section>
  );
}
