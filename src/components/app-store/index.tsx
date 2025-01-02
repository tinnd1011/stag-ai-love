import ExploreAppsView from "./explore-apps-view";
import AllAppsView from "./all-apps-view";
import { useSearchParams } from "next/navigation";

export default function AppStore() {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");

  return (
    <div className="w-full flex flex-col gap-6 animate-slide-in-right overflow-hidden relative">
      <ExploreAppsView />

      {/* categorized apps */}
      {tag !== null && <AllAppsView />}
    </div>
  );
}
