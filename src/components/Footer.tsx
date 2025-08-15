import { SolaceLogo } from "./SolaceLogo";

export function Footer() {
  return (
    <footer className="bg-solace-primary text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <SolaceLogo className="w-32 h-auto" />
          <div className="text-center text-sm text-solace-light/80">
            <p>&copy; {new Date().getFullYear()} Solace. All rights reserved.</p>
            <p className="mt-1">Healthcare advocacy, covered by Medicare.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}