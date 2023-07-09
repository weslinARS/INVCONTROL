
interface ButtonFormTriggerProps {
    triggerFunction: any;
    buttonText: string;
}
export function ButtonFormTrigger({triggerFunction,buttonText}: ButtonFormTriggerProps) {
    return (
        <div className=" w-fit">
            <button className="btn btn-primary btn-sm" onClick={triggerFunction}>
                {buttonText}
            </button>
        </div>
  )
}
