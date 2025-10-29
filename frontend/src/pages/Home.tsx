import React, { useEffect, useState } from "react";
import type { Experience } from "../types/Experience";
import { Link } from "react-router-dom"; 
import Navbar from "../components/Navbar";


const Experiences: React.FC = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/experiences");
        const data = await res.json();
        setExperiences(data);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
    };
    fetchExperiences();
  }, []);

  const filteredExperiences = experiences.filter((exp) =>
    exp.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar/>
      
      <main className="px-6 py-10 max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">
          Explore Experiences
        </h2>

        <div
          className="
            grid 
            gap-6 
            sm:grid-cols-1 
            md:grid-cols-2 
            lg:grid-cols-3 
            xl:grid-cols-4
          "
        >
          {filteredExperiences.map((exp) => (
            <div
              key={exp._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full"
            >
              <img
                src={exp.image}
                alt={exp.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-4 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gray-900 font-medium">{exp.title}</h3>
                    <span className="text-xs bg-gray-100 text-gray-700 rounded-md px-2 py-1">
                      {exp.location}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {exp.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <p className="text-gray-800 text-sm">
                    From{" "}
                    <span className="font-semibold text-lg">₹{exp.price}</span>
                  </p>
                  <Link
  to={`/experience/${exp._id}`} 
  className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-medium rounded-lg px-4 py-2 text-center"
>
  View Details
</Link>

                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredExperiences.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No experiences found.
          </p>
        )}

      </main>
    </div>
  );
};

export default Experiences;
