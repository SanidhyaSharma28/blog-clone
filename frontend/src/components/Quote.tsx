
import { useQuote } from "../hooks";

interface Quote {
  "quote": string;
  "author": string;
  "profession": string ;
}

export const Quote=({quotes}:{quotes:Quote[]})=> {

  const {currentQuote,hidden} = useQuote({quotes});

    return (
      <div className="bg-slate-200 h-screen flex  justify-center flex-col ">

        <div className="flex justify-center">

        <div className={`max-w-lg ${hidden ? "hidden" : ""}`}>
        <div className="text-3xl font-bold">
        {currentQuote.quote}
        </div>
        <div className="text-xl font-semibold mt-4">
          {currentQuote.author}
        </div>
        <div className="text-sm font-light text-slate-800">
          {currentQuote.profession}
        </div>
        </div>
        </div>
      </div>
    )
  }
  