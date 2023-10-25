import { Waveform } from "@uiball/loaders";

export const Loading = () => {
  return (
    <div className="w-full items-center h-screen flex justify-center">
      <Waveform size={40} lineWeight={3.5} speed={1} color="white" />
    </div>
  );
};
