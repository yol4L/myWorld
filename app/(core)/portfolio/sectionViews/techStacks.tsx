import { useEffect, useState } from "react";
import { BACKGROUND_COLORS, RECENT_WORK, TECH_STACKS } from "../data";
import cx from "classnames";

function getBgColor() {
  const i = Math.floor(Math.random() * BACKGROUND_COLORS.length);
  const bgColor = BACKGROUND_COLORS[i];
  return bgColor;
}

export default function TechStacksView({ inView }: { inView: boolean }) {
  const [colors, setColors] = useState<Record<string, string[]>>({});

  useEffect(() => {
    setColors(
      RECENT_WORK.reduce<Record<string, string[]>>((prev, curr) => {
        prev[curr.id] = new Array(curr.tech_stacks.length)
          .fill(0)
          .map(() => getBgColor());
        return prev;
      }, {})
    );
    // { "framework": ["c1", "c2",], "work": ["c3", "c4"], ...}
  }, [setColors]);

  return (
    <div className="mx-[-0.75rem] -mb-20 flex flex-wrap items-stretch">
      {TECH_STACKS.map(({ id, name, icon: Icon, stacks }, i) => {
        return (
          <div
            key={id}
            className={cx(
              "w-1/2 p-3",
              inView &&
                (i % 2 === 0 ? "animate-slideRight" : "animate-slideLeft")
            )}
            style={{ animationDelay: `${i * 0.25 + 0.5}s` }}
          >
            <div className="w-full h-full p-6 flex shadow-md dark:shadow-slate-900 transition-all duration-700">
              <div className="p-2 pr-4 flex items-center border-r border-cerulean-400 dark:border-brick-400 transition-colors duration-700">
                <Icon
                  fontSize="large"
                  className="w-16 h-16 font-light text-cerulean-500 dark:text-brick-400 transition-colors duration-700"
                />
              </div>
              <div className="p-2 pl-4 flex flex-col gap-2">
                <h3 className="text-sm tracking-widest text-slate-800 dark:text-slate-100 transition-colors duration-700">
                  {name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {stacks.map((stack, i) => {
                    return (
                      <div
                        key={stack.toString()}
                        className="px-3 py-0.5 flex items-center justify-start rounded-md cursor-pointer"
                        style={{ backgroundColor: (colors[id] ?? [])[i] }}
                      >
                        <span className="text-xs text-white tracking-wider">
                          {stack}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
