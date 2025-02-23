import React from 'react'
import { Textarea } from "@/components/ui/textarea"


function AdditionalReq({additionalRequirementInput}) {
  return (
    <div>
      <label className='text-slate-600 text-xl'>Any Additional Requirements: (optional)</label>
      <Textarea placeholder="Type your requirements here." id="requirements" onChange={(e) => additionalRequirementInput(e.target.value)}/>
    </div>
  )
}

export default AdditionalReq
