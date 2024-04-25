"use client";
const FormTheoryLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex w-full h-16 bg-blue-100 font-lg justify-center items-center mb-5">
        Forms Theory
      </div>
      <div className="flex justify-center">
        <div className="w-[1000px]">{children}</div>
      </div>
    </>
  );
};

export default FormTheoryLayout;
