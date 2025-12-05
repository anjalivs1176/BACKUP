import DealCard from "./DealCard";
import { dealData } from "../../../../data/DealData/dealData";

const Deal = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
      {dealData.map((deal) => (
        <DealCard key={deal.id} deal={deal} />
      ))}
    </div>
  );
};

export default Deal;
