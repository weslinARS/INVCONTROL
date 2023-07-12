import { ReactNode } from "react";

interface ButtonFormTriggerProps {
    triggerFunction: any;
    buttonText: string;
    buttonIcon : ReactNode
}
export function ButtonFormTrigger({triggerFunction,buttonText,buttonIcon}: ButtonFormTriggerProps) {
    return (
        <div className=" w-fit">
            <button className="btn btn-primary btn-sm" onClick={triggerFunction}>
                {buttonIcon}&nbsp;
                {buttonText}
            </button>
        </div>
  )
}
