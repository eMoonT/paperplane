"use client";
import { Button } from "@/components/ui/button";

interface PanelProps {
  logout: () => void;
}

const Panel: React.FC<PanelProps> = ({ logout }) => {

  return (
    <div className="mt-5 flex justify-between">
      <h1 className="text-xl xs:text-3xl py-4">Admin DashBoard</h1>
      <Button onClick={logout} variant="outline" size="sm" className="">
        退出登录
      </Button>
    </div>
  );
};

export default Panel;
