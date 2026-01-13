const CardSkeleton = () => {
  return (
    <div className="bg-purple-100/40 rounded-lg p-9 max-w-80 min-h-60 animate-pulse">
      <div className="h-6 w-32 bg-purple-200 rounded" />

      <div className="pt-6 flex justify-between">
        <div className="h-4 w-20 bg-purple-200 rounded" />
        <div className="h-4 w-16 bg-purple-200 rounded" />
      </div>

      <div className="mt-10 h-10 w-full bg-white/60 rounded-md" />
    </div>
  );
};

export default CardSkeleton;
