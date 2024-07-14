import { SignupAuth } from "../components/SignupAuth"
import { Quote } from "../components/Quote"
import { quotes } from "../assets/quotes"

export const Signup=()=> {
    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
            <SignupAuth />
            </div>
            <div className="hidden lg:block">
            <Quote quotes={quotes}/>
            </div>
        </div>
      </div>
    
  }
  