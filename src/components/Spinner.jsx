const Spinner = () => {
  return (
    <div className="flex justify-center items-center py-10" role="status" aria-label="Loading">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;