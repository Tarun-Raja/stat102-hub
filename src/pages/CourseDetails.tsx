import { InfoCard } from "@/components/common/InfoCard";
import { MODULES, OBJECTIVES, SCHEDULE } from "@/data/constants";

export function CourseDetailsPage() {
  return (
    <section className="pt-6 sm:pt-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 sm:mb-8">Course Details</h1>

      {/* Course Information Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <InfoCard title="Course Title" value="Applied Statistics" />
        <InfoCard title="Course Code" value="STAT102" />
        <InfoCard title="Credits" value="4" />
        <InfoCard title="Category" value="Program Core" />
        <InfoCard title="L-T-P" value="3-1-0" />
        <InfoCard title="Version" value="1.0" />
        <InfoCard title="Approval" value="ACM" />
        <InfoCard title="Level" value="1" />
      </div>

      {/* Course Modules */}
      <div className="academic-card p-6 mb-8">
        <h2 className="text-xl font-bold text-foreground mb-6">Course Modules</h2>
        <div className="space-y-6">
          {MODULES.map((module, index) => (
            <div key={module.key} className="border-l-4 border-primary pl-6">
              <h3 className="font-bold text-lg text-foreground mb-2">
                {module.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {module.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Course Objectives */}
      <div className="academic-card p-6 mb-8">
        <h2 className="text-xl font-bold text-foreground mb-6">Course Objectives</h2>
        <ul className="space-y-4">
          {OBJECTIVES.map((objective, index) => (
            <li key={index} className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                {index + 1}
              </span>
              <p className="text-muted-foreground leading-relaxed pt-1">
                {objective}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Teaching Schedule */}
      <div className="academic-card p-4 sm:p-6 mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6">Teaching Schedule</h2>
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="min-w-full px-4 sm:px-0">
            <table className="w-full min-w-[480px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 pr-4 sm:pr-6 font-semibold text-foreground text-sm sm:text-base">Unit</th>
                  <th className="text-left py-3 pr-4 sm:pr-6 font-semibold text-foreground text-sm sm:text-base">Topics</th>
                  <th className="text-left py-3 font-semibold text-foreground w-20 sm:w-24 text-sm sm:text-base">Sessions</th>
                </tr>
              </thead>
              <tbody>
                {SCHEDULE.map((row) => (
                  <tr key={row.unit} className="border-b border-border hover:bg-muted/30">
                    <td className="py-3 sm:py-4 pr-4 sm:pr-6 align-top font-semibold text-primary text-sm sm:text-base">
                      {row.unit}
                    </td>
                    <td className="py-3 sm:py-4 pr-4 sm:pr-6 align-top text-foreground text-sm sm:text-base leading-relaxed">
                      {row.topic}
                    </td>
                    <td className="py-3 sm:py-4 align-top text-center font-medium text-foreground text-sm sm:text-base">
                      {row.sessions}
                    </td>
                  </tr>
                ))}
                <tr className="border-t-2 border-primary font-bold">
                  <td className="py-3 sm:py-4 pr-4 sm:pr-6 text-primary text-sm sm:text-base">Total</td>
                  <td className="py-3 sm:py-4 pr-4 sm:pr-6 text-foreground text-sm sm:text-base">—</td>
                  <td className="py-3 sm:py-4 text-center text-primary text-sm sm:text-base">30</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recommended Resources */}
      <div className="academic-card p-6">
        <h2 className="text-xl font-bold text-foreground mb-6">Recommended Resources</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-foreground mb-4">Essential Reading</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>
                  <strong>Sheldon Ross</strong> — <em>Introduction to Probability and Statistics for Engineers and Scientists</em>
                </span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-foreground mb-4">Additional Readings</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                <span>
                  <strong>Richard McElreath</strong> — <em>Statistical Rethinking</em>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                <span>
                  <strong>Gelman et al.</strong> — <em>Bayesian Data Analysis</em>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                <span>
                  <strong>Larry Wasserman</strong> — <em>All of Statistics</em>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}