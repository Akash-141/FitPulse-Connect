import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FindGymPartnersButton() {
  return (
    <Button asChild variant="fitness" className="shadow-glow">
      <Link href="/partners">Find Gym Partners</Link>
    </Button>
  );
}