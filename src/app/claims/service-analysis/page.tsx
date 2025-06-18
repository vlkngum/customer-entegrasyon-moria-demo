import ClaimFilter from "@/components/claims/ClaimFilter";
import ClaimList from "@/components/claims/ClaimList";

export default function ClaimsPage() {  
  return (
    <div className="min-h-screen">
      <div className="flex-1">
        <ClaimFilter/>
        <ClaimList/>       
      </div>
    </div>
  );
}
