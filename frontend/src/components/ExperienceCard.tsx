import type { Experience } from "../types/Experience";
import { useNavigate } from "react-router-dom";

interface Props {
  experience: Experience;
}

const ExperienceCard = ({ experience }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer overflow-hidden"
      onClick={() => navigate(`/details/${experience._id}`)}
    >
      <img
        src={experience.image}
        alt={experience.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{experience.title}</h2>
        <p className="text-sm text-gray-500">{experience.location}</p>
        <p className="mt-2 text-blue-600 font-bold">${experience.price}</p>
      </div>
    </div>
  );
};

export default ExperienceCard;
