// return (
//  <S name={Section_Header_And_Desc_Items[index].name} ... />
// )
// function S({ name, header, desc } : { name: string; header: string; desc: string}) {}
// pure component, pure function, 幂等

export default function SectionHeaderAndDesc({
  name,
  headerText,
  description,
}: {
  name: string;
  headerText: string;
  description: string[];
}) {
  return (
    <div className="mt-28 mb-6 flex flex-col gap-6">
      <span className="tracking-widest text-slate-400 dark:text-brick-200">
        {name}
      </span>
      <h1 className="font-semibold text-xl tracking-widest">{headerText}</h1>
      {description.length !== 0 && (
        <div className="flex flex-col gap-4">
          {description.map((paragraph) => {
            return (
              <p
                key={paragraph.slice(5, 8)}
                dangerouslySetInnerHTML={{ __html: paragraph }}
                className="text-justify"
              ></p>
            );
          })}
        </div>
      )}
    </div>
  );
}
