import { SigninAuth } from "../components/SigninAuth"
import { Quote } from "../components/Quote"
import { quotes } from "../assets/quotes"

export const Signin=()=> {
    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
            <SigninAuth/>
            </div>
            <div className="hidden lg:block">
            <Quote quotes={quotes}/>
            </div>
        </div>
      </div>
    
  }
  