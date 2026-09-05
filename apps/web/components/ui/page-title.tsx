import { ReactNode } from "react";
import { MotionReveal } from "./motion-reveal";

interface PageTitleProps {
  icon: ReactNode;
  iconBgColor: string;
  title: string;
}

export function PageTitle({ icon, iconBgColor, title }: PageTitleProps) {
  return (
    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 sm:mb-10 flex items-center gap-3 sm:gap-4 text-gray-900 dark:text-gray-100 tracking-tighter mt-8 sm:mt-12">
      <div className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] dark:sm:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] ${iconBgColor}`}>
        {icon}
      </div>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-700 to-slate-900 dark:from-slate-100 dark:via-blue-400 dark:to-slate-100">
        {title}
      </span>
    </h1>
  );
}
