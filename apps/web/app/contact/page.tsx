import { PageTitle } from "components/ui/page-title";
import { GitBranch, Globe, Mail, MapPin, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto py-8 sm:py-12 w-full px-4 sm:px-0">
      <PageTitle 
        icon={<MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />}
        iconBgColor="bg-blue-500"
        title="Contact."
      />

      <div className="mt-12 flex flex-col items-center">
        
        <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-[32px] p-8 sm:p-12 border-2 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] max-w-2xl w-full flex flex-col gap-8 relative overflow-hidden group hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] transition-all">
          
          <div className="absolute -right-20 -top-20 bg-blue-500/10 dark:bg-blue-500/20 w-64 h-64 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/20 transition-all"></div>

          <div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tighter mb-4">
              Get in touch.
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
              Have questions about MedVision or want to collaborate? I'd love to hear from you. 
              Feel free to reach out through any of the channels below.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            
            <a href="mailto:learn.abdurrahman@gmail.com" className="flex items-center gap-4 p-4 rounded-2xl bg-gray-100 dark:bg-gray-800 border-2 border-transparent hover:border-black dark:hover:border-white transition-all group/item">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-xl text-blue-600 dark:text-blue-400 group-hover/item:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-0.5">Email</p>
                <p className="text-lg font-black text-gray-900 dark:text-white">learn.abdurrahman@gmail.com</p>
              </div>
            </a>

            <a href="https://github.com/abdurrahmanse" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-gray-100 dark:bg-gray-800 border-2 border-transparent hover:border-black dark:hover:border-white transition-all group/item">
              <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-xl text-gray-700 dark:text-gray-300 group-hover/item:scale-110 transition-transform">
                <GitBranch className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-0.5">GitHub</p>
                <p className="text-lg font-black text-gray-900 dark:text-white">github.com/abdurrahmanse</p>
              </div>
            </a>

            <a href="https://linkedin.com/in/abdurrahmanse" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-gray-100 dark:bg-gray-800 border-2 border-transparent hover:border-black dark:hover:border-white transition-all group/item">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-xl text-blue-500 group-hover/item:scale-110 transition-transform">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-0.5">LinkedIn</p>
                <p className="text-lg font-black text-gray-900 dark:text-white">linkedin.com/in/abdurrahmanse</p>
              </div>
            </a>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-100 dark:bg-gray-800 border-2 border-transparent">
              <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-xl text-orange-500">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-0.5">Location</p>
                <p className="text-lg font-black text-gray-900 dark:text-white">Global / Remote</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}
