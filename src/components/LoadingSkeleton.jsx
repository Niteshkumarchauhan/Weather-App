const SkeletonBlock = ({ className = "" }) => (
  <div className={`skeleton rounded-xl ${className}`} />
);

const LoadingSkeleton = () => {
  return (
    <div className="w-full space-y-4 animate-pulse">
      {/* Main weather card skeleton */}
      <div className="glass rounded-3xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-1 space-y-4">
            <SkeletonBlock className="h-5 w-40" />
            <SkeletonBlock className="h-3 w-32" />
            <SkeletonBlock className="h-28 w-48" />
            <SkeletonBlock className="h-6 w-36" />
            <SkeletonBlock className="h-4 w-52" />
          </div>
          <div className="flex flex-col items-center gap-3">
            <SkeletonBlock className="w-32 h-32 rounded-full" />
            <SkeletonBlock className="h-6 w-24 rounded-full" />
          </div>
        </div>
      </div>

      {/* Stats grid skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="glass-card rounded-2xl p-4 space-y-2">
            <SkeletonBlock className="h-3 w-16" />
            <SkeletonBlock className="h-7 w-20" />
            <SkeletonBlock className="h-3 w-14" />
          </div>
        ))}
      </div>

      {/* Forecast skeleton */}
      <div className="glass rounded-3xl p-6">
        <SkeletonBlock className="h-4 w-32 mb-5" />
        <div className="flex gap-3 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-4 min-w-[130px] space-y-3 flex flex-col items-center"
            >
              <SkeletonBlock className="h-3 w-12" />
              <SkeletonBlock className="w-16 h-16 rounded-full" />
              <SkeletonBlock className="h-3 w-20" />
              <SkeletonBlock className="h-6 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
