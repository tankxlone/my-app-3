export const SchoolCard = ({ school }) => {
  return (
    <div className="max-w-sm w-[300px] bg-white border border-gray-200 rounded-lg shadow mt-4">
      <img className="rounded-t-lg" src={school.imageUrl} alt={school.name} />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-700 ">
          Name: {school.name}
        </h5>
        <p className="mb-3 font-normal text-gray-700 ">
          Adress: {school.address}
        </p>
        <p className="mb-3 font-normal text-gray-700 ">City: {school.city}</p>
      </div>
    </div>
  );
};
